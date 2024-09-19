import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();

    const handleAboutUs = ()=>{
        navigate("/about")
    }

    const handleSignIn = ()=>{
        navigate("/signin")
    }

    const logo = "https://thumbs.dreamstime.com/b/initial-letter-ps-logo-vector-designs-premium-logo-designs-initial-letter-ps-logo-vector-designs-169657808.jpg"
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 to-blue-800 text-center p-8">
            <img
                src={logo}
                alt="PaySec Logo"
                className="h-24 mb-6 transition duration-500 ease-in-out transform hover:scale-110 shadow-lg"
            />
            <h1 className="text-6xl font-bold text-white mb-2 transition duration-500 ease-in-out transform hover:scale-105">
                PaySec
            </h1>
            <p className="text-xl text-gray-200 mb-10 transition duration-500 ease-in-out transform hover:scale-105">
                Pay Securely, Pay in Seconds
            </p>
            <div className="flex flex-col items-center space-y-6">
                <div className="transition duration-300 transform hover:scale-105">
                    <button onClick={handleSignIn} className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-100 transition duration-300 ease-in-out">
                        Get Started
                    </button>
                </div>
                <div className="transition duration-300 transform hover:scale-105">
                    <button onClick={handleAboutUs} className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-300 transition duration-300 ease-in-out">
                        Learn More
                    </button>
                </div>
            </div>
            <div className="mt-10 text-gray-300 text-sm">
                <p>&copy; 2024 PaySec. All rights reserved.</p>
            </div>
        </div>
    );
};

