import express from 'express';
import {Table} from '../models/tableModel.js';
const router = express.Router();

router.get("/tables", async (req, res) => {
    const tables = await Table.find();
    res.json(tables);
  });
  
router.post("/tables", async (req, res) => {
    const table = new Table(req.body);
    await table.save();
    res.json(table);
  });

  router.delete("/tables/:tableId", async (req, res) => {
    const { tableId } = req.params;
    try {
        const deletedTable = await Table.findOneAndDelete({ tableId });
        if (!deletedTable) {
            return res.status(404).json({ message: "Table not found." });
        }
        res.json({ message: "Table deleted successfully.", table: deletedTable });
    } catch (error) {
        console.error("Error deleting table:", error);
        res.status(500).json({ message: "Server error." });
    }
});

router.get("/tables/:tableId/qrcode", async (req, res) => {
  const { tableId } = req.params;

  try {
      const table = await Table.findOne({ tableId });
      if (!table) {
          return res.status(404).json({ message: "Table not found." });
      }
      res.json({ qrData: table.qrData });
  } catch (error) {
      console.error("Error fetching QR data:", error);
      res.status(500).json({ message: "Server error." });
  }
});

export default router;