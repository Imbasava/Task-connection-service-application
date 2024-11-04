import React from 'react';

function Footer() {
  return (
    <footer className="bg-blue-600 text-white p-4 mt-12">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Udyoga. All rights reserved.</p>
        <p className="mt-2">
          <a href="/" className="text-gray-300 hover:text-white">Privacy Policy</a> | 
          <a href="/" className="text-gray-300 hover:text-white ml-2">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
