import mongoose from "mongoose";

const DeleteSchema = new mongoose.Schema({
    name: String,
    qty: Number,
    threshold: Number,
    status: {
      type: String,
      enum: ["Available", "Low Stock","Out of Stock" ],
    },
  });

export default mongoose.model("Delete", DeleteSchema);