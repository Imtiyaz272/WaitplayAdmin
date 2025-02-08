import mongoose from "mongoose";

const orderlogSchema =new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:false
    },
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
        required:false

      },
     items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
        required:false
      }],
      totalPrice: { type: Number, required: true },
      createdAt:{
        type:Date,
        required:false
      },
      orderType:{
        type:String,
        required:true
      },
      resId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant"
      }
})

export const Orderlog=mongoose.model("Orderlog", orderlogSchema);