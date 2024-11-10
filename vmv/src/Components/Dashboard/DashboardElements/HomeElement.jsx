import React from 'react';

const CardComponent = () => {
  return (
    // Create Invoice :
<div className="flex flex-col bg-black rounded-3xl w-64 sm:w-72 md:w-80 lg:w-96">
  <div className="px-4 py-6 sm:px-6 sm:py-8 md:p-10">
    <div className="grid items-start justify-start w-full grid-cols-1 text-left">
      <div>
        <h2 className="font-medium tracking-tighter text-white text-5xl lg:text-4xl">
          Create Invoice 📄
        </h2>
        <p className="mt-4 sm:mt-8 text-sm text-gray-100">Download as :</p>
      </div>
      <div className="mt-2">
        <p>
          <span className="text-2xl sm:text-3xl font-light tracking-tight text-white">
            PDF, EXCEL & CSV
          </span>
        </p>
      </div>
    </div>
  </div>
  <div className="flex px-4 sm:px-6 pb-6 sm:pb-8">
    <a
      aria-describedby="tier-starter"
      className="w-full px-4 py-2 text-center text-black bg-white border-2 border-white rounded-full inline-flex justify-center items-center duration-200 hover:bg-transparent hover:text-white focus:outline-none focus-visible:ring-white text-sm"
      href="/form"
    >
      Get Started
    </a>
  </div>
</div>

  );
};

export default CardComponent;
