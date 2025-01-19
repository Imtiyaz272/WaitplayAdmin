import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    tables: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table", 
    }],
    menu: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem", 
    }],
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", 
    }],
    location:{
        type:String,
        required:false
    }
  });
  
export const Restaurant = mongoose.model('Restaurant', restaurantSchema);
