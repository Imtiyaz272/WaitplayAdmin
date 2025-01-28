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
  socket.on('getTablesWithOrders', async (restaurantId) => {
    const tables = await Table.find({ restaurantId });
    const orders = await Order.find({ restaurantId }).populate('items').populate('table');
    const tablesWithOrders = tables.filter(table => 
      orders.some(order => order.table._id.toString() === table._id.toString())
    );
    
    socket.emit('tablesWithOrders', tablesWithOrders);
  });

  socket.on('orderUpdated', (orderData) => {
    Order.findByIdAndUpdate(orderData._id, orderData, { new: true }, (err, updatedOrder) => {
      if (err) {
        console.error('Error updating order', err);
        return;
      }
      io.emit('orderStatusUpdate', updatedOrder);
    });
  });

  socket.on('placeOrder', async (orderData) => {
    const order = new Order(orderData);
    await order.save();
    io.emit('newOrder', order);
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

server.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});
