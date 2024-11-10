import React, { useRef, useEffect, useState } from "react";
import html2pdf from 'html2pdf.js';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { gapi } from 'gapi-script';
import Loader from "../../Loader/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DownloadPdf = ({ rows, formData, themeColor }) => {

    const subtotal = rows.reduce((total, row) => total + parseFloat(row.value || 0), 0);

    const pdfRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [fileName, setFileName] = useState(`VMV_International_${formData.invoiceNumber}.pdf`);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [isSavingToDrive, setIsSavingToDrive] = useState(false);

    const CLIENT_ID = "361117863900-vaop2b92ac5bgf9ppo8fqf6pln968m40.apps.googleusercontent.com";
    const API_KEY = "AIzaSyDculBzBJ6lnGbLGi_l1-6URcz9An7rncM";
    const SCOPES = "https://www.googleapis.com/auth/drive.file";

    // Initialize GAPI
    const initializeGAPI = () => {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                scope: SCOPES,
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
            }).then(() => {
                gapi.auth2.getAuthInstance().signIn();
            });
        });
    };

    useEffect(() => {
        initializeGAPI();
    }, []);

    const saveBuyerInfo = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/saveInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    buyerCompanyName: formData.buyerCompany,
                    invoiceNumber: formData.invoiceNumber,
                    date: new Date().getDate().toString(),
                    month: (new Date().getMonth() + 1).toString(),
                    year: new Date().getFullYear().toString(),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save information');
            }
            console.log("Buyer information saved to MongoDB");
        } catch (error) {
            console.error('Error saving buyer information:', error);
        }
    };

    // Generate PDF
    const generatePDF = () => {
        setIsGeneratingPDF(true);
        saveBuyerInfo();
        const options = {
            margin: 0,
            filename: `VMV_International_${formData.invoiceNumber}`,
            image: { type: "jpeg", quality: 1 },
            html2canvas: { scale: 10, logging: true, dpi: 1200 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };

        html2pdf()
            .from(pdfRef.current)
            .set(options)
            .outputPdf('blob')
            .then(pdfBlob => {
                setIsGeneratingPDF(false);
                setShowModal(true);
                const url = URL.createObjectURL(pdfBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `VMV_International_${formData.invoiceNumber}.pdf`;
                a.click();

                // Release the URL after download
                URL.revokeObjectURL(url);
            })
            .catch(() => {
                setIsGeneratingPDF(false);
                toast.error("Error generating PDF");
            });
    };

    // Save PDF Blob to Google Drive
    const saveToGoogleDrive = (pdfBlob) => {
        setIsSavingToDrive(true);
        const accessToken = gapi.auth.getToken().access_token;

        const fileMetadata = {
            name: fileName,
            mimeType: 'application/pdf',
        };

        const formData = new FormData();
        formData.append('metadata', new Blob([JSON.stringify(fileMetadata)], { type: 'application/json' }));
        formData.append('file', pdfBlob);

        fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: formData,
        }).then(response => {
            setIsSavingToDrive(false);
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        }).then(data => {
            console.log('PDF saved to Google Drive with ID:', data.id);
            toast.success('PDF saved to Google Drive successfully!');
        }).catch(error => {
            setIsSavingToDrive(false);
            console.error('Error saving to Google Drive:', error);
            toast.error('Error saving PDF to Google Drive.');
        });
    };

    // Handle Save to Drive button click
    const handleSaveToDrive = () => {
        setIsSavingToDrive(true);
        html2pdf()
            .from(pdfRef.current)
            .set({
                filename: fileName,
                image: { type: "jpeg", quality: 1 },
                html2canvas: { scale: 10, logging: true, dpi: 1200 },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
            })
            .outputPdf('blob')
            .then(pdfBlob => {
                saveToGoogleDrive(pdfBlob);
                setShowModal(false); // Close modal after save
            })
            .catch(() => {
                setIsSavingToDrive(false);
                toast.error("Error generating PDF for saving");
            });
    };

    return (
        <>
            <ToastContainer />
            {/* Button to Download PDF */}
            <div className="relative flex items-center justify-center w-56 h-56 overflow-hidden">
                <img
                    src="https://media.istockphoto.com/id/1298834280/vector/pdf-icon-major-file-format-vector-icon-illustration.jpg?s=612x612&w=0&k=20&c=uA4lg3z8Od32TGuT6zOhMkEVJqH2kCE-_OI8ybalmac="
                    alt="PDF background"
                    className="absolute p-5"
                />
                <button
                    onClick={generatePDF}
                    className="relative p-3 text-white bg-gray-900 bg-opacity-60 rounded-full hover:bg-opacity-80 transition"
                    aria-label="Download PDF"
                    disabled={isGeneratingPDF}
                >
                    {isGeneratingPDF ? <Loader /> : <ArrowDownTrayIcon className="w-6 h-6" />}
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg transform transition-all duration-300 scale-100">
                        <h2 className="text-xl font-semibold mb-4 text-center">Save PDF to Google Drive?</h2>
                        <input
                            type="text"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded mb-4"
                            placeholder="Enter file name"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleSaveToDrive}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                disabled={isSavingToDrive}
                            >
                                {isSavingToDrive ? <Loader /> : "Save to Drive"}
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Hidden PDF Content */}
            <div className="hidden">
                <div ref={pdfRef} className="min-h-screen bg-white flex items-center justify-center p-10">
                    <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full">
                        <div className="flex items-start mb-6 text-gray-600 justify-around">
                            <a href="#" className="text-sm">GST No: {formData.gstNumber}</a>
                            <a href="#" className="text-sm">Email: {formData.yourEmail}</a>
                            <a href="#" className="text-sm">Mobile: {formData.yourNumber}</a>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
                            {/* Left Section */}
                            <div className={`bg-${themeColor}-500 text-white p-6 rounded-xl relative flex flex-col justify-between`}>
                                <div>
                                    <h2 className="text-5xl font-bold">VMV</h2>
                                    <h2 className="text-3xl font-bold">International</h2>
                                    <h2 className="text-3xl font-bold">Invoice.</h2>
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                    <div>
                                        <span className="text-md">Invoice Date:</span>
                                        <p className="text-lg font-semibold">{formData.date}</p>
                                    </div>
                                    <div className="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
                                        <p className="text-2xl mb-6">➜</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Section */}
                            <div className={`border-2 border-${themeColor}-500 p-6 rounded-xl flex flex-col justify-between`}>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Invoice To :</h3>
                                    <p className="mt-2 text-gray-600">{formData.buyerCompany},</p>
                                    <p className="text-gray-600">
                                        {formData.buyerAddress}, <br />
                                        {formData.kindAttention}
                                    </p>
                                </div>
                                <div className="mt-6">
                                    <span className="text-md text-gray-600">Invoice Code :</span>
                                    <p className="text-lg font-semibold">{formData.invoiceNumber}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white mt-5 max-w-6xl w-full">
                            {/* Table Header */}
                            <div className="mb-5">
                                <div className="grid grid-cols-5 text-gray-700 font-semibold text-lg">
                                    <div className="text-center">Description</div>
                                    <div className="text-center">HSN No</div>
                                    <div className="text-center">Qty</div>
                                    <div className="text-center">Nos Rate</div>
                                    <div className="text-center">Value</div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {rows.map((row, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-5 items-center bg-gray-100 p-3 rounded-lg gap-6"
                                    >
                                        <div className="text-center mb-3">{row.description}</div>
                                        <div className="text-center mb-3">{row.hsnNo}</div>
                                        <div className="text-center mb-3">{row.quantity}</div>
                                        <div className="text-center mb-3">{row.nosRate}</div>
                                        <div className="text-center mb-3">{row.value}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="max-w-4xl mx-0 my-10">
                                <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
                                    <div></div>
                                    {/* Right: Total and Name */}
                                    <div className="relative bg-white">
                                        <div className={`bg-${themeColor}-500 text-white py-6 px-8 rounded-t-xl`}>
                                            <div className="space-y-4">
                                                <div className="flex justify-between text-lg">
                                                    <span className="font-semibold">Sub Total</span>
                                                    <span>${subtotal.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between text-lg">
                                                    <span className="font-semibold">Tax (5%)</span>
                                                    <span>$20.00</span>
                                                </div>
                                                <div className={`border-t-2 border-${themeColor}-400`}></div>
                                                <div className="flex justify-between text-xl font-bold">
                                                    <span>TOTAL</span>
                                                    <span>$800.00</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-8 py-6">
                                            <p className="font-bold text-gray-800 text-lg">Your Manager Name</p>
                                            <p className="text-gray-500 text-sm">General Manager</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default DownloadPdf;
