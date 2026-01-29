


// import { useEffect, useState } from "react";
// import { collection, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../../firebase";
 
// import { ThreeDot}  from "react-loading-indicators";

// export default function Course() {
//   const [student, setStudent] = useState(null);
//   const [studentLoading, setStudentLoading] = useState(true);
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   // const [user] = useAuthState(auth); 
//   // ✅ fetch logged-in student info
//   useEffect(() => {
//     const fetchStudent = async () => {
//       const user = auth.currentUser;
//       if (!user) {
//         setStudentLoading(false);
//         return;
//       }

//       const snap = await getDoc(doc(db, "students", user.uid));
//       if (snap.exists()) {
//         setStudent(snap.data());
//       }
//       setStudentLoading(false);
//     };

//     fetchStudent();
//   }, []);

//   // ✅ fetch courses matching student dept/year/section
//   useEffect(() => {
//     if (!student) return;

//     const q = query(
//       collection(db, "courses"),
//       where("department", "==", student.department),
//       where("year", "==", student.year),
//       where("section", "==", student.section)
//     );

//     const unsub = onSnapshot(q, (snapshot) => {
//       setCourses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//     });

//     return () => unsub();
//   }, [student]);

//   // --- UI STATES ---
//   if (studentLoading) {
//     return <p className=" text-center p-6"><ThreeDot variant="pulsate" color="#1f13a4" size="large" text="⏳ loading" textColor="#172d68" />
//  </p>;
//   }
 
//   if (!student) {
//     return <p className="p-6 text-red-500">⚠️ No student profile found. Please contact admin.</p>;
//   }

//   return (
//     <div className="p-2 pt-8">
//       {/* Student info */}
//       <div className="mb-6 bg-white shadow rounded-lg p-4">
//         <h2 className="text-xl pt-4 ml-3 font-bold">Hello {student.name} 👋</h2>
//         <p className="text-gray-600 ml-3 mt-2">
//           Dept: <strong className="mr-6 ">{student.department} </strong> | Year: <strong className="mr-6 "> {student.year} </strong> | Section: <strong className="mr-3 "> {student.section} </strong>
//         </p>
//         <p className=" text-gray-500  mt-3 pb-4 ml-3">Class Adviser: <strong> A.XAVIER MARY</strong></p>
//       </div>
//       </div>
//       )}

 




// import { useEffect, useState } from "react";
// import { collection, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../../firebase";

// import { ThreeDot } from "react-loading-indicators";

// export default function Course() {
//   const [student, setStudent] = useState(null);
//   const [studentLoading, setStudentLoading] = useState(true);
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   // ✅ Fetch logged-in student info
//   useEffect(() => {
//     const fetchStudent = async () => {
//       const user = auth.currentUser;
//       if (!user) {
//         setStudentLoading(false);
//         return;
//       }

//       const snap = await getDoc(doc(db, "students", user.uid));
//       if (snap.exists()) {
//         setStudent(snap.data());
//       }
//       setStudentLoading(false);
//     };

//     fetchStudent();
//   }, []);

//   // ✅ Fetch courses based on dept/year/section
//   useEffect(() => {
//     if (!student) return;

//     const q = query(
//       collection(db, "courses"),
//       where("department", "==", student.department),
//       where("year", "==", student.year),
//       where("section", "==", student.section)
//     );

//     const unsub = onSnapshot(q, (snapshot) => {
//       setCourses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//     });

//     return () => unsub();
//   }, [student]);

//   // --- UI STATES ---
//   if (studentLoading) {
//     return (
//       <p className="text-center p-6">
//         <ThreeDot
//           variant="pulsate"
//           color="#1f13a4"
//           size="large"
//           text="⏳ loading"
//           textColor="#172d68"
//         />
//       </p>
//     );
//   }

//   if (!student) {
//     return <p className="p-6 text-red-500">⚠️ No student profile found. Please contact admin.</p>;
//   }

