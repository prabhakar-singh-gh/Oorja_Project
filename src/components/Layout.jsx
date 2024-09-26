import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import your Sidebar component

const Layout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar className="w-[333px] h-screen bg-white shadow-[0px_0px_16px_0px_rgba(0,0,0,0.03)] border border-white p-6" />

      {/* Main Content Area */}
      <main className="flex-grow  bg-gray-100">
  
        <Outlet /> {/* This renders the current route's component */}
      </main>
    </div>
  );
};

export default Layout;
