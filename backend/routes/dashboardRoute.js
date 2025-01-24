import express from 'express';
import mongoose from 'mongoose';
import { Order } from './models/order';
import { OrderItem } from './models/orderItem';

const router = express.Router();

router.get('/dashboard-metrics/:restaurantId', async (req, res) => {
  try {
    const orders = await Order.find().populate('items');
    
    const totalOrders = orders.length;
    let totalRevenue = 0;
    let revenueSplit = { dineIn: 0, delivery: 0, takeOut: 0 };
    let itemCount = {};

    orders.forEach(order => {
      totalRevenue += order.totalPrice;
      if (order.table === 'dine-in') revenueSplit.dineIn += order.totalPrice;
      if (order.table === 'delivery') revenueSplit.delivery += order.totalPrice;
      if (order.table === 'take-out') revenueSplit.takeOut += order.totalPrice;

      order.items.forEach(item => {
        if (itemCount[item.name]) {
          itemCount[item.name] += item.quantity;
        } else {
          itemCount[item.name] = item.quantity;
        }
      });
    });

    const avgOrderValue = totalRevenue / totalOrders;
    const sortedItems = Object.entries(itemCount).sort((a, b) => b[1] - a[1]);
    const topSellingItems = sortedItems.slice(0, 5).map(item => ({ name: item[0], quantity: item[1] }));

    res.json({
      totalOrders,
      totalRevenue,
      avgOrderValue,
      revenueSplit,
      topSellingItems
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
