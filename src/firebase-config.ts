
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD1nsW9fd_-xP6qkYaP8mOyX1mD84Mhhh4",
  authDomain: "silken-tangent-343402.firebaseapp.com",
  projectId: "silken-tangent-343402",
  storageBucket: "silken-tangent-343402.appspot.com",
  messagingSenderId: "302087736467",
  appId: "1:302087736467:web:bb8287476a3894f9a39166",
  measurementId: "G-96NFPQNNHM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
