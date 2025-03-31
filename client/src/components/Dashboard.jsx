import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="left_side bg-blue-950 text-amber-50 w-1/6 h-full">
      <div className="dashboard">
        <h1 className="bg-blue-900 text-center font-bold text-3xl px-6 py-5">Dashboard</h1>
        <ul>
          <Link to="/inventory-table">
            <li className="py-3 text-lg hover:font-bold text-blue-50 px-5 border-black border-b-1 hover:bg-gray-50 hover:text-blue-900">
              Inventory Table
            </li>
          </Link>
          <Link to="/add-inventory">
            <li className="py-3 text-lg hover:font-bold hover:bg-gray-50 hover:text-blue-900 text-blue-50 px-5 border-black border-b-1">
              Add Inventory
            </li>
          </Link>
          {/* <Link to="/change-inventory">
            <li className="py-3 text-lg hover:font-bold text-blue-50 px-5 hover:bg-gray-50 hover:text-blue-900 border-black border-b-1">
              Change Inventory
            </li>
          </Link> */}
          <Link to="/issue-inventory">
            <li className="py-3 text-lg hover:font-bold text-blue-50 px-5 hover:bg-gray-50 hover:text-blue-900 border-black border-b-1">
              Issued Inventory
            </li>
          </Link>
          <Link to="/request">
            <li className="py-3 text-lg hover:font-bold hover:bg-gray-50 hover:text-blue-900 text-blue-50 px-5 border-black border-b-1">
              Request
            </li>
          </Link>
          <Link to="/return">
            <li className="py-3 text-lg hover:font-bold hover:bg-gray-50 hover:text-blue-900 text-blue-50 px-5 border-black border-b-1">
              Return
            </li>
          </Link>
        </ul>

        <ul>
          <Link to="/summary">
            <li className="py-3 text-lg hover:font-bold hover:bg-gray-50 hover:text-blue-900 text-blue-50 px-5 border-black border-b-1">
              Summary
            </li>
          </Link>
          <Link to="/report">
            <li className="py-3 text-lg hover:font-bold hover:bg-gray-50 hover:text-blue-900 text-blue-50 px-5 border-black border-b-1">
              Report
            </li>
          </Link>
          <Link to="/threshold">
            <li className="py-3 text-lg hover:font-bold hover:bg-gray-50 hover:text-blue-900 text-blue-50 px-5 border-black border-b-1">
              Threshold
            </li>
          </Link>
          <li className="py-3 text-lg hover:font-bold hover:bg-gray-50 hover:text-blue-900 text-blue-50 px-5 my-3 border-black border-b-1"></li>
        </ul>

        <Link to="/login">
          <p className="py-3 px-5">Back to login</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
