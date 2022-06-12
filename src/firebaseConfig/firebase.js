import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC7T8zSIRrlMl6Ax5Jb2r286F2CWBH9PeU",
  authDomain: "crud-fire-react-ae3b3.firebaseapp.com",
  projectId: "crud-fire-react-ae3b3",
  storageBucket: "crud-fire-react-ae3b3.appspot.com",
  messagingSenderId: "61002967231",
  appId: "1:61002967231:web:59b855559d8a65543bfe0a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)