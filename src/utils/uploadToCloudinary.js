
// export const uploadToCloudinary = async (file, type = "image") => {
//   const uploadPreset =
//     type === "pdf"
//       ? import.meta.env.VITE_CLOUD_IMAGE_PRESET
//       : import.meta.env.VITE_CLOUD_IMAGE_PRESET;

//   const folder = type === "pdf" ? "coursePdfs" : "courseImages";

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", uploadPreset);
//   formData.append("folder", folder);

//   const res = await fetch(
//     `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/upload`,
//     {
//       method: "POST",
//       body: formData,
//     }
//   );

//   const data = await res.json();

//   if (!data.secure_url || !data.public_id) {
//     console.error("Upload failed:", data);
//     throw new Error("Cloudinary upload failed");
//   }

//   return {
//     url: data.secure_url,
//     public_id: data.public_id,
//     name: file.name,
//     type: type,
//   };
// };



export const uploadToCloudinary = async (file, type = "image") => {
  const uploadPreset =
    type === "pdf"
      ? import.meta.env.VITE_CLOUD_PDF_PRESET     // <-- PDF PRESET
      : import.meta.env.VITE_CLOUD_IMAGE_PRESET;  // <-- IMAGE PRESET

  const folder = type === "pdf" ? "coursePdfs" : "courseImages";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folder);

  // IMPORTANT: Use correct Cloudinary endpoint
  const endpoint =
    type === "pdf"
      ? `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/raw/upload`
      : `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`;

  const res = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!data.secure_url || !data.public_id) {
    console.error("Upload failed:", data);
    throw new Error("Cloudinary upload failed");
  }

  return {
    url: data.secure_url,
    public_id: data.public_id,
    name: data.original_filename || file.name,
    type,
  };
};

