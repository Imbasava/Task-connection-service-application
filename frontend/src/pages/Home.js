import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from './images/Backgroundimage.png'; // Adjusted path to import the image


const FirstHomePage = () => {
    const navigate = useNavigate();

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
                            onClick={() => navigate('/Customerhome')} // Navigate to CustomerHome
                        >
                            Provide Service
                        </button>
                        {/* Navigate to Tasker Homepage */}
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

export default FirstHomePage;