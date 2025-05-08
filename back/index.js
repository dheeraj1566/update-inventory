import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouts from "./routes/authRouts.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import facultyAuth from "./routes/facultyAuth.js";
import accountantRoutes from "./routes/accountantRoutes.js";
import storemanRoutes from "./routes/storemanRoute.js";
import cloudinary from "cloudinary";


dotenv.config();
cloudinary.config({
  secure: true
});

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  // origin:`https://iisu-inventory-management-system-qyvt.onrender.com`,
  // origin: `https://inventory-management-front.onrender.com`,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouts);
app.use("/auth/admin", adminRoutes);
app.use("/auth/faculty", facultyAuth);
app.use("/auth/accountant", accountantRoutes);
app.use("/auth/storeman", storemanRoutes);
app.use("/add", inventoryRoutes);



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log(process.env.FRONTEND_URL);
