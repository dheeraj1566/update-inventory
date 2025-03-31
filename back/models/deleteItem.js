import mongoose from "mongoose";

const DeleteSchema = new mongoose.Schema({
    name: String,
    category:String,
    qty: Number,
    removedDate: { type: Date, default: Date.now },
   
  });


const removedInventory = mongoose.model("Delete", DeleteSchema);
export default removedInventory;
