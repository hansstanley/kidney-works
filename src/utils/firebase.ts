import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDKp1-B10z3FpKIklrZs7ufWNb2wWJHdXQ",
    authDomain: "hire-a-patient.firebaseapp.com",
    projectId: "hire-a-patient",
    storageBucket: "hire-a-patient.appspot.com",
    messagingSenderId: "742727498093",
    appId: "1:742727498093:web:067c8e8afd3712ab818264",
    measurementId: "G-K0SX8796D5"
  };

  // Add Firebase credentials
  export const app = initializeApp(firebaseConfig);
  // Initialize Firebase Authentication and get a reference to the service
  export const firebaseAuth = getAuth(app);
  // Initialize Firestore and get a reference to the service
  export const db = getFirestore(app);
   // Initialize Firebase Storage and get a reference to the service
  export const storage = getStorage(app);