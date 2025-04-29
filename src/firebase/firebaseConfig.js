// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyDDesyZiIw3OJ27-msWTpijA58t_msrQSs",
//   authDomain: "cena-cf328.firebaseapp.com",
//   projectId: "cena-cf328",
//   storageBucket: "cena-cf328.firebasestorage.app",
//   messagingSenderId: "954578427065",
//   appId: "1:954578427065:web:fa9c5d8fd6f9d5d66d4f68",
//   measurementId: "G-LYVEN5Y99G"
// };

// const app = initializeApp(firebaseConfig);

// // export const auth = getAuth(app);
// // export const provider = new GoogleAuthProvider();
// export const db = getFirestore(app);
// export const storage = getStorage(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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