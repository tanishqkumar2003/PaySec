import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();

    const handleAboutUs = () => {
        navigate("/about");
    };

    const handleSignIn = () => {
        navigate("/signin");
    };


    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-900 via-blue-600 to-blue-400 p-8">
            {/* Logo Section
            <img
                src={`${process.env.PUBLIC_URL}/a.webp`}
                alt="PaySec Logo"
                className="h-24 w-24 mb-6 rounded-full transition duration-500 ease-in-out transform hover:scale-110 shadow-lg"
            /> */}

            {/* Title and Subtitle */}
            <h1 className="text-6xl font-bold text-white mb-4 transition duration-500 ease-in-out transform hover:scale-105">
                PaySec
            </h1>
            <p className="text-2xl text-gray-200 mb-10 transition duration-500 ease-in-out transform hover:scale-105">
                Pay Securely in Seconds with PaySec
            </p>

            {/* Buttons */}
            <div className="flex flex-col items-center space-y-6">
                <div className="transition duration-300 transform hover:scale-105">
                    <button
                        onClick={handleSignIn}
                        className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-100 transition duration-300 ease-in-out"
                    >
                        Get Started
                    </button>
                </div>
                <div className="transition duration-300 transform hover:scale-105">
                    <button
                        onClick={handleAboutUs}
                        className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-300 transition duration-300 ease-in-out"
                    >
                        Learn More
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-10 text-gray-300 text-sm">
                <p>&copy; 2024 PaySec. All rights reserved.</p>
            </div>
        </div>
    );
};
