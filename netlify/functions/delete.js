
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { v2 as cloudinary } from "cloudinary";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Cloudinary config (server-side only)
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Delete API
// app.post("/delete", async (req, res) => {
//   try {
//     const { public_id, type = "image" } = req.body;

//     if (!public_id) {
//       return res.status(400).json({ error: "public_id is required" });
//     }

//     const result = await cloudinary.uploader.destroy(public_id, {
//       resource_type: type === "pdf" ? "raw" : "image",
//     });

//     res.json(result);
//   } catch (err) {
//     console.error("Delete error:", err);
//     res.status(500).json({ error: "Delete failed" });
//   }
// });

// // Start server (local only)
// app.listen(4000, () => {
//   console.log("Cloudinary delete API running on http://localhost:4000");
// });





import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const SECRET = process.env.DELETE_SECRET;

if (req.headers["x-delete-token"] !== SECRET) {
  return {
    statusCode: 401,
    body: JSON.stringify({ error: "Unauthorized" }),
  };
}


    const { public_id, type = "image" } = JSON.parse(event.body);

    console.log("DELETE REQUEST:", public_id, type);

    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: type === "pdf" ? "raw" : "image",
    });

    console.log("CLOUDINARY RESULT:", result);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("CLOUDINARY ERROR:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Delete failed",
        message: error.message,
      }),
    };
  }
}
