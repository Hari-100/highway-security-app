import React, { useState } from "react";
// import { signupWithEmail, loginWithGoogle } from "../firebase/authService";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await signupWithEmail(email, password);
//       // Handle successful signup
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
//         <h1 className="text-center text-2xl font-bold mb-6">Sign Up</h1>
//         <form onSubmit={handleSignup} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
//             required
//           />
//           <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition">
//             Sign Up
//           </button>
//         </form>
//         <button
//           onClick={loginWithGoogle}
//           className="w-full mt-4 bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
//         >
//           Sign Up with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Signup;
// src/pages/Signup.jsx

import { SignUp } from '@clerk/clerk-react';

const Signup = () => (
  <div className="flex items-center justify-center min-h-screen">
    <SignUp path="/signup" routing="path" />
  </div>
);

export default Signup;