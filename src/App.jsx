import React from 'react';
import AppRoutes from './routes';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Navbar /> */}
      <AppRoutes />
      <Toaster position = "top-center" reverseOrder={false}></Toaster>
    </div>
  );
};

export default App;
