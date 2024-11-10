import React, { useState } from 'react';

const PriceAndProducts = ({ rows, setRows }) => {
    const [description, setDescription] = useState('');
    const [hsnNo, setHsnNo] = useState('');
    const [quantity, setQuantity] = useState('');
    const [nosRate, setNosRate] = useState('');
    const [editIndex, setEditIndex] = useState(null); // New state for editing
    const [showConfirmation, setShowConfirmation] = useState(false); // State for popup confirmation

    const handleAddRow = () => {
        if (description && hsnNo && quantity && nosRate) {
            const newRow = {
                sno: editIndex !== null ? rows[editIndex].sno : rows.length + 1, // Preserve Sno on edit
                description,
                hsnNo,
                quantity: parseInt(quantity, 10),
                nosRate: parseFloat(nosRate),
                value: parseInt(quantity, 10) * parseFloat(nosRate),
            };
            if (editIndex !== null) {
                const updatedRows = [...rows];
                updatedRows[editIndex] = newRow;
                setRows(updatedRows);
                setEditIndex(null); // Reset after updating
            } else {
                // Add new row
                setRows([...rows, newRow]);
            }

            setDescription('');
            setHsnNo('');
            setQuantity('');
            setNosRate('');
        }
    };

    const handleEdit = (index) => {
        // Populate input fields with row data for editing
        const rowToEdit = rows[index];
        setDescription(rowToEdit.description);
        setHsnNo(rowToEdit.hsnNo);
        setQuantity(rowToEdit.quantity.toString());
        setNosRate(rowToEdit.nosRate.toString());
        setEditIndex(index); // Set the edit index
    };

    const handleDelete = (index) => {
        // Remove row from the list
        const updatedRows = rows.filter((_, i) => i !== index);
        // Renumber the Sno dynamically based on the new array position
        const renumberedRows = updatedRows.map((row, i) => ({
            ...row,
            sno: i + 1 // Renumber Sno starting from 1
        }));
        setRows(renumberedRows);
    };

    const handleClearData = () => {
        setShowConfirmation(true); // Show confirmation dialog
    };

    const confirmClearData = () => {
        // Clear all rows and close the confirmation dialog
        setRows([]);
        setShowConfirmation(false);
    };

    const cancelClearData = () => {
        // Close the confirmation dialog without clearing data
        setShowConfirmation(false);
    };

    return (
        <div className="p-4">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Price and Products</h3>
            <div >
                <label htmlFor="description" className="block text-gray-700 mb-1">Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter Description"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                />
            </div>
            <div >
                <label htmlFor="hsnno" className="block text-gray-700 mb-1">HSN No</label>
                <input
                    type="text"
                    value={hsnNo}
                    onChange={(e) => setHsnNo(e.target.value)}
                    placeholder="Enter HSN No."
                    className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                />
            </div>
            <div >
                <label htmlFor="quantity" className="block text-gray-700 mb-1">Quantity</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter Quantity"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                />
            </div>
            <div >
                <label htmlFor="nosrate" className="block text-gray-700 mb-1">No's Rate</label>
                <input
                    type="number"
                    value={nosRate}
                    onChange={(e) => setNosRate(e.target.value)}
                    placeholder="Enter No's Rate"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                />
            </div>
            <button
                onClick={handleAddRow}
                className="mt-4 bg-gradient-to-r from-green-500 to-lime-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-lime-700 transition-all duration-300 focus:outline-none font-semibold w-full flex items-center justify-center transform"
            >
                {editIndex !== null ? 'Update Product' : 'Add Product to the Table'} <p className="ml-2 text-2xl">→</p>
            </button>

            {/* Table to display added rows */}
            <div className="mt-6 overflow-x-auto">
                <table className="min-w-full bg-white border-collapse">
                    <thead className="bg-black text-white rounded-t-lg">
                        <tr className="text-left">
                            <th className="p-3 font-semibold text-center">Sno</th>
                            <th className="p-3 font-semibold text-center">Description</th>
                            <th className="p-3 font-semibold text-center">HSN No.</th>
                            <th className="p-3 font-semibold text-center">Qty</th>
                            <th className="p-3 font-semibold text-center">No's Rate</th>
                            <th className="p-3 font-semibold text-center">Value</th>
                            <th className="p-3 font-semibold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index} className="bg-white">
                                <td className="border-2 p-3 text-black text-center">{row.sno}</td>
                                <td className="border-2 p-3 text-black text-center">{row.description}</td>
                                <td className="border-2 p-3 text-black text-center">{row.hsnNo}</td>
                                <td className="border-2 p-3 text-black text-center">{row.quantity}</td>
                                <td className="border-2 p-3 text-black text-center">{row.nosRate}</td>
                                <td className="border-2 p-3 text-black text-center">{row.value}</td>
                                <td className="border-2 p-3 text-black text-center">
                                    <button
                                        onClick={() => handleEdit(index)}
                                        className="text-black py-2 px-4 rounded-full"
                                    >
                                        <i className="fas fa-pencil-alt text-xl"></i>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="text-red-500 py-2 px-4 rounded-full"
                                    >
                                        <i className="fas fa-trash text-xl"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Clear Data Button */}
            <button
                onClick={handleClearData}
                className="mt-6 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 focus:outline-none font-semibold w-full flex items-center justify-center"
            >
                Clear All Data <i className="fas fa-trash text-lg ml-3"></i>
            </button>

            {/* Confirmation Dialog */}
            {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-lg">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to clear all data?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={confirmClearData}
                                className="bg-red-600 text-white py-2 px-4 rounded-lg mr-4"
                            >
                                Confirm!
                            </button>
                            <button
                                onClick={cancelClearData}
                                className="bg-gray-300 text-black py-2 px-4 rounded-lg"
                            >
                                Not Sure?
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PriceAndProducts;
