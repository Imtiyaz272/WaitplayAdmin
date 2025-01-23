import React from 'react';

function Dashboard() {
  return (
    <div className="min-h-screen bg-blue-950 text-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="col-span-1 md:col-span-3 flex gap-6">
          <div className="flex-1 bg-gradient-to-b from-blue-600 to-purple-700 p-4 rounded-xl shadow-lg">
            <p className="text-4xl font-bold mt-4">200</p>
            <p className="text-sm mt-2">last hour</p>
            <h2 className="text-lg font-semibold mt-4">No of Orders</h2>
          </div>
          <div className="flex-1 bg-gradient-to-b from-blue-600 to-purple-700 p-4 rounded-xl shadow-lg">
            <p className="text-4xl font-bold mt-4">₹23097</p>
            <p className="text-sm mt-2">Charges live</p>
            <h2 className="text-lg font-semibold mt-4">Revenue</h2>
          </div>
          <div className="flex-1 bg-gradient-to-b from-blue-600 to-purple-700 p-4 rounded-xl shadow-lg">
            <p className="text-4xl font-bold mt-4">₹200</p>
            <h2 className="text-lg font-semibold mt-4">Average Order Value</h2>
          </div>
        </div>

        <div className="col-span-1 md:col-span-3 lg:col-span-2 bg-gradient-to-b from-blue-600 to-purple-700 p-4 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">Revenue Split</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <p className="text-xl font-bold">23432</p>
              <p className="text-sm">Dine-in ₹</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">23432</p>
              <p className="text-sm">Delivery ₹</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">23432</p>
              <p className="text-sm">Take-out ₹</p>
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2 bg-gradient-to-b from-blue-600 to-purple-700 p-4 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">Top Selling Items</h2>
          <ul className="mt-4 space-y-2">
            {["Chicken Biryani", "Chicken Kanti", "Jaljeera Drink", "Chicken Lollypop", "Veg Korma"].map(
              (item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white text-black rounded-lg px-4 py-2 shadow"
                >
                  <span>{item}</span>
                  <span className="font-bold">₹1560</span>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="col-span-1 md:col-span-3 lg:col-span-2 bg-gradient-to-b from-blue-600 to-purple-700 p-4 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">Sales by Category</h2> 
        </div>

        
        <div className="col-span-1 lg:col-span-2 bg-gradient-to-b from-blue-600 to-purple-700 p-4 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold">Table Turnover Rate</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
