import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Services() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    { id: 1, name: 'Home Services', icon: '🏠', route: '/home-services' },
    { id: 2, name: 'Health & Wellness', icon: '❤️', route: '/health-services' },
    { id: 3, name: 'Automotive Services', icon: '🚗', route: '/automotive-services' },
    { id: 4, name: 'Personal Services', icon: '🧍‍♂️', route: '/personal-services' },
    { id: 5, name: 'Event Services', icon: '🎉', route: '/event-services' },
  ];

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
  };

  const handleNextClick = () => {
    if (selectedService) {
      const selected = services.find(service => service.id === selectedService);
      if (selected) {
        navigate(selected.route);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Services description */}
      <h2 className="text-2xl font-bold text-gray-800">Our Services</h2>
      <p className="mt-4 text-gray-600">
        Here you can describe the different services offered.
      </p>

      {/* Service selection */}
      <h3 className="text-3xl font-bold text-gray-800 mt-8 mb-6 text-center">
        What kind of job are you looking for?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {services.map(service => (
          <div
            key={service.id}
            onClick={() => handleServiceSelect(service.id)}
            className={`cursor-pointer border border-gray-200 rounded-lg p-4 text-center shadow-md transition-transform transform hover:scale-105 ${
              selectedService === service.id ? 'border-blue-500' : 'border-transparent'
            }`}
          >
            <div className="text-5xl mb-3">{service.icon}</div>
            <h4 className="text-xl font-bold text-gray-800">{service.name}</h4>
          </div>
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={handleNextClick}
        disabled={!selectedService}
        className={`px-6 py-3 rounded-full bg-orange-500 text-white font-bold ${
          !selectedService ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
        }`}
      >
        Next
      </button>
    </div>
  );
}

export default Services;