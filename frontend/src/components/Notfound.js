import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-9xl font-bold">404</h1>
      <p className="mt-4 text-xl">Oops! The page you're looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="mt-8 px-6 py-3 text-lg bg-white text-black rounded hover:bg-gray-200 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
