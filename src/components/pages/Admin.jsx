


// import { useEffect, useState } from "react";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
//   doc,
//   query,
//   where,
// } from "firebase/firestore";
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   deleteObject,
// } from "firebase/storage";
// import { db, storage } from "../../firebase";
// import "./Admin.css";
// import LightRays from "../../Backgrounds/LightRays/LightRays";

// import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

// export default function Admin() {
//   const [courses, setCourses] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     year: "",
//     department: "",
//     section: "",
//     adviser: "",
//     images: [],
//     pdfs: [],
//   });
//   const [editId, setEditId] = useState(null);

//   // 🔹 Password protection
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [passwordInput, setPasswordInput] = useState("");

//   // 🔹 Staff info
//   const staffInfo = JSON.parse(localStorage.getItem("staff"));

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchCourses();
//     }
//   }, [isAuthenticated]);

//   // 🔹 Fetch courses
//   const fetchCourses = async () => {
//     const q = staffInfo
//       ? query(
//           collection(db, "courses"),
//           where("department", "==", staffInfo.department),
//           where("section", "==", staffInfo.section)
//         )
//       : collection(db, "courses");

//     const snapshot = await getDocs(q);
//     setCourses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//   };

  
// const uploadFiles = async (files, folder) => {
//   const uploaded = [];
//   for (const file of files) {
//     const uploadedFile = await uploadToCloudinary(file, folder);
//     uploaded.push(uploadedFile);
//   }
//   return uploaded;
// };

//   // 🔹 Add / Update course
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let uploadedImages = [];
//     let uploadedPdfs = [];

//     if (form.images?.length) {
//       uploadedImages = await uploadFiles(form.images, "courseImages");
//     }
//     if (form.pdfs?.length) {
//       uploadedPdfs = await uploadFiles(form.pdfs, "coursePDFs");
//     }

//     const courseData = {
//       name: form.name,
//       description: form.description,
//       year: form.year,
//       department: form.department,
//       section: form.section,
//       adviser: form.adviser,
//       images: uploadedImages,
//       pdfs: uploadedPdfs,
//       createdBy: staffInfo?.name || "Unknown",
//       createdAt: new Date(),
//     };

//     if (editId) {
//       await updateDoc(doc(db, "courses", editId), courseData);
//     } else {
//       await addDoc(collection(db, "courses"), courseData);
//     }

//     alert("✅ Course saved successfully!");
//     setForm({
//       name: "",
//       description: "",
//       year: "",
//       department: staffInfo?.department || "",
//       section: staffInfo?.section || "",
//       adviser: "",
//       images: [],
//       pdfs: [],
//     });
//     setEditId(null);
//     fetchCourses();
//   };

//   // 🔹 Edit
// const handleEdit = (course) => {
//   setForm({
//     ...course,
//     imageFiles: [], // new uploads will go here
//     pdfFiles: []    // new uploads will go here
//   });

//   setEditId(course.id);
// };

// const deleteImageFromCloudinary = async (publicId) => {
//   const formData = new FormData();
//   formData.append("public_id", publicId);
//   formData.append("upload_preset", process.env.REACT_APP_DELETE_PRESET);

//   await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/destroy`, {
//     method: "POST",
//     body: formData,
//   });
// };





//   // 🔹 Delete
//   const handleDelete = async (course) => {
//   if (course.images?.length > 0) {
//     for (const img of course.images) {
//       await deleteImageFromCloudinary(img.public_id);
//     }
//   }

//   await deleteDoc(doc(db, "courses", course.id));
//   fetchCourses();
// };

//   // 🔹 Password form
//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (passwordInput === "2311") {
//       setIsAuthenticated(true);
//     } else {
//       alert("Incorrect password!");
//     }
//   };

//   // 🔹 If not logged in
//   if (!isAuthenticated) {
//     return (
//       <div className="relative min-h-screen flex items-center justify-center bg-gray-700">
//         <div className="absolute ray inset-0 -z-10">
//           <LightRays />
//         </div>
//         <div className="key p-6 max-w-md w-full shadow-xl rounded-2xl bg-white">
//           <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//             Admin Access
//           </h2>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <input
//               type="password"
//               placeholder="Enter Admin Password"
//               value={passwordInput}
//               onChange={(e) => setPasswordInput(e.target.value)}
//               className="w-full focus:ring-amber-600 text-2xl focus:bg-amber-500 border-r-amber-200 rounded-lg text-gray-900 px-3 py-2 focus:ring-2 focus:outline-none placeholder-gray-300"
//             />
//             <button
//               type="submit"
//               className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
//             >
//               Enter
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   // 🔹 Authenticated view
//   return (
//     <div className="relative min-h-screen bg-gray-700 p-6">
//       <div className="absolute ray inset-0 -z-10">
//         <LightRays />
//       </div>
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-3xl font-extrabold mb-6 text-amber-700">
//           Admin Panel{" "}
//           {staffInfo
//             ? `- ${staffInfo.department} (${staffInfo.section})`
//             : ""}
//         </h2>

//         {/* --- Course Form --- */}
//         <div className="bg-white shadow-2xl rounded-xl p-6 mb-8">
//           <form
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1  md:grid-cols-2 gap-4"
//           >
//             <input
//               type="text"
              
//               placeholder="Course Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className=" input w-full bg-orange-400 text-black border border-gray-300 rounded-lg px-3 py-2 focus:placeholder:text-blue-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-500"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Year (e.g. 3rd)"
//               value={form.year}
//               onChange={(e) => setForm({ ...form, year: e.target.value })}
//               className="w-full input border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:placeholder:text-blue-50 focus:ring-indigo-500 focus:outline-none placeholder-gray-500"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Department"
//               value={form.department}
//               onChange={(e) => setForm({ ...form, department: e.target.value })}
//               className="w-full input  border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:placeholder:text-blue-50 focus:ring-indigo-500 focus:outline-none placeholder-gray-500"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Section"
//               value={form.section}
//               onChange={(e) => setForm({ ...form, section: e.target.value })}
//               className="w-full input border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:placeholder:text-blue-50 focus:ring-indigo-500 focus:outline-none placeholder-gray-500"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Adviser"
//               value={form.adviser}
//               onChange={(e) => setForm({ ...form, adviser: e.target.value })}
//               className="w-full input border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:placeholder:text-blue-50 focus:ring-indigo-500 focus:outline-none placeholder-gray-500"
//               required
//             />
//             <textarea
//               placeholder="Description"
//               value={form.description}
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//               className="w-full input  border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:placeholder:text-blue-50 focus:ring-indigo-500 focus:outline-none placeholder-gray-500 col-span-1 md:col-span-2"
//             />

