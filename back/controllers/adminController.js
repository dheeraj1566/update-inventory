import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import usermodel from "../models/usermodel.js";

export const registerAdmin = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    let faculty = await usermodel.findOne({ email });
    if (faculty) return res.status(400).json({ message: "Faculty already exists" });
    console.log("password"+ password)
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed"+hashedPassword);
    faculty = new usermodel({ fname, lname, email, password: hashedPassword });
    await faculty.save();
    res.status(200).json({ message: "Faculty registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
  
// export const loginFaculty = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const faculty = await usermodel.findOne({ email });

//     if (!faculty) {
//       return res.status(404).json({ message: "Faculty not found! Please register first." });
//     }

//     const isMatch = await bcrypt.compare(password, faculty.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ facultyId: faculty._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.cookie("token", token, {
//       httpOnly: true, 
//       secure: process.env.NODE_ENV === "production", 
//       sameSite: "strict",
//       maxAge: 2 * 60 * 60 * 1000, 
//     });

//     res.status(200).json({ message: "Faculty login successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// export const checkAdmin = async (req, res) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ message: "No token found, please log in" });
//   }

//   try {
//     jwt.verify(token, process.env.JWT_SECRET);
//     res.status(200).json({ message: "Faculty authenticated" }); 
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

export const adminLogOut = async (req, res) => {
  res.clearCookie('token');
  res.json({message:'Admin logged out'})
  res.status(200).json({message:"Admin log out successfully"})
};

