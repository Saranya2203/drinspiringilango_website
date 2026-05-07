// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJkZ6XCmgZgTcdJ5BsAnPjj8beQM_s7Mk",
  authDomain: "inspiring-ilango-website.firebaseapp.com",
  projectId: "inspiring-ilango-website",
  storageBucket: "inspiring-ilango-website.appspot.com",
  messagingSenderId: "860236640406",
  appId: "1:860236640406:web:5fd1c256e2595555ac12b7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
