import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
//import { async } from '@firebase/util'
const MySwal = withReactContent(Swal)

const Show = () => {
    //1 - Configuramos los hooks
    const [products, setProducts] = useState( [] )

    //2 - Referenciamos a la DB firestore
    const productsCollection = collection(db, "products")

    //3 - Función para mostrar TODOS los docs
    const getProducts = async () => {
        const data = await getDocs(productsCollection)
        //console.log(data.docs)
        setProducts(
            data.docs.map( (doc) => ( {...doc.data(), id:doc.id}))
        )
        //console.log(products[0])
    }

    
    //4 - Función para eliminar un doc
    const deleteProduct = async (id) => {
      const productDoc = doc(db, "products", id)
      await deleteDoc(productDoc)
      getProducts()
    }
    

    //5 - Función de confirmación para Sweet Alert 2
    const confirmDelete = (id) => {
      MySwal.fire({
        title: 'Elimina el producto?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          // llamamos a la función de eliminar
          deleteProduct(id)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    }


    //6 - Usamos useEffect
    useEffect ( () => {
        getProducts()
        // eslint-disable-next-line
    }, [])
    
    //7 - Devolvemos vista de nuestro componente  

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='d-grid gap-2'>
              <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
            </div>

            <table className='table table-dark table-hover'>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                { products.map( (product) => (
                  <tr key={product.id}>
                    <td>{product.description}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Link to={`/edit/${product.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                      <button onClick={ () => { confirmDelete(product.id)}} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    
    </>
    )
}

export default Show
