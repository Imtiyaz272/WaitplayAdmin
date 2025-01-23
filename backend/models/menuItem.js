import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
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
    required: false,
  },
  halfPrice: {
    type: Number,
    required: false,
  },
  fullPrice: {
    type: Number,
    required: false,
  },
  specialItems: [{
    type: String,
    required: false,
  }],
  category: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  prepTime:{
    type: Number,
    required: false,
  }
});

export const MenuItem = mongoose.model("MenuItem", menuItemSchema);