//   return (
//     <div className="p-2 pt-8">
//       {/* Student info */}
//       <div className="mb-6 bg-white shadow rounded-lg p-4">
//         <h2 className="text-xl pt-4 ml-3 font-bold">Hello {student.name} 👋</h2>

//         <p className="text-gray-600 ml-3 mt-2">
//           Dept: <strong className="mr-6">{student.department}</strong> | Year:{" "}
//           <strong className="mr-6">{student.year}</strong> | Section:{" "}
//           <strong className="mr-3">{student.section}</strong>
//         </p>

//         <p className="text-gray-500 mt-3 pb-4 ml-3">
//           Class Adviser: <strong>A.XAVIER MARY</strong>
//         </p>
//       </div>

//       {/* Course list */}
//       <h3 className="text-2xl font-semibold mb-4">Your Courses</h3>

//       {courses.length === 0 ? (
//         <p className="text-gray-600">📭 No courses available for your section yet.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {courses.map((course) => (
//             <div
//               key={course.id}
//               onClick={() => navigate(`/course/${course.id}`)}
//               className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition p-4"
//             >
//               {/* ---- IMAGE PREVIEW ---- */}
//               {course.images && course.images.length > 0 ? (
//                 <img
//                   src={course.images[0].url}
//                   alt={course.name}
//                   className="h-32 w-full object-cover rounded-md mb-3"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     window.open(course.images[0].url, "_blank");
//                   }}
//                 />
//               ) : (
//                 <div className="h-32 w-full bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
//                   No Image
//                 </div>
//               )}

//               {/* ---- PDF VIEW BUTTON ---- */}
//               {course.pdf && course.pdf.url && (
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     window.open(course.pdf.url, "_blank");
//                   }}
//                   className="mt-2 w-full text-blue-600 underline text-sm text-left"
//                 >
//                   📄 View PDF
//                 </button>
//               )}

//               {/* Course details */}
//               <h4 className="text-lg font-bold mt-3">{course.name}</h4>
//               <p className="text-sm text-gray-500 line-clamp-2">{course.description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }





// // src/components/pages/Course.jsx
// import { useEffect, useState } from "react";
// import { collection, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../../firebase";
// import { ThreeDot } from "react-loading-indicators";