//             {/* 🔹 Upload Fields */}
//             <div className="col-span-1 md:col-span-2">
//               <label className="block font-semibold mb-1  text-gray-700">
//                 Upload Course Images
//               </label>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={(e) =>
//                   setForm({ ...form, images: Array.from(e.target.files) })
//                 }
//                 className="w-full border file border-gray-300 rounded-lg p-2 focus:placeholder:text-blue-50 text-gray-600"
//               />
//             </div>

//             <div className="col-span-1 md:col-span-2">
//               <label className="block font-semibold mb-1 text-gray-700">
//                 Upload Course PDFs
//               </label>
//               <input
//                 type="file"
//                 multiple
//                 accept="application/pdf"
//                 onChange={(e) =>
//                   setForm({ ...form, pdfs: Array.from(e.target.files) })
//                 }
//                 className="w-full border file border-gray-300 rounded-lg p-2 focus:placeholder:text-blue-50 text-gray-600"
//               />
//             </div>

//             <div className="col-span-1 md:col-span-2 flex justify-end">
//               <button
//                 type="submit"
//                 className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
//               >
//                 {editId ? "Update Course" : "Add Course"}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* --- Course List --- */}
//         <h3 className="text-2xl font-bold mb-4 text-gray-800">Courses</h3>
//         <div className="grid gap-4 md:grid-cols-2">
//           {courses.map((course) => (
//             <div
//               key={course.id}
//               className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between"
//             >
//               <div>
//                 <h4 className="font-bold text-lg text-indigo-700">
//                   {course.name}
//                 </h4>
//                 <p className="text-gray-600 text-sm mt-1">
//                   {course.description}
//                 </p>

//                 {/* Preview of uploaded materials */}
//                 {course.images?.length > 0 && (
//                   <div className="mt-3 grid grid-cols-3 gap-2">
//                     {course.images.slice(0, 3).map((img, i) => (
//                       <img
//                         key={i}
//                         src={img.url}
//                         alt={img.name}
//                         className="w-full h-20 object-cover rounded-lg"
//                       />
//                     ))}
//                   </div>
//                 )}
//                 {course.pdfs?.length > 0 && (
//                   <p className="mt-2 text-sm text-gray-500">
//                     {course.pdfs.length} PDF(s) uploaded
//                   </p>
//                 )}
//               </div>
//               <div className="flex justify-end mt-4 space-x-2">
//                 <button
//                   onClick={() => handleEdit(course)}
//                   className="px-4 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(course)}
//                   className="px-4 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }





// import { useEffect, useState } from "react";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
//   doc,
//   query,
//   where,
// } from "firebase/firestore";
// import { db } from "../../firebase";
// import "./Admin.css";
// import LightRays from "../../Backgrounds/LightRays/LightRays";

// import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
// import { deleteFromCloudinary } from "../../utils/deleteFromCloudinary";

// import useFileUpload from "./useFileUpload";

// export default function Admin() {
//   const [courses, setCourses] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     year: "",
//     department: "",
//     section: "",
//     adviser: "",
//     images: [],
//     pdfs: [],
//     imageFiles: [],
//     pdfFiles: [],
//   });

//   const [editId, setEditId] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [passwordInput, setPasswordInput] = useState("");

//   const staffInfo = JSON.parse(localStorage.getItem("staff"));

//   useEffect(() => {
//     if (isAuthenticated) fetchCourses();
//   }, [isAuthenticated]);

//   // -------------------------
//   // FETCH COURSES
//   // -------------------------
//   const fetchCourses = async () => {
//     const q = staffInfo
//       ? query(
//           collection(db, "courses"),
//           where("department", "==", staffInfo.department),
//           where("section", "==", staffInfo.section)
//         )
//       : collection(db, "courses");

//     const snapshot = await getDocs(q);
//     setCourses(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
//   };

//   // -------------------------
//   // UPLOAD FILES
//   // -------------------------

// const uploadFiles = async (files, fileType) => {
// const uploaded = [];
// for (const file of files) {
// const result = await uploadToCloudinary(file, fileType);
// uploaded.push(result);



// }
// return uploaded;
// };




// // -------------------------
// // SAVE COURSE (ADD OR UPDATE)
// // -------------------------
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   let newImages = [];
//   let newPdfs = [];

//   if (form.imageFiles.length > 0) {
//     newImages = await uploadFiles(form.imageFiles, "image");
//   }

//   if (form.pdfFiles.length > 0) {
//     newPdfs = await uploadFiles(form.pdfFiles, "pdf");
//   }

//   const courseData = {
//     name: form.name,
//     description: form.description,
//     year: form.year,
//     department: form.department,
//     section: form.section,
//     adviser: form.adviser,
//     images: [...form.images, ...newImages],
//     pdfs: [...form.pdfs, ...newPdfs],
//     createdBy: staffInfo?.name || "Unknown",
//     updatedAt: new Date(),
//   };

//   if (editId) {
//     await updateDoc(doc(db, "courses", editId), courseData);
//   } else {
//     await addDoc(collection(db, "courses"), {
//       ...courseData,
//       createdAt: new Date(),
//     });
//   }

//   alert("Course saved successfully!");
//   setEditId(null);
//   setForm({
//     name: "",
//     description: "",
//     year: "",
//     department: staffInfo?.department || "",
//     section: staffInfo?.section || "",
//     adviser: "",
//     images: [],
//     pdfs: [],
//     imageFiles: [],
//     pdfFiles: [],
//   });

//   fetchCourses();
// };

//   const handleDelete = async (course) => {
//   if (!window.confirm("Delete this course completely?")) return;

//   try {
//     if (course.images?.length) {
//       for (const img of course.images) {
//         await deleteFromCloudinary(img.public_id, "image");
//       }
//     }

//     if (course.pdfs?.length) {
//       for (const pdf of course.pdfs) {
//         await deleteFromCloudinary(pdf.public_id, "raw");
//       }
//     }

//     await deleteDoc(doc(db, "courses", course.id));

//     fetchCourses();
//   } catch (err) {
//     console.error("Delete failed:", err);
//   }
// };


// // -------------------------
// // DELETE SINGLE PDF OR IMAGE
// // -------------------------
// const handleFileDelete = async (courseId, file, type = "pdf") => {
// if (!window.confirm(`Delete this ${type.toUpperCase()} file?`)) return;


// try {
// await deleteFromCloudinary(file.public_id, type === "pdf" ? "raw" : "image");


// const courseRef = doc(db, "courses", courseId);
// const snap = await getDocs(collection(db, "courses"));
// const course = snap.docs.find((d) => d.id === courseId)?.data();


// if (!course) return;


// const updatedFiles =
// type === "pdf"
// ? course.pdfs.filter((p) => p.public_id !== file.public_id)
// : course.images.filter((i) => i.public_id !== file.public_id);


