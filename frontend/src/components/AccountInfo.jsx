import { useEffect, useState } from "react";
import axios from "axios";

export const AccountInfo = () => {
    const [info, setInfo] = useState({});

    useEffect(() => {
        axios.get("https://paysec-backend.onrender.com/api/v1/user/accinfo", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then(response => {
            setInfo(response.data.account);
        });
    }, []);
    useEffect(()=>{
        localStorage.setItem("balance", info.balance)
    },[info])
        
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'numeric',
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false,
            timeZone: 'Asia/Kolkata'
        };
        return date.toLocaleString('en-IN', options).replace(',', '');
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Account Info</h1>
            <div>
                {info ? (
                    <div className="space-y-4">
                        <div className="flex justify-between border-b pb-2">
                            <p className="text-xl font-semibold text-gray-700">Balance:</p>
                            <p className="text-lg text-gray-600">Rs. {info.balance}</p>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <p className="text-xl font-semibold text-gray-700">Created at:</p>
                            <p className="text-lg text-gray-600">{new Date(info.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-xl font-semibold text-gray-700">Last transaction:</p>
                            <p className="text-lg text-gray-600">{formatDateTime(info.updatedAt)}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-red-500 text-center mt-4">No account information available.</p>
                )}
            </div>
        </div>
    );
};
