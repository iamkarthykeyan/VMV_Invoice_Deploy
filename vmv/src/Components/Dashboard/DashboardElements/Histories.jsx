import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PreLoader from '../../PreLoader/PreLoader';

function HistoryInvoice() {
    const [histories, setHistories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/history/saveInfo');
                setHistories(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching histories:', error);
                setHistories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchHistories();
    }, []);

    if (loading) {
        return <PreLoader />;
    }

    return (
        <div className="w-full flex justify-center px-4 py-8 sm:py-12">
            <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                {histories.length === 0 ? (
                    <div className="col-span-full">
                        <p className="text-center text-base sm:text-lg font-semibold text-gray-600 bg-white py-10 rounded-lg shadow-lg">
                            No history found.
                        </p>
                    </div>
                ) : (
                    histories.map((history) => (
                        <div 
                            key={history._id} 
                            className="bg-white rounded-xl shadow-md p-6 sm:p-8 border border-gray-200 transition-transform transform hover:shadow-lg"
                        >
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 mb-4 tracking-wide">
                                {history.buyerCompanyName}
                            </h2>
                            
                            <div className="mt-4">
                                <p className="text-gray-700 text-base sm:text-lg">
                                    <span className="font-semibold">Invoice Number:</span> {history.invoiceNumber}
                                </p>
                                <p className="text-gray-700 text-base sm:text-lg mt-2">
                                    <span className="font-semibold">Date:</span> {history.date}/{history.month}/{history.year}
                                </p>
                            </div>

                            <div className="border-t border-gray-200 pt-4 mt-6">
                                <p className="text-gray-500 text-xs sm:text-sm">Created At: {new Date(history.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default HistoryInvoice;
