import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';
// import { getDatabase } from "firebase/database";



const firebaseConfig = {
  apiKey: "AIzaSyB7MQZpn8a0U16ewQh6PExIz72GHcQSDaA",
  authDomain: "cvgenerator-b32d9.firebaseapp.com",
  databaseURL: "https://cvgenerator-b32d9-default-rtdb.firebaseio.com",
  projectId: "cvgenerator-b32d9",
  storageBucket: "cvgenerator-b32d9.firebasestorage.app",
  messagingSenderId: "49196849814",
  appId: "1:49196849814:web:2690c926ac5acc0260c0b7",
  measurementId: "G-2C7DYMYJN9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);


export {
  db,
  auth,
  storage
}


