import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import tableRoute from './routes/tableRoute.js';
import adminRoute from './routes/adminRoute.js';
import orderRoute from './routes/orderRoute.js';
import menuRoute from './routes/menuRoute.js';
import userRoute from './routes/userRoute.js';
import { Table } from './models/tableModel.js';
import { Order } from './models/orderModel.js';
import { PORT, mongoURL } from './config.js';
import notificationRoute from './routes/notificationRoute.js'

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});


app.use(cors());
app.use(express.json());

mongoose.connect(mongoURL).then(() => {
  console.log("Database is connected");
}).catch((error) => {
  console.log(error);
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRestaurant', (restaurantId) => {
    console.log(`Restaurant ${restaurantId} joined`);
    socket.join(restaurantId); 
  });

  socket.on("getTablesWithOrders", async (restaurantId) => {
    try {
      console.log("Received restaurantId:", restaurantId);
      const tables = await Table.find({ restaurantId }).exec();
      const orders = await Order.find({}).populate('table').exec();
      
      const tablesWithOrders = tables.filter(table =>
        orders.some(order => order.table._id.toString() === table._id.toString())
      );

      console.log("Tables with orders:", tablesWithOrders);
      socket.emit('tablesWithOrders', tablesWithOrders);
    } catch (error) {
      console.error("Error fetching tables and orders:", error);
      socket.emit('error', "Failed to fetch tables and orders.");
    }
  });
  socket.on('placeOrder', async (orderData) => {
    try {
      const order = new Order(orderData);
      await order.save();
      console.log("HI");

      const orderDataPopulated = await Order.findById(order._id)
        .populate('items')
        .populate('table');

      console.log("New Order:", orderDataPopulated);
      io.to(orderDataPopulated.table.restaurantId).emit('newOrder', orderDataPopulated);
    } catch (error) {
      console.error('Error saving order:', error);
      socket.emit('error', 'Failed to save order');
    }
  });

  socket.on('orderUpdated', async (orderData) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(orderData._id, orderData, { new: true });
      if (!updatedOrder) {
        return socket.emit('error', 'Order not found');
      }
      console.log("Order updated:", updatedOrder);
      io.to(updatedOrder.restaurantId).emit('orderStatusUpdate', updatedOrder);
    } catch (error) {
      console.error('Error updating order:', error);
      socket.emit('error', 'Failed to update order');
    }
  });

  socket.on("findAllOrders", async (restaurantId) => {
    try {
      const orders = await Order.find({})
  .populate({
    path: "table",
    match: { restaurantId: restaurantId },
  })
  .populate("items");
      console.log("ordersabhi:",orders);
      socket.emit('fetchAllOrders', orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      socket.emit('error', 'Failed to fetch orders');
    }
  });

  socket.on("hello", (msg, restaurantId) => {
    io.to(restaurantId).emit("hello", msg);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


app.get('/', (req, res) => {
  return res.status(200).send("Backend");
});

app.use('/api', tableRoute);
app.use('/orders', orderRoute);
app.use('/superadmin', adminRoute);
app.use('/menu', menuRoute);
app.use("/uploads", express.static("uploads"));
app.use("/users", userRoute);
app.use("/notifications",notificationRoute);

server.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});