// await updateDoc(courseRef, {
// [type === "pdf" ? "pdfs" : "images"]: updatedFiles,
// updatedAt: new Date(),
// });


// alert(`${type.toUpperCase()} deleted successfully`);
// fetchCourses();
// } catch (err) {
// console.error("Delete failed:", err);
// }
// };

//   // -------------------------
//   // LOGIN CHECK
//   // -------------------------
//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (passwordInput === "2311") {
//       setIsAuthenticated(true);
//     } else alert("Incorrect password!");
//   };

//   // -------------------------
//   // LOGIN PAGE
//   // -------------------------
//   if (!isAuthenticated) {
//     return (
//       <div className="relative min-h-screen flex items-center justify-center bg-gray-700">
//         <LightRays />
//         <div className="key p-6 max-w-md w-full shadow-xl rounded-2xl bg-white">
//           <h2 className="text-2xl font-bold mb-6 text-center">Admin Access</h2>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <input
//               type="password"
//               placeholder="Enter Admin Password"
//               className="w-full text-2xl px-3 py-2 border rounded-lg"
//               value={passwordInput}
//               onChange={(e) => setPasswordInput(e.target.value)}
//             />
//             <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
//               Enter
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   // -------------------------
//   // MAIN ADMIN PANEL
//   // -------------------------
//   return (
//     <div className="relative min-h-screen bg-gray-700 p-6">
//       {/* <LightRays /> */}
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-3xl font-extrabold mb-6 text-amber-700">
//           Admin Panel
//         </h2>

//         {/* FORM */}
//         <div className="bg-white shadow-2xl rounded-xl p-6 mb-8">
//           <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
//             {/* inputs */}
//             <input className="input" placeholder="Course Name" value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })} />

//             <input className="input" placeholder="Year" value={form.year}
//               onChange={(e) => setForm({ ...form, year: e.target.value })} />

//             <input className="input" placeholder="Department" value={form.department}
//               onChange={(e) => setForm({ ...form, department: e.target.value })} />

//             <input className="input" placeholder="Section" value={form.section}
//               onChange={(e) => setForm({ ...form, section: e.target.value })} />

//             <input className="input" placeholder="Adviser" value={form.adviser}
//               onChange={(e) => setForm({ ...form, adviser: e.target.value })} />

//             <textarea className="col-span-2 input" placeholder="Description" value={form.description}
//               onChange={(e) => setForm({ ...form, description: e.target.value })} />

//             {/* Image Upload */}
//             <div className="col-span-2">
//               <label className="font-semibold">Upload Images</label>
//               <input type="file" multiple accept="image/*"
//                 onChange={(e) => setForm({ ...form, imageFiles: [...e.target.files] })} />
//             </div>

//             {/* PDF Upload */}
//             <div className="col-span-2">
//               <label className="font-semibold">Upload PDFs</label>
//               <input type="file" multiple accept="application/pdf"
//                 onChange={(e) => setForm({ ...form, pdfFiles: [...e.target.files] })} />
//             </div>

//             <div className="col-span-2 flex justify-end">
//               <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
//                 {editId ? "Update Course" : "Add Course"}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Course List */}
//         <h3 className="text-2xl font-bold mb-4 text-gray-200">Courses</h3>
//         <div className="grid gap-4 md:grid-cols-2">
//           {courses.map((course) => (
//             <div key={course.id} className="bg-white p-4 rounded-xl shadow-md">
//               <h4 className="font-bold text-lg">{course.name}</h4>
//               <p className="text-gray-600">{course.description}</p>
// {/* IMAGES */}
// {course.images?.length > 0 && (
// <div className="mt-3">
// <h4 className="font-semibold mb-1">Images</h4>
// <div className="grid grid-cols-3 gap-2">
// {course.images.map((img, i) => (
  
// <div key={i} className="relative">
// <img
// src={img.url}
// alt={img.original_filename || "Image"}
// className="w-full h-20 object-cover rounded"
// />
// <button
// className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
// onClick={() => handleFileDelete(course.id, img, "image")}
// >
// X
// </button>
// </div>
// ))}
// </div>
// </div>
// )}


// {/* PDF FILES */}
// {course.pdfs?.length > 0 && (
// <div className="mt-4">
// <h4 className="font-semibold mb-1">PDF Files</h4>
// <ul className="space-y-2">
// {course.pdfs.map((pdf, i) => (
// <li key={i} className="flex justify-between items-center bg-gray-100 p-2 rounded">
// <a
// href={pdf.url}
// target="_blank"
// rel="noopener noreferrer"
// className="text-indigo-700 font-medium underline"
// >
// {pdf.original_filename || "PDF File"}
// </a>


// <button
// className="bg-red-600 text-white text-xs px-3 py-1 rounded"
// onClick={() => handleFileDelete(course.id, pdf, "pdf")}
// >
// Delete
// </button>
// </li>
// ))}
// </ul>
// </div>
// )}


//               <div className="flex justify-end gap-2 mt-4">
//                 <button className="px-4 py-1 bg-yellow-500 text-white rounded"
//                   onClick={() => handleEdit(course)}>Edit</button>

//                 <button className="px-4 py-1 bg-red-600 text-white rounded"
//                   onClick={() => handleDelete(course)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }




// // src/components/pages/Admin.jsx
// import { useEffect, useState } from "react";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
//   doc,
//   query,
//   where,
// } from "firebase/firestore";
// import { db } from "../../firebase";
// import "./Admin.css";
// import LightRays from "../../Backgrounds/LightRays/LightRays";
// import { deleteFromCloudinary } from "../../utils/deleteFromCloudinary";

// // NOTE: we keep uploadToCloudinary for simple uploads without progress, but
// // for progress UI we use the XHR-based uploadWithProgress below.
// export default function Admin() {
//   const [courses, setCourses] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     year: "",
//     department: "",
//     section: "",
//     adviser: "",
//     images: [],
//     pdfs: [],
//     imageFiles: [],
//     pdfFiles: [],
//   });

//   const [editId, setEditId] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [passwordInput, setPasswordInput] = useState("");

//   const [uploadProgress, setUploadProgress] = useState(0);

//   // progress state: { images: { filename: percent }, pdfs: { filename: percent } }
//   const [progress, setProgress] = useState({ images: {}, pdfs: {} });

//   const staffInfo = JSON.parse(localStorage.getItem("staff"));

//   useEffect(() => {
//     if (isAuthenticated) fetchCourses();
//   }, [isAuthenticated]);

//   const fetchCourses = async () => {
//     const q = staffInfo
//       ? query(
//           collection(db, "courses"),
//           where("department", "==", staffInfo.department),
//           where("section", "==", staffInfo.section)
//         )
//       : collection(db, "courses");

//     const snapshot = await getDocs(q);
//     setCourses(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
//   };

