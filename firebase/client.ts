// Import the functions you need from the SDKs you need
import { initializeApp, getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase-admin/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBTz3hig237Lr4oSI7N_lrbtI938KfP734",
  authDomain: "prepmaster-7e258.firebaseapp.com",
  projectId: "prepmaster-7e258",
  storageBucket: "prepmaster-7e258.firebasestorage.app",
  messagingSenderId: "825662593197",
  appId: "1:825662593197:web:decb94075ad9a7cd728e24",
  measurementId: "G-PTMSJQ0C6Q"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);