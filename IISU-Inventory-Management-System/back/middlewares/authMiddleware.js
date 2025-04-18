import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = (tokenKey) => (req, res, next) => {
  let token;

  if (tokenKey === "admin") token = req.cookies.adminToken; 
  else if (tokenKey === "faculty") token = req.cookies.facultyToken; 
  else if (tokenKey === "storeMan") token = req.cookies.storeManToken;
  else return res.status(401).json({ message: "Invalid token key" });
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, please log in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
