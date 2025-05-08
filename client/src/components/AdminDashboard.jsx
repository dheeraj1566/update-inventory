import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="left_side bg-blue-950 text-amber-50 fixed z-1 w-1/6 h-full">
      <div className="dashboard">
        <h1 className="bg-blue-900 text-center font-bold text-3xl px-6 py-5"> Admin Dashboard</h1>
        <ul>


        <Link to="/admin-request-table">
            <li className="py-3 text-lg hover:font-bold hover:bg-gray-50 hover:text-blue-900 text-blue-50 px-5 border-black border-b-1">
              Request Inventory 
            </li>
          </Link>
          
                

          <Link to="">
            <li className="py-3 text-lg hover:font-bold text-blue-50 px-5 border-black border-b-1 hover:bg-gray-50 hover:text-blue-900">
              Purchase Order Request
            </li>
          </Link>

          <Link to="/report">
            <li className="py-3 text-lg hover:font-bold text-blue-50 px-5 border-black border-b-1 hover:bg-gray-50 hover:text-blue-900">
              Report
            </li>
          </Link>
          
          <Link to="/admin-notifications">
            <li className="py-3 text-lg hover:font-bold hover:bg-gray-50 hover:text-blue-900 text-blue-50 px-5 border-black border-b-1">
              Notification
            </li>
          </Link>
        
        </ul>

      </div>
    </div>
  );
}

export default FacultyDashboard;
