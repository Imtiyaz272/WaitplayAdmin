import React from "react";
import {
  FaChartLine,
  FaUsers,
  FaBell,
  FaCheckCircle,
  FaUtensilSpoon,
  FaUserTie
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import waitplayLogo from "../../images/waitplay_logo.jpg";
import crownlogo from "../../images/crown.png";
import devlogo from "../../images/devloper.png";
import "./AdminSideBar.css";

const AdminSideBar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  const handleSignOut = () => {
    console.log("Sign-out button clicked");
  };

  return (
    <div className="adminsidebar">
      <div className="adminlogo-container">
        <img src={crownlogo} className="admincrownimage" />
        <img
          src={waitplayLogo}
          className="adminlogo-image"
          alt="adminWaitPlay Logo"
        />
      </div>
      <div className="bold-text">WaitPlay</div>
      <ul className="menu">
        <li onClick={() => handleNavigation("/admin/Sales")}>
          <FaChartLine />
          <div className="menu-items"> Sales </div>
        </li>
        <li onClick={() => handleNavigation("/admin/restaurants")}>
          <FaUtensilSpoon />
          <div className="menu-items"> Restaurants </div>
        </li>
        <li onClick={() => handleNavigation("/admin/Users")}>
          <FaUsers />
          <div className="menu-items"> Users </div>
        </li>
        <li onClick={() => handleNavigation("/admin/admins")}>
          <FaUserTie />
          <div className="menu-items"> Admins </div>
        </li>
        <li onClick={() => handleNavigation("/admin/Notifications")}>
          <FaBell />
          <div className="menu-items"> Notifications </div>
        </li>
        <li onClick={() => handleNavigation("/admin/requests")}>
          <FaCheckCircle />
          <div className="menu-items"> Aprrovals </div>
        </li>
      </ul>
      <div className="sidebar-bottom">
        <img
          src={devlogo}
          alt="User Profile"
          className="sidebar-bottom-image"
        />
        <button className="signout-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AdminSideBar;
