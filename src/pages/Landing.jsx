import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className="flex flex-col justify-center items-center text-center p-10 h-screen bg-gradient-to-r from-blue-400 to-blue-600 text-white">
      <h1 className="text-5xl font-bold mb-6">Highway Security System</h1>
      <p className="text-lg mb-8">Quick Emergency Reporting | Fast Response | Safety First</p>
      <div className="flex gap-6">
        <Link to="/login" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100">
          Login
        </Link>
        <Link to="/signup" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100">
          Signup
        </Link>
      </div>
    </section>
  );
};

export default Landing;
