import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, password, mobileNumber ,restaurantVisits} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobileNumber,
      restaurantVisits,
    });

    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
});

router.post("/:userId/visit", async (req, res) => {
  const { userId } = req.params;
  const { restaurantId, orderId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const restaurantVisit = user.restaurantVisits.find((visit) =>
      visit.restaurantId.equals(restaurantId)
    );

    if (restaurantVisit) {
      restaurantVisit.orders.push(orderId);
    } else {
      user.restaurantVisits.push({
        restaurantId,
        orders: [orderId],
      });
    }

    const updatedUser = await user.save();
    res
      .status(200)
      .json({ message: "Visit added successfully", user: updatedUser });
  } catch (error) {
    console.error("Error adding visit:", error);
    res.status(500).json({ message: "Error adding visit", error });
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId)
      .populate("restaurantVisits.restaurantId")
      .populate("restaurantVisits.orders");

    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Error fetching user details", error });
  }
});

router.get("/",async(req,res)=>{
    try{
        const users=await User.find();
        return res.status(200).json(users);
    }
    catch(error){
        console.error("Error fetching users details",error);
        res.status(500).json({message:"Error fetching all users details",error});
    }
})

router.get("/visit-details/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findById(userId).populate({
        path: "restaurantVisits.restaurantId",
        select: "name", 
      });
  
      if (!user) return res.status(404).json({ message: "User not found." });
  
      const visitDetails = user.restaurantVisits.map(visit => ({
        restaurantName: visit.restaurantId.name,
        visitCount: visit.orders.length,
      }));
  
      res.status(200).json({ visitDetails });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  });
  

export default router;
