import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, useParams } from "react-router-dom";
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
import "./App.css";

const RestaurantContext = createContext();

function useRestaurant() {
  return useContext(RestaurantContext);
}

function RestaurantDetails() {
  const { id } = useParams(); 
  const { setRestaurant } = useRestaurant();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/superadmin/restaurants/${id}`)
      .then((response) => {
        console.log(response.data);
        setRestaurant(response.data.data); 
      })
      .catch((error) => {
        console.error("Error fetching restaurant details:", error.message);
      });
  }, [id, setRestaurant]);

  return (
    <div>
      <h1>Restaurant Details</h1>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const { restaurant } = useRestaurant();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="app">
      {isAdminRoute ? (
        <AdminSideBar />
      ) : (
        <SideBar restaurantname={restaurant?.name || "Loading..."} />
      )}
      <div className="main-content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/table" element={<TableManager />} />
          <Route path="/admin/restaurants" element={<RestaurantsPage />} />
          <Route path="/admin/requests" element={<RequestsPage />} />
          <Route path="/admin/admins" element={<AdminPage/>} />
          <Route path="/:id" element={<RestaurantDetails />} />
          <Route path="/:id/sales" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [restaurant, setRestaurant] = useState(null);

  return (
    <RestaurantContext.Provider value={{ restaurant, setRestaurant }}>
      <Router>
        <Routes>
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </Router>
    </RestaurantContext.Provider>
  );
}

export default App;
