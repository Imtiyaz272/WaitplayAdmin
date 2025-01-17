import express from "express";
import { Restaurant } from "../models/restaurantModel.js";
const router = express.Router();

router.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find().select("_id name location");
    res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching restaurants",
      error: error.message,
    });
  }
});

router.get("/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching restaurant",
      error: error.message,
    });
  }
});

export default router;
