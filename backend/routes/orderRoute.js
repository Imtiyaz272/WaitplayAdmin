import express from 'express';
import {Table} from '../models/tableModel.js';
import { Order } from '../models/orderModel.js';
import {MenuItem} from '../models/menuItem.js';
import {OrderItem} from '../models/orderItem.js';
const router = express.Router();

router.get("/tables-with-orders", async (req, res) => {
    try {
      const tableObjectIds = await Order.distinct("table");
  
      const tableIds = await Table.find({ _id: { $in: tableObjectIds } }).select("tableId -_id");
      res.status(200).json(tableIds.map((table) => table.tableId));
      
    } catch (error) {
      console.error("Error fetching tables with orders:", error);
      res.status(500).json({ error: "Failed to fetch tables with orders." });
    }
  });

router.get('/fetchOrder/:tableId', async (req, res) => {
    const { tableId } = req.params;
    try {
      const table = await Table.findOne({ tableId });
      if (!table) {
        console.error(`Table with ID ${tableId} not found.`);
        return res.status(404).send('No table found for the provided ID.');
      }
      const order = await Order.findOne({ table: table._id }).populate('items');
      if (order) {
        const formattedItems = order.items.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        }));
        res.json({ items: formattedItems, totalPrice: order.totalPrice });
      } else {
        res.status(404).send('No bill found for this table.');
      }
    } catch (err) {
      res.status(500).send('Error fetching bill details.');
    }
  });
  
  
  export default router;