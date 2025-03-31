import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import usermodel from "../models/usermodel.js";

export const registerUser = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    let user = await usermodel.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    console.log("password"+ password)
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed"+hashedPassword);
    user = new usermodel({ fname, lname, email, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
  
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found! Please register first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.cookie("token", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
      maxAge: 2 * 60 * 60 * 1000, 
    });

    res.status(200).json({ message: "User login successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const checkAuth = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token found, please log in" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: "User authenticated" }); 
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const userLogOut = async (req, res) => {
  res.clearCookie('token');
  res.json({message:'User logged out'})
  res.status(200).json({message:"user log out successfully"})
};
