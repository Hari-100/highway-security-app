import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAN0qqSZvkqOjw_akacaTJ8wVlXlZiIk6c",
  authDomain: "rexlapis-3255e.firebaseapp.com",
  projectId: "rexlapis-3255e",
  storageBucket: "rexlapis-3255e.firebasestorage.app",
  messagingSenderId: "485476906819",
  appId: "1:485476906819:web:2f9d6403fd133fa41661f6",
  measurementId: "G-49Y9ZHLCE4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
