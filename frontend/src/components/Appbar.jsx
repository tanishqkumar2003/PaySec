import { useNavigate } from "react-router-dom";

export const Appbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    const handleInfo = () => {
        navigate("/info");
    };

    const token = localStorage.getItem("token");

    return (
        <div className="bg-gradient-to-r from-gray-800 via-blue-700 to-blue-900 shadow-lg h-16 flex justify-between items-center p-4 rounded-b-lg">
            <div className="text-3xl font-bold text-white">
                PaySec App
            </div>
            <div className="flex space-x-4">
                <div className="rounded-full h-10 w-10 md:h-12 md:w-12 bg-blue-200 flex justify-center items-center shadow hover:shadow-lg transition duration-200">
                    <button onClick={handleInfo} className="text-lg md:text-xl text-gray-800 hover:text-white">
                        Info
                    </button>
                </div>
                <button 
                    onClick={handleLogout} 
                    className="bg-blue-500 text-white font-semibold py-1 px-3 md:py-2 md:px-6 rounded-md shadow transition duration-200 hover:bg-blue-600"
                >
                    {token ? "Logout" : "Login"}
                </button>
            </div>
        </div>
    );
};
