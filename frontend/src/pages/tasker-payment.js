import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskerPayments = () => {
  const [payments, setPayments] = useState([]);
  const taskerId = sessionStorage.getItem('taskerId'); // Retrieve taskerId from session storage

  useEffect(() => {
    if (taskerId) {
      axios.get(`http://localhost:5000/api/tasker-payments/${taskerId}`)
        .then(response => setPayments(response.data.payments))
        .catch(error => console.error('Error fetching payment status:', error));
    } else {
      console.error('Tasker ID not found in session storage.');
    }
  }, [taskerId]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Payment Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {payments.map((payment) => (
          <div key={payment.bookingId} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {payment.customerFirstName} {payment.customerLastName}
            </h3>
            <p className="text-gray-600">
              <span className="font-semibold">Total Amount:</span> ₹{payment.total_amount}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Paid Amount:</span> ₹{payment.partial_amount}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Balance:</span> ₹{payment.balance_amount}
            </p>
            <p className={`mt-4 py-1 px-3 rounded-full text-center 
              ${payment.payment_status === 'Pending' ? 'bg-red-100 text-red-600' :
                payment.payment_status === 'Partially Paid' ? 'bg-yellow-100 text-yellow-600' :
                'bg-green-100 text-green-600'}`}>
              {payment.payment_status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskerPayments;
