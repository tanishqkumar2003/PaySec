import { useEffect, useState } from "react";
import axios from "axios";
import { AccountInfo } from "./AccountInfo";
import { useNavigate } from "react-router-dom";
import { Appbar } from "./AppBar";

export const UserInfo = () => {
    const [info, setInfo] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://paysec-backend.onrender.com/api/v1/user/info", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then(response => {
            setInfo(response.data);
        });
    }, []);

    const handleSendMoney = () => {
        navigate("/dashboard");
    }
    
    return (
        <>
            <Appbar />
            <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
                <div className="max-w-md mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">User Info</h1>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4">
                            <h2 className="text-white text-lg font-semibold">User Details</h2>
                        </div>
                        <div className="p-6">
                            {info.user ? (
                                <div className="space-y-4">
                                    <div className="flex justify-between border-b pb-2">
                                        <p className="text-lg md:text-xl font-semibold text-gray-700">Username:</p>
                                        <p className="text-base md:text-lg text-gray-600">{info.user.username}</p>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <p className="text-lg md:text-xl font-semibold text-gray-700">First Name:</p>
                                        <p className="text-base md:text-lg text-gray-600">{info.user.firstName}</p>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <p className="text-lg md:text-xl font-semibold text-gray-700">Last Name:</p>
                                        <p className="text-base md:text-lg text-gray-600">{info.user.lastName}</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-red-500 text-center mt-4">No user information available <br />Login to see your details</p>
                            )}
                        </div>
                    </div>
                    <div className="mt-6">
                        <AccountInfo />
                    </div>
                    <div className="text-center mt-6">
                        <button 
                            onClick={handleSendMoney} 
                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200 w-full md:w-auto"
                        >
                            Send Money
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};






// import { useEffect, useState } from "react";
// import axios from "axios";
// import { AccountInfo } from "./AccountInfo";
// import { useNavigate } from "react-router-dom"
// import { Appbar } from "./AppBar";


// export const UserInfo = () => {
//     const [info, setInfo] = useState({});
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get("https://paysec-backend.onrender.com/api/v1/user/info", {
//             headers: {
//                 Authorization: "Bearer " + localStorage.getItem("token"),
//             },
//         })
//         .then(response => {
//             setInfo(response.data);
//         });
//     }, []);

//     const handleSendMoney = () => {
//         navigate("/dashboard")
//     }
    
//     return (
//         <>
//         <Appbar/>
//         <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
//             <div className="max-w-2xl mx-auto w-2/4">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-3xl font-bold text-gray-800">User Info</h1>
                    
//                 </div>
//                 <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//                     <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4">
//                         <h2 className="text-white text-lg font-semibold">User Details</h2>
//                     </div>
//                     <div className="p-6">
//                         {info.user ? (
//                             <div className="space-y-4">
//                                 <div className="flex justify-between border-b pb-2">
//                                     <p className="text-xl font-semibold text-gray-700">Username:</p>
//                                     <p className="text-lg text-gray-600">{info.user.username}</p>
//                                 </div>
//                                 <div className="flex justify-between border-b pb-2">
//                                     <p className="text-xl font-semibold text-gray-700">First Name:</p>
//                                     <p className="text-lg text-gray-600">{info.user.firstName}</p>
//                                 </div>
//                                 <div className="flex justify-between border-b pb-2">
//                                     <p className="text-xl font-semibold text-gray-700">Last Name:</p>
//                                     <p className="text-lg text-gray-600">{info.user.lastName}</p>
//                                 </div>
//                             </div>
//                         ) : (
//                             <p className="text-red-500 text-center mt-4">No user information available <br/>Login to see your details</p>
//                         )}
//                     </div>
//                 </div>
//                 <div className="mt-6">
//                     <AccountInfo />
//                 </div>
//                 <div className="text-center mt-6">
//                     <button 
//                         onClick={handleSendMoney} 
//                         className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
//                     >
//                         Send Money
//                     </button>
//                 </div>
//             </div>
//         </div>
//         </>
//     );
// };
