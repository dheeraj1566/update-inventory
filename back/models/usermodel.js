import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { "userType": { type: String, enum: ["admin", "faculty", "student"], default: "student" } },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
