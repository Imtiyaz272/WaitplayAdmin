import express from 'express';
import { Orderlog } from '../models/orderlogModel.js';
import { OrderItem } from '../models/orderItem.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/:restaurantId', async (req, res) => {
  try {
    const resId = new mongoose.Types.ObjectId('6793565f0c963c48d4bc070d');    
    const orders = await Orderlog.find({ resId }).populate('items');
    const totalOrders = orders.length;
    let totalRevenue = 0;
    let revenueSplit = { dineIn: 0, delivery: 0, takeOut: 0 };
    let itemCount = {};
    let itemRevenue = {};

    orders.forEach(order => {
      totalRevenue += order.totalPrice;

      if (order.orderType === 'Dine-In') revenueSplit.dineIn += order.totalPrice;
      else if (order.orderType === 'Delivery') revenueSplit.delivery += order.totalPrice;
      else if (order.orderType === 'Takeout') revenueSplit.takeOut += order.totalPrice;

      order.items.forEach(item => {
        if (itemCount[item.name]) {
          itemCount[item.name] += item.quantity;
          itemRevenue[item.name] += item.price;
        } else {
          itemCount[item.name] = item.quantity;
          itemRevenue[item.name] = item.price;
        }
      });
    });

    const avgOrderValue = totalOrders > 0 ? Math.floor(totalRevenue / totalOrders) : 0;

    const sortedItems = Object.entries(itemCount).sort((a, b) => b[1] - a[1]);
    const topSellingItems = sortedItems.slice(0, 5).map(item => ({ name: item[0], quantity: item[1], rev:itemRevenue[item[0]]}));

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

router.get("/sales/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const resId = new mongoose.Types.ObjectId(restaurantId);
    const selectedYear = req.query.year;
    console.log(selectedYear); 

    const monthlySales = await Orderlog.aggregate([
      { 
        $match: { 
          resId,
          createdAt: {
            $gte: new Date(`${selectedYear}-01-01`), 
            $lt: new Date(`${selectedYear}-12-31`) 
          }
        } 
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, 
          totalSales: { $sum: "$totalPrice" }, 
        },
      },
      { $sort: { "_id": 1 } }
    ]);

    const formattedData = monthlySales.map((sale) => ({
      month: new Date(2000, sale._id - 1, 1).toLocaleString("en-US", { month: "short" }),
      Sales: sale.totalSales,
    }));

    res.json(formattedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