//   // XHR uploader that supports progress
//   const uploadWithProgress = (file, fileType, onProgress) =>
//     new Promise((resolve, reject) => {
//       try {
//         const formData = new FormData();
//         const preset =
//           fileType === "pdf"
//             ? import.meta.env.VITE_CLOUD_PDF_PRESET
//             : import.meta.env.VITE_CLOUD_IMAGE_PRESET;
//         const folder = fileType === "pdf" ? "coursePdfs" : "courseImages";

//         formData.append("file", file);
//         formData.append("upload_preset", preset);
//         formData.append("folder", folder);

//         const endpoint =
//           fileType === "pdf"
//             ? `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/raw/upload`
//             : `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`;

//         const xhr = new XMLHttpRequest();
//         xhr.open("POST", endpoint);

//         xhr.upload.onprogress = (e) => {
//           if (e.lengthComputable) {
//             const percent = Math.round((e.loaded / e.total) * 100);
//             onProgress(percent);
//           }
//         };

//         xhr.onload = () => {
//           if (xhr.status >= 200 && xhr.status < 300) {
//             try {
//               const data = JSON.parse(xhr.responseText);
//               if (!data.secure_url || !data.public_id) {
//                 console.error("Upload response:", data);
//                 reject(new Error("Cloudinary upload returned unexpected data"));
//                 return;
//               }
//               resolve({
//                 url: data.secure_url,
//                 public_id: data.public_id,
//                 name: data.original_filename || file.name,
//                 type: fileType,
//               });
//             } catch (err) {
//               reject(err);
//             }
//           } else {
//             try {
//               const errData = JSON.parse(xhr.responseText || "{}");
//               console.error("Upload failed:", errData);
//             } catch {}
//             reject(new Error(`Upload failed with status ${xhr.status}`));
//           }
//         };

//         xhr.onerror = () => reject(new Error("Network error during upload"));
//         xhr.send(formData);
//       } catch (err) {
//         reject(err);
//       }
//     });

//   // Accepts FileList/array and fileType 'image'|'pdf'
//   const uploadFiles = async (files, fileType) => {
//     const uploaded = [];
//     for (const file of files) {
//       // set initial 0% for UI
//       setProgress((p) => ({
//         ...p,
//         [fileType === "pdf" ? "pdfs" : "images"]: {
//           ...p[fileType === "pdf" ? "pdfs" : "images"],
//           [file.name]: 0,
//         },
//       }));

//       const item = await uploadWithProgress(
//         file,
//         fileType === "pdf" ? "pdf" : "image",
//         (percent) =>
//           setProgress((p) => ({
//             ...p,
//             [fileType === "pdf" ? "pdfs" : "images"]: {
//               ...p[fileType === "pdf" ? "pdfs" : "images"],
//               [file.name]: percent,
//             },
//           }))
//       );

//       // remove progress entry after done (optional small delay)
//       setProgress((p) => {
//         const copy = { ...p };
//         const key = fileType === "pdf" ? "pdfs" : "images";
//         if (copy[key]) delete copy[key][file.name];
//         return copy;
//       });

//       uploaded.push(item);
//     }
//     return uploaded;
//   };

//   // add or update course
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       let newImages = [];
//       let newPdfs = [];

//       if (form.imageFiles && form.imageFiles.length > 0) {
//         newImages = await uploadFiles(form.imageFiles, "image");
//       }
//       if (form.pdfFiles && form.pdfFiles.length > 0) {
//         newPdfs = await uploadFiles(form.pdfFiles, "pdf");
//       }

//       const courseData = {
//         name: form.name,
//         description: form.description,
//         year: form.year,
//         department: form.department,
//         section: form.section,
//         adviser: form.adviser,
//         images: [...(form.images || []), ...newImages],
//         pdfs: [...(form.pdfs || []), ...newPdfs],
//         createdBy: staffInfo?.name || "Unknown",
//         updatedAt: new Date(),
//       };

//       if (editId) {
//         await updateDoc(doc(db, "courses", editId), courseData);
//       } else {
//         await addDoc(collection(db, "courses"), {
//           ...courseData,
//           createdAt: new Date(),
//         });
//       }

//       alert("Course saved successfully!");
//       setEditId(null);
//       setForm({
//         name: "",
//         description: "",
//         year: "",
//         department: staffInfo?.department || "",
//         section: staffInfo?.section || "",
//         adviser: "",
//         images: [],
//         pdfs: [],
//         imageFiles: [],
//         pdfFiles: [],
//       });

//       fetchCourses();
//     } catch (err) {
//       console.error("Save failed:", err);
//       alert("Failed to save course. See console.");
//     }
//   };

//   const handleEdit = (course) => {
//     // keep existing arrays (images,pdfs) to show current files; new uploads go into file arrays
//     setForm({
//       ...course,
//       imageFiles: [],
//       pdfFiles: [],
//     });
//     setEditId(course.id);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (course) => {
//     if (!window.confirm("Delete this course completely?")) return;
//     try {
//       if (course.images?.length) {
//         for (const img of course.images) {
//           await deleteFromCloudinary(img.public_id, "image");
//         }
//       }
//       if (course.pdfs?.length) {
//         for (const pdf of course.pdfs) {
//           await deleteFromCloudinary(pdf.public_id, "raw");
//         }
//       }
//       await deleteDoc(doc(db, "courses", course.id));
//       fetchCourses();
//     } catch (err) {
//       console.error("Delete failed:", err);
//       alert("Delete failed — see console.");
//     }
//   };

//   // Delete single file (image/pdf) from Cloudinary + Firestore array
//   const handleFileDelete = async (courseId, file, type = "pdf") => {
//     if (!window.confirm(`Delete this ${type.toUpperCase()} file?`)) return;

//     try {
//       await deleteFromCloudinary(file.public_id, type === "pdf" ? "raw" : "image");

//       const courseRef = doc(db, "courses", courseId);
//       const snapshot = await getDocs(collection(db, "courses"));
//       const course = snapshot.docs.find((d) => d.id === courseId)?.data();
//       if (!course) return;

//       const updatedFiles =
//         type === "pdf"
//           ? course.pdfs.filter((p) => p.public_id !== file.public_id)
//           : course.images.filter((i) => i.public_id !== file.public_id);

//       await updateDoc(courseRef, {
//         [type === "pdf" ? "pdfs" : "images"]: updatedFiles,
//         updatedAt: new Date(),
//       });

