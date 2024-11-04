import React from 'react';
import { Link } from 'react-router-dom';

function SignUpLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome to Rural Wage Work Employment</h2>
        <div className="flex justify-between mb-4">
          <Link to="/signup" className="bg-blue-500 text-white py-2 px-4 rounded-md text-center w-full mr-2">Sign Up</Link>
          <Link to="/login" className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md text-center w-full">Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpLogin;
