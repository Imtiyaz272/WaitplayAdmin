import React from "react";
import { FiTrendingUp } from "react-icons/fi";
import "./Dashboard.css";
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

const data2 = [
  { month: "Jan", Sales: 1000 },
  { month: "Mar", Sales: 1200 },
  { month: "Apr", Sales: 1100 },
  { month: "May", Sales: 1500 },
  { month: "June", Sales: 1250 },
  { month: "July", Sales: 1000 },
];
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
const RevenueChart = () => {
  const currentMonth = new Date().toLocaleString("default", { month: "short" });
  return (
    <div className="mt-5">
      <ResponsiveContainer width="100%" height={80}>
        <LineChart data={data2}>
          <XAxis dataKey="month" stroke="#ffffff" />
          <YAxis stroke="#ffffff" width={30} />
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
    <div className="mt-5">
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
  return (
    <div className="h-screen bg-blue-950 text-white p-6 flex flex-col overflow-scroll">
      <div className="row1 p-3">
        <div>
          <div className="box box1">
          <div className="flex flex-row items-center justify-center">
              <div className="flex flex-col mr-4 ml-2">
              <span className="text-3xl font-bold mt-0.5 text-lime-300">₹200</span>
                <p className="text-2xl">Last hour</p>
              </div>
              <img src={growup} className="w-14 h-14 fill-white" />
              </div>
          </div>
          <h2 className="text-lg font-semibold mt-2">No of Orders</h2>
        </div>
        <div>
          <div className="box22 box1">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col mr-4 ml-2">
                <p className="text-3xl font-bold mt-0.5 text-lime-300">
                  ₹21973
                </p>
                <p>Charges Inc</p>
              </div>
              <div className="w-full">
                <select className="bg-green-400 rounded-xl p-1 pl-2 text-black text-xs">
                  <option>3 Months</option>
                  <option>6 Months</option>
                  <option>12 Months</option>
                </select>
              </div>
            </div>

            <RevenueChart />
          </div>
          <h2 className="text-lg font-semibold mt-2">Revenue</h2>
        </div>
        <div>
          <div className="flex flex-row"></div>
          <div className="box22 box1">
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-col mr-4">
                <p className="text-3xl font-bold mt-0.5 text-lime-300">₹200</p>
                <p>Sales Generated/No of Orders</p>
              </div>

              <select className="bg-green-400 rounded-xl p-1 pl-2 text-black text-xs">
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
              <p className="text-2xl font-bold text-lime-300">20000</p>
              <p className="text-lg">Dine in</p>
            </div>
            <div className="revin">
              <p className="text-2xl font-bold text-lime-300">20000</p>
              <p className="text-lg">Delivery</p>
            </div>
            <div className="revin">
              <p className="text-2xl font-bold text-lime-300">20000</p>
              <p className="text-lg">Take out</p>
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
                {[
                  "Chicken Biryani",
                  "Chicken Kanti",
                  "Jaljeera Drink",
                  "Chicken Lollypop",
                  "Veg Korma",
                ].map((item, index) => (
                  <tr key={index} className="rounded-lg">
                    <td className="">{item}</td>
                    <td className="text-center">3</td>
                    <td className="text-center">
                      <span className="bg-green-400 pl-1 pr-1 rounded-xl">
                        1560
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
