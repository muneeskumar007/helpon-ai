
// import { useEffect, useState } from "react";
// import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
// import { db } from "../../firebase";

// export default function CourseList() {
//   const [courses, setCourses] = useState([]);

//   const fetchCourses = async () => {
//     const snap = await getDocs(collection(db, "courses"));
//     setCourses(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this course?")) {
//       await deleteDoc(doc(db, "courses", id));
//       fetchCourses();
//     }
//   };

//   return (
//     <div className="bg-white shadow rounded-lg p-4">
//       <h3 className="text-lg font-bold mb-2">All Courses</h3>
//       {courses.length === 0 ? (
//         <p className="text-gray-600">No courses added yet.</p>
//       ) : (
//         <ul className="space-y-2">
//           {courses.map((c) => (
//             <li
//               key={c.id}
//               className="flex items-center justify-between border-b py-2"
//             >
//               <div>
//                 <h4 className="font-semibold">{c.name}</h4>
//                 <p className="text-sm text-gray-500">
//                   {c.department}-{c.section} | {c.year}
//                 </p>
//               </div>
//               <button
//                 onClick={() => handleDelete(c.id)}
//                 className="text-red-600 hover:underline"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import CourseForm from "./CourseForm";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [staff, setStaff] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // ✅ fetch staff details (from Firestore)
  useEffect(() => {
    const fetchStaff = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const snap = await getDoc(doc(db, "staff", user.uid));
      if (snap.exists()) {
        setStaff(snap.data());
      }
    };

    fetchStaff();
  }, []);

  // ✅ fetch courses for this staff's department + section
  useEffect(() => {
    if (!staff) return;

    const q = query(
      collection(db, "courses"),
      where("department", "==", staff.department),
      where("section", "==", staff.section)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setCourses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, [staff]);

  // ✅ delete course
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await deleteDoc(doc(db, "courses", id));
    }
  };

  if (!staff) {
    return (
      <div className="p-6 text-gray-500">Loading staff dashboard...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Manage Courses ({staff.department} – {staff.section})
      </h2>

      {/* ✅ Add or Edit form */}
      <CourseForm
        courseId={editingId}
        onSuccess={() => setEditingId(null)}
      />

      {/* ✅ Courses list */}
      <div className="space-y-4">
        {courses.length === 0 ? (
          <p className="text-gray-500">No courses yet.</p>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{course.name}</h3>
                <p className="text-sm text-gray-500">{course.description}</p>
                {course.imageUrl && (
                  <img
                    src={course.imageUrl}
                    alt={course.name}
                    className="w-32 h-20 object-cover mt-2 rounded"
                  />
                )}
                {course.pdfUrl && (
                  <a
                    href={course.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline mt-2 block"
                  >
                    View PDF
                  </a>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditingId(course.id)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
