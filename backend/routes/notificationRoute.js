import express from "express";
import Notification from "../models/notificationsModel.js";

const router = express.Router();

router.get("/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const notifications = await Notification.find({ restaurantId }).sort({ time: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
});


router.get("/:restaurantId/unread-count", async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const unreadCount = await Notification.countDocuments({ restaurantId, read: false });
    res.status(200).json({ unreadCount });
  } catch (error) {
    res.status(500).json({ message: "Error fetching unread count", error });
  }
});

router.put("/:restaurantId/:id/mark-as-read", async (req, res) => {
    try {
      const { restaurantId, id } = req.params;
      const updatedNotification = await Notification.findOneAndUpdate(
        { _id: id, restaurantId, read: false },
        { $set: { read: true } },
        { new: true }
      );
  
      if (!updatedNotification) {
        return res.status(404).json({ success: false, message: "Notification not found or already read" });
      }
  
      res.json({ success: true, message: "Notification marked as read", notification: updatedNotification });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });


router.post("/", async (req, res) => {
  try {
    const { eventName, description, restaurantId } = req.body;
    
    if (!eventName || !description || !restaurantId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newNotification = new Notification({
      eventName,
      description,
      restaurantId,
    });

    await newNotification.save();
    res.status(201).json({ message: "Notification created successfully", notification: newNotification });
  } catch (error) {
    res.status(500).json({ message: "Error creating notification", error });
  }
});

export default router;
