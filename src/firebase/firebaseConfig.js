import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDesyZiIw3OJ27-msWTpijA58t_msrQSs",
  authDomain: "cena-cf328.firebaseapp.com",
  projectId: "cena-cf328",
  storageBucket: "cena-cf328.firebasestorage.app",
  messagingSenderId: "954578427065",
  appId: "1:954578427065:web:fa9c5d8fd6f9d5d66d4f68",
  measurementId: "G-LYVEN5Y99G"
};

const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
