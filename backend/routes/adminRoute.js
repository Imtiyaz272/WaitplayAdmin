import express from "express";
import { Admin } from "../models/adminsModel.js"; 
import { Restaurant } from "../models/restaurantModel.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find().populate("restaurant_id", "name location"); 
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ message: "Error fetching admins", error });
  }
});

router.post("/", async (req, res) => {
  const { name, email, phoneNumber, location, restaurant_name} = req.body;
  try {
    const newRestaurant = new Restaurant({
      name: restaurant_name,
      location: location,
      tables: [],
      menu: [],
      orders: [],
    });

    const savedRestaurant = await newRestaurant.save();

    const newAdmin = new Admin({
      name,
      email,
      phoneNumber,
      location,
      restaurant_name,
      restaurant_id: savedRestaurant._id, 
    });

    const savedAdmin = await newAdmin.save();

    res.status(201).json({
      message: "Admin and associated restaurant created successfully",
      admin: savedAdmin,
      restaurant: savedRestaurant,
    });
  } catch (error) {
    console.error("Error creating admin and restaurant:", error);
    res.status(500).json({ message: "Error creating admin and restaurant", error });
  }
});

export default router;
