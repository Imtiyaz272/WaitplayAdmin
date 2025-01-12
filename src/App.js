import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";  
import Dashboard from "./pages/Dashboard";  
import Orders from "./pages/Orders"; 
import Menu from "./pages/Menu";  
import TableManager from "./pages/TableQRGeneration/TableManager"; 
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
            <Route path="/table" element={<TableManager />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
