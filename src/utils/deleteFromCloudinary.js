
// export const deleteFromCloudinary = async (publicId, type = "image") => {
//   const API_URL = import.meta.env.VITE_DELETE_API; // backend URL

//   const res = await fetch(`${API_URL}/delete`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ public_id: publicId, type }),
//   });

//   const data = await res.json();

//   if (data.error) {
//     console.error("Cloudinary delete failed:", data);
//     throw new Error("Delete failed");
//   }

//   return data;
// };



export const deleteFromCloudinary = async (publicId, type = "image") => {
const API_URL = import.meta.env.VITE_DELETE_API;


const res = await fetch(`${API_URL}/delete`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ public_id: publicId, type }),
});


const data = await res.json();


if (data.error) {
console.error("Cloudinary delete failed:", data);
throw new Error("Cloudinary delete failed");
}


return data;
};
