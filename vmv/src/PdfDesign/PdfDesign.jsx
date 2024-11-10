import React from "react";

const PdfDesign = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="flex justify-evenly items-center mb-6">
          <div className="text-gray-600">
            <div className="flex items-center space-x-11">
              <a href="#" className="text-sm">www.yourcompany.com</a>
              <span className="text-sm">+998 224 662 24</span>
              <a href="mailto:mail@company.com" className="text-sm">mail@company.com</a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Left Section */}
          <div className="bg-black text-white p-6 rounded-xl relative flex flex-col justify-between">
            <div>
              <h2 className="text-5xl font-bold">VMV</h2>
              <h2 className="text-3xl font-bold">International</h2>
              <h2 className="text-3xl font-bold">Invoice.</h2>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div>
                <span className="text-md">Invoice Date:</span>
                <p className="text-lg font-semibold">October 21, 2024</p>
              </div>
              <div className="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
                <p className="text-2xl">➜</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="border-2 border-black p-6 rounded-xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Invoice To :</h3>
              <p className="mt-2 text-gray-600">Buyer Company,</p>
              <p className="text-gray-600">
                Buyer Address, <br />
                Buyer Address
              </p>
            </div>
            <div className="mt-6">
              <span className="text-md text-gray-600">Invoice Code :</span>
              <p className="text-lg font-semibold">Invoice Number</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 max-w-6xl w-full">
          {/* Table Header */}
          <div className="mb-4">
            <div className="grid grid-cols-5 gap-4 text-gray-700 font-semibold text-lg">
              <div className="text-center">Description</div>
              <div className="text-center">HSN No</div>
              <div className="text-center">Qty</div>
              <div className="text-center">Nos Rate</div>
              <div className="text-center">Value</div>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3">
            {[
              { description: "Branding Strategy", hsnno: 123454544, qty: 2, nosrate: 100, value: 200 },
              { description: "Logo Design", hsnno: 123454544, qty: 2, nosrate: 100, value: 200 },
              { description: "Website Design", hsnno: 123454544, qty: 2, nosrate: 100, value: 200 },
              { description: "Brand Marketing", hsnno: 123454544, qty: 2, nosrate: 100, value: 200 },
            ].map((item, idx) => (
              <div key={idx} className="grid grid-cols-5 gap-4 items-center bg-gray-100 p-3 rounded-lg">
                <div className="text-center">{item.description}</div>
                <div className="text-center">{item.hsnno}</div>
                <div className="text-center">{item.qty}</div>
                <div className="text-center">${item.nosrate.toFixed(2)}</div>
                <div className="text-center">${item.value.toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-0 my-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: Payment Details */}
              <div className="bg-gray-100 p-6 rounded-lg relative">
                {/* QR Code */}
                <div className="absolute top-5 right-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                    alt="QR Code"
                    className="w-20 h-20"
                  />
                </div>
                <div className="text-gray-700 space-y-4">
                  <p className="font-semibold text-lg">Payment Details:</p>
                  <p>Mobile: +1-124-521-6215</p>
                  <p>GPay UPI ID: mail@yourcompany.com</p>
                  <p>PayPal: mail@yourcompany.com</p>
                </div>
                <div className="mt-6 text-gray-500 text-sm leading-relaxed text-justify">
                  <p>
                  Trust our secure payment methods for fast transactions. We use encryption for safety, with 24/7 support available, Our customer support is available 24/7 to assist you...
</p>
                </div>
              </div>

              {/* Right: Total and Name */}
              <div className="relative bg-white p-0">
                <div className="bg-black text-white py-6 px-8 rounded-t-xl">
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Sub Total</span>
                      <span>$800.00</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Tax (5%)</span>
                      <span>$20.00</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Discount (7%)</span>
                      <span>-$20.00</span>
                    </div>
                    <div className="border-t-2 border-gray-500 mt-4"></div>
                    <div className="flex justify-between text-xl font-bold mt-4">
                      <span>TOTAL</span>
                      <span>$800.00</span>
                    </div>
                  </div>
                </div>
                {/* Yellow Divider */}
                <div className="h-2 bg-gray-500"></div>
                {/* Name Section */}
                <div className="px-8 py-6">
                  <p className="font-bold text-gray-800 text-lg">Nico Ernando Hidayat</p>
                  <p className="text-gray-500 text-sm">General Manager</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PdfDesign;
