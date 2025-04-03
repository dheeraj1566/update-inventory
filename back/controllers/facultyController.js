import Faculty from "../models/facultyModel.js";  
import bcrypt from "bcryptjs";  
import jwt from "jsonwebtoken";  

// Register Faculty  
export const registerFaculty = async (req, res) => {  
  try {  
    const { fname, lname, email, password } = req.body; 
    console.log(req.body);

    if (!fname || !lname || !email || !password) {  
      return res.status(400).json({ message: "All fields are required" });  
    }  

    const existingFaculty = await Faculty.findOne({ email });  
    if (existingFaculty) {  
      return res.status(400).json({ message: "Email already registered" });  
    }  

    const hashedPassword = await bcrypt.hash(password, 10);  

    const newFaculty = new Faculty({  
      fname,  
      lname,  
      email,  
      password: hashedPassword,  
    });  

    await newFaculty.save();  
    res.status(201).json({ message: "Faculty registered successfully" });  
  } catch (error) {  
    console.error("Error registering faculty:", error);  
    res.status(500).json({ message: "Server error", error: error.message });  
  }  
};  

// Faculty Login  
export const loginFaculty = async (req, res) => {  
  try {  
    const { email, password } = req.body;  

    if (!email || !password) {  
      return res.status(400).json({ message: "All fields are required" });  
    }  

    const faculty = await Faculty.findOne({ email });  
    if (!faculty) {  
      return res.status(400).json({ message: "Invalid credentials" });  
    }  

    const isMatch = await bcrypt.compare(password, faculty.password);  
    if (!isMatch) {  
      return res.status(400).json({ message: "Invalid credentials" });  
    }  

    const token = jwt.sign({ id: faculty._id }, process.env.JWT_SECRET, {  
      expiresIn: "2h",  
    });  

    res.cookie("facultyToken", token, { httpOnly: true, secure: true, sameSite: "None" });  
    res.status(200).json({ message: "Login successful", token });  
  } catch (error) {  
    console.error("Error logging in faculty:", error);  
    res.status(500).json({ message: "Server error", error: error.message });  
  }  
};  

// Check Auth Token  
export const checkFacultyAuth = async (req, res) => {  
  try {  
    const token = req.cookies.facultyToken;  
    if (!token) {  
      return res.status(401).json({ message: "Unauthorized" });  
    }  

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {  
      if (err) {  
        return res.status(401).json({ message: "Invalid token" });  
      }  
      res.status(200).json({ message: "Authorized", facultyId: decoded.id });  
    });  
  } catch (error) {  
    console.error("Error checking faculty auth:", error);  
    res.status(500).json({ message: "Server error", error: error.message });  
  }  
};  

// Faculty Logout  
export const logoutFaculty = (req, res) => {  
  try {  
    res.clearCookie("facultyToken");  
    res.status(200).json({ message: "Logout successful" });  
  } catch (error) {  
    console.error("Error logging out faculty:", error);  
    res.status(500).json({ message: "Server error", error: error.message });  
  }  
};  
