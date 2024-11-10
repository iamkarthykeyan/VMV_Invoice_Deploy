import React, { useState } from 'react';

const Navbar = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="py-6 px-8 border-b border-gray-200">
      <div className="flex justify-between items-center w-full md:flex-row flex-col md:space-y-0 space-y-4">

        <div className="hidden md:flex items-center gap-4 md:order-none order-2">
          <a href="#" className="text-gray-600 hover:text-black transition duration-300"><i className="fab fa-instagram"></i></a>
          <a href="#" className="text-gray-600 hover:text-black transition duration-300"><i className="fab fa-linkedin-in"></i></a>
        </div>

        <div className="text-2xl font-semibold md:order-none order-1 md:mb-0 mb-4 text-center">
          <a href="#" className="flex items-center gap-2 justify-center">
            <i className="fa-solid fa-gear"></i>VMV International
          </a>
        </div>

        <div className="hidden md:flex items-center gap-5 md:order-none order-3">
          <a href="#" onClick={onLogout} className="text-gray-600 hover:text-black"><i className="fa-solid fa-right-from-bracket"></i></a>
          <a href="#" className="text-gray-600 hover:text-black"><i className="fa-solid fa-clock-rotate-left"></i></a>
        </div>
      </div>

      <div className="md:hidden flex justify-between items-center mt-4">
        <span className="text-gray-600 text-lg">Menu</span>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 hover:text-black">
          {menuOpen ? (
            <i className="fas fa-times text-2xl"></i>
          ) : (
            <i className="fas fa-bars text-2xl"></i>
          )}
        </button>
      </div>

      <nav
        className={`md:flex items-center gap-6 mt-4 ${menuOpen ? 'flex flex-col items-center' : 'hidden'} md:justify-center bg-white md:bg-transparent`}
      >
        <a href="/" className="text-gray-600 hover:text-black py-2 transition duration-300 mt-2">HOME</a>
        <a href="/dashboard" className="text-gray-600 hover:text-black py-2 transition duration-300 mt-2">DASHBOARD</a>
        <a href="/signin" className="text-gray-600 hover:text-black py-2 transition duration-300 mt-2">SIGN IN</a>
        <a href="/" onClick={onLogout} className="text-gray-600 hover:text-black py-2 transition duration-300 mt-2">LOGOUT</a>
      </nav>

    </header>
  );
}

export default Navbar;  
