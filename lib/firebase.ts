// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);