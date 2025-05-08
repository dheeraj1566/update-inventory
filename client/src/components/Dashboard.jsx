import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Instance from "../AxiosConfig";

function Dashboard() {
  const [role, setRole] = useState("");
  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await Instance.get("/auth/checkToken", {
        withCredentials: true,
      });
      setRole(res.data.role);
      console.log(res.data.role);
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  const getRoleHeading = () => {
    if (!role) return "Dashboard";
    return `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard`;
  };

  const getNavLinkClass = (path) =>
    `py-3 text-lg px-5 border-b border-black transition-all duration-200 ${
      location.pathname === path
        ? "bg-slate-100 text-blue-900 font-bold rounded-l-md shadow-md border-l-4 border-yellow-400"
        : "text-blue-50 hover:font-bold hover:bg-gray-50 hover:text-blue-900"
    }`;

  return (
    <div className="left_side bg-blue-950 text-amber-50 fixed z-1 w-1/6 h-full">
      <div className="dashboard">
        <h1 className="bg-blue-900 text-center font-bold text-3xl px-6 py-5">
          {getRoleHeading()}
        </h1>

        <ul>
          {/* Storeman Access */}
          {role === "storeman" && (
            <>
              <Link to="/inventory-table">
                <li className={getNavLinkClass("/inventory-table")}>
                  Inventory Table
                </li>
              </Link>
              {/* <Link to="/inventory">
                <li className={getNavLinkClass("/inventory")}>
                  Add Inventory
                </li>
              </Link> */}
               <Link to="/purchase">
                <li className={getNavLinkClass("/purchase")}>
                  Add Inventory
                </li>
              </Link>
              <Link to="/request-inventory-table">
                <li className={getNavLinkClass("/request-inventory-table")}>
                  View Request
                </li>
              </Link>
              <Link to="/issue-inventory-table">
                <li className={getNavLinkClass("/issue-inventory-table")}>
                  Issued Inventories
                </li>
              </Link>
              <Link to="/restock-inventory">
                <li className={getNavLinkClass("/restock-inventory")}>Restock Inventory</li>
              </Link>
              <Link to="/threshold">
                <li className={getNavLinkClass("/threshold")}>Threshold</li>
              </Link>
            </>
          )}

          {/* Admin Access */}
          {role === "admin" && (
            <>
              <Link to="/faculty-inventory-table">
                <li className={getNavLinkClass("/faculty-inventory-table")}>
                  Inventory Table
                </li>
              </Link>
              <Link to="/admin-request-table">
                <li className={getNavLinkClass("/admin-request-table")}>
                  View Requests
                </li>
              </Link>
              {/* <Link to="/threshold">
                <li className={getNavLinkClass("/threshold")}>Threshold</li>
              </Link> */}
            </>
          )}

          {/* Faculty Access */}
          {role === "faculty" && (
            <>
              <Link to="/faculty-inventory-table">
                <li className={getNavLinkClass("/faculty-inventory-table")}>
                  Inventory Table
                </li>
              </Link>
              <Link to="/faculty-request-Inventory-table">
                <li className={getNavLinkClass("/faculty-request-Inventory-table")}>
                  Request Inventory Table
                </li>
              </Link>
              <Link to="/faculty-view-request-table">
                <li className={getNavLinkClass("/faculty-view-request-table")}>
                  View Requests
                </li>
              </Link>
            </>
          )}
        </ul>

        {/* Common for All Roles */}
        <ul>
          <Link to="/summary">
            <li className={getNavLinkClass("/summary")}>Summary</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
