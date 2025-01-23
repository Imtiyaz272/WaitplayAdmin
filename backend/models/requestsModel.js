import mongoose from "mongoose";

const requestsSchema = new mongoose.Schema({
  tableNo: {
    type: Number,
    required: true,
  },
  tableDescription: {
    type: String,
    required: false,
  },
  restaurantId: {
    type:String,
    required: true,
  },
  restaurantName: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

export const Requests = mongoose.model('Requests', requestsSchema);

