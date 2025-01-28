/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Loginpage.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import waitplayLogo from "./images/waitplay_logo.jpg";

function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/superadmin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("restaurant_id",data.restaurant_id);
        localStorage.setItem("restaurantname",data.admin.restname);
        toast.success("Login Successful");
        if(data.role!=="superadmin") navigate(`/${data.restaurant_id}`) 
        else navigate('/admin')
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Login failed. Try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="loginpage-container">
        {/* <div className="loginpageblock"> */}
      <form className="loginpage-form" onSubmit={handleSubmit}>
        <div className="imageholder">
          <img src={waitplayLogo} className="loginpagelogo" />
        </div >
        <h2 className="loginpage-title">Login</h2>
        <div>
            
        </div>
        <div className="loginpage-form-group">
          <label htmlFor="email" className="loginpage-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="loginpage-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="loginpage-form-group">
          <label htmlFor="password" className="loginpage-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="loginpage-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="loginpage-login-button">
          Login
        </button>
      </form>
      {/* </div> */}
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Loginpage;
