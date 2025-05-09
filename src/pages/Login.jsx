import React, { useState } from "react";
// import { loginWithEmail, loginWithGoogle } from "../firebase/authService";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await loginWithEmail(email, password);
//       // Handle successful login
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-black">
//       <div className="bg-blue-900 p-8 rounded-lg shadow-lg max-w-sm w-full">
//         <h1 className="text-center text-3xl font-bold text-white mb-6">Login</h1>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 border border-blue-500 bg-blue-800 text-white rounded-md focus:outline-none focus:border-blue-300"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border border-blue-500 bg-blue-800 text-white rounded-md focus:outline-none focus:border-blue-300"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
//           >
//             Login
//           </button>
//         </form>
//         <button
//           onClick={loginWithGoogle}
//           className="w-full mt-4 bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
//         >
//           Login with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;
// src/pages/Login.jsx

import { SignIn } from '@clerk/clerk-react';

const Login = () => (
  <div className="flex items-center justify-center min-h-screen">
    <SignIn path="/login" routing="path" />
  </div>
);

export default Login;