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
  password:{
    type:String,
    required:true,
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
    required: false,
  },
  restaurant_name: {
    type:String,
    required:false,
  },
  restaurant_id:{
     type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required:false,
  },
  role:{
    type:String,
    required:true
  }
  
});

export const Admin = mongoose.model("Admin", adminsSchema);
