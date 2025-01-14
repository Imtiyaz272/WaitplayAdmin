import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  detailedDescription: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  isVeg: {
    type: Boolean,
    required: true,
  },
  halfPrice: {
    type: Number,
    required: false,
  },
  fullPrice: {
    type: Number,
    required: true,
  },
  specialItems: [{
    type: String,
    required: true,
  }],
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

export const MenuItem = mongoose.model("MenuItem", menuItemSchema);
