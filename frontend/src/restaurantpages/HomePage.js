import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./HomePage.css"

function HomePage() {
    const {id}=useParams();
    const[restaurant,setRestaurant]=useState("");
    useEffect(()=>{
        axios
        .get(`http://localhost:5000/superadmin/restaurants/${id}`)
        .then((response) => {
          setRestaurant(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching restaurant details:", error.message);
        });
    },[id])
    if(localStorage.role==="admin" && localStorage.restaurant_id!==id){
        return <div> NOT ACCESIBLE HELP</div>
    }
    return (
        <div className="h-screen overflow-scroll bg-slate-500">
        <div className="home-header">
          <div>
            <h1>{restaurant.name}</h1>
            <p>Manage your business, orders, tables, bills, requests, and menu changes seamlessly.</p>
          </div>
        </div>

        <div className="home-section bg-slate-500">
          <h2 className="home-section-title">Features</h2>
          <div className="home-cards">
            <div className="home-card">
              <img src="https://example.com/orders.jpg" alt="Orders" />
              <div className="home-card-content">
                <h3>Orders</h3>
                <p>Track and manage all incoming orders effortlessly.</p>
              </div>
            </div>
  
            <div className="home-card">
              <img src="https://example.com/tables.jpg" alt="Table Management" />
              <div className="home-card-content">
                <h3>Table Management</h3>
                <p>Generate and manage QR codes for table service.</p>
              </div>
            </div>
  
            <div className="home-card">
              <img src="https://example.com/bills.jpg" alt="Bills" />
              <div className="home-card-content">
                <h3>Bills</h3>
                <p>Handle billing processes with ease and accuracy.</p>
              </div>
            </div>
  
            <div className="home-card">
              <img src="https://example.com/requests.jpg" alt="Requests" />
              <div className="home-card-content">
                <h3>Requests</h3>
                <p>Review and address customer requests promptly.</p>
              </div>
            </div>
  
            <div className="home-card">
              <img src="https://example.com/menu.jpg" alt="Menu Changes" />
              <div className="home-card-content">
                <h3>Menu Changes</h3>
                <p>Update and customize your menu to keep it fresh.</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Footer Section */}
        <div className="home-footer">
          <p>&copy; 2025 Restaurant Panel. All Rights Reserved.</p>
        </div>
      </div>
    );
}

export default HomePage;