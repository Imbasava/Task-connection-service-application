import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import taskprovider from './images/taskprovider.jpg'


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { token, userID, name } = response.data;

      sessionStorage.setItem('authToken', token);
      const expirationTime = Date.now() + 3600 * 1000; // 1 hour in milliseconds
      sessionStorage.setItem('tokenExpiration', expirationTime);
      sessionStorage.setItem('userID', userID);
      sessionStorage.setItem('name', name);

      console.log(response.data);
      navigate('/'); // Change this to the desired path after login
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${taskprovider})` }}>
      <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 w-96">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full mt-1"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full mt-1"
            />
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition duration-200">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
