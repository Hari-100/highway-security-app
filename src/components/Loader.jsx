import React from 'react';
import { Circles } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Circles height="80" width="80" color="#4fa94d" />
    </div>
  );
};

export default Loader;
