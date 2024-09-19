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
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg h-16 flex justify-between items-center p-4  rounded-b-lg">
            <div className="text-3xl font-bold text-white">
                PaySec App
            </div>
            <div className="flex space-x-4">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center shadow hover:shadow-lg transition duration-200">
                    <button onClick={handleInfo} className="text-xl text-gray-700 hover:text-blue-500">
                        Info
                    </button>
                </div>
                <button 
                    onClick={handleLogout} 
                    className="bg-red-600 text-white font-semibold py-2 px-6 rounded-md shadow transition duration-200 hover:bg-red-700"
                >
                    {token ? "Logout" : "Login"}
                </button>
            </div>
        </div>
    );
};

