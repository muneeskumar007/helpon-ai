
// export const uploadToCloudinary = async (file, folder) => {
//   const cloudName = "ddaopgpf9";
//   const uploadPreset = "HelpOn";

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", uploadPreset);
//   formData.append("folder", folder);

//   const res = await fetch(
//     `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
//     {
//       method: "POST",
//       body: formData,
//     }
//   );

//   const data = await res.json();
//   return data.secure_url; // this URL is permanent CDN link
// };





export const uploadToCloudinary = async (file, type = "image") => {
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/ddaopgpf9/auto/upload"; // unsigned preset endpoint
const UPLOAD_PRESET = "HelpOn";


const formData = new FormData();
formData.append("file", file);
formData.append("upload_preset", UPLOAD_PRESET);


if (type === "pdf") formData.append("resource_type", "raw");


const res = await fetch(CLOUDINARY_URL, {
method: "POST",
body: formData,
});


const data = await res.json();


if (!res.ok) {
console.error("Upload failed:", data);
throw new Error("Cloudinary upload failed");
}


return {
public_id: data.public_id,
secure_url: data.secure_url,
original_filename: data.original_filename,
};
};
