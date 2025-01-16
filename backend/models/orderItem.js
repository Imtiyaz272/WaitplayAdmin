import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
});

export const OrderItem = mongoose.model("OrderItem", orderItemSchema);
