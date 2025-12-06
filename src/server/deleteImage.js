
import express from "express";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/delete", async (req, res) => {
  try {
    const { public_id, resource_type } = req.body;

    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: resource_type || "image",
    });

    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

export default router;
