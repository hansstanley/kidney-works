import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCiRX_C3YERRs7Y-DVP52XtPwOPOwI-4yM",
  authDomain: "kidney-works.firebaseapp.com",
  projectId: "kidney-works",
  storageBucket: "kidney-works.appspot.com",
  messagingSenderId: "687635240235",
  appId: "1:687635240235:web:09308710c3822a05c3a16e",
  measurementId: "G-2W2J52EZGP"
};

  // Add Firebase credentials
  export const app = initializeApp(firebaseConfig);
  // Initialize Firebase Authentication and get a reference to the service
  export const firebaseAuth = getAuth(app);
  // Initialize Firestore and get a reference to the service
  export const db = getFirestore(app);
   // Initialize Firebase Storage and get a reference to the service
  export const storage = getStorage(app);