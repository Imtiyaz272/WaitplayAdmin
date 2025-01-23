import express from "express";
import { Table } from "../models/tableModel.js";
import { Order } from "../models/orderModel.js";
import { MenuItem } from "../models/cartModel.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const { type, category } = req.query;
    let filter = {};

    if (type && type !== "all") filter.type = type.toLowerCase();
    if (category && category !== "all")
      filter.category = category.toLowerCase();

    const products = await MenuItem.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});

router.get("/categories", async (req, res) => {
  try {
    const { type } = req.query;
    let filter = {};

    if (type && type !== "all") filter.type = type.toLowerCase();

    const categories = await MenuItem.distinct("category", filter);
    res.json(categories);
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});
router.get("/api/search", async (req, res) => {
  try {
    const query = req.query.q; // Get search query from request
    const results = await MenuItem.find({
      title: { $regex: query, $options: "i" },
    }); // Case-insensitive search
    res.json(results);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching search results", error: error.message });
  }
});
export default router;
