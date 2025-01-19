import mongoose from "mongoose";

const adminsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
  },
  email: {
    type: String,
    required: true, 
    unique: true, 
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  phoneNumber: {
    type: String,
    required: true, 
    unique: true,
    match: /^\+?[1-9]\d{1,14}$/, 
  },
  location: {
    type: String,
    required: false,
    trim: true,
  },
  registeredDate: {
    type: Date,
    default: Date.now,
  },
  restaurant_name: {
    type:String,
    required:true,
  },
  restaurant_id:{
     type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required:false,
  }
});

export const Admin = mongoose.model("Admin", adminsSchema);
