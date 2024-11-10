import * as XLSX from "xlsx";
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';


const DownloadExcel = ({ rows, formData }) => {
  const handleDownload = () => {
    // Prepare the data for the Excel file
    const formattedRows = rows.map((row, index) => [
      index + 1,             // S.No
      row.description,       // Description
      row.hsnNo,             // HSN No
      row.quantity,          // Quantity
      row.nosRate,           // Rate (Nos)
      row.value              // Value
    ]);

    // Add header data
    const headerData = [
      [`Date: ${formData.date}`],
      [`GST No: ${formData.gstNumber}`],
      [`Invoice Number: ${formData.invoiceNumber}`],
      [`Buyer Company: ${formData.buyerCompany}`],
      [`Buyer Address: ${formData.buyerAddress}`],
      [],
      ["S.No", "Description", "HSN No", "Quantity", "Rate (Nos)", "Value"]
    ];

    // Combine the header and formatted row data
    const worksheetData = [...headerData, ...formattedRows];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invoice Data");

    // Write the Excel file
    XLSX.writeFile(workbook, `VMV_International_${formData.invoiceNumber}.xlsx`);
  };

  return (
    <div className="relative flex items-center justify-center w-64 h-64 overflow-hidden">
    <img
        src="https://ik.imagekit.io/rxdxtxpigt/React-Invoice/Microsoft_Excel-Logo.wine.jpg?updatedAt=1729924531066"
        alt="Excel background"
        className="absolute p-5"
    />
    <button
        onClick={handleDownload}
        className="relative p-3 text-white bg-black bg-opacity-60 rounded-full hover:bg-opacity-80 transition"
        aria-label="Download Excel"
    >
        <ArrowDownTrayIcon className="w-6 h-6" />
    </button>
</div>

  );
};

export default DownloadExcel;
