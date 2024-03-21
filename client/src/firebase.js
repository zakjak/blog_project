// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "blog-new-94ba9.firebaseapp.com",
  projectId: "blog-new-94ba9",
  storageBucket: "blog-new-94ba9.appspot.com",
  messagingSenderId: "800780558452",
  appId: "1:800780558452:web:bdb0526a2c9402f37ef121"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app