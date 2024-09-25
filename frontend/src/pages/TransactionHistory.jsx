import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Component to display individual transaction details
const TransactionDetail = ({ label, value }) => (
    <p className="text-gray-700">
        <strong>{label}:</strong> {value}
    </p>
);

export const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/transactions", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                console.log(response.data); 
                setTransactions(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    console.log(transactions);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';  // Handle invalid date
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
        <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Transaction History</h2>
            {transactions.length === 0 ? (
                <p className="text-red-500 text-center mt-4">No transactions found.</p>
            ) : (
                <div className="space-y-4">
                    {transactions.map((transaction, index) => (
                        <div key={index} className="border-b pb-4">
                            <TransactionDetail 
                                label="Date" 
                                value={formatDateTime(transaction.transactionTime)} 
                            />
                            <TransactionDetail 
                                label="Transaction To" 
                                value={transaction.transactionTo} 
                            />
                            <TransactionDetail 
                                label="Amount" 
                                value={`Rs. ${transaction.transactionAmount}`} 
                            />
                            <TransactionDetail 
                                label="Type" 
                                value={transaction.transactionType} 
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export const TransactionHistory = () => {
//     const [transactions, setTransactions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchTransactions = async () => {
//             try {
//                 const response = await axios.get("http://localhost:3000/api/v1/account/transactions", {
//                     headers: {
//                         Authorization: "Bearer " + localStorage.getItem("token"),
//                     },
//                 });
//                 console.log(response.data); 
//                 setTransactions(response.data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTransactions();
//     }, []);

//     console.log(transactions);
    

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     const formatDateTime = (dateString) => {
//         const date = new Date(dateString);
//         const options = { 
//             year: 'numeric', 
//             month: 'numeric',
//             day: 'numeric', 
//             hour: '2-digit', 
//             minute: '2-digit', 
//             second: '2-digit',
//             hour12: false,
//             timeZone: 'Asia/Kolkata'
//         };
//         return date.toLocaleString('en-IN', options).replace(',', '');
//     };

//     return (
//         <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Transaction History</h2>
//             {transactions.length === 0 ? (
//                 <p className="text-red-500 text-center mt-4">No transactions found.</p>
//             ) : (
//                 <div className="space-y-4">
//                     {transactions.map((transaction, index) => (
//                         <div key={index} className="border-b pb-4">
//                             <p className="text-gray-700">
//                                 <strong>Date:</strong> {formatDateTime(transaction.transactionTime)}
//                             </p>
//                             <p className="text-gray-700">
//                                 <strong>Transaction To:</strong> {transaction.transactionTo}
//                             </p>
//                             <p className="text-gray-700">
//                                 <strong>Amount:</strong> Rs. {transaction.transactionAmount}
//                             </p>
//                             <p className="text-gray-700">
//                                 <strong>Type:</strong> {transaction.transactionType}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export const TransactionHistory = () => {
//     const [transactions, setTransactions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchTransactions = async () => {
//             try {
//                 const response = await axios.get("http://localhost:3000/api/v1/account/transactions", {
//                     headers: {
//                         Authorization: "Bearer " + localStorage.getItem("token"),
//                     },
//                 });
//                 setTransactions(response.data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTransactions();
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div>
//             <h2>Transaction History</h2>
//             {transactions.length === 0 ? (
//                 <p>No transactions found.</p>
//             ) : (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Date</th>
//                             <th>Transaction To</th>
//                             <th>Amount</th>
//                             <th>Type</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {transactions.map((transaction, index) => (
//                             <tr key={index}>
//                                 <td>{new Date(transaction.transactionTime).toLocaleString()}</td>
//                                 <td>{transaction.transactionTo}</td>
//                                 <td>{transaction.transactionAmount}</td>
//                                 <td>{transaction.transactionType}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };
