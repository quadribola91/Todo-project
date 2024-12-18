// Import necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Import Firestore service
import { getAuth } from "firebase/auth";  // Import Authentication service

// Your Firebase configuration object
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

// Initialize Firestore and Authentication services
const db = getFirestore(app);
const auth = getAuth(app);  // Initialize Firebase Authentication

// Export necessary services for use in your components
export { db, auth };
