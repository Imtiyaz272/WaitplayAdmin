/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FiTrendingUp } from "react-icons/fi";
import { FaChevronDown, FaSlidersH, FaInfoCircle , FaSync} from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import "./Dashboard.css";
import axios from "axios";
import SalesChart from "./SalesChart";
import RevenueChart from "./RevenueChart";
import SalesAverageOrder from "./SalesAverageOrder";
import DateSelect from "./DatePicker";
import ShiftSelect from "./ShiftSelect";
import RatingModal from "./RatingModal";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
    revenueSplit: { dineIn: 0, delivery: 0, takeOut: 0 },
    topSellingItems: [],
    overallRating : 0,
    customers:0,
    existingCustomers:0,
    newCustomers:0,
  });

  const today = new Date();
  const [selectedYear, setSelectedYear] = useState("2024");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [shift, setShift] = useState();
  const [sD1, setsD1] = useState(today);
  const [eD1, seteD1] = useState(today);
  const [sD2, setsD2] = useState(today);
  const [eD2, seteD2] = useState(today);
  const { id: restaurantId } = useParams();
  const[showComparePopup,setShowComparePopup]=useState(false);
  const [selectedLabel1, setSelectedLabel1] = useState(""); 
  const [selectedLabel2, setSelectedLabel2] = useState("Last Month"); 
  const [compLabel, setCompLabel] = useState();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  const [orderComparison, setOrderComparison] = useState(null);
  const [revenueComparison, setRevenueComparison] = useState(null);
  const [customerComparison, setCustomerComparison] = useState(null);
  const [ratingComparison, setRatingComparison] = useState(null);
  const [showStats, setShowStats] = useState(false);

  const handleCompare = async () => {
    try {
      const response = await axios.post("http://localhost:5000/dashboard-metrics/compare-orders", {
        startDate1: format(sD1, "yyyy-MM-dd"),
        endDate1: format(eD1, "yyyy-MM-dd"),
        startDate2: format(sD2, "yyyy-MM-dd"),
        endDate2: format(eD2, "yyyy-MM-dd"),
        restaurantId: "6793565f0c963c48d4bc070d", 
      });
  
      setOrderComparison(response.data.orderDifference); 
      setRevenueComparison(response.data.revenueDifference);
      setCustomerComparison(response.data.customerDifference);
      setRatingComparison(response.data.ratingDifference); 
      setShowComparePopup(false); 
      dashboardData.totalOrders = response.data.ordersCount1;
      dashboardData.totalRevenue = response.data.totalRevenue1;
      dashboardData.customers = response.data.customers1;
      dashboardData.overallRating = response.data.avgRating1;
      dashboardData.existingCustomers = response.data.existingCustomers;
      dashboardData.newCustomers = response.data.newCustomers;
      
    } catch (error) {
      console.error("Error comparing orders:", error);
    }
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

  useEffect(() => {
    const compareCurrentVsLastMonth = async () => {
      const now = new Date();
      const startCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      
      const startLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const endLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

      try {
        const response = await axios.post("http://localhost:5000/dashboard-metrics/compare-orders", {
          startDate1: format(startCurrentMonth, "yyyy-MM-dd"),
          endDate1: format(endCurrentMonth, "yyyy-MM-dd"),
          startDate2: format(startLastMonth, "yyyy-MM-dd"),
          endDate2: format(endLastMonth, "yyyy-MM-dd"),
          restaurantId: "6793565f0c963c48d4bc070d", 
        });

        setOrderComparison(response.data.orderDifference);
        setRevenueComparison(response.data.revenueDifference);
        setCustomerComparison(response.data.customerDifference);
        setRatingComparison(response.data.ratingDifference);
      } catch (error) {
        console.error("Error comparing orders:", error);
      }
    };

    compareCurrentVsLastMonth();
  }, [restaurantId]);

  const clearFilters = () => {

  }
  
  const handleRefresh = () => {
    window.location.reload(); 
  };

  const customerStats = () => {
    setShowStats(true);
  }

  return (
    <div className="h-screen bg-blue-950 text-white p-6 flex flex-col overflow-scroll">
      <div className="w-full flex items-center gap-6 justify-end">
            <FaSync
                className="text-green-400 cursor-pointer hover:text-lime-400"
                size={20}
                onClick={handleRefresh}
            />
            <button 
              className="bg-green-400 rounded-md p-2 pl-2 text-black text-sm" 
              onClick={() => setShowComparePopup(true)}
            >
              Compare
            </button>
      </div>

        {showComparePopup && (
          <div className="fixed right-0 top-12 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-blue-950 p-6 rounded-xl shadow-lg text-white w-96">
              <h2 className="text-lg font-semibold mb-4">Compare Dates</h2>
              
              <div className="flex items-center justify-between">
                <div>
                <DateSelect setStartDate={setsD1} setEndDate={seteD1} isit={0} setCompLabel={setSelectedLabel1}/>
                <div>SD:{format(sD1, "dd-MM-yy")}</div>
                <div>ED:{format(eD1, "dd-MM-yy")}</div>
                </div>
                <span className="text-lg font-bold mx-4">with</span>
                <div>
                <DateSelect setStartDate={setsD2} setEndDate={seteD2} isit={0} setCompLabel={setSelectedLabel2}/>
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
                  onClick={handleCompare}
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
          <div className="revin flex items-center relative">
              <p className="text-2xl font-bold text-lime-300">
                {dashboardData.totalOrders}
              </p>
              <p className="text-lg inline-flex items-center">Orders</p>
              
              {orderComparison !== null && (
                <span className={`absolute bottom-2 left-1 text-base font-bold ${orderComparison >= 0 ? "text-green-400" : "text-red-500"}`}>
                  {orderComparison >= 0 ? `+${orderComparison}` : orderComparison} from {selectedLabel2}
                </span>
              )}
            </div>

            <div className="revin relative">
              <p className="text-2xl font-bold text-lime-300">
              ₹{dashboardData.totalRevenue}
              </p>
              <p className="text-lg inline-flex items-center">Revenue</p>

              {revenueComparison !== null && (
                <span className={`absolute bottom-2 left-1 text-base font-bold ${revenueComparison >= 0 ? "text-green-400" : "text-red-500"}`}>
                  {revenueComparison >= 0 ? `+${revenueComparison}` : revenueComparison} from {selectedLabel2}
                </span>
              )}
            </div>
            <div className="revin relative">
              <p className="text-2xl font-bold text-lime-300">
                {dashboardData.customers}
              </p>
              <p className="text-lg inline-flex items-center">Customers</p>
              {customerComparison !== null && (
                <span className={`absolute bottom-2 left-1 text-base font-bold ${customerComparison >= 0 ? "text-green-400" : "text-red-500"}`}>
                  {customerComparison >= 0 ? `+${customerComparison}` : customerComparison} from {selectedLabel2}
                </span>
              )}

          <div 
            className="inline-block" 
            onMouseEnter={() => setShowStats(true)}
            onMouseLeave={() => setShowStats(false)}
          >
          <FaInfoCircle
            className="absolute bottom-2 right-2 text-lime-300 cursor-pointer hover:text-lime-400"
            size={20}
          />
               {showStats && (
        <div className="absolute -bottom-20 right-2 bg-gray-900 text-white p-3 rounded-lg shadow-lg flex items-center justify-center w-48">
          <div className="flex-1 text-center">
            <p className="text-lg font-bold">{dashboardData.existingCustomers}</p>
            <p className="text-sm text-gray-300">Existing</p>
          </div>

          <div className="border-l border-gray-500 h-10 mx-3"></div>

          <div className="flex-1 text-center">
            <p className="text-lg font-bold">{dashboardData.newCustomers}</p>
            <p className="text-sm text-gray-300">New</p>
          </div>
        </div>
         )}
        </div>
  
            </div>
            
            <div className="revin relative">
              <p className="text-2xl font-bold text-lime-300">
                  {dashboardData.overallRating}
              </p>
              <p className="text-lg inline-flex items-center">Rating</p>

              {ratingComparison !== null && (
                <span className={`absolute bottom-2 left-1 text-base font-bold ${ratingComparison >= 0 ? "text-green-400" : "text-red-500"}`}>
                  {ratingComparison >= 0 ? `+${ratingComparison}` : ratingComparison} from {selectedLabel2}
                </span>
              )}

              <FaInfoCircle
                  className="absolute bottom-2 right-2 text-lime-300 cursor-pointer hover:text-lime-400"
                  size={20}
                  onClick={() => setShowRatingModal(true)}
                />
                 {showRatingModal && <RatingModal onClose={() => setShowRatingModal(false)} className=""/>}
            </div>
          </div>
          <h2 className="text-lg font-semibold mt-2">Total Statistics</h2>
        </div>
      </div>
      <div className="shadow-3xl bg-blue-900 rounded-md">
        <div className="flex items-center justify-end p-4 gap-4">
            <DateSelect setStartDate={setStartDate} setEndDate={setEndDate} setCompLabel={setCompLabel}/>
            <ShiftSelect setShift={setShift}/>
            <button
                className="bg-green-400 rounded-md p-1 px-4 text-black text-sm hover:bg-green-600"
                onClick={() => clearFilters()}
            >
                Clear
            </button>
        </div>
        
        <div className="row1 p-3">
          <div>
            <div className="box box1">
              <div className="flex flex-row items-center justify-center">
                <div className="flex flex-col mr-4 ml-2">
                  <span className="text-3xl font-bold mt-0.5 text-lime-300">
                    {" "}
                    {dashboardData.totalOrders}
                  </span>
                  <p className="text-2xl">Last hour</p>
                </div>
                <FiTrendingUp color="white" fontSize={30} />
              </div>
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
