import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

export async function uploadToCloudinary(req) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "inventory",
    });

    return result.secure_url;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading image to Cloudinary" });
  }
}
