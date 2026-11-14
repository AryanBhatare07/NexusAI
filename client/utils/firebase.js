// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nexusai-4da7b.firebaseapp.com",
  projectId: "nexusai-4da7b",
  storageBucket: "nexusai-4da7b.firebasestorage.app",
  messagingSenderId: "247893994391",
  appId: "1:247893994391:web:accafc7f6b6c0a33f172d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()