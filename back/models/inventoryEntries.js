import mongoose from "mongoose";

const issuedItemSchema = new mongoose.Schema({
  itemName: String,
  issuedTo: String,
  issuedQty: Number,
  issuedDate: { type: Date, default: Date.now },
});

const itemSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  threshold: Number,
  status: {
    type: String,
    enum: ["Available", "Low Stock","Out of Stock" ],
  },
  subCategory:{
    type:String,
    enum:["Color","Size","Price"]
  }
});

const inventorySchema = new mongoose.Schema({
  category: String,
  items: [itemSchema], 
  issuedItems: [issuedItemSchema], 
});

const inventoryEntries = mongoose.model("Inventory", inventorySchema);
export default inventoryEntries;
