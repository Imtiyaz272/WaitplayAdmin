import React from "react";
import { FaBox, FaHome, FaUtensils,FaQrcode } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import waitplayLogo from "../../images/waitplay_logo.jpg";
import "./SideBar.css";

function SideBar() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
  };
  const handleSignOut = () => {
    // Add sign-out logic here
    console.log("Sign-out button clicked");
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img
          src={waitplayLogo} /* Path to the image in the public folder */
          className="logo-image"
          alt="WaitPlay Logo"
        />
      </div>
      <div className="bold-text">WaitPlay</div>
      <div className="restaurant-name">
        <h2 className="restaurant-name-text"> PFC </h2>
      </div>

      <ul className="menu">
        <li onClick={() => handleNavigation("/dashboard")}>
          <FaHome />
          <div className="menu-items"> Dashboard </div>
        </li>
        <li onClick={() => handleNavigation("/orders")}>
          <FaBox />
          <div className="menu-items"> Orders </div>
        </li>
        <li onClick={() => handleNavigation("/menu")}>
          <FaUtensils />
          <div className="menu-items"> Menu </div>
        </li>
        <li onClick={() => handleNavigation("/table")}>
          <FaQrcode />
          <div className="menu-items"> Table </div>
        </li>
      </ul>
      <div className="sidebar-bottom">
        <img
          src={waitplayLogo}
          alt="User Profile"
          className="sidebar-bottom-image"
        />
        <button className="signout-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
