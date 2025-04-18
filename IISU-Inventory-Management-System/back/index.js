import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import facultyAuthRoutes from "./routes/facultyAuth.js";
import storeManRoute from "./routes/storeManRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
  };

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/auth", adminRoutes,facultyAuthRoutes,storeManRoute);
app.use("/add", inventoryRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log(process.env.FRONTEND_URL);
