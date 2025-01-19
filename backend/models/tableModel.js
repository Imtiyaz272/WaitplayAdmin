import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
    tableId:{
        type: Number,
        required: true
    },
    description:{
        type:String,
        required:false
    },
    restaurantId:{
        type:String,
        required:true
    },
    qrData:{
        type:String,
        required:true
    },
    isAvailable:{
        type:Boolean,
        required:false,
        default: true
    }
  });

export const Table = mongoose.model('Table', tableSchema);