import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    cartId: { type: String, unique: true, required: true }, // Unique identifier for the cart
    createdBy: { type: String, required: true }, // User who created the cart
    users: [{ type: String }], // List of users who joined the cart
    items: [
      {
        itemName: String,
        quantity: Number,
        addedBy: String,
      },
    ],
    createdAt: { type: Date, default: Date.now },
  });
  
 export const Cart = mongoose.model('Cart', cartSchema);