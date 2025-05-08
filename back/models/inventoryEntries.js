import mongoose from "mongoose";

const issuedItemSchema = new mongoose.Schema({
  itemName: String,
  issuedToDept: String,
  issuedQty: Number,
  returnStatus : {
    type: String,
    enum: ["Returnable", "Non Returnable"],
  },
  issuedToFaculty:String,
  issuedDate: { type: Date, default: Date.now },
});


const requestItemSchema = new mongoose.Schema({
  itemName: String, 
  requestByDept: String,
  requestQty: Number,
  returnStatus : {
    type: String,
    enum: ["Returnable", "Non Returnable"],
  },
  requestByFaculty:String,
  requestDate: { type: Date, default: Date.now },
  requireDate: { type: Date },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
  },
  requestReason: String,
  issuedQty: Number,
  issuedDate: { type: Date },

  returnDate: { type: Date },
  
});
const requestApprovedItemsSchema = new mongoose.Schema({
  itemName: String, 
  requestByDept: String,
  requestQty: Number,
  returnStatus : {
    type: String,
    enum: ["Returnable", "Non Returnable"],
  },
  requestByFaculty:String,
  requestDate: { type: Date, default: Date.now },
  requireDate: { type: Date },
  status: {
    type: String,
    enum: [ "Approved"],
  },
  requestReason: String,
  issuedQty: Number,
  issuedDate: { type: Date },

  returnDate: { type: Date },
  
});




const requestDeclineItemsSchema = new mongoose.Schema({
  itemName: String, 
  requestQty: Number,
  requestDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: [ "Declined"],
  },
  declineReason: String,
});


const purchaseItemSchema = new mongoose.Schema({
  billNo: String,
  partyName: String,
  billDate: Date,
  billAmount: Number,
  purchaseQty: Number,
  qty: Number,
  pricePerUnit: Number,
  status:{
    type: String,
    enum: ["Available", "Low Stock","Out of Stock"],
  },
   purchaseDate: { type: Date, default: Date.now },
  bill: String, // Assuming this is a file path or URL to the bill document
});

const itemSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  threshold: Number,
  status: {
    type: String,
    enum: ["Available", "Low Stock","Out of Stock"],
  },
  purchaseItems: [purchaseItemSchema], // Array of purchase items
});

const inventorySchema = new mongoose.Schema({
 category: String,
  items: [itemSchema], 
  issuedItems: [issuedItemSchema], 
  requestItems:[requestItemSchema],
  requestApprovedItems:[requestItemSchema],
  requestRejectedItems:[requestItemSchema],
  purchaseItems:[purchaseItemSchema],
});

const inventoryEntries = mongoose.model("Inventory", inventorySchema);
export default inventoryEntries;