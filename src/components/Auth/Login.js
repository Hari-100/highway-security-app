import React, { useState, useEffect } from "react";
import { auth, provider, storage, db } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null); // New: for file input

  const ADMIN_EMAIL = "demoadmin@gmail.com"; // <-- set your admin email here

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      setUser(!!currentUser);
    });
  }, [setUser]);

  const loginAdmin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (auth.currentUser.email !== ADMIN_EMAIL) {
        alert("Not admin!");
        await signOut(auth);
      } else {
        alert("Admin logged in successfully!");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("User logged in!");
    } catch (err) {
      alert(err.message);
    }
  };

  const signupUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User signed up and logged in!");
    } catch (err) {
      alert(err.message);
    }
  };

  const loginGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Google Sign-In successful!");
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    alert("Signed out!");
  };

  // New: Upload file function
  const uploadFile = async () => {
    if (!file) {
      alert("No file selected!");
      return;
    }

    try {
      const storageRef = ref(storage, `uploads/${file.name}`);
      await uploadBytes(storageRef, file);
      const fileURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, "uploads"), {
        email: auth.currentUser.email,
        mediaURL: fileURL,
        timestamp: new Date(),
      });

      alert("File uploaded successfully!");
      setFile(null);
    } catch (err) {
      alert("Error uploading file: " + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Namma Suraksha Portal</h2>

      {!auth.currentUser ? (
        <>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br/>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br/><br/>
          <button onClick={loginAdmin}>Admin Login</button><br/><br/>
          <button onClick={loginUser}>User Login</button><br/><br/>
          <button onClick={signupUser}>User Sign Up</button><br/><br/>
          <button onClick={loginGoogle}>Continue with Google</button>
        </>
      ) : (
        <>
          <p>Logged in as: {auth.currentUser?.email}</p>

          {/* New Upload Area */}
          <input type="file" onChange={(e) => setFile(e.target.files[0])} /><br/><br/>
          <button onClick={uploadFile}>Upload Image/Video</button><br/><br/>

          <button onClick={logout}>Sign Out</button>
        </>
      )}
    </div>
  );
}

export default Login;
