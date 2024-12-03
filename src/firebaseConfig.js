import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB2zORxJyLMzukyelQznGt7arR9aoKBUMI",
    authDomain: "spender-fe292.firebaseapp.com",
    projectId: "spender-fe292",
    storageBucket: "spender-fe292.firebasestorage.app",
    messagingSenderId: "616624088754",
    appId: "1:616624088754:web:cb1696f31325a9c469cbab"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;