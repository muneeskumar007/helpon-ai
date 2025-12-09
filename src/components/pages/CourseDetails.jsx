
// // import { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { doc, getDoc } from "firebase/firestore";
// // import { db } from "../../firebase";

// // export default function CourseDetails() {
// //   const { id } = useParams();
// //   const [course, setCourse] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchCourse = async () => {
// //       const snap = await getDoc(doc(db, "courses", id));
// //       if (snap.exists()) {
// //         setCourse(snap.data());
// //       } else {
// //         navigate("/dashboard"); // course not found
// //       }
// //     };
// //     fetchCourse();
// //   }, [id, navigate]);

// //   if (!course) return <p className="p-6">Loading...</p>;

// //   return (
// //     <div className="p-6">
// //       <button
// //         onClick={() => navigate(-1)}
// //         className="mb-4 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
// //       >
// //         ← Back
// //       </button>

// //       <h2 className="text-3xl font-bold mb-2">{course.name}</h2>
// //       <p className="text-gray-700 mb-4">{course.description}</p>

// //       {/* Image Preview */}
// //       {course.images && (
// //         <div className="mb-4">
// //           <img
// //             src={course.images}
// //             alt={course.name}
// //             className="max-w-md rounded shadow"
// //           />
// //         </div>
// //       )}

// //       {/* PDF Link */}
// //       {course.pdfs && (
// //         <div className="mb-4">
// //           <a
// //             href={course.pdfs}
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
// //           >
// //             📄 Open Course PDF
// //           </a>
// //         </div>
// //       )}

// //       <p className="text-sm text-gray-500">
// //         Adviser: {course.adviser} | Year: {course.year} | Dept:{" "}
// //         {course.department}-{course.section}
// //       </p>
// //     </div>
// //   );
// // }





// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../firebase";

// export default function Course() {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);

//   useEffect(() => {
//     const load = async () => {
//       const snap = await getDoc(doc(db, "courses", id));
//       if (snap.exists()) setCourse(snap.data());
//     };
//     load();
//   }, [id]);

//   if (!course) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold">{course.name}</h2>
//       <p className="text-gray-700 my-2">{course.description}</p>

//       {/* IMAGES */}
//       {course.images?.length > 0 && (
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
//           {course.images.map((img) => (
//             <img
//               key={img.public_id}
//               src={img.url}
//               alt={img.name}
//               className="rounded-xl shadow"
//             />
//           ))}
//         </div>
//       )}

//       {/* PDFs */}
//       {course.pdfs?.length > 0 && (
//         <div className="mt-6">
//           <h3 className="font-bold text-xl mb-2">PDF Files</h3>
//           {course.pdfs.map((pdf) => (
//             <a
//               key={pdf.public_id}
//               href={pdf.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block text-blue-600 underline mb-2"
//             >
//               📄 {pdf.name}
//             </a>
//           ))}
//         </div>
//       )}
//     {/* </div> */}
//   );
// }




// // // src/components/CourseDetails.jsx

// // import React, { useEffect, useState } from "react";
// // import { db } from "../firebase";
// // import { doc, getDoc } from "firebase/firestore";
// // import { useParams } from "react-router-dom";

// // const CourseDetails = () => {
// //   const { id } = useParams();
// //   const [course, setCourse] = useState(null);

// //   useEffect(() => {
// //     (async () => {
// //       const snap = await getDoc(doc(db, "courses", id));
// //       setCourse(snap.data());
// //     })();
// //   }, [id]);

// //   if (!course) return <p>Loading...</p>;

// //   return (
// //     <div>
// //       <h2>{course.name}</h2>
// //       <p>{course.description}</p>

// //       <h3>Images</h3>
// //       {course.images?.map((img, i) => (
// //         <img key={i} src={img.url} width={150} />
// //       ))}

// //       <h3>PDF Files</h3>
// //       {course.pdfs?.map((pdf, i) => (
// //         <a key={i} href={pdf.url} target="_blank">PDF {i + 1}</a>
// //       ))}
// //     </div>
// //   );
// // };

// // export default CourseDetails;
