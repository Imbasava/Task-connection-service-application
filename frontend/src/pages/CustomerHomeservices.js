import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function HomeServices() {
  const [selectedSubService, setSelectedSubService] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const subServices = [
    { id: 1, name: 'Plumbing', description: 'Plumbing services for home repairs.' },
    { id: 2, name: 'Carpentry', description: 'Carpentry services including furniture repairs.' },
    { id: 3, name: 'Electrical Work', description: 'Electrical services like wiring and appliance repair.' },
    { id: 4, name: 'Housekeeping', description: 'Housekeeping services to keep your home clean.' },
    { id: 5, name: 'Laundry Services', description: 'Laundry and dry cleaning services.' }
  ];

  const handleSubServiceSelect = (subServiceId) => {
    setSelectedSubService(subServiceId);
    navigate('/Taskers', { state: { serviceId: subServiceId } });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800">Home Services</h1>
      <p className="mt-4 text-gray-600">
        Choose from the following home services:
      </p>

      <div className="flex flex-col gap-6 mt-8">
        {subServices.map(subService => (
          <div
            key={subService.id}
            onClick={() => handleSubServiceSelect(subService.id)}
            className={`cursor-pointer border border-gray-200 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105 ${
              selectedSubService === subService.id ? 'border-blue-500' : 'border-transparent'
            }`}
          >
            <h3 className="text-xl font-bold text-gray-800">{subService.name}</h3>
            <p className="mt-2 text-gray-600">{subService.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeServices;