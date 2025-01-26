import React, { useEffect, useState } from "react";
import io from "socket.io-client";

function Orderssocket() {
  const [tables, setTables] = useState([]);
  const [orders, setOrders] = useState([]);
  const [socket, setSocket] = useState(null);
  const restaurantId = "your-restaurant-id"; 

  useEffect(() => {
    const socketIo = io("http://localhost:3000");
    setSocket(socketIo);
    socketIo.on("tablesWithOrders", (tablesWithOrders) => {
      setTables(tablesWithOrders);
    });

    socketIo.on("orderStatusUpdate", (updatedOrder) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });


    socketIo.emit("getTablesWithOrders", restaurantId);

    return () => {
      socketIo.disconnect(); 
    };
  }, []);


  const handleTableClick = (tableId) => {
    const tableOrders = orders.filter((order) => order.table._id === tableId);
    setOrders(tableOrders);
  };

  return (
    <div>
      <h1>Restaurant Panel</h1>
      <div>
        {tables.map((table) => (
          <div
            key={table._id}
            style={{
              display: "inline-block",
              margin: "10px",
              padding: "20px",
              border: "1px solid black",
              cursor: "pointer",
            }}
            onClick={() => handleTableClick(table._id)}
          >
            Table {table.tableId}
          </div>
        ))}
      </div>

      <div>
        {orders.map((order) => (
          <div key={order._id}>
            <h3>Order for Table {order.table.tableId}</h3>
            <p>Total Price: {order.totalPrice}</p>
            <p>Items: {order.items.map((item) => item.name).join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orderssocket;
