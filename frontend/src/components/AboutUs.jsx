import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AboutUs = () => {
    const navigate = useNavigate();
    const handleContactUs = ()=>{
        navigate("/contact")
    }
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 to-blue-800 text-white p-8">
            <h1 className="text-4xl font-bold mb-6">About Us</h1>
            <p className="text-lg mb-10 text-gray-200 text-center max-w-2xl">
                At PaySec, we believe in making transactions secure, fast, and effortless. Our mission is to provide a seamless payment experience that empowers users to manage their finances with confidence.
            </p>
            
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg mb-6 text-gray-200 text-center max-w-2xl">
                To deliver innovative payment solutions that simplify financial transactions while prioritizing security and user experience.
            </p>
            
            <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
            <p className="text-lg mb-10 text-gray-200 text-center max-w-2xl">
                To be the leading payment platform, trusted by millions worldwide, where users can transact securely and conveniently.
            </p>
            
            <h2 className="text-3xl font-semibold mb-4">Meet Our Team</h2>
            <div className="flex flex-wrap justify-center space-x-4">
                <button onClick={handleContactUs} className="bg-white text-blue-600 rounded-lg shadow-lg p-4 max-w-xs mb-4">
                    <h3 className="font-bold">John Doe</h3>
                    <p>CEO & Founder</p>
                </button>
                <button onClick={handleContactUs} className="bg-white text-blue-600 rounded-lg shadow-lg p-4 max-w-xs mb-4">
                    <h3 className="font-bold">Jane Smith</h3>
                    <p>CTO</p>
                </button>
                <button onClick={handleContactUs} className="bg-white text-blue-600 rounded-lg shadow-lg p-4 max-w-xs mb-4">
                    <h3 className="font-bold">Alice Johnson</h3>
                    <p>Head of Marketing</p>
                </button>
            </div>
        </div>
    );
};


