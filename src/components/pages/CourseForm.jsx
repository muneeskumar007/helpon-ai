
// import { useState } from "react";
// import { collection, addDoc, Timestamp } from "firebase/firestore";
// import { db } from "../../firebase";

// export default function CourseForm() {
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     department: "",
//     year: "",
//     section: "",
//     adviser: "",
//     imageUrl: "",
//     pdfUrl: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addDoc(collection(db, "courses"), {
//         ...form,
//         createdAt: Timestamp.now(),
//       });
//       alert("✅ Course added successfully!");
//       setForm({
//         name: "",
//         description: "",
//         department: "",
//         year: "",
//         section: "",
//         adviser: "",
//         imageUrl: "",
//         pdfUrl: "",
//       });
//     } catch (err) {
//       console.error("Error adding course:", err);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white shadow rounded-lg p-4 mb-6 space-y-3"
//     >
//       <h3 className="text-lg font-bold mb-2">Add New Course</h3>

//       <input
//         type="text"
//         name="name"
//         placeholder="Course Name"
//         value={form.name}
//         onChange={handleChange}
//         className="w-full border rounded px-3 py-2"
//         required
//       />

//       <textarea
//         name="description"
//         placeholder="Course Description"
//         value={form.description}
//         onChange={handleChange}
//         className="w-full border rounded px-3 py-2"
//       />

//       <div className="grid grid-cols-2 gap-2">
//         <input
//           type="text"
//           name="department"
//           placeholder="Department"
//           value={form.department}
//           onChange={handleChange}
//           className="border rounded px-3 py-2"
//           required
//         />
//         <input
//           type="text"
//           name="year"
//           placeholder="Year"
//           value={form.year}
//           onChange={handleChange}
//           className="border rounded px-3 py-2"
//           required
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-2">
//         <input
//           type="text"
//           name="section"
//           placeholder="Section"
//           value={form.section}
//           onChange={handleChange}
//           className="border rounded px-3 py-2"
//           required
//         />
//         <input
//           type="text"
//           name="adviser"
//           placeholder="Class Adviser"
//           value={form.adviser}
//           onChange={handleChange}
//           className="border rounded px-3 py-2"
//         />
//       </div>

//       <input
//         type="text"
//         name="imageUrl"
//         placeholder="Image Link (Google Drive / Dropbox / etc.)"
//         value={form.imageUrl}
//         onChange={handleChange}
//         className="w-full border rounded px-3 py-2"
//       />

//       <input
//         type="text"
//         name="pdfUrl"
//         placeholder="PDF Link"
//         value={form.pdfUrl}
//         onChange={handleChange}
//         className="w-full border rounded px-3 py-2"
//       />

//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//       >
//         Save Course
//       </button>
//     </form>
//   );
// }






import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { deleteFromCloudinary } from "../../utils/deleteFromCloudinary";

export default function CourseForm({ courseId, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    department: "",
    year: "",
    section: "",
    adviser: "",
    images: [],
    pdfs: [],
  });

  const [staff, setStaff] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Load staff
  useEffect(() => {
    const fetchStaff = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const snap = await getDoc(doc(db, "staff", user.uid));
      if (snap.exists()) {
        setStaff(snap.data());
        setForm((prev) => ({
          ...prev,
          department: snap.data().department,
          section: snap.data().section,
        }));
      }
    };
    fetchStaff();
  }, []);

  // Load existing course for editing
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      const snap = await getDoc(doc(db, "courses", courseId));
      if (snap.exists()) {
        setForm(snap.data());
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Upload Image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const result = await uploadToCloudinary(file, "image");
    setForm((prev) => ({ ...prev, images: [...prev.images, result] }));
    setUploading(false);
  };

  // Upload PDF
  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const result = await uploadToCloudinary(file, "pdf");
    setForm((prev) => ({ ...prev, pdfs: [...prev.pdfs, result] }));
    setUploading(false);
  };

  // Delete image/PDF before saving
  const removeItem = async (publicId, type) => {
    if (window.confirm("Delete this file?")) {
      await deleteFromCloudinary(publicId);
      setForm((prev) => ({
        ...prev,
        [type]: prev[type].filter((f) => f.public_id !== publicId),
      }));
    }
  };

  // Save course
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (courseId) {
        await updateDoc(doc(db, "courses", courseId), {
          ...form,
          updatedAt: Timestamp.now(),
        });
        alert("Course updated!");
      } else {
        await addDoc(collection(db, "courses"), {
          ...form,
          createdAt: Timestamp.now(),
        });
        alert("Course added!");
      }

      onSuccess && onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-3">
        {courseId ? "Edit Course" : "Add New Course"}
      </h3>

      <input
        type="text"
        name="name"
        placeholder="Course Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-3"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-3"
      />

      {/* YEAR + ADVISER */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <input
          type="text"
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="adviser"
          placeholder="Adviser"
          value={form.adviser}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
      </div>

      {/* IMAGE UPLOAD */}
      <label className="font-semibold">Upload Images:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="w-full mb-3"
      />

      {form.images.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          {form.images.map((img) => (
            <div key={img.public_id} className="relative">
              <img
                src={img.url}
                className="h-24 w-full object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeItem(img.public_id, "images")}
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* PDF UPLOAD */}
      <label className="font-semibold">Upload PDFs:</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={handlePdfUpload}
        className="w-full mb-3"
      />

      {form.pdfs.map((pdf) => (
        <div
          key={pdf.public_id}
          className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded"
        >
          <span>{pdf.name}</span>
          <button
            type="button"
            onClick={() => removeItem(pdf.public_id, "pdfs")}
            className="bg-red-600 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}

      <button className="w-full bg-blue-600 text-white py-2 rounded">
        {uploading ? "Uploading..." : courseId ? "Update Course" : "Save Course"}
      </button>
    </form>
  );
}
