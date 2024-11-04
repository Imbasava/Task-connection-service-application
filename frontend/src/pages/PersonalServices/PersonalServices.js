import React, { useState } from 'react';

function PersonalServices() {
  const [selectedSubService, setSelectedSubService] = useState(null);

  const subServices = [
    { id: 1, name: 'Personal Training', description: 'Personal training sessions for fitness and wellness.' },
    { id: 2, name: 'Pet Care', description: 'Services for pet sitting and care.' },
    { id: 3, name: 'Tutoring', description: 'Tutoring services for various subjects and grades.' }
  ];

  const handleSubServiceSelect = (subServiceId) => {
    setSelectedSubService(subServiceId);
    console.log(`Selected service: ${subServiceId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800">Personal Services</h1>
      <p className="mt-4 text-gray-600">
        Choose from the following personal services:
      </p>

      <div className="flex flex-col gap-6 mt-8">
        {subServices.map(subService => (
          <div
            key={subService.id}
            onClick={() => handleSubServiceSelect(subService.id)}
            className={`cursor-pointer border border-gray-200 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105 ${selectedSubService === subService.id ? 'border-blue-500' : 'border-transparent'}`}
          >
            <h3 className="text-xl font-bold text-gray-800">{subService.name}</h3>
            <p className="mt-2 text-gray-600">{subService.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonalServices;