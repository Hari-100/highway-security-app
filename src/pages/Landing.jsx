// import React from "react";

// import { useUser } from '@clerk/clerk-react';
// import { useNavigate } from 'react-router-dom';

// const Landing = () => {
//   const { isSignedIn } = useUser();
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     if (isSignedIn) {
//       navigate('/dashboard');
//     }
//   }, [isSignedIn, navigate]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-4xl font-bold mb-6">Welcome to Highway Security App</h1>
//       <p className="text-lg text-gray-600">Please sign in or sign up to continue</p>
//     </div>
//   );
// };

// export default Landing;
import React from 'react';
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
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-red-100 via-white to-blue-100 opacity-60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">
          Highway Emergency Response
        </h1>
        <p className="text-gray-700 text-lg max-w-xl mb-8">
          A secure platform for reporting accidents, breakdowns, and emergencies on the highway. Stay safe, stay alert.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-red-600 text-white px-6 py-3 rounded-xl shadow hover:bg-red-700 transition"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-white border border-red-600 text-red-600 px-6 py-3 rounded-xl hover:bg-red-50 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;