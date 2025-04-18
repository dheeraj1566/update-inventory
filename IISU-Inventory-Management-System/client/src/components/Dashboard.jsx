import React from 'react';
import { Link } from 'react-router-dom';
import Instance from "../AxiosConfig";
import { useEffect, useState } from "react";
function Dashboard() {
  const [role, setRole] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const res = await Instance.get("/auth/user");
      setRole(res.data);
      console.log(res.data.role);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  return (



    
    <div className="left_side bg-blue-950 text-amber-50 fixed z-1 w-1/6 h-full">
      <div className="dashboard">
        <h1 className="bg-blue-900 text-center font-bold text-3xl px-6 py-5">Dashboard</h1>
        <ul>
          <Link to="/inventory-table">
            <li className="py-3 text-lg hover:font-bold text-blue-50 px-5 border-black border-b-1 hover:bg-gray-50 hover:text-blue-900">
              Inventory Table
            </li>
          </Link>
          {/* {/* <Link to="/add-inventory">
            <li className="py-3 text-lg hover:font-bold hover:bg-gray-50 hover:text-blue-900 text-blue-50 px-5 border-black border-b-1">
              Add New Inventory
            </li> 
          </Link> */}


            <Link to="/add-inventory">
            <li className="py-3 text-lg hover:font-bold hover:bg-gray-50 hover:text-blue-900 text-blue-50 px-5 border-black border-b-1">
              Add Inventory
            </li> 
          </Link> 
          {/* <Link to="/restock-inventory">
            <li className="py-3 text-lg hover:font-bold hover:bg-gray-50 hover:text-blue-900 text-blue-50 px-5 border-black border-b-1">
              Restock Inventory
            </li>
          </Link> */}
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
          <Link to="/issue-inventory-table">
            <li className="py-3 text-lg hover:font-bold text-blue-50 px-5 hover:bg-gray-50 hover:text-blue-900 border-black border-b-1">
              Issued Inventory Table
            </li>
          </Link>
          {/* <Link to="/request-inventory-table">
            <li className="py-3 text-lg hover:font-bold hover:bg-gray-50 hover:text-blue-900 text-blue-50 px-5 border-black border-b-1">
              Request
            </li>
          </Link>
          <Link to="/return-inventory">
            <li className="py-3 text-lg hover:font-bold hover:bg-gray-50 hover:text-blue-900 text-blue-50 px-5 border-black border-b-1">
              Return
            </li>
          </Link> */}
        </ul>

        <ul>
          {/* <Link to="/summary">
            <li className="py-3 text-lg hover:font-bold hover:bg-gray-50 hover:text-blue-900 text-blue-50 px-5 border-black border-b-1">
              Summary
            </li>
          </Link> */}
          {/* <Link to="/report">
            <li className="py-3 text-lg hover:font-bold hover:bg-gray-50 hover:text-blue-900 text-blue-50 px-5 border-black border-b-1">
              Report
            </li>
          </Link> */}
          <Link to="/threshold">
            <li className="py-3 text-lg hover:font-bold hover:bg-gray-50 hover:text-blue-900 text-blue-50 px-5 border-black border-b-1">
              Threshold
            </li>
          </Link>
        
        </ul>
{/* 
        <Link to="/login">
          <p className="py-3 px-5">Back to login</p>
        </Link> */}
      </div>
    </div>
  );
}

export default Dashboard;
