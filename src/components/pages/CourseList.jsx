

// // import { useEffect, useState } from "react";
// // import {
// //   collection,
// //   query,
// //   where,
// //   onSnapshot,
// //   deleteDoc,
// //   doc,
// // } from "firebase/firestore";
// // import { auth, db } from "../../firebase";
// // import CourseForm from "./CourseForm";

// // export default function CourseList() {
// //   const [courses, setCourses] = useState([]);
// //   const [staff, setStaff] = useState(null);
// //   const [editingId, setEditingId] = useState(null);

// //   // ✅ fetch staff details (from Firestore)
// //   useEffect(() => {
// //     const fetchStaff = async () => {
// //       const user = auth.currentUser;
// //       if (!user) return;

// //       const snap = await getDoc(doc(db, "staff", user.uid));
// //       if (snap.exists()) {
// //         setStaff(snap.data());
// //       }
// //     };

// //     fetchStaff();
// //   }, []);

// //   // ✅ fetch courses for this staff's department + section
// //   useEffect(() => {
// //     if (!staff) return;

// //     const q = query(
// //       collection(db, "courses"),
// //       where("department", "==", staff.department),
// //       where("section", "==", staff.section)
// //     );

// //     const unsub = onSnapshot(q, (snapshot) => {
// //       setCourses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
// //     });

// //     return () => unsub();
// //   }, [staff]);

// //   // ✅ delete course
// //   const handleDelete = async (id) => {
// //     if (window.confirm("Are you sure you want to delete this course?")) {
// //       await deleteDoc(doc(db, "courses", id));
// //     }
// //   };

// //   if (!staff) {
// //     return (
// //       <div className="p-6 text-gray-500">Loading staff dashboard...</div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-4xl mx-auto p-6">
// //       <h2 className="text-2xl font-bold mb-4 text-blue-700">
// //         Manage Courses ({staff.department} – {staff.section})
// //       </h2>

// //       {/* ✅ Add or Edit form */}
// //       <CourseForm
// //         courseId={editingId}
// //         onSuccess={() => setEditingId(null)}
// //       />

// //       {/* ✅ Courses list */}
// //       <div className="space-y-4">
// //         {courses.length === 0 ? (
// //           <p className="text-gray-500">No courses yet.</p>
// //         ) : (
// //           courses.map((course) => (
// //             <div
// //               key={course.id}
// //               className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
// //             >
// //               <div>
// //                 <h3 className="font-bold text-lg">{course.name}</h3>
// //                 <p className="text-sm text-gray-500">{course.description}</p>
// //                 {course.imageUrl && (
// //                   <img
// //                     src={course.imageUrl}
// //                     alt={course.name}
// //                     className="w-32 h-20 object-cover mt-2 rounded"
// //                   />
// //                 )}
// //                 {course.pdfUrl && (
// //                   <a
// //                     href={course.pdfUrl}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className="text-blue-600 text-sm underline mt-2 block"
// //                   >
// //                     View PDF
// //                   </a>
// //                 )}
// //               </div>

// //               <div className="flex gap-2">
// //                 <button
// //                   onClick={() => setEditingId(course.id)}
// //                   className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
// //                 >
// //                   Edit
// //                 </button>
// //                 <button
// //                   onClick={() => handleDelete(course.id)}
// //                   className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
// //                 >
// //                   Delete
// //                 </button>
// //               </div>
// //             </div>
// //           ))
// //         )}
// //       </div>
// //     </div>
// //   );
// // }




// // src/pages/CourseList.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../firebase";

// export default function CourseList() {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourse = async () => {
//       const snap = await getDoc(doc(db, "courses", id));
//       if (snap.exists()) {
//         setCourse(snap.data());
//       }
//       setLoading(false);
//     };
//     fetchCourse();
//   }, [id]);

//   if (loading) {
//     return <p className="p-6 text-center text-gray-600">⏳ Loading course...</p>;
//   }

//   if (!course) {
//     return <p className="p-6 text-red-500 text-center">⚠️ Course not found!</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
//       >
//         ← Back
//       </button>

//       <div className="bg-white shadow-lg rounded-xl p-6 max-w-5xl mx-auto">
//         <h2 className="text-3xl font-bold text-indigo-700 mb-2">
//           {course.name}
//         </h2>
//         <p className="text-gray-700 mb-4">{course.description}</p>

//         {/* --- Images Gallery --- */}
//         {course.images?.length > 0 ? (
//           <div className="mb-8">
//             <h3 className="text-xl font-semibold mb-2 text-gray-800">
//               Course Images
//             </h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//               {course.images.map((img, i) => (
//                 <div key={i} className="relative">
//                   <img
//                     src={img.url}
//                     alt={img.name}
//                     className="rounded-lg shadow w-full h-40 object-cover"
//                   />
//                   <a
//                     href={img.url}
//                     download
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 text-xs rounded"
//                   >
//                     Download
//                   </a>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-500 italic mb-8">No images uploaded</p>
//         )}

//         {/* --- PDF Materials --- */}
//         {course.pdfs?.length > 0 ? (
//           <div>
//             <h3 className="text-xl font-semibold mb-2 text-gray-800">
//               PDF Materials
//             </h3>
//             <ul className="space-y-3">
//               {course.pdfs.map((pdf, i) => (
//                 <li
//                   key={i}
//                   className="flex items-center justify-between bg-gray-100 p-3 rounded-lg hover:bg-gray-200"
//                 >
//                   <span className="text-gray-800 truncate">{pdf.name}</span>
//                   <div className="space-x-2">
//                     <a
//                       href={pdf.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
//                     >
//                       View
//                     </a>
//                     <a
//                       href={pdf.url}
//                       download
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
//                     >
//                       Download
//                     </a>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ) : (
//           <p className="text-gray-500 italic">No PDFs uploaded</p>
//         )}
//       </div>
//     </div>
//   );
// }



// src/components/CourseList.jsx

import React, { useEffect, useState } from "react";

const CourseList = ({ onEdit }) => {
  // const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //   return onSnapshot(collection(db, "courses"), (snapshot) => {
  //     setCourses(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  //   });
  // }, []);

  // const deleteCourse = async (course) => {
  //   for (const img of course.images) {
  //     await deleteFromCloudinary(img.public_id, "image");
  //   }

  //   for (const pdf of course.pdfs) {
  //     await deleteFromCloudinary(pdf.public_id, "raw");
  //   }

  //   await deleteDoc(doc(db, "courses", course.id));
  // };

  // return (
  //   <div>
  //     <h2>Course List</h2>

  //     {courses.map((course) => (
  //       <div key={course.id}>
  //         <h4>{course.name}</h4>

  //         {course.images?.[0] && <img src={course.images[0].url} width={120} />}

  //         <button onClick={() => onEdit(course)}>Edit</button>
  //         <button onClick={() => deleteCourse(course)}>Delete</button>
  //       </div>
  //     ))}
  //   </div>
  // );
};

export default CourseList;
