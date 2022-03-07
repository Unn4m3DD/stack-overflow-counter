// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBmy_H3DcQ0vmd0cyMVAaSTzVsQVxzy2Y8",
  authDomain: "stack-overflow-counter.firebaseapp.com",
  projectId: "stack-overflow-counter",
  storageBucket: "stack-overflow-counter.appspot.com",
  messagingSenderId: "953982913567",
  appId: "1:953982913567:web:bb11221662b8953d20d92a",
  measurementId: "G-BC3ZVRKNLZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);