import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
