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



//   useEffect(() => {
//   if (!student) return;

//   const q = query(
//     collection(db, "courses"),
//     where("department", "==", student.department),
//     where("year", "==", student.year),
//     where("section", "==", student.section)
//   );

//   const unsub = onSnapshot(q, (snapshot) => {
//     const list = snapshot.docs.map((d) => ({
//       id: d.id,
//       ...d.data(),
//     }));
//     setCourses(list);
//   });

//   return () => unsub();
// }, [student]);



useEffect(() => {
  if (!student?.department || !student?.year || !student?.section) return;

  const q = query(
    collection(db, "courses"),
    where("department", "==", student.department),
    where("year", "==", student.year),
    where("section", "==", student.section)
  );

  const unsub = onSnapshot(q, (snapshot) => {
    setCourses(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
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
        <h2 className="text-xl font-bold ml-3">Hello {student?.name} 👋</h2>
        <p className="text-gray-600 mt-2 ml-3">
          Dept: <strong>{student?.department}</strong> | Year:{" "}
          <strong>{student?.year}</strong> | Section:{" "}
          <strong>{student?.section}</strong>{"  "}
           | Class Advisor:{"  "}
          <strong>A.Xavier mary</strong>
        </p>
         
        <p className="text-gray-500 mt-2 ml-3">
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





{/* 
{course.subjects &&
  Object.entries(course.subjects).map(([subject, data]) => (
    <div key={subject} className="mt-3 border-t pt-2">
      <h5 className="font-semibold text-indigo-600">{subject}</h5>

      {data.images?.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mt-2">
          {data.images.map((img, i) => (
            <img
              key={i}
              src={img.url}
              className="h-16 w-full object-cover rounded"
              onClick={() => window.open(img.url, "_blank")}
            />
          ))}
        </div>
      )}

      
      {data.pdfs?.length > 0 && (
        <ul className="mt-2 text-sm">
          {data.pdfs.map((pdf, i) => (
            <li key={i}>
              <a
                href={pdf.url}
                target="_blank"
                className="text-indigo-600 underline"
              >
                📄 {pdf.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  ))} */}




  {course.subjects &&
  Object.entries(course.subjects).map(([subject, data]) => (
    <div key={subject} className="mt-3 border-t pt-2">
      <h4 className="font-semibold text-indigo-700">{subject}</h4>

      {/* Images */}
      {data.images?.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {data.images.map((img, i) => (
            <div key={i} className="relative">
              <img
                src={img.url}
                className="h-20 w-full object-cover rounded cursor-pointer"
                onClick={() => window.open(img.url, "_blank")}
              />
              <button
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                onClick={() =>
                  handleFileDelete(course.id, subject, img, "image")
                }
              >
                👁️
              </button>
            </div>
          ))}
        </div>
      )}

      {/* PDFs */}
      {data.pdfs?.length > 0 && (
        <ul className="mt-2 text-sm">
          {data.pdfs.map((pdf, i) => (
            <li key={i} className="flex justify-between items-center">
              <a
                href={pdf.url}
                target="_blank"
                className="text-indigo-600 underline"
              >
                📄 {pdf.name}
              </a>
              <button
                className="  absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                onClick={() =>
                  handleFileDelete(course.id, subject, pdf, "pdf")
                }
              >
                 👁️
              </button>
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
