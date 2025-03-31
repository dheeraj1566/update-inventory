import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRouts.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  // origin: `https://inventory-management-front.onrender.com`,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/add", inventoryRoutes);



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log(process.env.FRONTEND_URL);
