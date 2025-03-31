import mongoose from "mongoose";

const issuedItemSchema = new mongoose.Schema({
  itemName: String,
  issuedTo: String,
  issuedQty: Number,
  return : String,
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
