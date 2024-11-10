// DownloadCsv Component
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { CSVLink } from 'react-csv';

const DownloadCsv = ({ rows, formData }) => {
  const formattedRows = rows.map((row, index) => ({
    "S.No": index + 1,
    Description: row.description,
    "HSN No": row.hsnNo,
    Quantity: row.quantity,
    "Rate (Nos)": row.nosRate,
    Value: row.value,
  }));

  const headerData = [
    [`Date: ${formData.date}`],
    [`GST No: ${formData.gstNumber}`],
    [`Invoice Number: ${formData.invoiceNumber}`],
    [`Buyer Company: ${formData.buyerCompany}`],
    [`Buyer Address: ${formData.buyerAddress}`],
    [],
    ["S.No", "Description", "HSN No", "Quantity", "Rate (Nos)", "Value"],
  ];

  const csvData = [...headerData, ...formattedRows.map(Object.values)];

  return (
    <CSVLink data={csvData} filename={`Invoice_${formData.invoiceNumber}.csv`}>
      <div className="relative flex items-center justify-center w-56 h-56 overflow-hidden">
        <img
          src="https://static-00.iconduck.com/assets.00/csv-icon-1791x2048-ot22nr8i.png"
          alt="Excel background"
          className="absolute p-5"
        />
        <button
          className="relative p-3 text-white bg-black bg-opacity-60 rounded-full hover:bg-opacity-80 transition"
          aria-label="Download CSV"
        >
          <ArrowDownTrayIcon className="w-6 h-6" />
        </button>
      </div>
    </CSVLink>
  );
};

export default DownloadCsv;
