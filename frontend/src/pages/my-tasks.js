import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const taskerId = sessionStorage.getItem("taskerId"); // Get the taskerId from sessionStorage

  // Fetch the bookings for the tasker when the component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!taskerId) {
          console.log("Tasker ID is not available.");
          return;
        }

        // Make a GET request to fetch bookings for the taskerId
        const response = await axios.get('http://localhost:5000/api/tasker-bookings', {
          params: { taskerId: taskerId }, // Pass taskerId as a query parameter
        });

        setBookings(response.data.bookings);
      } catch (error) {
        console.error('Error fetching tasker bookings:', error);
      }
    };

    fetchBookings();
  }, [taskerId]);

  return (
    <div className="container mx-auto my-8 p-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Bookings for Your Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking.bookingId}
              className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {booking.customerFirstName} {booking.customerLastName}
                </h3>
                <p className="text-sm text-gray-600">
                  <strong>Phone:</strong> {booking.customerPhone}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> {booking.customerEmail}
                </p>
                <p className="text-gray-600 mt-2">
                  <strong>Booking Period:</strong> {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Time:</strong> {booking.start_time} - {booking.end_time}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold text-blue-600">
                    ${booking.total_amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => alert("View Booking Details")} // Replace with actual functionality
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No bookings yet.</p>
        )}
      </div>
    </div>
  );
};

export default TaskerBookings;
