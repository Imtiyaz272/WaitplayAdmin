/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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

export default RevenueChart;
