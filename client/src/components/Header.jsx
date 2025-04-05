import React, { useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Instance from "../AxiosConfig";

function Header() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [lowStockCount, setLowStockCount] = useState(0);

  useEffect(() => {
    // Fetch inventory and count items below threshold
    Instance.get("/add/getTable")
      .then((res) => {
        const count = res.data.reduce((total, category) => {
          const lowStockItems = category.items.filter(item => item.qty < item.threshold);
          return total + lowStockItems.length;
        }, 0);
        setLowStockCount(count);
      })
      .catch((err) => {
        console.error("Error fetching inventory for notification:", err);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await Instance.post("/auth/logout");
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="right_side w-5/5">
      <div className="nav_bar w-full h-19 py-5 px-5 flex items-center justify-between">
        {/* Search Bar */}
        <div className="search_bar rounded-4xl text-3xl font-bold text-blue-900 w-5/6 h-12 px-5 py-5 mx-30 flex justify-start items-center">
          Inventory Management System
        </div>

        {/* Notification */}
        <div className="relative notification_btn text-black text-3xl px-2 py-2 rounded-full mx-3">
          <Link to="/threshold">
            <IoMdNotifications />
            {lowStockCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {lowStockCount}
              </span>
            )}
          </Link>
        </div>

        {/* User Profile */}
        <div className="user_profile text-black text-2xl px-2 py-2 rounded-full mx-3">
          <Link to="/user_profile">
            <FaUser />
          </Link>
        </div>

        {/* Logout/Login */}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="text-black text-2xl px-2 py-2 rounded-full mx-3 hover:text-red-500 transition"
          >
            <IoIosLogOut />
          </button>
        ) : (
          <div className="user_profile text-black text-2xl px-1 py-2 rounded-full mx-1">
            <Link to="/login">
              <IoIosLogOut />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
