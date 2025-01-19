import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderItem",
  }],
  table: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Table",
    type:String
  },
  totalPrice: { type: Number, required: true },
});

export const Order = mongoose.model("Order", orderSchema);
