// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OorjaNameSvg from '../assets/oorja.svg';
import LoginDesignSvg from '../assets/loginDesignSvg.svg';
import LoginDesignSvg2 from '../assets/loginDesignSvg2.svg';
import LoginSvg from '../assets/loginSvg.svg';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null); // To handle errors
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Making a POST request to the API with username and password
      const response = await fetch('http://13.200.155.88:3000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });
      
      const data = await response.json(); // Parsing response data
      
      if (response.ok) {
        // Assuming the API returns a token or success status
        // Store token if needed
        localStorage.setItem('isAuthenticated', 'true');
        // Redirect the user to the home page or dashboard
        navigate('/');
      } else {
        // Handle invalid credentials or server error
        setError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      // Handle network errors or unexpected issues
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="h-screen bg-white relative login">
      <div className="bg-white rounded-[14px] shadow-extended-bottom px-8 py-6 w-full max-w-md text-center border absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img
          src={OorjaNameSvg} // Replace with your image path
          alt="Welcome"
          className="w-24 h-24 mx-auto mb-4"
        />
        <h2 className="text-[18px] mb-10 font-inter">
          Welcome to the place that <br /> makes everything work.
        </h2>
        <form onSubmit={handleSubmit} className="" noValidate>
          <div className="flex flex-col mb-5">
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              placeholder="Username"
              className="p-2 px-3 border border-custom-border rounded-md text-[14px]"
            />
          </div>
          <div className="flex flex-col mb-8">
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="p-2 px-3 border border-custom-border rounded-md text-[14px]"
            />
          </div>
          {/* Display error if there is any */}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit" className="mb-4 w-full bg-custom-black text-white py-2 rounded-md">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
