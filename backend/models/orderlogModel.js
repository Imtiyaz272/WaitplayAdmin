import mongoose from "mongoose";

const orderlogSchema =new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
      },
     items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
      }],
      totalPrice: { type: Number, required: true },
      createdAt:{
        type:Date
      }
})

export const Orderlog=mongoose.model("Orderlog", orderlogSchema);