// export default function Course() {
//   const [student, setStudent] = useState(null);
//   const [studentLoading, setStudentLoading] = useState(true);
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStudent = async () => {
//       const user = auth.currentUser;
//       if (!user) {
//         setStudentLoading(false);
//         return;
//       }

//       const snap = await getDoc(doc(db, "students", user.uid));
//       if (snap.exists()) {
//         setStudent(snap.data());
//       }
//       setStudentLoading(false);
//     };

//     fetchStudent();
//   }, []);

//   useEffect(() => {
//     if (!student) return;

//     // If your admin stores empty year or uses different string formats,
//     // this query will not return the course. If you want to be less strict,
//     // remove the year filter or standardize values on save.
//     const q = query(
//       collection(db, "courses"),
//       where("department", "==", student.department),
//       where("year", "==", student.year),
//       where("section", "==", student.section)
//     );

//     const unsub = onSnapshot(q, (snapshot) => {
//       setCourses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//     });

//     return () => unsub();
//   }, [student]);

//   if (studentLoading) {
//     return (
//       <p className="text-center p-6">
//         <ThreeDot variant="pulsate" color="#1f13a4" size="large" text="⏳ loading" textColor="#172d68" />
//       </p>
//     );
//   }

//   if (!student) {
//     return <p className="p-6 text-red-500">⚠️ No student profile found. Please contact admin.</p>;
//   }

//   return (
//     <div className="p-2 pt-8">
//       <div className="mb-6 bg-white shadow rounded-lg p-4">
//         <h2 className="text-xl pt-4 ml-3 font-bold">Hello {student.name} 👋</h2>
//         <p className="text-gray-600 ml-3 mt-2">
//           Dept: <strong className="mr-6 ">{student.department}</strong> | Year: <strong className="mr-6 ">{student.year}</strong> | Section: <strong className="mr-3 ">{student.section}</strong>
//         </p>
//         <p className="text-gray-500 mt-3 pb-4 ml-3">
//           Class Adviser: <strong>A.XAVIER MARY</strong>
//         </p>
//       </div>

//       <h3 className="text-2xl font-semibold mb-4">Your Courses</h3>

//       {courses.length === 0 ? (
//         <p className="text-gray-600">📭 No courses available for your section yet.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {courses.map((course) => (
//             <div key={course.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
//               {/* Thumbnail */}
//               {course.images && course.images.length > 0 ? (
//                 <img src={course.images[0].url} alt={course.name} className="h-32 w-full object-cover rounded-md mb-2" onClick={() => window.open(course.images[0].url, "_blank")} />
//               ) : (
//                 <div className="h-32 w-full bg-gray-200 rounded-md flex items-center justify-center text-gray-500 mb-2">
//                   No Image
//                 </div>
//               )}

//               <h4 className="text-lg font-bold">{course.name}</h4>
//               <p className="text-sm text-gray-500 line-clamp-2">{course.description}</p>

//               {/* images preview (small) */}
//               {course.images?.length > 0 && (
//                 <div className="grid grid-cols-3 gap-2 mt-3">
//                   {course.images.map((img, idx) => (
//                     <img key={idx} src={img.url} alt={img.name || "Image"} className="w-full h-20 object-cover rounded cursor-pointer" onClick={() => window.open(img.url, "_blank")} />
//                   ))}
//                 </div>
//               )}

//               {/* pdf list */}
//               {course.pdfs?.length > 0 && (
//                 <div className="mt-3">
//                   <h5 className="font-semibold">Materials</h5>
//                   <ul className="space-y-2 mt-2">
//                     {course.pdfs.map((pdf, i) => (
//                       <li key={i} className="flex justify-between items-center bg-gray-100 p-2 rounded">
//                         <a href={pdf.url} target="_blank" rel="noopener noreferrer" className="text-indigo-700 underline">
//                           {pdf.name || "PDF"}
//                         </a>
//                         <button onClick={() => window.open(pdf.url, "_blank")} className="bg-blue-600 text-white px-3 py-1 rounded text-xs">Open</button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }





// import { useEffect, useState } from "react";
// import { collection, onSnapshot } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../../firebase";
// import { ThreeDot } from "react-loading-indicators";

// export default function Course() {
//   const [student, setStudent] = useState(null);
//   const [studentLoading, setStudentLoading] = useState(true);
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   // ✅ Load logged-in student
//   useEffect(() => {
//     const user = auth.currentUser;

//     if (!user) {
//       setStudent(null);
//       setStudentLoading(false);
//       return;
//     }

//     setStudent(user); // no need to fetch dept/section now
//     setStudentLoading(false);
//   }, []);

//   // ✅ Load ALL courses (no filters)
//   useEffect(() => {
//     const unsub = onSnapshot(collection(db, "courses"), (snapshot) => {
//       const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setCourses(list);
//     });

//     return () => unsub();
//   }, []);

//   // Loading state
//   if (studentLoading) {
//     return (
//       <p className="text-center p-6">
//         <ThreeDot
//           variant="pulsate"
//           color="#1f13a4"
//           size="large"
//           text="⏳ Loading"
//           textColor="#172d68"
//         />
//       </p>
//     );
//   }

//   return (
//     <div className="p-3 pt-8">
//       <div className="mb-6 bg-white shadow rounded-lg p-4">
//        <h2 className="text-xl pt-4 ml-3 font-bold">Hello {student.name} 👋</h2>
//          <p className="text-gray-600 ml-3 mt-2">
//            Dept: <strong className="mr-6 ">{student.department}</strong> | Year: <strong className="mr-6 ">{student.year}</strong> | Section: <strong className="mr-3 ">{student.section}</strong>
//          </p>
//          <p className="text-gray-500 mt-3 pb-4 ml-3">
//            Class Adviser: <strong>A.XAVIER MARY</strong>
//          </p>
//           <p className="text-gray-600 ml-3 mt-2">
//           Welcome to your course materials 📚
//         </p>
//        </div>
//       {/* Greeting */}
//       {/* <div className="mb-6 bg-white shadow rounded-lg p-4">
//         <h2 className="text-xl pt-4 ml-3 font-bold">
//           Hello {student?.email} 👋
//         </h2>
//         <p className="text-gray-600 ml-3 mt-2">
//           Welcome to your course materials 📚
//         </p>
//       </div> */}

//       {/* Course list */}
//       <h3 className="text-2xl font-semibold mb-4">Available Courses</h3>

//       {courses.length === 0 ? (
//         <p className="text-gray-600">📭 No courses added yet.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {courses.map((course) => (
//             <div
//               key={course.id}
//               onClick={() => navigate(`/course/${course.id}`)}
//               className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition p-4"
//             >
//               {/* Thumbnail */}
//               {course.images && course.images.length > 0 ? (
//                 <img
//                   src={course.images[0]}
//                   alt={course.name}
//                   className="h-32 w-full object-cover rounded-md mb-2"
//                 />
//               ) : (
//                 <div className="h-32 w-full bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
//                   No Image
//                 </div>
//               )}

//               {/* Course details */}
//               <h4 className="text-lg font-bold">{course.name}</h4>
//               <p className="text-sm text-gray-500 line-clamp-2">
//                 {course.description}
//               </p>

//               {/* PDF Count */}
//               {course.pdfs && course.pdfs.length > 0 && (
//                 <p className="text-sm text-blue-600 mt-2">
//                   📄 {course.pdfs.length} PDF(s) attached
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




// // src/components/pages/Course.jsx
// import { useEffect, useState } from "react";
// import { collection, onSnapshot } from "firebase/firestore";
// import { doc, getDoc } from "firebase/firestore";


// import { auth, db } from "../../firebase";
// import { ThreeDot } from "react-loading-indicators";

// export default function Course() {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     const unsub = onSnapshot(collection(db, "courses"), (snapshot) => {
//       const list = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setCourses(list);
//     });

//     return () => unsub();
//   }, []);



//   const [student, setStudent] = useState(null);
//   const [studentLoading, setStudentLoading] = useState(true);
  
  
//   // ✅ Load logged-in student
//   useEffect(() => {
//     const user = auth.currentUser;

//     if (!user) {
//       setStudent(null);
//       setStudentLoading(false);
//       return;
//     }

//     setStudent(user); // no need to fetch dept/section now
//     setStudentLoading(false);
//   }, []);

//   // ✅ Load ALL courses (no filters)
//   useEffect(() => {
//     const unsub = onSnapshot(collection(db, "courses"), (snapshot) => {
//       const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setCourses(list);
//     });

//     return () => unsub();
//   }, []);



//   useEffect(() => {
//   const loadStudent = async () => {
//     const user = auth.currentUser;

//     if (!user) {
//       setStudent(null);
//       setStudentLoading(false);
//       return;
//     }

//     // 🔥 Fetch student document from Firestore
//     const ref = doc(db, "students", user.uid);
//     const snap = await getDoc(ref);

//     if (snap.exists()) {
//       setStudent(snap.data());
//     } else {
//       console.warn("⚠ No student data found for user");
//       setStudent({});
//     }

//     setStudentLoading(false);
//   };

//   loadStudent();
// }, []);


//   // Loading state
//   if (studentLoading) {
//     return (
//       <p className="text-center p-6">
//         <ThreeDot
//           variant="pulsate"
//           color="#1f13a4"
//           size="large"
//           text="⏳ Loading"
//           textColor="#172d68"
//         />
//       </p>
//     );
//   }


//   return (
//     <div className="p-6">
      
//        <div className="mb-6 bg-white shadow rounded-lg p-4">
//        <h2 className="text-xl pt-4 ml-3 font-bold">Hello {student.name} 👋</h2>
//           <p className="text-gray-600 ml-3 mt-2">
//             Dept: <strong className="mr-6 ">{student.department}</strong> | Year: <strong className="mr-6 ">{student.year}</strong> | Section: <strong className="mr-3 ">{student.section}</strong>
//           </p>
//           <p className="text-gray-500 mt-3 pb-4 ml-3">
//             Class Adviser: <strong>A.XAVIER MARY</strong>
//           </p>
//            <p className="text-gray-600 ml-3 mt-2">
//            Welcome to your course materials 📚
//          </p>
//        </div>

//         {/* <h3 className="text-2xl font-semibold mb-4">Available Materials 📚</h3> */}
//         <h2 className="text-2xl font-bold mb-4">Available Materials 📚</h2>

//       {courses.length === 0 && (
//         <p className="text-gray-400 text-xl">No materials 📚 available</p>
//       )}

//       <div className="grid md:grid-cols-2 gap-6">
//         {courses.map((course) => (
//           <div key={course.id} className="bg-white p-4 rounded-xl shadow-md">

//             <h3 className="text-xl font-bold mt-1 ml-3">{course.name}</h3>
//             <p className="text-gray-700 ml-8">{course.description}</p>



              
//             {/* IMAGES */}
//             {course.images?.length > 0 && (
//               <div className="mt-4">
//                 <h4 className="font-semibold ml-3 mb-2">Images</h4>

//                 <div className="grid grid-cols-3 ml-2 mb-2 gap-2">
//                   {course.images.map((img, index) => (
//                     <img
//                       key={index}
//                       src={img.url}
//                       alt="Course media"
//                       className="w-full h-24 ml-3 object-cover rounded cursor-pointer"
//                       onClick={() => window.open(img.url, "_blank")}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* PDFs */}
//             {course.pdfs?.length > 0 && (
//               <div className="mt-4">
//                 <h4 className="font-semibold ml-3 mt-3 mb-2">PDFs</h4>
//                 <ul className="space-y-1 mb-2">
//                   {course.pdfs.map((pdf, index) => (
//                     <li key={index}>
//                       <a
//                         href={pdf.url}
//                         target="_blank"
//                         className="text-indigo-700 ml-7 mb-2 underline"
//                       >
//                         {pdf.name || "PDF"}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

 



// src/components/pages/Course.jsx
import { useEffect, useState } from "react";

import {
  collection,
  query,
  where,
  onSnapshot,
  
  doc,
  getDoc
} from "firebase/firestore";

import { auth, db } from "../../firebase";
import { ThreeDot } from "react-loading-indicators";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState(null);
  const [studentLoading, setStudentLoading] = useState(true);

  // 🔹 Load student data
  useEffect(() => {
    const loadStudent = async () => {
      const user = auth.currentUser;

      if (!user) {
        setStudent(null);
        setStudentLoading(false);
        return;
      }

      const ref = doc(db, "students", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setStudent(snap.data());
      } else {
        setStudent({});
      }

      setStudentLoading(false);
    };

    loadStudent();
  }, []);



  useEffect(() => {
  if (!student) return;

  const q = query(
    collection(db, "courses"),
    where("department", "==", student.department),
    where("section", "==", student.section),
    where("year", "==", student.year)
  );

  const unsub = onSnapshot(q, (snapshot) => {
    const list = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    setCourses(list);
  });

  return () => unsub();
}, [student]);

  // 🔹 Load courses
  // useEffect(() => {
  //   const unsub = onSnapshot(collection(db, "courses"), (snapshot) => {
  //     const list = snapshot.docs.map((d) => ({
  //       id: d.id,
  //       ...d.data(),
  //     }));
  //     setCourses(list);
  //   });

  //   return () => unsub();
  // }, []);

  useEffect(() => {
  if (!student) return;

  const unsub = onSnapshot(collection(db, "courses"), (snapshot) => {
    const list = snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter(
        (c) =>
          c.department === student.department &&
          c.year === student.year &&
          c.section === student.section
      );

    setCourses(list);
  });

  return () => unsub();
}, [student]);


  // 🔄 Loading
  if (studentLoading) {
    return (
      <div className="p-6 flex justify-center">
        <ThreeDot variant="pulsate" color="#1f13a4" size="large" />
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* STUDENT HEADER */}
      <div className="mb-6 bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold">Hello {student?.name} 👋</h2>
        {/* <p className="text-gray-600 mt-2">
          Dept: <strong>{student?.department}</strong> | Year:{" "}
          <strong>{student?.year}</strong> | Section:{" "}
          <strong>{student?.section}</strong>
        </p> */}
         <p className="text-gray-600 mt-2">
          Dept: <strong>CSE</strong> | Year:{" "}
          <strong>2024</strong> | Section:{" "}
          <strong>B</strong>
        </p>
        <p className="text-gray-500 mt-2">
          Welcome to your course materials 📚
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Available Materials 📚</h2>

      {courses.length === 0 && (
        <p className="text-gray-400">No materials available</p>
      )}

      {/* COURSES */}
      <div className="space-y-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-5 rounded-xl shadow">

            <h3 className="text-xl font-bold mb-1">{course.name}</h3>
            <p className="text-gray-600 mb-4">{course.description}</p>

            {/* SUBJECT WISE DISPLAY */}
            {/* {course.subjects &&
              Object.entries(course.subjects).map(
                ([subjectName, data]) => ( */}
                {/* {course.subjects &&
  Object.entries(course.subjects)
    .filter(
      ([, data]) =>
        (data.images && data.images.length > 0) ||
        (data.pdfs && data.pdfs.length > 0)
    )
    .map(([subjectName, data]) => (

                  <div key={subjectName} className="mb-6">

                    <h4 className="text-lg font-semibold text-indigo-700 mb-2">
                      📘 {subjectName}
                    </h4> */}

                    {/* IMAGES */}
                    {/* {data.images?.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {data.images.map((img, i) => (
                          <img
                            key={i}
                            src={img.url}
                            alt=""
                            className="h-24 w-full object-cover rounded cursor-pointer"
                            onClick={() => window.open(img.url, "_blank")}
                          />
                        ))}
                      </div>
                    )} */}

                    {/* PDFs */}
                    {/* {data.pdfs?.length > 0 && (
                      <ul className="space-y-1">
                        {data.pdfs.map((pdf, i) => (
                          <li key={i}>
                            <a
                              href={pdf.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-indigo-600 underline"
                            >
                              📄 {pdf.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )} */}
                  {/* </div>
                )
              )} */}







{course.subjects &&
  Object.entries(course.subjects).map(([subjectName, data]) => (
    <div key={subjectName} className="mb-6">

      <h4 className="text-lg font-semibold text-indigo-700 mb-2">
        📘 {subjectName}
      </h4>

      {/* Images */}
      {data.images?.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-3">
          {data.images.map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt={img.name}
              className="h-24 w-full object-cover rounded cursor-pointer"
              onClick={() => window.open(img.url, "_blank")}
            />
          ))}
        </div>
      )}

      {/* PDFs */}
      {data.pdfs?.length > 0 && (
        <ul className="space-y-1">
          {data.pdfs.map((pdf, i) => (
            <li key={i}>
              <a
                href={pdf.url}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 underline"
              >
                📄 {pdf.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  ))}



              
          </div>
        ))}
      </div>
    </div>
  );
}
