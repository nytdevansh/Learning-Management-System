import React from 'react'
import Sidebart from '../Components/Sidebar/Sidebart'
import Header from '../Components/Header/Header'
import { Outlet, Route, Routes } from 'react-router-dom'
import Random from '../Components/Random'

const AdminDashboard = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      
  
      <div className="w-64 h-full overflow-y-auto bg-gray-100">
        <Sidebart />
      </div>

   
      <div className="flex-1 flex flex-col h-full">
        
  
        <div className="h-16 shrink-0 bg-white shadow">
          <Header />
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
};


export default AdminDashboard