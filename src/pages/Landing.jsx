import React from "react";
// import { Link } from "react-router-dom";

// const Landing = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center p-8">
//       <div className="max-w-lg w-full">
//         <h1 className="text-4xl font-extrabold mb-4">Welcome to Highway Security System</h1>
//         <p className="mb-6">Your safety is our priority. Take immediate action if you see any unlawful activity.</p>
//         <div className="flex justify-center space-x-4">
//           <Link to="/login">
//             <button className="px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition">Login</button>
//           </Link>
//           <Link to="/signup">
//             <button className="px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition">Sign Up</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Landing;
// src/pages/Landing.jsx


import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to Highway Security App</h1>
      <p className="text-lg text-gray-600">Please sign in or sign up to continue</p>
    </div>
  );
};

export default Landing;