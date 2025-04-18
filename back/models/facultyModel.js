import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String, default:"faculty"},
}, { timestamps: true });

export default mongoose.model("faculty", facultySchema);
