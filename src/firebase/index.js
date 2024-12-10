import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2zORxJyLMzukyelQznGt7arR9aoKBUMI",
  authDomain: "spender-fe292.firebaseapp.com",
  databaseURL: "https://spender-fe292-default-rtdb.firebaseio.com",
  projectId: "spender-fe292",
  storageBucket: "spender-fe292.firebasestorage.app",
  messagingSenderId: "616624088754",
  appId: "1:616624088754:web:cb1696f31325a9c469cbab"
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