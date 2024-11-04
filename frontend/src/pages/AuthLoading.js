import React from 'react';
import { Link } from 'react-router-dom';

const AuthLoading = ({ isLoading }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Service</h1>
      <p className="mb-8">Please sign in or sign up to continue.</p>

      {isLoading ? (
        <div className="loader">Loading...</div> // You can replace this with a spinner or loading animation
      ) : (
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthLoading;