//       fetchCourses();
//       alert(`${type.toUpperCase()} deleted`);
//     } catch (err) {
//       console.error("Delete failed:", err);
//       alert("Failed to delete file.");
//     }
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (passwordInput === "2311") {
//       setIsAuthenticated(true);
//     } else alert("Incorrect password!");
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="relative min-h-screen flex items-center justify-center bg-gray-700">
//         <LightRays />
//         <div className="key p-6 max-w-md w-full shadow-xl rounded-2xl bg-white">
//           <h2 className="text-2xl font-bold mb-6 text-center">Admin Access</h2>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <input
//               type="password"
//               placeholder="Enter Admin Password"
//               className="w-full text-2xl px-3 py-2 border rounded-lg"
//               value={passwordInput}
//               onChange={(e) => setPasswordInput(e.target.value)}
//             />
//             <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
//               Enter
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   // ---------- UI ----------
//   return (
//     <div className="relative min-h-screen bg-gray-700 p-6">
//       {/* <LightRays /> */}
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-3xl font-extrabold mb-6 text-amber-700">Admin Panel</h2>

//         {/* FORM */}
//         <div className="bg-white shadow-2xl rounded-xl p-6 mb-8">
//           <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
//             <input
//               className="input"
//               placeholder="Course Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />
//             <input
//               className="input"
//               placeholder="Year"
//               value={form.year}
//               onChange={(e) => setForm({ ...form, year: e.target.value })}
//             />
//             <input
//               className="input"
//               placeholder="Department"
//               value={form.department}
//               onChange={(e) => setForm({ ...form, department: e.target.value })}
//             />
//             <input
//               className="input"
//               placeholder="Section"
//               value={form.section}
//               onChange={(e) => setForm({ ...form, section: e.target.value })}
//             />
//             <input
//               className="input"
//               placeholder="Adviser"
//               value={form.adviser}
//               onChange={(e) => setForm({ ...form, adviser: e.target.value })}
//             />
//             <textarea
//               className="col-span-2 input"
//               placeholder="Description"
//               value={form.description}
//               onChange={(e) => setForm({ ...form, description: e.target.value })}
//             />

//             {/* Image Upload */}
//             <div className="col-span-2">
//               <label className="font-semibold">Upload Images</label>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={(e) => setForm({ ...form, imageFiles: [...e.target.files] })}
//               />

//               {/* show progress per selected file */}
//               {form.imageFiles?.length > 0 && (
//                 <div className="mt-2 space-y-1">
//                   {Array.from(form.imageFiles).map((f) => (
//                     <div key={f.name} className="text-sm">
//                       {f.name} — {progress.images[f.name] ?? 0}%
//                       <div className="w-full bg-gray-200 rounded h-2 mt-1">
//                         <div
//                           style={{ width: `${progress.images[f.name] ?? 0}%` }}
//                           className="h-2 bg-indigo-600 rounded"
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* PDF Upload */}
//             <div className="col-span-2">
//               <label className="font-semibold">Upload PDFs</label>
//               <input
//                 type="file"
//                 multiple
//                 accept="application/pdf"
//                 onChange={(e) => setForm({ ...form, pdfFiles: [...e.target.files] })}
//               />

//               {form.pdfFiles?.length > 0 && (
//                 <div className="mt-2 space-y-1">
//                   {Array.from(form.pdfFiles).map((f) => (
//                     <div key={f.name} className="text-sm">
//                       {f.name} — {progress.pdfs[f.name] ?? 0}%
//                       <div className="w-full bg-gray-200 rounded h-2 mt-1">
//                         <div
//                           style={{ width: `${progress.pdfs[f.name] ?? 0}%` }}
//                           className="h-2 bg-indigo-600 rounded"
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="col-span-2 flex justify-end">
//               <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
//                 {editId ? "Update Course" : "Add Course"}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Course List */}
//         <h3 className="text-2xl font-bold mb-4 text-gray-200">Courses</h3>
//         <div className="grid gap-4 md:grid-cols-2">
//           {courses.map((course) => (
//             <div key={course.id} className="bg-white p-4 rounded-xl shadow-md">
//               <h4 className="font-bold text-lg">{course.name}</h4>
//               <p className="text-gray-600">{course.description}</p>

//               {/* IMAGES */}
//               {course.images?.length > 0 && (
//                 <div className="mt-3">
//                   <h4 className="font-semibold mb-1">Images</h4>
//                   <div className="grid grid-cols-3 gap-2">
//                     {course.images.map((img, i) => (
//                       <div key={i} className="relative">
//                        <img
//   src={img.url}
//   alt={img.name || "Image"}
//   className="w-full h-20 object-cover rounded cursor-pointer"
//   onClick={() => window.open(img.url, "_blank")}
// />

//                         <button
//                           className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
//                           onClick={() => handleFileDelete(course.id, img, "image")}
//                         >
//                           X
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* PDF FILES */}
//               {course.pdfs?.length > 0 && (
//                 <div className="mt-4">
//                   <h4 className="font-semibold mb-1">PDF Files</h4>
//                   <ul className="space-y-2">
//                     {course.pdfs.map((pdf, i) => (
//                       <li key={i} className="flex justify-between items-center bg-gray-100 p-2 rounded">
//                      <a
//                       href={pdf.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-indigo-700 font-medium underline"
//                     >
                      
//                       {pdf.name || "PDF File"}
                      
//                     </a>

//                         <div className="flex gap-2">
//                           <button
//                             className="bg-blue-600 text-white text-xs px-3 py-1 rounded"
//                             onClick={() => window.open(pdf.url, "_blank")}
//                           >
//                             View
//                           </button>
//                           <button
//                             className="bg-red-600 text-white text-xs px-3 py-1 rounded"
//                             onClick={() => handleFileDelete(course.id, pdf, "pdf")}
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
// {uploadProgress > 0 && (
//   <div className="col-span-2 mt-2">
//     <div className="w-full bg-gray-300 h-2 rounded">
//       <div
//         className="bg-green-600 h-2 rounded"
//         style={{ width: `${uploadProgress}%` }}
//       ></div>
//     </div>
//     <p className="text-sm text-white mt-1">{uploadProgress}%</p>
//   </div>
// )}

//               <div className="flex justify-end gap-2 mt-4">
//                 <button
//                   className="px-4 py-1 bg-yellow-500 text-white rounded"
//                   onClick={() => handleEdit(course)}
//                 >
//                   Edit
//                 </button>

//                 <button
//                   className="px-4 py-1 bg-red-600 text-white rounded"
//                   onClick={() => handleDelete(course)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}

//           {/* DEV / quick-test card: uses the uploaded local file path you provided */}
//           {courses.length === 0 && (
//             <div className="bg-white p-4 rounded-xl shadow-md">
//               <h4 className="font-bold text-lg mb-2">(dev) test image</h4>
//               <img
//                 src={"/mnt/data/Screenshot 2025-12-06 164316.png"}
//                 alt="dev-screenshot"
//                 className="w-full h-40 object-contain rounded"
//               />
//               <p className="text-sm text-gray-500 mt-2">Local test image path (dev)</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }






