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

export default SalesAverageOrder;
  
