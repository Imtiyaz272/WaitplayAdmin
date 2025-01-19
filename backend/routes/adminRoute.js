import express from "express";
import QRCode from "qrcode";
import { Admin } from "../models/adminsModel.js"; 
import { Restaurant } from "../models/restaurantModel.js";
import { Requests } from "../models/requestsModel.js";
import {Table} from '../models/tableModel.js';


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
router.delete("/requests/:id", async (req, res) => {
    try {
        const request = await Requests.findById(req.params.id);
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
      const {tableNo, tableDescription, restaurantId}=request;
      const qrCodeData = {
        website: `https://example.com/${restaurantId}/${tableNo}`,
        restaurantId,
        tableNo,
      };
      console.log(request);
      const qrCode = await QRCode.toDataURL(JSON.stringify(qrCodeData));
      const newTable = new Table({
        tableId: tableNo,
        description: tableDescription,
        restaurantId: restaurantId,
        qrData: qrCode
      });
      const savedTable = await newTable.save();
      console.log("Hello2");
      const resto=await Restaurant.findByIdAndUpdate(
        restaurantId,
        { $push: { tables: savedTable._id } },
        { new: true }
      );
      console.log("Hello3");
      await Requests.findOneAndDelete(req.params.id);
      res.status(201).json({
        message: "Table created and added to restaurant successfully",
        table: savedTable,
        resto:resto
      });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  });
  
router.post("/requests",async(req,res)=>{
    const {tableNo,tableDescription,restaurantId,restaurantName}=req.body;
    if (!tableNo || !restaurantId || !restaurantName) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const newRequest = new Requests({
          tableNo,
          tableDescription,
          restaurantId,
          restaurantName,
        });
    
        const savedRequest = await newRequest.save();
    
        res.status(201).json({
          message: "Request added successfully",
          request: savedRequest,
        });
      } catch (error) {
        res.status(500).json({ error: "Failed to add request", details: error.message });
      }
})

router.get("/requests",async(req,res)=>{
    try {
        const requests=await Requests.find();
        res.status(201).json({
          message: "Fetched Succesfully",
          request: requests,
        });
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch request", details: error.message });
      }

})

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
