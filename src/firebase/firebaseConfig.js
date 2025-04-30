import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBBVyQWp9qoseilnSvMcExd1meaxinKzPs",
  authDomain: "highway-security-app.firebaseapp.com",
  projectId: "highway-security-app",
  storageBucket: "highway-security-app.firebasestorage.app",
  messagingSenderId: "99659940254",
  appId: "1:99659940254:web:f7b3678fa648f235bf968f",
  measurementId: "G-783K0769SK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);