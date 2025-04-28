import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-2xl font-bold">Highway Safety</Link>
      <div className="flex gap-4">
        <Link to="/login" className="text-white hover:underline">Login</Link>
        <Link to="/signup" className="text-white hover:underline">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
