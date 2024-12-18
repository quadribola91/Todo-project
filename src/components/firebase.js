import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

// Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyAiDT5HL-pH_jc-N-zRZiZD0YzpenJm3ew",
  authDomain: "todo-app-25154.firebaseapp.com",
  projectId: "todo-app-25154",
  storageBucket: "todo-app-25154.appspot.com",
  messagingSenderId: "40113120361",
  appId: "1:40113120361:web:2c7a1d6f08057a22302ef8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create and export authentication functions and firestore
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Export all necessary functions
export { 
  auth, 
  db, 
  googleProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  onAuthStateChanged, 
  signOut // Ensure signOut is exported correctly
};