// src/components/pages/Admin.jsx
import { useEffect, useState } from "react";
;
import {
  collection,
  query,
  where,
  
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs
} from "firebase/firestore";



import { db } from "../../firebase";
import "./Admin.css";
import LightRays from "../../Backgrounds/LightRays/LightRays";
import { deleteFromCloudinary } from "../../utils/deleteFromCloudinary";

// Admin panel with progress uploads and file delete
export default function Admin() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    year: "",
    department: "",
    section: "",
    adviser: "",
    subject: "",        // ✅ ADD THIS
  subjects: {}, 
    
    images: [],
    pdfs: [],
    imageFiles: [],
    pdfFiles: [],
  });

  const [editId, setEditId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  // progress state: { images: { filename: percent }, pdfs: { filename: percent } }
  const [progress, setProgress] = useState({ images: {}, pdfs: {} });

  const staffInfo = (() => {
    try {
      return JSON.parse(localStorage.getItem("staff"));
    } catch {
      return null;
    }
  })();

  // Prefill department/section from staffInfo if present
  useEffect(() => {
    if (staffInfo) {
      setForm((f) => ({
        ...f,
        department: f.department || staffInfo.department || "",
        section: f.section || staffInfo.section || "",
      }));
    }
  }, [staffInfo]);

  useEffect(() => {
    if (isAuthenticated) fetchCourses();
  }, [isAuthenticated]);

  const fetchCourses = async () => {
    const q = staffInfo
      ? query(
          collection(db, "courses"),
          where("department", "==", staffInfo.department),
          where("section", "==", staffInfo.section)
        )
      : collection(db, "courses");

    const snapshot = await getDocs(q);
    setCourses(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  // XHR uploader that supports progress
  const uploadWithProgress = (file, fileType, onProgress) =>
    new Promise((resolve, reject) => {
      try {
        const formData = new FormData();
        const preset =
          fileType === "pdf"
            ? import.meta.env.VITE_CLOUD_PDF_PRESET
            : import.meta.env.VITE_CLOUD_IMAGE_PRESET;
        const folder = fileType === "pdf" ? "coursePdfs" : "courseImages";

        formData.append("file", file);
        formData.append("upload_preset", preset);
        formData.append("folder", folder);

        const endpoint =
          fileType === "pdf"
            ? `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/raw/upload`
            : `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`;

        const xhr = new XMLHttpRequest();
        xhr.open("POST", endpoint);

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            onProgress(percent);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const data = JSON.parse(xhr.responseText);
              if (!data.secure_url || !data.public_id) {
                console.error("Upload response:", data);
                reject(new Error("Cloudinary upload returned unexpected data"));
                return;
              }
              // normalize to { url, public_id, name, type }
              resolve({
                url: data.secure_url,
                public_id: data.public_id,
                name: data.original_filename || file.name,
                type: fileType,
              });
            } catch (err) {
              reject(err);
            }
          } else {
            try {
              const errData = JSON.parse(xhr.responseText || "{}");
              console.error("Upload failed:", errData);
            } catch {}
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        };

        xhr.onerror = () => reject(new Error("Network error during upload"));
        xhr.send(formData);
      } catch (err) {
        reject(err);
      }
    });

  // Accepts FileList/array and fileType 'image'|'pdf'
  const uploadFiles = async (files, fileType) => {
    const uploaded = [];
    for (const file of files) {
      // set initial 0% for UI
      setProgress((p) => ({
        ...p,
        [fileType === "pdf" ? "pdfs" : "images"]: {
          ...p[fileType === "pdf" ? "pdfs" : "images"],
          [file.name]: 0,
        },
      }));

      const item = await uploadWithProgress(
        file,
        fileType === "pdf" ? "pdf" : "image",
        (percent) =>
          setProgress((p) => ({
            ...p,
            [fileType === "pdf" ? "pdfs" : "images"]: {
              ...p[fileType === "pdf" ? "pdfs" : "images"],
              [file.name]: percent,
            },
          }))
      );

      // remove progress entry after done (optional small delay)
      setProgress((p) => {
        const copy = { ...p };
        const key = fileType === "pdf" ? "pdfs" : "images";
        if (copy[key]) delete copy[key][file.name];
        return copy;
      });

      uploaded.push(item);
    }
    return uploaded;
  };




//   // add or update course
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//   //   if (!form.subject) {
//   //   alert("Please select a subject");
//   //   return;
//   // }

//     try {
//       let newImages = [];
//       let newPdfs = [];

//       if (form.imageFiles && form.imageFiles.length > 0) {
//         newImages = await uploadFiles(form.imageFiles, "image");
//       }
//       if (form.pdfFiles && form.pdfFiles.length > 0) {
//         newPdfs = await uploadFiles(form.pdfFiles, "pdf");
//       }

//       // ensure department/section/year not left blank if staffInfo available
//       const department = form.department || staffInfo?.department || "CSE";
//       const section = form.section || staffInfo?.section || "B";
//       const year = form.year || "2ND YEAR";



//       const courseData = {
//         name: form.name,
//         description: form.description,
         
//         year,
//         department,
//         section,
//         adviser: form.adviser,
//         images: [...(form.images || []), ...newImages],
//         pdfs: [...(form.pdfs || []), ...newPdfs],
//         createdBy: staffInfo?.name || "Unknown",
        
//   subjects: {
//     ...(editId ? form.subjects || {} : {}),
//     [form.subject]: subjectData,   // ✅ NOW VALID
//   },
//         updatedAt: new Date(),
//       };

//       if (editId) {
//         await updateDoc(doc(db, "courses", editId), courseData);
//       } else {
//         await addDoc(collection(db, "courses"), {
//           ...courseData,
//           createdAt: new Date(),
//         });
//       }

//       // quick debug log
//       console.log("Saved course:", courseData);

//       alert("Course saved successfully!");
//       setEditId(null);
//       setForm({
//   name: "",
//   description: "",
//   year: "",
//   department: staffInfo?.department || "",
//   section: staffInfo?.section || "",
//   adviser: "",
//   subject: "",
//   subjects: {},
//   imageFiles: [],
//   pdfFiles: [],
// });


//       fetchCourses();
//     } catch (err) {
//       console.error("Save failed:", err);
//       alert("Failed to save course. See console.");
//     }
//   };

// // const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   if (!form.subject) {
// //     alert("Please select a subject");
// //     return;
// //   }

// //   try {
// //     let newImages = [];
// //     let newPdfs = [];

// //     // 1️⃣ Upload files to Cloudinary
// //     if (form.imageFiles?.length > 0) {
// //       newImages = await uploadFiles(form.imageFiles, "image");
// //     }

// //     if (form.pdfFiles?.length > 0) {
// //       newPdfs = await uploadFiles(form.pdfFiles, "pdf");
// //     }

// //     // 2️⃣ Department / section defaults
// //     const department = form.department || staffInfo?.department || "CSE";
// //     const section = form.section || staffInfo?.section || "B";
// //     const year = form.year || "2ND YEAR";

// //     // 3️⃣ SUBJECT DATA (🔥 NOW CORRECT)
// //     const subjectData = {
// //       images: newImages, // ✅ URLs only
// //       pdfs: newPdfs,     // ✅ URLs only
// //       updatedAt: new Date(),
// //     };

// //     // 4️⃣ Merge subjects safely
// //     const mergedSubjects = {
// //       ...(editId ? form.subjects || {} : {}),
// //       [form.subject]: subjectData,
// //     };

// //     // 5️⃣ Final Firestore-safe object
// //     const courseData = {
// //       name: form.name,
// //       description: form.description,
// //       year,
// //       department,
// //       section,
// //       adviser: form.adviser,
// //       createdBy: staffInfo?.name || "Unknown",
// //       subjects: mergedSubjects, // ✅ subject-wise storage
// //       updatedAt: new Date(),
// //     };

//     // 6️⃣ Save to Firestore
//     if (editId) {
//       await updateDoc(doc(db, "courses", editId), courseData);
//     } else {
//       await addDoc(collection(db, "courses"), {
//         ...courseData,
//         createdAt: new Date(),
//       });
//     }

//     alert("Course saved successfully!");

//     // 7️⃣ Reset form
//     setEditId(null);
//     setForm({
//       name: "",
//       description: "",
//       year: "",
//       department: staffInfo?.department || "",
//       section: staffInfo?.section || "",
//       adviser: "",
//       subject: "",
//       subjects: {},
//       imageFiles: [],
//       pdfFiles: [],
//     });

//     fetchCourses();
//   } catch (err) {
//     console.error("Save failed:", err);
//     alert("Failed to save course. See console.");
//   }
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!form.subject) {
//     alert("Please select a subject");
//     return;
//   }

//   try {
//     let uploadedImages = [];
//     let uploadedPdfs = [];

//     // 🔹 Upload images
//     if (form.imageFiles?.length > 0) {
//       uploadedImages = await uploadFiles(form.imageFiles, "image");
//     }

//     // 🔹 Upload PDFs
//     if (form.pdfFiles?.length > 0) {
//       uploadedPdfs = await uploadFiles(form.pdfFiles, "pdf");
//     }

//     const department = form.department || staffInfo?.department || "";
//     const section = form.section || staffInfo?.section || "";
//     const year = form.year || "";

//     // 🔥 IMPORTANT: subject-wise merge
//     const existingSubjects = editId ? form.subjects || {} : {};

//     const updatedSubjects = {
//       ...existingSubjects,
//       [form.subject]: {
//         images: [
//           ...(existingSubjects?.[form.subject]?.images || []),
//           ...uploadedImages,
//         ],
//         pdfs: [
//           ...(existingSubjects?.[form.subject]?.pdfs || []),
//           ...uploadedPdfs,
//         ],
//       },
//     };

//     const courseData = {
//       name: form.name,
//       description: form.description,
//       year,
//       department,
//       section,
//       adviser: form.adviser,
//       subjects: updatedSubjects,
//       updatedAt: new Date(),
//       createdBy: staffInfo?.name || "Admin",
//     };

//     if (editId) {
//       await updateDoc(doc(db, "courses", editId), courseData);
//     } else {
//       await addDoc(collection(db, "courses"), {
//         ...courseData,
//         createdAt: new Date(),
//       });
//     }

//     alert("Course saved successfully!");

//     setEditId(null);
//     setForm({
//       name: "",
//       description: "",
//       year: "",
//       department: staffInfo?.department || "",
//       section: staffInfo?.section || "",
//       adviser: "",
//       subject: "",
//       subjects: {},
//       imageFiles: [],
//       pdfFiles: [],
//     });

//     fetchCourses();
//   } catch (err) {
//     console.error("Save failed:", err);
//     alert("Save failed. Check console.");
//   }
// };


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.subject) {
    alert("Please select a subject");
    return;
  }

  try {
    let newImages = [];
    let newPdfs = [];

    // 🔹 upload images
    if (form.imageFiles?.length > 0) {
      newImages = await uploadFiles(form.imageFiles, "image");
    }

    // 🔹 upload pdfs
    if (form.pdfFiles?.length > 0) {
      newPdfs = await uploadFiles(form.pdfFiles, "pdf");
    }

    const department = form.department || staffInfo?.department || "CSE";
    const section = form.section || staffInfo?.section || "B";
    const year = form.year || "2ND YEAR";

    // ✅ SUBJECT DATA MUST BE CREATED HERE
    const subjectData = {
      images: newImages,
      pdfs: newPdfs,
    };

    const courseData = {
      name: form.name,
      description: form.description,
      year,
      department,
      section,
      adviser: form.adviser,
      createdBy: staffInfo?.name || "Unknown",

      // ✅ subject-wise storage
      subjects: {
        ...(editId ? form.subjects || {} : {}),
        [form.subject]: subjectData,
      },

      updatedAt: new Date(),
    };

    if (editId) {
      await updateDoc(doc(db, "courses", editId), courseData);
    } else {
      await addDoc(collection(db, "courses"), {
        ...courseData,
        createdAt: new Date(),
      });
    }

    alert("Course saved successfully!");

    setEditId(null);
    setForm({
      name: "",
      description: "",
      year: "",
      department: staffInfo?.department || "",
      section: staffInfo?.section || "",
      adviser: "",
      subject: "",
      subjects: {},
      imageFiles: [],
      pdfFiles: [],
    });

    fetchCourses();
  } catch (err) {
    console.error("Save failed:", err);
    alert("Failed to save course. See console.");
  }
};



  const handleEdit = (course) => {
    setForm({
      ...course,
      imageFiles: [],
      pdfFiles: [],
    });
    setEditId(course.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (course) => {
    if (!window.confirm("Delete this course completely?")) return;
    try {
      if (course.images?.length) {
        for (const img of course.images) {
          await deleteFromCloudinary(img.public_id, "image");
        }
      }
      if (course.pdfs?.length) {
        for (const pdf of course.pdfs) {
          await deleteFromCloudinary(pdf.public_id, "raw");
        }
      }
      await deleteDoc(doc(db, "courses", course.id));
      fetchCourses();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed — see console.");
    }
  };



  const handleFileDelete = async (courseId, file, type = "pdf") => {
  if (!window.confirm(`Delete this ${type.toUpperCase()} file?`)) return;

  try {
    // 1️⃣ delete from cloudinary
    await deleteFromCloudinary(file.public_id, type === "pdf" ? "raw" : "image");

    // 2️⃣ fetch correct course document
    const courseRef = doc(db, "courses", courseId);
    const snap = await getDoc(courseRef);

    if (!snap.exists()) {
      console.error("Course not found");
      return;
    }

    const data = snap.data();

    // 3️⃣ filter out deleted file
    const updatedFiles =
      type === "pdf"
        ? data.pdfs.filter((p) => p.public_id !== file.public_id)
        : data.images.filter((i) => i.public_id !== file.public_id);

    // 4️⃣ update Firestore
    await updateDoc(courseRef, {
      [type === "pdf" ? "pdfs" : "images"]: updatedFiles,
      updatedAt: new Date(),
    });

    // 5️⃣ refresh UI
    fetchCourses();

    alert(`${type.toUpperCase()} deleted successfully.`);
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Failed to delete file.");
  }
};


  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === "2311") {
      setIsAuthenticated(true);
    } else alert("Incorrect password!");
  };

   if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gray-700">
        {/* <div className="absolute ray inset-0 -z-10">
          <LightRays />
        </div> */}
        
  <div className="absolute ray inset-0 z-0 pointer-events-none">
      <LightRays />
  </div>
        <div className="key p-6 max-w-md w-full shadow-xl rounded-2xl bg-white">
          <h2 className="text-2xl font-bold mb-6 text-center ">
            Admin Access
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full  text-2xl  border-r-amber-200 rounded-lg text-gray-900 px-3 py-2 focus:ring-2  placeholder-gray-300"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ---------- UI ----------
  return (
    <div className="relative min-h-screen bg-gray-700 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-6   text-gray-300 ">Admin Panel</h2>

        {/* FORM */}
        <div className="bg-white shadow-2xl rounded-xl p-6 mb-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <input
              className="input"
              placeholder="Course Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            
            <select
                  className="input"
                  
                 value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
                >
                  <option value="">2nd Year</option>
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
            
            <select
                  className="input"
                  
                  value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
                >
                  <option value="">CSE</option>
                 <option>CSE</option>
                  <option>ECE</option>
                  <option>EEE</option>
                  <option>MECH</option>
                </select>
                <select
                  className="input"
                  
                 value={form.section}
              onChange={(e) => setForm({ ...form, section: e.target.value })}
                >
                  <option value="">B</option>
                 <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </select>


                <select
  className="input col-span-2"
  value={form.subject}
  required
  onChange={(e) => setForm({ ...form, subject: e.target.value })}
>
  <option value="">Select Subject</option>
  <option>TOC</option>
  <option>Operating Systems</option>
  <option>DBMS</option>
  <option>Networks Essentials</option>
  <option>OOSE</option>
  <option>DAA</option>
  <option>DBMS LAB</option>
  <option>OS LAB</option>
  <option>NE LAB</option>
</select>

            
            <textarea
              className="col-span-2 input"
              placeholder="Description"
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            {/* Image Upload */}
            <div className="col-span-2">
              <label className="font-semibold heading">Upload Images</label>
              <input
               className="input"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setForm({ ...form, imageFiles: [...e.target.files] })}
              />

              {/* show progress per selected file */}
              {form.imageFiles?.length > 0 && (
                <div className="mt-2 space-y-1">
                  {Array.from(form.imageFiles).map((f) => (
                    <div key={f.name} className="text-sm">
                      {f.name} — {progress.images[f.name] ?? 0}%
                      <div className="w-full bg-gray-200 rounded h-2 mt-1">
                        <div
                          style={{ width: `${progress.images[f.name] ?? 0}%` }}
                          className="h-2 bg-indigo-600 rounded"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PDF Upload */}
            <div className="col-span-2">
              <label className="font-semibold mb-5 heading">Upload PDFs</label>
              <input
               className="input"
                type="file"
                multiple
                accept="application/pdf"
                onChange={(e) => setForm({ ...form, pdfFiles: [...e.target.files] })}
              />

              {form.pdfFiles?.length > 0 && (
                <div className="mt-2 space-y-1">
                  {Array.from(form.pdfFiles).map((f) => (
                    <div key={f.name} className="text-sm">
                      {f.name} — {progress.pdfs[f.name] ?? 0}%
                      <div className="w-full bg-gray-200 rounded h-2 mt-1">
                        <div
                          style={{ width: `${progress.pdfs[f.name] ?? 0}%` }}
                          className="h-2 bg-indigo-600 rounded"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="col-span-2 flex justify-end">
              <button className="bg-indigo-600 button text-white px-6 py-2 rounded-lg">
                {editId ? "Update Course" : "Add Course"}
              </button>
            </div>
          </form>
        </div>

        {/* Course List */}
        <h3 className="text-2xl font-bold mb-4 text-gray-200">Courses</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-4 rounded-xl shadow-md">
              <h4 className="font-bold text-lg">{course.name}</h4>
              <p className="text-gray-600">{course.description}</p>

              {/* IMAGES */}
              {course.images?.length > 0 && (
                <div className="mt-3">
                  <h4 className="font-semibold mb-1">Images</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {course.images.map((img, i) => (
                      <div key={i} className="relative">
                        <img
                          src={img.url}
                          alt={img.name || "Image"}
                          className="w-full h-20 object-cover rounded cursor-pointer"
                          onClick={() => window.open(img.url, "_blank")}
                        />

                        <button
                          className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                          onClick={() => handleFileDelete(course.id, img, "image")}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PDF FILES */}
              {course.pdfs?.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-1">PDF Files</h4>
                  <ul className="space-y-2">
                    {course.pdfs.map((pdf, i) => (
                      <li key={i} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                        <a
                          href={pdf.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-700 font-medium underline"
                        >
                          {pdf.name || "PDF File"}
                        </a>

                        <div className="flex gap-2">
                          <button
                            className="bg-blue-600 text-white text-xs px-3 py-1 rounded"
                            onClick={() => window.open(pdf.url, "_blank")}
                          >
                            View
                          </button>
                          <button
                            className="bg-red-600 text-white text-xs px-3 py-1 rounded"
                            onClick={() => handleFileDelete(course.id, pdf, "pdf")}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-4 py-1 bg-yellow-500 text-white rounded"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </button>

                <button
                  className="px-4 py-1 bg-red-600 text-white rounded"
                  onClick={() => handleDelete(course)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* DEV / quick-test card: local test (only shown if no courses) */}
          {courses.length === 0 && (
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h4 className="font-bold text-lg mb-2">(dev) test image</h4>
              <img
                src={"/mnt/data/Screenshot 2025-12-06 164316.png"}
                alt="dev-screenshot"
                className="w-full h-40 object-contain rounded"
              />
              <p className="text-sm text-gray-500 mt-2">Local test image path (dev)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



 