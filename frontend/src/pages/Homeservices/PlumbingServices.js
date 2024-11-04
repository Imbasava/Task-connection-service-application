import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PlumbingServices() {
  const [experience, setExperience] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate(); // React Router navigation hook

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this is where you would send data to the backend to update the tasker's profile.
    console.log({
      experience: experience,
      hourlyRate: hourlyRate,
    });
    setSubmitted(true);

    // Navigate to the Service Added confirmation page
    navigate('/service-added');
  };

  return (
    <div className="container mx-auto p-6">
      <header className="bg-indigo-600 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">Register as a Plumbing Tasker</h1>
        <p className="mt-2 text-lg">Fill in the required details to offer plumbing services.</p>
      </header>

      {/* Service Form */}
      <section className="my-8">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label htmlFor="experience" className="block text-gray-700 font-bold">Years of Experience</label>
              <input
                type="number"
                id="experience"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your years of experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="rate" className="block text-gray-700 font-bold">Hourly Rate ($)</label>
              <input
                type="text"
                id="rate"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your hourly rate"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
            >
              Add Plumbing Service
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Added!</h2>
            <p className="text-gray-600">
              You have successfully added plumbing services to your task profile.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default PlumbingServices;
