import express from 'express';
import {Table} from '../models/tableModel.js';
import { Request } from '../models/requestModel.js';
import {Restaurant} from '../models/restaurantModel.js';

const router = express.Router();

router.get("/tables/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const tables = await Table.find({ restaurantId });
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
  
router.post("/tables", async (req, res) => {
    const table = new Table(req.body);
    await table.save();
    res.json(table);
  });

  router.delete("/tables/:tableId", async (req, res) => {
    const { tableId } = req.params;
    try {
        const deletedTable = await Table.findByIdAndDelete(tableId);
        if (!deletedTable) {
            return res.status(404).json({ message: "Table not found." });
        }
        await Restaurant.updateOne(
            { _id: deletedTable.restaurantId }, 
            { $pull: { tables: tableId } } 
        );
        console.log('deleted successfully');
        res.json({ 
            message: "Table deleted successfully from both collections.", 
            table: deletedTable 
        });
    } catch (error) {
        console.error("Error deleting table:", error);
        res.status(500).json({ message: "Server error." });
    }
});


router.get("/tables/:tableId/qrcode", async (req, res) => {
  const { tableId } = req.params;

  try {
      const table = await Table.findById(tableId);
      if (!table) {
          return res.status(404).json({ message: "Table not found." });
      }
      res.json({ qrData: table.qrData });
  } catch (error) {
      console.error("Error fetching QR data:", error);
      res.status(500).json({ message: "Server error." });
  }
});

router.post("/requestQR", async (req, res) => {
    try {
      const { tableId, description, restaurantId} = req.body;
      const newRequest = new Requests({
        tableId,
        description,
        restaurantId,
      });
  
      await newRequest.save();
      res.status(201).json({ message: "Request saved successfully", newRequest });
    } catch (error) {
      res.status(500).json({ message: "Error saving request", error });
    }
  });

export default router;