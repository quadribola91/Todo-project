// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyAiDT5HL-pH_jc-N-zRZiZD0YzpenJm3ew",
  authDomain: "todo-app-25154.firebaseapp.com",
  projectId: "todo-app-25154",
  storageBucket: "todo-app-25154.firebasestorage.app",
  messagingSenderId: "40113120361",
  appId: "1:40113120361:web:2c7a1d6f08057a22302ef8"
};

const app = initializeApp(firebaseConfig);

// Get authentication and firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);
