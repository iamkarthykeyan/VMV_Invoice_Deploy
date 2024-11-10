import React, { useState } from "react";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import DownloadPdf from "../Download/DownloadPdf";
import DownloadExcel from "../Download/DownloadExcel";
import DownloadCsv from "../Download/DownloadCsv";
import PriceAndProducts from "../PriceAndProducts/PriceAndProducts";
import { useLocation } from "react-router-dom";


const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [rows, setRows] = useState([]);

    const location = useLocation();
    const themeColor = location.state?.color || "bg-black";

    const handleUpdateRows = (newRows) => {
        setRows(newRows);
    };

    // State to store all form data across steps
    const [formData, setFormData] = useState({
        date: "",
        invoiceNumber: "",
        buyerCompany: "",
        buyerAddress: "",
        kindAttention: "",
        yourAddress: "Plot no: 115, Lakshmi Nagar, Koladi, Thiruverkadu, Chennai: 600077",
        yourEmail: "",
        yourNumber: "",
        gstNumber: "",
        // Add more fields for Price & Products data if needed
    });

    const handleNext = () => setStep(step + 1);
    const handlePrev = () => setStep(step - 1);

    // Handle form field changes and persist data
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // Step labels and icons
    const steps = [
        { id: 1, label: "Dealership Details", icon: <FaCircle /> },
        { id: 2, label: "Address", icon: <FaCircle /> },
        { id: 3, label: "Price & Products", icon: <FaCircle /> },
        { id: 4, label: "GST Info", icon: <FaCircle /> },
        { id: 5, label: "Download", icon: <FaCircle /> },
    ];

    // Render content based on the current step
    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-gray-800">Dealership Details</h3>

                        <div className="mb-4">
                            <label htmlFor="date" className="block text-gray-700 mb-1">Date</label>
                            <input
                                type="date"
                                id="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="invoiceNumber" className="block text-gray-700 mb-1">Invoice Number</label>
                            <input
                                type="text"
                                id="invoiceNumber"
                                value={formData.invoiceNumber}
                                onChange={handleInputChange}
                                placeholder="Enter invoice number"
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="buyerCompany" className="block text-gray-700 mb-1">Buyer Company Name</label>
                            <input
                                type="text"
                                id="buyerCompany"
                                value={formData.buyerCompany}
                                onChange={handleInputChange}
                                placeholder="Enter buyer company name"
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="buyerAddress" className="block text-gray-700 mb-1">Buyer Address</label>
                            <input
                                type="text"
                                id="buyerAddress"
                                value={formData.buyerAddress}
                                onChange={handleInputChange}
                                placeholder="Enter buyer address"
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="kindAttention" className="block text-gray-700 mb-1">Kind Attention</label>
                            <input
                                type="text"
                                id="kindAttention"
                                value={formData.kindAttention}
                                onChange={handleInputChange}
                                placeholder="Dear Sir, (Optional message)"
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-gray-800">Our Address</h3>
                        <label htmlFor="yourAddress" className="block text-gray-700 mb-1">Your Address</label>
                        <input
                            type="text"
                            id="yourAddress"
                            value={formData.yourAddress}
                            onChange={handleInputChange}
                            placeholder="Your Address"
                            className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                        />
                        <label htmlFor="yourEmail" className="block text-gray-700 mb-1">Your Email</label>
                        <input
                            type="email"
                            id="yourEmail"
                            value={formData.yourEmail}
                            onChange={handleInputChange}
                            placeholder="Your Email"
                            className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                        />
                        <label htmlFor="yourNumber" className="block text-gray-700 mb-1">Your Number</label>
                        <input
                            type="tel"
                            id="yourNumber"
                            value={formData.yourNumber}
                            onChange={handleInputChange}
                            placeholder="Your Number"
                            className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                        />
                    </div>
                );
            case 3:
                return (
                    <div>
                        <PriceAndProducts rows={rows} setRows={handleUpdateRows} />
                    </div>
                );
            case 4:
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-gray-800">GST Information</h3>
                        <input
                            type="text"
                            id="gstNumber"
                            value={formData.gstNumber}
                            onChange={handleInputChange}
                            placeholder="Enter GST number"
                            className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                        />
                    </div>
                );
            case 5:
                return (
                    <div className="flex flex-col items-center justify-center w-full px-4 py-6 sm:px-6 lg:px-8">
                        <h3 className="text-3xl font-semibold text-gray-800 text-center mb-4">Your Invoice is Ready Now! 🎉</h3>
                        <div className="flex flex-wrap justify-center items-center gap-4">
                            <DownloadPdf rows={rows} formData={formData} themeColor={themeColor} />
                            <DownloadExcel rows={rows} formData={formData} />
                            <DownloadCsv rows={rows} formData={formData} />
                        </div>
                    </div>

                )
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex items-start justify-center bg-white p-6">
            <div className="w-full max-w-4xl p-6">
                {/* Progress Stepper */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    {steps.map((stepItem, index) => (
                        <div key={stepItem.id} className="flex-1 flex flex-col items-center mb-4 md:mb-0">
                            {/* Centered Circle Icon */}
                            <span
                                className={`text-2xl mb-2 ${step > index ? "text-gray-800" : "text-gray-400"
                                    } transition-colors`}
                            >
                                {step > index ? <FaCheckCircle className="text-gray-800" /> : stepItem.icon}
                            </span>
                            {/* Step Label */}
                            <p
                                className={`font-medium text-sm ${step === stepItem.id ? "text-gray-800" : "text-gray-400"
                                    }`}
                            >
                                {stepItem.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div>{renderStepContent()}</div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    {step > 1 && (
                        <button
                            onClick={handlePrev}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-all"
                        >
                            Back
                        </button>
                    )}
                    {step < 5 ? (
                        <button
                            onClick={handleNext}
                            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-all"
                        >
                            Next
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default MultiStepForm;
