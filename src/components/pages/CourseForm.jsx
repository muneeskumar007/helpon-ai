
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

export default function CourseForm({ courseId, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    department: "",
    year: "",
    section: "",
    adviser: "",
    imageUrl: "",
    pdfUrl: "",
  });
  const [staff, setStaff] = useState(null);

  // ✅ fetch staff profile (auto-fill department & section)
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

  // ✅ if editing a course, load details
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (courseId) {
        // ✅ update existing course
        await updateDoc(doc(db, "courses", courseId), {
          ...form,
          updatedAt: Timestamp.now(),
        });
        alert("✅ Course updated successfully!");
      } else {
        // ✅ add new course
        await addDoc(collection(db, "courses"), {
          ...form,
          createdAt: Timestamp.now(),
        });
        alert("✅ Course added successfully!");
      }

      setForm({
        name: "",
        description: "",
        department: staff?.department || "",
        year: "",
        section: staff?.section || "",
        adviser: "",
        imageUrl: "",
        pdfUrl: "",
      });

      if (onSuccess) onSuccess(); // refresh course list
    } catch (err) {
      console.error("Error saving course:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-4 mb-6 space-y-3"
    >
      <h3 className="text-lg font-bold mb-2">
        {courseId ? "Edit Course" : "Add New Course"}
      </h3>

      <input
        type="text"
        name="name"
        placeholder="Course Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />

      <textarea
        name="description"
        placeholder="Course Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          name="department"
          value={form.department}
          disabled
          className="border rounded px-3 py-2 bg-gray-100"
        />
        <input
          type="text"
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          name="section"
          value={form.section}
          disabled
          className="border rounded px-3 py-2 bg-gray-100"
        />
        <input
          type="text"
          name="adviser"
          placeholder="Class Adviser"
          value={form.adviser}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
      </div>

      <input
        type="text"
        name="imageUrl"
        placeholder="Course Image (Google Drive/Dropbox link)"
        value={form.imageUrl}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="text"
        name="pdfUrl"
        placeholder="PDF Link"
        value={form.pdfUrl}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {courseId ? "Update Course" : "Save Course"}
      </button>
    </form>
  );
}
