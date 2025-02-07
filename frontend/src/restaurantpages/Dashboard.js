/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiTrendingUp, FiMaximize , FiExternalLink, FiFilter} from "react-icons/fi";
import {MdFilterList} from 'react-icons/md';
import { FaChevronDown, FaSlidersH } from 'react-icons/fa';
import "./Dashboard.css";
import axios from "axios";
import growup from "../images/growup.png"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data1 = [
  { month: "Jan", Sales: 50 },
  { month: "Mar", Sales: 50 },
  { month: "Apr", Sales: 70 },
  { month: "May", Sales: 60 },
  { month: "June", Sales: 80 },
  { month: "July", Sales: 90 },
];

const data = [
  { month: "Jan", Veg: 30, NonVeg: 20 },
  { month: "Feb", Veg: 10, NonVeg: 25 },
  { month: "Mar", Veg: 15, NonVeg: 30 },
  { month: "Apr", Veg: 12, NonVeg: 45 },
  { month: "May", Veg: 40, NonVeg: 55 },
  { month: "Jun", Veg: 50, NonVeg: 65 },
  { month: "Jul", Veg: 55, NonVeg: 50 },
  { month: "Aug", Veg: 60, NonVeg: 75 },
  { month: "Sep", Veg: 85, NonVeg: 60 },
  { month: "Oct", Veg: 90, NonVeg: 65 },
  { month: "Nov", Veg: 75, NonVeg: 70 },
  { month: "Dec", Veg: 65, NonVeg: 90 },
];

