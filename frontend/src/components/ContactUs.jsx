import React from 'react';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'; // Importing icons from react-icons

export const ContactUs = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 to-blue-800 text-white p-8 relative">
            {/* Social Media Links */}
            <div className="absolute top-4 right-4 flex space-x-4">
                <a href="https://www.linkedin.com/in/tanishq-kumar-4993292a7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition duration-300">
                    <FaLinkedin size={24} />
                </a>
                <a href="https://x.com/tanishqpayla?t=kzjIVaBO86yZOtwTM3sbGw&s=09" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition duration-300">
                    <FaTwitter size={24} />
                </a>
                <a href="tanishqkumar1003@gmail.com" className="text-white hover:text-blue-300 transition duration-300">
                    <FaEnvelope size={24} />
                </a>
            </div>

            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg mb-10 text-gray-200 text-center max-w-2xl">
                We’d love to hear from you! Whether you have questions, feedback, or need support, feel free to reach out to us.
            </p>
            <form className="bg-white text-blue-600 rounded-lg shadow-lg p-6 max-w-lg w-full">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="name" 
                        type="text" 
                        placeholder="Your Name" 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="email" 
                        type="email" 
                        placeholder="Your Email" 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
                        Message
                    </label>
                    <textarea 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="message" 
                        rows="4" 
                        placeholder="Your Message" 
                        required 
                    />
                </div>
                <button 
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out hover:bg-blue-700"
                    type="submit"
                >
                    Send Message
                </button>
            </form>
            <div className="mt-10 text-gray-300 text-sm text-center">
                <p>Alternatively, you can reach us at:</p>
                <p>Email: support@paysec.com</p>
                <p>Phone: (123) 456-7890</p>
            </div>
        </div>
    );
};

