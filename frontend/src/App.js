/* eslint-disable no-unused-vars */
import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import SideBar from "./components/SideBar/SideBar";
import AdminSideBar from "./components/AdminSideBar/AdminSideBar";
import Dashboard from "./restaurantpages/Dashboard";
import Orders from "./restaurantpages/Orders";
import Menu from "./restaurantpages/Menu";
import TableManager from "./restaurantpages/TableQRGeneration/TableManager";
import RestaurantsPage from "./components/AdminSideBar/RestaurantsPage";
import RequestsPage from "./Adminpages/RequestsPage";
import AdminPage from "./Adminpages/AdminPage";
import Loginpage from "./Loginpage.js";
import UsersPage from "./Adminpages/UsersPage.js";
import HomePage from "./restaurantpages/HomePage.js";
import {ToastContainer } from "react-toastify";
import "./App.css";

function isTokenExpired(token) {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload.exp * 1000;
  return Date.now() > exp;
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [role, setRole] = useState(null);
  const token = localStorage.getItem('token');
  const {id} = useParams();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (isTokenExpired(token)) {
      localStorage.removeItem('token');
      navigate("/login");
      return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    setRole(payload.role);

    if (id) {
      axios
        .get(`http://localhost:5000/superadmin/restaurants/${id}`)
        .then((response) => {
          setRestaurant(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching restaurant details:", error.message);
        });
    }
  }, [token, navigate, id]);

  const isAdminRoute = location.pathname.startsWith("/admin");
  if (!token || isTokenExpired(token)) {
    return <Loginpage />;
  }

  return (
    <div className="app">
      {role === 'superadmin' || isAdminRoute ? (
        <AdminSideBar />
      ) : (
        <SideBar restaurantname={restaurant?.name || "PFC IIT KGP"}/>
      )}
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/admin" element={role === 'superadmin' ? <HomePage /> : <Loginpage />} />
          <Route path="/:id/dashboard" element={<Dashboard />} />
          <Route path="/:id/orders" element={<Orders />} />
          <Route path="/:id/menu" element={<Menu />} />
          <Route path="/:id/table" element={<TableManager />} />
          <Route path="/admin/restaurants" element={role === 'superadmin' ? <RestaurantsPage /> : <Loginpage />} />
          <Route path="/admin/requests" element={role === 'superadmin' ? <RequestsPage /> : <Loginpage />} />
          <Route path="/admin/admins" element={role === 'superadmin' ? <AdminPage /> : <Loginpage />} />
          <Route path="/admin/users" element={role === 'superadmin' ? <UsersPage /> : <Loginpage />} />
          <Route path="/:id" element={<HomePage />} />
          <Route path="/:id/sales" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}


function App() {
  return (
     <div>
      <Router>
        <AppContent/>
      </Router>
      <ToastContainer  position="top-center"/>
    </div>
  );
}

export default App;
