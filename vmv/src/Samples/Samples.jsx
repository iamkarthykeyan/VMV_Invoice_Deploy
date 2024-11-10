import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

const DownloadCard = () => {
  const downloads = [
    { type: 'PDF', bgImage: 'https://media.istockphoto.com/id/1298834280/vector/pdf-icon-major-file-format-vector-icon-illustration.jpg?s=612x612&w=0&k=20&c=uA4lg3z8Od32TGuT6zOhMkEVJqH2kCE-_OI8ybalmac=', downloadLink: '/path-to-your-pdf-file.pdf' },
    { type: 'Excel', bgImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFqy-evG5emBpFQ8T0gPJIN_U90oCsSKKlaw&s', downloadLink: '/path-to-your-excel-file.xlsx' },
    { type: 'CSV', bgImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWebj87ks4RxHI97zk6BLSs4ZaBCbxrxfhug&s', downloadLink: '/path-to-your-csv-file.csv' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      {downloads.map((file, index) => (
        <div
          key={index}
          className="relative flex items-center justify-center w-32 h-32 rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={file.bgImage}
            alt={`${file.type} background`}
            className="absolute inset-0 object-cover w-full h-full p-2"
          />
          <button
            onClick={() => window.open(file.downloadLink)}
            className="relative p-3 text-white bg-black bg-opacity-60 rounded-full hover:bg-opacity-80 transition"
            aria-label={`Download ${file.type}`}
          >
            <ArrowDownTrayIcon className="w-6 h-6" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default DownloadCard;
