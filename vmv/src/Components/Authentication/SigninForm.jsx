import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SigninForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 
  const location = useLocation(); 

  const validateForm = () => {
    let formErrors = {};

    if (!username.trim()) {
      formErrors.username = 'Username is required';
    } else if (username !== 'VMV') {
      formErrors.username = 'Username must be required';
    }

    if (!password) {
      formErrors.password = 'Password is required';
    } else if (password !== 'VMV') {
      formErrors.password = 'Password must be required';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onLogin(); // Call the onLogin function passed as a prop to update the authenticated state
        const from = location.state?.from?.pathname || '/'; // Get the last attempted path or default to home page
        navigate(from); // Navigate to the original route after login
      }, 2000); // Simulate network delay
    }
  };

  return (
    <div className="flex justify-center items-center mt-6 bg-white px-4 sm:px-0">
      <div className="bg-black p-8 rounded-md shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-semibold mb-6 text-white">Sign In</h1>
        <p className="text-gray-300 mb-6">
          Welcome back! Please sign in to your VMV account and access your Pdf, Excel, and CSV Contents!
        </p>

        <form onSubmit={handleSubmit}>
          {/* Username input field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-2 border ${errors.username ? 'border-red-500' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-white`}
              placeholder="Enter your username"
            />
            {errors.username && <p className="text-red-500 text-sm mt-2">{errors.username}</p>}
          </div>

          {/* Password input field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-white`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className={`w-full mt-10 py-2 px-4 bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition flex justify-center items-center ${loading && 'cursor-not-allowed'}`}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner border-t-transparent border-solid border-4 border-black rounded-full w-6 h-6 animate-spin"></div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Usernames and passwords are securely provided by the administrator. If you've forgotten your credentials, please contact support for verification. <a href="#" className="text-white hover:underline">Verify You?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
