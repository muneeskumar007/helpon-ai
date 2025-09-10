import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../../firebase";

export default function Admin() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    year: "",
    department: "",
    section: "",
    adviser: "",
    image: null,
    pdf: null,
  });
  const [editId, setEditId] = useState(null);

  // 🔹 Password protection
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  // 🔹 Staff info (optional, but we don’t force redirect anymore)
  const staffInfo = JSON.parse(localStorage.getItem("staff"));

  useEffect(() => {
    if (isAuthenticated) {
      fetchCourses();
    }
  }, [isAuthenticated]);

  // 🔹 Fetch courses
  const fetchCourses = async () => {
    const q = staffInfo
      ? query(
          collection(db, "courses"),
          where("department", "==", staffInfo.department),
          where("section", "==", staffInfo.section)
        )
      : collection(db, "courses");

    const snapshot = await getDocs(q);
    setCourses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  // 🔹 File upload
  const uploadFile = async (file, folder) => {
    if (!file) return null;
    const fileRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  // 🔹 Add / Update course
  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = form.image ? await uploadFile(form.image, "courseImages") : form.imageUrl || null;
    const pdfUrl = form.pdf ? await uploadFile(form.pdf, "coursePDFs") : form.pdfUrl || null;

    const courseData = {
      name: form.name,
      description: form.description,
      year: form.year,
      department: form.department,
      section: form.section,
      adviser: form.adviser,
      imageUrl,
      pdfUrl,
      createdBy: staffInfo?.name || "Unknown",
      createdAt: new Date(),
    };

    if (editId) {
      await updateDoc(doc(db, "courses", editId), courseData);
    } else {
      await addDoc(collection(db, "courses"), courseData);
    }

    setForm({
      name: "",
      description: "",
      year: "",
      department: staffInfo?.department || "",
      section: staffInfo?.section || "",
      adviser: "",
      image: null,
      pdf: null,
    });
    setEditId(null);
    fetchCourses();
  };

  // 🔹 Edit
  const handleEdit = (course) => {
    setForm(course);
    setEditId(course.id);
  };

  // 🔹 Delete
  const handleDelete = async (course) => {
    if (course.imageUrl) {
      const imgRef = ref(storage, course.imageUrl);
      await deleteObject(imgRef).catch(() => {});
    }
    if (course.pdfUrl) {
      const pdfRef = ref(storage, course.pdfUrl);
      await deleteObject(pdfRef).catch(() => {});
    }
    await deleteDoc(doc(db, "courses", course.id));
    fetchCourses();
  };

  // 🔹 Password form
  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === "mk16") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="p-6 max-w-md w-full bg-white shadow-xl rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-500"
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
          Admin Panel {staffInfo ? `- ${staffInfo.department} (${staffInfo.section})` : ""}
        </h2>

        {/* Form */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Course Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-500"
              required
            />
            <input
              type="text"
              placeholder="Year (e.g. 3rd)"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-500"
              required
            />
            <input
              type="text"
              placeholder="Department"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-500"
              required
            />
            <input
              type="text"
              placeholder="Section"
              value={form.section}
              onChange={(e) => setForm({ ...form, section: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-500"
              required
            />
            <input
              type="text"
              placeholder="Adviser"
              value={form.adviser}
              onChange={(e) => setForm({ ...form, adviser: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-500"
              required
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-500 col-span-1 md:col-span-2"
            />
            <input
              type="file"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              className="w-full text-gray-600"
            />
            <input
              type="file"
              onChange={(e) => setForm({ ...form, pdf: e.target.files[0] })}
              className="w-full text-gray-600"
            />
            <div className="col-span-1 md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                {editId ? "Update Course" : "Add Course"}
              </button>
            </div>
          </form>
        </div>

        {/* Course List */}
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Courses</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-bold text-lg text-indigo-700">{course.name}</h4>
                <p className="text-gray-600 text-sm mt-1">{course.description}</p>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="px-4 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course)}
                  className="px-4 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}




// import React from 'react'

// function Admin() {
//   return (
//     <div>Admin</div>
//   )
// }

// export default Admin

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
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
// import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
// import { db, storage } from "../../firebase";

// export default function Admin() {
//   const [courses, setCourses] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     year: "",
//     department: "",
//     section: "",
//     adviser: "",
//     image: null,
//     pdf: null,
//   });
//   const [editId, setEditId] = useState(null);
//   const navigate = useNavigate();

//   const staffInfo = JSON.parse(localStorage.getItem("staff"));

//   useEffect(() => {
//     // if (!staffInfo) {
//     //   navigate("/login"); // not staff
//     //   return;
//     // }
//     fetchCourses();
//   }, []);

//   // 🔹 Fetch courses created for staff's department & section
//   const fetchCourses = async () => {
//     const q = query(
//       collection(db, "courses"),
//       where("department", "==", staffInfo.department),
//       where("section", "==", staffInfo.section)
//     );
//     const snapshot = await getDocs(q);
//     setCourses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//   };

//   // 🔹 Handle file upload
//   const uploadFile = async (file, folder) => {
//     if (!file) return null;
//     const fileRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
//     await uploadBytes(fileRef, file);
//     return await getDownloadURL(fileRef);
//   };

//   // 🔹 Add / Update Course
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const imageUrl = form.image ? await uploadFile(form.image, "courseImages") : null;
//     const pdfUrl = form.pdf ? await uploadFile(form.pdf, "coursePDFs") : null;

//     const courseData = {
//       name: form.name,
//       description: form.description,
//       year: form.year,
//       department: form.department,
//       section: form.section,
//       adviser: form.adviser,
//       imageUrl: imageUrl || form.imageUrl || null,
//       pdfUrl: pdfUrl || form.pdfUrl || null,
//       createdBy: staffInfo.name,
//       createdAt: new Date(),
//     };

//     if (editId) {
//       await updateDoc(doc(db, "courses", editId), courseData);
//     } else {
//       await addDoc(collection(db, "courses"), courseData);
//     }

//     setForm({
//       name: "",
//       description: "",
//       year: "",
//       department: staffInfo.department,
//       section: staffInfo.section,
//       adviser: "",
//       image: null,
//       pdf: null,
//     });
//     setEditId(null);
//     fetchCourses();
//   };

//   // 🔹 Edit
//   const handleEdit = (course) => {
//     setForm(course);
//     setEditId(course.id);
//   };

//   // 🔹 Delete
//   const handleDelete = async (course) => {
//     if (course.imageUrl) {
//       const imgRef = ref(storage, course.imageUrl);
//       await deleteObject(imgRef).catch(() => {}); // ignore if not found
//     }
//     if (course.pdfUrl) {
//       const pdfRef = ref(storage, course.pdfUrl);
//       await deleteObject(pdfRef).catch(() => {});
//     }
//     await deleteDoc(doc(db, "courses", course.id));
//     fetchCourses();
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Admin Panel - {staffInfo?.department} ({staffInfo?.section})</h2>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="mb-6 space-y-3 bg-gray-100 p-4 rounded-lg">
//         <input
//           type="text"
//           placeholder="Course Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           className="w-full border px-3 py-2 rounded"
//         />
//         <input
//           type="text"
//           placeholder="Year (e.g. 3rd)"
//           value={form.year}
//           onChange={(e) => setForm({ ...form, year: e.target.value })}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Adviser"
//           value={form.adviser}
//           onChange={(e) => setForm({ ...form, adviser: e.target.value })}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <input
//           type="file"
//           onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
//           className="w-full"
//         />
//         <input
//           type="file"
//           onChange={(e) => setForm({ ...form, pdf: e.target.files[0] })}
//           className="w-full"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {editId ? "Update Course" : "Add Course"}
//         </button>
//       </form>

//       {/* Course List */}
//       <h3 className="text-xl font-semibold mb-3">Courses</h3>
//       <ul className="space-y-3">
//         {courses.map((course) => (
//           <li key={course.id} className="p-4 bg-white shadow rounded flex justify-between items-center">
//             <div>
//               <h4 className="font-bold">{course.name}</h4>
//               <p className="text-sm text-gray-600">{course.description}</p>
//             </div>
//             <div className="space-x-2">
//               <button
//                 onClick={() => handleEdit(course)}
//                 className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(course)}
//                 className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }





// import { useState } from "react";
// import CourseForm from "./CourseForm"; // component for add/edit courses
// import CourseList from "./CourseList"; // component for displaying courses

// export default function Admin() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [passwordInput, setPasswordInput] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (passwordInput === "mk16") {   // 🔑 hardcoded staff password
//       setIsAuthenticated(true);
//     } else {
//       alert("Incorrect password!");
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="p-6 max-w-md mx-auto bg-white shadow rounded-lg">
//         <h2 className="text-xl font-bold mb-4">Admin Access</h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           {/* <input
//             type="password"
           
//             onChange={(e) => 
//             className="w-full border rounded px-3 py-2"
//           /> */}
//           <input
//               type="password"
//               placeholder="Enter Admin Password"
//             value={passwordInput}
//               onChange={(e) => setPasswordInput(e.target.value)}
//               required
//               className="w-full rounded-lg text-black border px-3 py-2"
//             />

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Enter
//           </button>
//         </form>
//       </div>
//     );
//   }

//   // 🔹 Show staff CRUD once authenticated
//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
//       <CourseForm />
//       <CourseList />
//     </div>
//   );
// }
