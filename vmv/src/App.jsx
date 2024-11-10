import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PreLoader from './Components/PreLoader/PreLoader';
import Navbar from './Components/Navbar/Navbar';
import MainPage from './Components/MainPage/MainPage';
import Dashboard from './Components/Dashboard/Dashboard';
import MultiStepForm from './Pages/MultiStepForm/MultiStepForm';
import PdfDesign from './PdfDesign/PdfDesign';
import Samples from './Samples/Samples'
import SigninForm from './Components/Authentication/SigninForm';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false); 
  }, []);

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); 
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); 
  };

  return (
    <Router>
      <div>
        {loading ? (
          <PreLoader onComplete={handlePreloaderComplete} />
        ) : (
          <>
            <Navbar onLogout={handleLogout} />
            <Routes>
              <Route path="/" element={isAuthenticated ? <MainPage /> : <Navigate to="/signin" />} />
              <Route path="/signin" element={isAuthenticated ? <Navigate to="/" /> : <SigninForm onLogin={handleLogin} />} />
              <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />} />
              <Route path="/form" element={isAuthenticated ? <MultiStepForm /> : <Navigate to="/signin" />} />
              <Route path="/design" element={isAuthenticated ? <PdfDesign /> : <Navigate to="/signin" />} />
              <Route path="/samples" element={isAuthenticated ? <Samples /> : <Navigate to="/signin" />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
