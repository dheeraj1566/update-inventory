import React from "react";
import { IoMdNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Instance from "../AxiosConfig";

function Header() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

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
      <div className="nav_bar bg-blue-100 w-full h-19 py-5 px-5 flex items-center justify-between">
        {/* Search Bar */}
        <div className="search_bar rounded-4xl bg-gray-100 w-5/6 h-12 px-15 py-5 mx-35 flex justify-start items-center">
          <CiSearch className="text-2xl text-black" />
          <input
            className="border-none px-3 text-black"
            type="text"
            id="search"
            placeholder="Search Inventory"
          />
        </div>

        <div className="notification_btn text-black text-3xl px-2 py-2 rounded-full mx-3">
          <Link to="/threshold">
            <IoMdNotifications />
          </Link>
        </div>
        <div className="user_profile text-black text-2xl px-2 py-2 rounded-full mx-3">
          <Link to="/user_profile">
            <FaUser />
          </Link>
        </div>

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
