import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  tableId: {
    type:String,
    required:true
  },
  description: {
    type:String,
    required:false,
  },
  restaurantId:{
    type:String,
    required:false
  },
});

export const Request = mongoose.model("Request", requestSchema);
