import React from 'react';
import { FiTrendingUp } from "react-icons/fi";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="min-h-screen bg-blue-950 text-white p-6 flex flex-col">
        <div className="row1 p-3">
           <div>
              <div className="box box1">
              <p className="text-4xl font-bold mt-4 text-lime-300">200</p>
              <p className="text-sm">last hour</p>
              </div>
              <h2 className="text-lg font-semibold mt-2">No of Orders</h2>
           </div>
           <div>
              <div className="box box1">
              <p className="text-4xl font-bold mt-4 text-lime-300">₹23097</p>
            <p className="text-sm mt-2">Charges live</p>
              </div>
              <h2 className="text-lg font-semibold mt-2">Revenue</h2>
           </div>
           <div>
              <div className="box box1">
              <p className="text-4xl font-bold mt-4 text-lime-300">₹200</p>
              </div>
              <h2 className="text-lg font-semibold mt-2">Average Order Value</h2>
           </div>
        </div>
        <div className='row2 mt-5 p-3'>
          <div>
            <div className="box revbox grid grid-cols-3 gap-4">
              <div className='revin'>
                <p className='text-2xl font-bold text-lime-300'>20000</p>
                <p className='text-lg'>Dine in</p>
              </div>
              <div className='revin'>
                <p className='text-2xl font-bold text-lime-300'>20000</p>
                <p className='text-lg'>Delivery</p>
              </div>
              <div className='revin'>
                <p className='text-2xl font-bold text-lime-300'>20000</p>
                <p className='text-lg'>Take out</p>
              </div>
            </div>
            <h2 className="text-lg font-semibold mt-2">Revenue Splits</h2>
          </div>
          <div>
              <div className='box selbox'>
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
                  {["Chicken Biryani", "Chicken Kanti", "Jaljeera Drink", "Chicken Lollypop", "Veg Korma"].map(
                    (item, index) => (
                      <tr key={index} className="rounded-lg">
                        <td className="">{item}</td>
                        <td className="text-center">3</td>
                        <td className="text-center"><span className='bg-green-400 pl-1 pr-1 rounded-xl'>1560</span></td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
              </div>
              <h2 className="text-lg font-semibold mt-2">Top Selling Items</h2>
          </div>
        </div>
        <div className='row2 mt-5 p-3'>
          <div>
            <div className="box revbox grid grid-cols-3 gap-4">
             Data here
            </div>
            <h2 className="text-lg font-semibold mt-2">Sales by Category</h2>
          </div>
          <div>
              <div className='box selbox'>
              <div className='flex justify-between -mt-3'>
                  <p className='font-semibold'>Avg Table Turnover Rate = 10c/u</p>
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
                <tbody>
                  
                </tbody>
              </table>
              </div>
              <h2 className="text-lg font-semibold mt-2">Table Turnover rate</h2>
          </div>
        </div>
    </div>
  );
}

export default Dashboard;
