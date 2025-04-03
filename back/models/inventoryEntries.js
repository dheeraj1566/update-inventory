import mongoose from "mongoose";

const issuedItemSchema = new mongoose.Schema({
  itemName: String,
  issuedToDept: String,
  issuedQty: Number,
  returnValue: {
    type: String,
    enum:["Returnable", "Non-Returnable"]
  },
  issuedDate: { type: Date, default: Date.now },
});

const itemSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  threshold: Number,
  status: {
    type: String,
    enum: ["Available", "Out of Stock"],
  },
 
});

const inventorySchema = new mongoose.Schema({
  category: String,
  items: [itemSchema], 
  issuedItems: [issuedItemSchema], 
});

const inventoryEntries = mongoose.model("Inventory", inventorySchema);
export default inventoryEntries;
