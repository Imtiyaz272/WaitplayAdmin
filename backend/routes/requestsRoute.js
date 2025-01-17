import express from "express";
import {Requests} from "../models/requestsModel.js";
const router=express.Router();

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

export default router;
