/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FiTrendingUp } from "react-icons/fi";
import { FaChevronDown, FaSlidersH } from "react-icons/fa";
import "./Dashboard.css";
import axios from "axios";
import SalesChart from "./SalesChart";
import RevenueChart from "./RevenueChart";
import SalesAverageOrder from "./SalesAverageOrder";
import DateSelect from "./DatePicker";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
    revenueSplit: { dineIn: 0, delivery: 0, takeOut: 0 },
    topSellingItems: [],
  });
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState("2024");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [sD1, setsD1] = useState(today);
  const [eD1, seteD1] = useState(today);
  const [sD2, setsD2] = useState(today);
  const [eD2, seteD2] = useState(today);
  const { id: restaurantId } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const[showComparePopup,setShowComparePopup]=useState(false);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/dashboard-metrics/${restaurantId}`
        );
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [restaurantId]);

  return (
    <div className="h-screen bg-blue-950 text-white p-6 flex flex-col overflow-scroll">
      <div className="w-full flex justify-end">
  <button 
    className="bg-green-400 rounded-xl p-2 pl-2 text-black text-xs" 
    onClick={() => setShowComparePopup(true)}
  >
    Compare
  </button>
</div>

{showComparePopup && (
  <div className="fixed right-0 top-12 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-blue-950 p-6 rounded-xl shadow-lg text-white w-96">
      <h2 className="text-lg font-semibold mb-4">Compare Dates</h2>
      
      <div className="flex items-center justify-between">
        <div>
        <DateSelect setStartDate={setsD1} setEndDate={seteD1} isit={0} />
        <div>SD:{format(sD1, "dd-MM-yy")}</div>
        <div>ED:{format(eD1, "dd-MM-yy")}</div>
        </div>
        <span className="text-lg font-bold mx-4">VS</span>
        <div>
        <DateSelect setStartDate={setsD2} setEndDate={seteD2} isit={0}/>
        <div>SD:{format(sD2, "dd-MM-yy")}</div>
        <div>ED:{format(eD2, "dd-MM-yy")}</div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button 
          className="bg-red-500 px-4 py-2 rounded-md text-black text-xs mr-2"
          onClick={() => setShowComparePopup(false)}
        >
          Cancel
        </button>
        <button 
          className="bg-green-500 px-4 py-2 rounded-md text-black text-xs"
          onClick={() => {
            // Add your comparison logic here
            setShowComparePopup(false);
          }}
        >
          Compare
        </button>
      </div>
    </div>
  </div>
)}

      <div className="row0 p-3">
        <div>
          <div className="box revbox grid grid-cols-4 gap-4">
            <div className="revin">
              <p className="text-2xl font-bold text-lime-300">
                {dashboardData.revenueSplit.dineIn}
              </p>
              <p className="text-lg inline-flex items-center">Orders</p>
            </div>
            <div className="revin">
              <p className="text-2xl font-bold text-lime-300">
                {dashboardData.revenueSplit.delivery}
              </p>
              <p className="text-lg inline-flex items-center">Revenue</p>
            </div>
            <div className="revin">
              <p className="text-2xl font-bold text-lime-300">
                {dashboardData.revenueSplit.takeOut}
              </p>
              <p className="text-lg inline-flex items-center">Customers</p>
            </div>
            <div className="revin">
              <p className="text-2xl font-bold text-lime-300">
                {dashboardData.revenueSplit.takeOut}
              </p>
              <p className="text-lg inline-flex items-center">Rating</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold mt-2">Total Statistics</h2>
        </div>
      </div>
      <div className="shadow-3xl bg-blue-900 rounded-md">
        <DateSelect setStartDate={setStartDate} setEndDate={setEndDate} />
        <div className="row1 p-3">
          <div>
            <div className="box box1 relative">
              <div className="flex flex-row items-center justify-center">
                <div className="flex flex-col mr-4 ml-2">
                  <span className="text-3xl font-bold mt-0.5 text-lime-300">
                    {" "}
                    ₹{dashboardData.totalOrders}
                  </span>
                  <p className="text-2xl">Last hour</p>
                </div>
                <FiTrendingUp color="white" fontSize={30} />
              </div>
              <FaSlidersH className="text-lime-300 absolute top-2 right-3 " />
            </div>
            <h2 className="text-lg font-semibold mt-2">No of Orders</h2>
          </div>
          <div>
            <div className="box22 box1">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col mr-4 ml-2">
                  <p className="text-3xl font-bold mt-0.5 text-lime-300">
                    ₹{dashboardData.totalRevenue}
                  </p>
                  <p>Charges Inc</p>
                </div>
                <div className="w-full pl-20 pt-5">
                  {/* <select
                  className="bg-green-400 rounded-xl p-1 pl-2 text-black text-xs"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select> */}
                </div>
              </div>

              <RevenueChart selectedYear={selectedYear} />
            </div>
            <h2 className="text-lg font-semibold mt-2">Revenue</h2>
          </div>
          <div>
            <div className="flex flex-row"></div>
            <div className="box22 box1">
              <div className="flex flex-row items-center justify-center">
                <div className="flex flex-col mr-4">
                  <p className="text-3xl font-bold mt-0.5 text-lime-300">
                    ₹{dashboardData.avgOrderValue}
                  </p>
                  <p>Sales Generated/No of Orders</p>
                </div>

                {/* <select className="bg-green-400 rounded-xl p-1 pl-2 text-black text-xs -mt-8">
                <option>3 Months</option>
                <option>6 Months</option>
                <option>12 Months</option>
              </select> */}
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
                <p className="text-2xl font-bold text-lime-300">
                  {dashboardData.revenueSplit.dineIn}
                </p>
                <p className="text-lg inline-flex items-center">
                  Dine in <FaChevronDown className="ml-2" />
                </p>
              </div>
              <div className="revin">
                <p className="text-2xl font-bold text-lime-300">
                  {dashboardData.revenueSplit.delivery}
                </p>
                <p className="text-lg inline-flex items-center">
                  Delivery <FaChevronDown className="ml-2" />
                </p>
              </div>
              <div className="revin">
                <p className="text-2xl font-bold text-lime-300">
                  {dashboardData.revenueSplit.takeOut}
                </p>
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
                      {/* <div className="flex justify-between">
                      <select className="bg-green-400 rounded-xl p-1 pl-2 text-black text-xs">
                        <option>Day</option>
                        <option>Week</option>
                        <option>Month</option>
                      </select>
                    </div> */}
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
    </div>
  );
}

export default Dashboard;