const RevenueChart = ({selectedYear}) => {
  const [revenueData, setRevenueData] = useState([]);
  const { id: restaurantId } = useParams();

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/dashboard-metrics/sales/${restaurantId}`, { params: {year: selectedYear }});
        setRevenueData(response.data); 
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchRevenueData();
  }, [restaurantId, selectedYear]);

  const currentMonth = new Date().toLocaleString("default", { month: "short" });

  return (
    <div className="mt-5">
      <ResponsiveContainer width="100%" height={80}>
        <LineChart data={revenueData}>
          <XAxis dataKey="month" stroke="#ffffff" />
          <YAxis stroke="#ffffff" width={30} fontSize={12}/>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(107, 16, 164, 0.8)",
              borderRadius: "10px",
              color: "White",
            }}
            labelStyle={{ color: "#000" }}
          />
          <Line
            type="monotone"
            dataKey="Sales"
            stroke="#ffffff"
            strokeWidth={2}
            dot={(dotProps) => (
              <circle
                cx={dotProps.cx}
                cy={dotProps.cy}
                r={6}
                fill={
                  dotProps.payload.month === currentMonth ? "#f00" : "#ffffff"
                }
              />
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const SalesAverageOrder = () => {
  const currentMonth = new Date().toLocaleString("default", { month: "short" });
  return (
    <div className="mt-3 ">
      <ResponsiveContainer width="100%" height={80}>
        <LineChart data={data1}>
          <XAxis dataKey="month" stroke="#ffffff" />
          <YAxis stroke="#ffffff" width={30} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(107, 16, 164, 0.8)",
              borderRadius: "10px",
            }}
            labelStyle={{ color: "#333" }}
          />
          <Line
            type="monotone"
            dataKey="Sales"
            stroke="#ffffff"
            strokeWidth={2}
            dot={(dotProps) => (
              <circle
                cx={dotProps.cx}
                cy={dotProps.cy}
                r={6}
                fill={
                  dotProps.payload.month === currentMonth ? "#f00" : "#ffffff"
                }
              />
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
const SalesChart = () => {
  return (
    <div className="bg-gradient-to-b from-blue-600 to-purple-600 pr-12 rounded-lg shadow-lg">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          {/* <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.3)" /> */}
          <XAxis dataKey="month" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "10px",
            }}
            labelStyle={{ color: "#333" }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ color: "white" }}
          />
          <Line
            type="monotone"
            dataKey="Veg"
            stroke="#ffffff"
            strokeWidth={2}
            dot={{ fill: "#ffffff", r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="NonVeg"
            stroke="#fcd34d"
            strokeWidth={2}
            dot={{ fill: "#fcd34d", r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
    revenueSplit: { dineIn: 0, delivery: 0, takeOut: 0 },
    topSellingItems: [],
  });
  const [selectedYear, setSelectedYear] = useState("2024");
  const { id: restaurantId } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/dashboard-metrics/${restaurantId}`);
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [restaurantId]); 


  return (
    <div className="min-h-screen bg-blue-950 text-white p-6 flex flex-col">
      <div className="flex justify-end ">
      </div>
      <div className="row1 p-3">
        <div>
          <div className="box box1 relative">
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-col mr-4 ml-2">
              <span className="text-3xl font-bold mt-0.5 text-lime-300"> ₹{dashboardData.totalOrders}</span>
                <p className="text-2xl">Last hour</p>
            </div>
              <FiTrendingUp color="white" fontSize={30} />
          </div>
             <FaSlidersH className="text-lime-300 absolute top-2 right-3 " />
          </div>
          <h2 className="text-lg font-semibold mt-2">No of Orders</h2>
        </div>
        <div>
          <div className={`box22 box1 relative ${
          isExpanded ? "scale-125 shadow-xl z-10" : ""
        }`}>
          <FiExternalLink className="absolute top-2 right-2 text-lg cursor-pointer transition-transform duration-200 hover:scale-125" onClick={() => setIsExpanded(!isExpanded)}/>
            <div className="flex flex-row">
              <div className="flex flex-col mr-4 ml-2">
                <p className="text-3xl font-bold mt-0.5 text-lime-300">
                ₹{dashboardData.totalRevenue}
                </p>
                <p>Charges Inc</p>
              </div>
              <div className="w-full pl-20 pt-5">
                <select
                className="bg-green-400 rounded-xl p-1 pl-2 text-black text-xs"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
              </div>
            </div>

            <RevenueChart selectedYear={selectedYear}/>
          </div>
          <h2 className="text-lg font-semibold mt-2">Revenue</h2>
        </div>
        <div>
          <div className="flex flex-row"></div>
          <div className="box22 box1">
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-col mr-4">
                <p className="text-3xl font-bold mt-0.5 text-lime-300">₹{dashboardData.avgOrderValue}</p>
                <p>Sales Generated/No of Orders</p>
              </div>

              <select className="bg-green-400 rounded-xl p-1 pl-2 text-black text-xs -mt-8">
                <option>3 Months</option>
                <option>6 Months</option>
                <option>12 Months</option>
              </select>
            </div>

            <SalesAverageOrder />
          </div>
          <h2 className="text-lg font-semibold mt-2">Average Order Value</h2>
        </div>
      </div>
      <div className="row2 mt-5 p-3">
        <div>
          <div className="box revbox grid grid-cols-3 gap-4">
            <div className="revin">
              <p className="text-2xl font-bold text-lime-300">{dashboardData.revenueSplit.dineIn}</p>
              <p className="text-lg inline-flex items-center">
                Dine in <FaChevronDown className="ml-2" />
              </p>
            </div>
            <div className="revin">
              <p className="text-2xl font-bold text-lime-300">{dashboardData.revenueSplit.delivery}</p>
              <p className="text-lg inline-flex items-center">
                Delivery <FaChevronDown className="ml-2" />
              </p>
            </div>
            <div className="revin">
              <p className="text-2xl font-bold text-lime-300">{dashboardData.revenueSplit.takeOut}</p>
              <p className="text-lg inline-flex items-center">
                Take out <FaChevronDown className="ml-2" />
              </p>
            </div>
          </div>
          <h2 className="text-lg font-semibold mt-2">Revenue Splits</h2>
        </div>
        <div>
          <div className="box selbox">
            <table className="w-full text-white -mt-3">
              <thead>
                <tr className="text-left">
                  <th className="">
                    <div className="flex justify-between">
                      <select className="bg-green-400 rounded-xl p-1 pl-2 text-black text-xs">
                        <option>Day</option>
                        <option>Week</option>
                        <option>Month</option>
                      </select>
                    </div>
                  </th>
                  <th className="">Quantity</th>
                  <th className="">Total_Revenue</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.topSellingItems.map((item, index) => (
                  <tr key={index} className="rounded-lg">
                    <td className="">{item.name}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-center">
                      <span className="bg-green-400 pl-1 pr-1 rounded-xl">
                        ₹{item.rev} 
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 className="text-lg font-semibold mt-2">Top Selling Items</h2>
        </div>
      </div>
      <div className="row2 mt-5 p-3">
        <div>
          <SalesChart />
          {/* <div className="box revbox grid grid-cols-3 gap-4">
             Data here
            </div> */}
          <h2 className="text-lg font-semibold mt-2">Sales by Category</h2>
        </div>
        <div>
          <div className="box selbox">
            <div className="flex justify-between -mt-3">
              <p className="font-semibold">Avg Table Turnover Rate = 10c/u</p>
              <select className="bg-green-400 rounded-xl p-1 pl-2 text-black text-xs">
                <option>Daywise</option>
              </select>
            </div>
            <table className="w-full text-white mt-3">
              <thead>
                <tr className="text-left text-green-400">
                  <th className="text-white">Table</th>
                  <th className="">Sun</th>
                  <th className="">Mon</th>
                  <th className="">Tue</th>
                  <th className="">Wed</th>
                  <th className="">Thu</th>
                  <th className="">Fri</th>
                  <th className="">Sat</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <h2 className="text-lg font-semibold mt-2">Table Turnover rate</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

