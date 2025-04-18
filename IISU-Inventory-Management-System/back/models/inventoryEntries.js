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
  issuedToDept: String,
  issuedQty: Number,
  returnStatus : {
    type: String,
    enum: ["Returnable", "Non Returnable"],
  },
  
  issuedToFaculty:String,
  issuedDate: { type: Date, default: Date.now },
});


const facultyrequestItemSchema = new mongoose.Schema({
  itemName: String, 
  issuedToDept: String,
  issuedQty: Number,
  returnStatus : {
    type: String,
    enum: ["Returnable", "Non Returnable"],
  },
  approvalStatus: {
    type: String,
    enum: ["Approved Admin", "Approved StoreMan" ,"Declined Admin", "Declined StoreMan"],
  },
  issuedToFaculty:String,
  issuedDate: { type: Date, default: Date.now },
});


const purchaseItemSchema = new mongoose.Schema({
  itemName: String,
  threshold: Number,
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

  // bill: String, // Assuming this is a file path or URL to the bill document
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
  facultyrequestItems:[facultyrequestItemSchema],
  // purchaseItems:[purchaseItemSchema],
});

const inventoryEntries = mongoose.model("Inventory", inventorySchema);
export default inventoryEntries;
