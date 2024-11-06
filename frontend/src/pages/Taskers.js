import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function TaskersList() {
  const [taskers, setTaskers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const serviceId = location.state?.serviceId;

  useEffect(() => {
    const fetchTaskers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/Tasker/Taskers', {
          params: { serviceId }
        });
        setTaskers(response.data);
      } catch (error) {
        console.error('Error fetching taskers:', error);
      }
    };

    if (serviceId) {
      fetchTaskers();
    }
  }, [serviceId]);

  // Handle booking action
  const handleBookTasker = (tasker) => {
    // Save tasker details in session storage
    sessionStorage.setItem('taskerId', tasker.tasker_Profile_Id);
    sessionStorage.setItem('hourlyRate', tasker.hourlyRate);

    // Navigate to the Payment page
    navigate('/payment', { state: { taskerId: tasker.tasker_Profile_Id } });
  };


   //sessionStorage.setItem('selectedTaskerHourlyRate',hourlyRate);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800">Available Taskers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {taskers.length > 0 ? (
          taskers.map(tasker => (
            <div key={tasker.tasker_Profile_Id} className="border border-gray-200 rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-bold">{tasker.taskerName}</h2>
              <p>Experience: {tasker.experience} years</p>
              <p>Hourly Rate: ${tasker.hourlyRate}</p>
              <button
                onClick={() => handleBookTasker(tasker)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p>No taskers available.</p>
        )}
      </div>
    </div>
  );
}

export default TaskersList;
