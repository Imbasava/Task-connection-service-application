import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function TaskersList() {
  const [taskers, setTaskers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const serviceId = location.state?.serviceId;

  // Fetch taskers data
  useEffect(() => {
    const fetchTaskers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/Tasker/Taskers', {
          params: { serviceId },
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
    sessionStorage.setItem('taskerId', tasker.tasker_Profile_Id);
    sessionStorage.setItem('hourlyRate', tasker.hourlyRate);
    navigate('/payment', { state: { taskerId: tasker.tasker_Profile_Id } });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-pink-100">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Available Taskers</h1>

        {/* Taskers List - Horizontal Layout */}
        <div className="taskers-container overflow-x-auto">
          <div className="flex space-x-6">
            {taskers.length > 0 ? (
              taskers.map((tasker) => (
                <div
                  key={tasker.tasker_Profile_Id}
                  className="tasker-card flex-none bg-white p-4 rounded-lg shadow-lg w-64 transition transform hover:scale-105 hover:shadow-2xl"
                >
                  <img
                    src={`http://localhost:5000/${tasker.taskerImage}`} // Tasker Image
                    alt={`${tasker.taskerName}'s profile`}
                    className="tasker-image w-full h-48 object-cover rounded-md mb-4"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{tasker.taskerName}</h2>
                    <p className="text-gray-600 mt-2">Experience: {tasker.experience} years</p>
                    <p className="text-gray-600">Hourly Rate: ${tasker.hourlyRate}</p>
                    <button
                      onClick={() => handleBookTasker(tasker)}
                      className="book-button mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">No taskers available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskersList;
