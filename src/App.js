import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";  // Import the SideBar component
import Dashboard from "./pages/Dashboard";  // Your Dashboard component
import Orders from "./pages/Orders";  // Your Orders component
import Menu from "./pages/Menu";  // Your Menu component
import Table from "./pages/Table";  // Your Table component
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <SideBar />
        <div className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/table" element={<Table />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
