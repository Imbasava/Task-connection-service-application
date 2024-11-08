/* import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from './images/Backgroundimage.png'; // Adjusted path to import the image


const FirstHomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col">
           
            <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${BackgroundImage})` }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Choose Your Option to Get Started</h1>
                    <p className="text-lg md:text-2xl mb-8">Explore trusted professionals and get started today!</p>
                    <div className="space-x-4">
                      
                        <button 
                            className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                            onClick={() => {
                                const role = sessionStorage.getItem('role');
                        
                                if (role === 'customer') {
                                    alert('Access Denied: Customers are not allowed to provide services.');
                                    // Optionally, redirect to a different page
                                    navigate('/');
                                } else {
                                    // Allow tasker (or null role) to navigate
                                    navigate('/Customerhome');
                                }
                            }}
                        >
                            Provide Service
                            </button>
                     
                        <button 
                            className="bg-green-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
                            onClick={() => navigate('/Taskerhome')} // Navigate to TaskerHome
                        >
                            Find Service
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstHomePage; */
/* 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from './images/Backgroundimage.png'; // Adjust path to import the image

const FirstHomePage = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState(null); // State to store the user role
    const [loading, setLoading] = useState(true); // State to handle loading
    const userId = sessionStorage.getItem('userID'); // Get userId from sessionStorage

    useEffect(() => {
        // Check if userId is available in session storage
        if (userId) {
            // If userId is present, fetch user role from the backend
            fetch(`http://localhost:5000/api/get-user-role?userId=${userId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.success) {
                        setRole(data.role); // Set the role from the response
                        if (data.taskerId) {
                            sessionStorage.setItem('taskerId', data.taskerId);
                        }
                    } else {
                        console.error('Error fetching user role:', data.message);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setLoading(false);
                });
        } else {
            // If userId is not in session storage, set loading to false
            setLoading(false);
        }
    }, [userId]);
    

    // If still loading or userId is not found, show loading or error message
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            
            <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${BackgroundImage})` }}>
                <div className="absolute inset-0 bg-black opacity-50"></div> 

               
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Choose Your Option to Get Started</h1>
                    <p className="text-lg md:text-2xl mb-8">Explore trusted professionals and get started today!</p>
                    <div className="space-x-4">
                     
                        <button
                            className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                            onClick={() => {
                                // Only allow navigation if role is not 'tasker'
                                    navigate('/Customerhome');
                            }}
                        >
                            Provide Service
                        </button>
                        
                        <button
                            className="bg-green-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
                            onClick={() => {
                                if (role === 'tasker') {
                                    alert('Access Denied: Taskers cannot provide services.');
                                }else {
                                    navigate('/Taskerhome');
                                }
                            }}
                        >
                            Find Service
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstHomePage;
 */


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from './images/Backgroundimage.png'; // Adjust path to import the image

const FirstHomePage = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState(null); // State to store the user role
    const [taskerId, setTaskerId] = useState(null); // State to store the taskerId
    const [loading, setLoading] = useState(true); // State to handle loading
    const userId = sessionStorage.getItem('userID'); // Get userId from sessionStorage

    useEffect(() => {
        // Check if userId is available in session storage
        if (userId) {
            // If userId is present, fetch user role and taskerId from the backend
            fetch(`http://localhost:5000/api/get-user-role?userId=${userId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.success) {
                        setRole(data.role); // Set the role from the response
                        setTaskerId(data.taskerId); // Set taskerId from the response
                        if (data.taskerId) {
                            sessionStorage.setItem('taskerId', data.taskerId); // Store taskerId in session storage
                        }
                    } else {
                        console.error('Error fetching user role:', data.message);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setLoading(false);
                });
        } else {
            // If userId is not in session storage, set loading to false
            setLoading(false);
        }
    }, [userId]);
    

    // If still loading or userId is not found, show loading or error message
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section with Background Image */}
            <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${BackgroundImage})` }}>
                <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}

                {/* Centered Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Choose Your Option to Get Started</h1>
                    <p className="text-lg md:text-2xl mb-8">Explore trusted professionals and get started today!</p>
                    <div className="space-x-4">
                        {/* Navigate to Customer Homepage */}
                        <button
                            className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                            onClick={() => {
                                // Only allow navigation if role is not 'tasker'
                                    navigate('/Customerhome');
                            }}
                        >
                            Provide Service
                        </button>
                        
                        <button
                            className="bg-green-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
                            onClick={() => {
                                if (role === 'tasker') {
                                    alert('Access Denied: Taskers cannot provide services.');
                                }else {
                                    navigate('/Taskerhome');
                                }
                            }}
                        >
                            Find Service
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstHomePage;
