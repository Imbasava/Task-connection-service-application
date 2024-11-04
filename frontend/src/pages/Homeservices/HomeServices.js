import React, { useState } from 'react';
import axios from 'axios';

function HomeServices() {
    const [selectedSubService, setSelectedSubService] = useState(null);
    const [experience, setExperience] = useState('');
    const [hourlyRate, setHourlyRate] = useState('');
    const [showForm, setShowForm] = useState(false);

    const subServices = [
        { id: 1, name: 'Plumbing', description: 'Plumbing services for home repairs.' },
        { id: 2, name: 'Electrical Work', description: 'Electrical services like wiring and appliance repair.' },
        { id: 3, name: 'Carpentry', description: 'Carpentry services including furniture repairs.' },
        { id: 4, name: 'Housekeeping', description: 'Housekeeping services to keep your home clean.' },
        { id: 5, name: 'Laundry Services', description: 'Laundry and dry cleaning services.' }
        // Add additional sub-services here
    ];

    const handleSubServiceSelect = (subService) => {
        setSelectedSubService(subService);
        setShowForm(true); // Show form for experience and hourly rate
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const taskerProfileId = sessionStorage.getItem('taskerProfileId'); // Retrieve TaskerProfile ID from session storage

        // Validate inputs
        if (!taskerProfileId || !selectedSubService) {
            alert('Please select a service and ensure you have a valid TaskerProfile ID.');
            return;
        }

        // Send data to backend
        try {
            const response = await axios.post('http://localhost:5000/api/ProvideService/services', {
                taskerProfileId,   // Include taskerProfileId
                serviceId: selectedSubService.id, // Selected sub-service ID
                experience,
                hourlyRate
            });
            alert('Service added successfully!');
        } catch (error) {
            // Log the specific error response from the server
            console.error('Error adding service:', error.response ? error.response.data : error.message);
            alert('Error adding service: ' + (error.response ? error.response.data.message : 'Unexpected error occurred.'));
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800">Home Services</h1>
            <p className="mt-4 text-gray-600">
                Choose from the following home services:
            </p>

            {/* Sub-services list */}
            <div className="flex flex-col gap-6 mt-8">
                {subServices.map(subService => (
                    <div
                        key={subService.id}
                        onClick={() => handleSubServiceSelect(subService)}
                        className="cursor-pointer border border-gray-200 rounded-lg p-4 shadow-md hover:bg-gray-100"
                    >
                        <h3 className="text-xl font-bold text-gray-800">{subService.name}</h3>
                        <p className="mt-2 text-gray-600">{subService.description}</p>
                    </div>
                ))}
            </div>

            {/* Experience and Hourly Rate Form */}
            {showForm && selectedSubService && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mt-8">
                    <h2 className="text-2xl font-bold mb-4">Add {selectedSubService.name} Details</h2>

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
                        <label htmlFor="hourlyRate" className="block text-gray-700 font-bold">Hourly Rate ($)</label>
                        <input
                            type="number"
                            id="hourlyRate"
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
                        Submit Service
                    </button>
                </form>
            )}
        </div>
    );
}

export default HomeServices;
