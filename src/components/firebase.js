import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";


// Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyAiDT5HL-pH_jc-N-zRZiZD0YzpenJm3ew",
  authDomain: "todo-app-25154.firebaseapp.com",
  projectId: "todo-app-25154",
  storageBucket: "todo-app-25154.appspot.com",
  messagingSenderId: "40113120361",
  appId: "1:40113120361:web:2c7a1d6f08057a22302ef8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Export authentication functions
export {signInWithEmailAndPassword, createUserWithEmailAndPassword, googleProvider, signInWithPopup, onAuthStateChanged };
