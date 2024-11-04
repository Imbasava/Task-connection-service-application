import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    phone: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data as JSON
      const response = await axios.post('http://localhost:5000/api/SignUp/signup', formData, {
        headers: {
          'Content-Type': 'application/json', // Send as JSON
        },
      });

      console.log(response.data);
      // Redirect to the Home page after successful sign-up
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
        <p className="text-center text-gray-500 mb-6">Please fill in the details to sign up</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name and Last Name */}
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your first name"
                required
              />
            </div>

            <div className="w-full">
              <label className="block text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your age"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
