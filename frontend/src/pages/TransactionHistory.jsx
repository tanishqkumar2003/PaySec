import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Appbar } from '../components/Appbar';

export const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get("https://paysec-backend.onrender.com/api/v1/account/transactions", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                setTransactions(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
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
        <>
            <Appbar />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 via-blue-600 to-blue-400 p-6">
                <div className="max-w-4xl mx-auto w-full">
                    <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Transaction History</h2>
                        {loading && <div className="text-center text-gray-500">Loading...</div>}
                        {error && <div className="text-center text-red-500">Error: {error}</div>}
                        {transactions.length === 0 && !loading && (
                            <p className="text-red-500 text-center mt-4">No transactions found.</p>
                        )}
                        {transactions.length > 0 && !loading && (
                            <table className="min-w-full border border-gray-300">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="border-b p-4 text-left text-gray-700">Date</th>
                                        <th className="border-b p-4 text-left text-gray-700">Transaction To</th>
                                        <th className="border-b p-4 text-left text-gray-700">Amount</th>
                                        <th className="border-b p-4 text-left text-gray-700">Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((transaction, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-100 transition duration-200">
                                            <td className="px-4 py-2">
                                                {transaction.transactionTime.map((time, i) => (
                                                    <div key={i}>{formatDateTime(time)}</div>
                                                ))}
                                            </td>
                                            <td className="px-4 py-2">
                                                {transaction.transactionTo.map((to, i) => (
                                                    <div key={i}>{to || 'N/A'}</div>
                                                ))}
                                            </td>
                                            <td className="px-4 py-2">
                                                {transaction.transactionAmount.map((amount, i) => (
                                                    <div key={i}>Rs. {amount || 0}</div>
                                                ))}
                                            </td>
                                            <td className="px-4 py-2">
                                                {transaction.transactionType.map((type, i) => (
                                                    <div key={i}>{type || 'N/A'}</div>
                                                ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
