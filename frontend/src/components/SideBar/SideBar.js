import React from "react";
import { FaBox, FaHome, FaUtensils, FaQrcode, FaReceipt, FaUserFriends, FaCog, FaBars, FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import "./SideBar.css";
import logowp from "../../images/logowp.png";

const SideBar = () => {
  const navigate = useNavigate(); 

  const handleNavigation = (path) => {
    navigate(path); 
  };

  // const handleSignOut = () => {
  //   console.log("Sign-out button clicked");
  // };

  return (
    <div className="flex flex-col h-screen w-64 bg-gradient-to-b from-blue-900 to-blue-500 text-white">
      <div className="flex justify-between items-center">
        <div className="inline-block">
        <img
          src={logowp} 
          className="w-36"
          alt="WaitPlay Logo"
        />
        </div>
        <div className="px-3">
          <FaBars size={24} />
        </div>
      </div>
      <div className="flex items-center space-x-2 justify-center mt-6">
        <FaRegUserCircle size={36}/>
        <span className="text-lg">Restaurant Name</span>
      </div>
      <nav className="flex-1 md:mt-5">
        <ul className="space-y-1">
          <li className="flex items-center px-10 py-2 cursor-pointer hover:bg-blue-500 text-xl" onClick={() => handleNavigation("/dashboard")}>
            <FaHome className="mr-3" />
            <span>Business</span>
          </li>
          <li className="flex items-center px-10 py-2 cursor-pointer hover:bg-blue-500 text-xl" onClick={() => handleNavigation("/orders")}>
            <FaBox className="mr-3" />
            <span>Orders</span>
          </li>
          <li className="flex items-center px-10 py-2 cursor-pointer hover:bg-blue-500 text-xl" onClick={() => handleNavigation("/table")}>
            <FaQrcode className="mr-3" />
            <span>Tables</span>
          </li>
          <li className="flex items-center px-10 py-2 cursor-pointer hover:bg-blue-500 text-xl">
            <FaReceipt className="mr-3" />
            <span>Bills</span>
          </li>
          <li className="flex items-center px-10 py-2 cursor-pointer hover:bg-blue-500 text-xl">
            <FaUserFriends className="mr-3" />
            <span>Requests</span>
          </li>
          <li className="flex items-center px-10 py-2 cursor-pointer hover:bg-blue-500 text-xl" onClick={() => handleNavigation("/menu")}>
            <FaUtensils className="mr-3" />
            <span>Menu</span>
          </li>
        </ul>
      </nav>

      <div className="mb-5">
        <div className="flex items-center px-10 py-2 text-xl">
        <FaCog className="mr-2" />
        <span>Settings</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;


// import React from "react";
// import { FaBox, FaHome, FaUtensils,FaQrcode, FaReceipt, FaUserFriends } from "react-icons/fa";
// import { useNavigate } from "react-router-dom"; 
// import waitplayLogo from "../../images/waitplay_logo.jpg";
// import devlogo from "../../images/devloper.png"
// import "./SideBar.css";

// const SideBar=() => {
//   const navigate = useNavigate(); 

//   const handleNavigation = (path) => {
//     navigate(path); 
//   };
//   const handleSignOut = () => {
//     console.log("Sign-out button clicked");
//   };

//   return (
//     <div className="sidebar">
//       <div className="logo-container">
//         <img
//           src={waitplayLogo} 
//           className="logo-image"
//           alt="WaitPlay Logo"
//         />
//       </div>
//       <div className="bold-text">WaitPlay</div>
//       <div className="restaurant-name">
//         <h2 className="restaurant-name-text"> Restaurant Name </h2>
//       </div>

//       <ul className="menu">
//         <li onClick={() => handleNavigation("/dashboard")}>
//           <FaHome />
//           <div className="menu-items"> Business </div>
//         </li>
//         <li onClick={() => handleNavigation("/orders")}>
//           <FaBox />
//           <div className="menu-items"> Orders </div>
//         </li>
//         <li onClick={() => handleNavigation("/table")}>
//           <FaQrcode />
//           <div className="menu-items"> Tables </div>
//         </li>
//         <li>
//           <FaReceipt />
//           <div className="menu-items"> Bills </div>
//         </li>
//         <li>
//           <FaUserFriends />
//           <div className="menu-items"> Requests </div>
//         </li>
//         <li onClick={() => handleNavigation("/menu")}>
//           <FaUtensils />
//           <div className="menu-items"> Menu </div>
//         </li>
//       </ul>
//       <div className="sidebar-bottom">
//         <img
//           src={devlogo}
//           alt="User Profile"
//           className="sidebar-bottom-image"
//         />
//         <button className="signout-button" onClick={handleSignOut}>
//           Sign Out
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SideBar;
