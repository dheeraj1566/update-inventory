import React from 'react';
import { Link } from 'react-router-dom';

function FacultyDashboard() {
  return (
    <div className="left_side bg-blue-950 text-amber-50 fixed z-1 w-1/6 h-full">
      <div className="dashboard">
        <h1 className="bg-blue-900 text-center font-bold text-3xl px-6 py-5"> Faculty Dashboard</h1>
        <ul>


        <Link to="/faculty-request-inventory-table">
            <li className="py-3 text-lg hover:font-bold hover:bg-gray-50 hover:text-blue-900 text-blue-50 px-5 border-black border-b-1">
              Request Inventory Table
            </li>
          </Link>


          
        <Link to="/faculty-request-inventory">
            <li className="py-3 text-lg hover:font-bold hover:bg-gray-50 hover:text-blue-900 text-blue-50 px-5 border-black border-b-1">
              Request Inventory Form
            </li>
          </Link> 
          {/* <Link to="/faculty-return-inventory">
            <li className="py-3 text-lg hover:font-bold hover:bg-gray-50 hover:text-blue-900 text-blue-50 px-5 border-black border-b-1">
              Return Inventory
            </li>
          </Link> */}
                    <Link to="/faculty-view-request-table">
            <li className="py-3 text-lg hover:font-bold text-blue-50 px-5 border-black border-b-1 hover:bg-gray-50 hover:text-blue-900">
              View Requests
            </li>
          </Link>

          <Link to="/faculty-issue-inventory-table">
            <li className="py-3 text-lg hover:font-bold text-blue-50 px-5 border-black border-b-1 hover:bg-gray-50 hover:text-blue-900">
              Issued Inventory Table
            </li>
          </Link>
          
          <Link to="/faculty-notification">
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
