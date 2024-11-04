import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Udyoga</h1>
        <ul className="flex space-x-6">
          <li><Link to="/services" className="text-white font-medium hover:text-yellow-300 transition-colors">Services</Link></li>
          <li><Link to="/authlanding" className="text-white font-medium hover:text-yellow-300 transition-colors">Sign Up/Sign In</Link></li>
          <li><Link to="/become-tasker" className="text-white font-medium hover:text-yellow-300 transition-colors">Become a Tasker</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
