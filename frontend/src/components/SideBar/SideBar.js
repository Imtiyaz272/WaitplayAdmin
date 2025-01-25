import React, { useEffect, useState } from "react";
import {
  FaBox,
  FaHome,
  FaUtensils,
  FaQrcode,
  FaReceipt,
  FaUserFriends,
  FaCog,
  FaBars,
  FaRegUserCircle,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./SideBar.css";
import logowp from "../../images/waitplay_logo.jpg";

const SideBar = ({ restaurantname }) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleNavigation = (path) => {
    navigate(`/123${path}`);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`flex flex-col h-screen ${
        isCollapsed ? "w-20" : "w-64"
      } bg-gradient-to-b from-blue-800 to-purple-700 text-white transition-all duration-300`}
    >
      <div className="flex justify-between items-center p-3">
        {!isCollapsed && (
          <img src={logowp} className="w-36" alt="WaitPlay Logo" />
        )}
        <button className="text-white" onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
      </div>

      <div className="flex items-center space-x-2 justify-center mt-6">
        <FaRegUserCircle size={36} />
        {!isCollapsed && (
          <span className="text-lg">{localStorage.restaurantname || "PFC"}</span>
        )}
      </div>

      <nav className="flex-1 md:mt-5">
        <ul className="space-y-1">
          <li
            className={`flex items-center ${
              !isCollapsed ? "px-10" : "px-6"
            } py-2 cursor-pointer hover:bg-blue-500 text-xl`}
            onClick={() => handleNavigation("/dashboard")}
          >
            <FaHome className="mr-3" />
            {!isCollapsed && <span>Business</span>}
          </li>
          <li
            className={`flex items-center ${
              !isCollapsed ? "px-10" : "px-6"
            } py-2 cursor-pointer hover:bg-blue-500 text-xl`}
            onClick={() => handleNavigation("/orders")}
          >
            <FaBox className="mr-3" />
            {!isCollapsed && <span>Orders</span>}
          </li>
          <li
            className={`flex items-center ${
              !isCollapsed ? "px-10" : "px-6"
            } py-2 cursor-pointer hover:bg-blue-500 text-xl`}
            onClick={() => handleNavigation("/table")}
          >
            <FaQrcode className="mr-3" />
            {!isCollapsed && <span>Tables</span>}
          </li>
          <li
            className={`flex items-center ${
              !isCollapsed ? "px-10" : "px-6"
            } py-2 cursor-pointer hover:bg-blue-500 text-xl`}
          >
            <FaReceipt className="mr-3" />
            {!isCollapsed && <span>Bills</span>}
          </li>
          <li
            className={`flex items-center ${
              !isCollapsed ? "px-10" : "px-6"
            } py-2 cursor-pointer hover:bg-blue-500 text-xl`}
          >
            <FaUserFriends className="mr-3" />
            {!isCollapsed && <span>Requests</span>}
          </li>
          <li
            className={`flex items-center ${
              !isCollapsed ? "px-10" : "px-6"
            } py-2 cursor-pointer hover:bg-blue-500 text-xl`}
            onClick={() => handleNavigation("/menu")}
          >
            <FaUtensils className="mr-3" />
            {!isCollapsed && <span>Menu</span>}
          </li>
        </ul>
      </nav>

      {/* Settings */}
      <div className="mb-5">
        <div
          className={`flex items-center ${
            !isCollapsed ? "px-10" : "px-6"
          } py-2 text-xl`}
        >
          <FaCog className="mr-2" />
          {!isCollapsed && <span>Settings</span>}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
