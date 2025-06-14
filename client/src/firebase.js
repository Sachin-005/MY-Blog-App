// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-92e01.firebaseapp.com",
  projectId: "mern-blog-92e01",
  storageBucket: "mern-blog-92e01.firebasestorage.app",
  messagingSenderId: "516888453125",
  appId: "1:516888453125:web:81ec36deb4639d93cb3c6c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
