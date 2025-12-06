


import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
 
import { ThreeDot}  from "react-loading-indicators";

export default function Course() {
  const [student, setStudent] = useState(null);
  const [studentLoading, setStudentLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // const [user] = useAuthState(auth); 
  // ✅ fetch logged-in student info
  useEffect(() => {
    const fetchStudent = async () => {
      const user = auth.currentUser;
      if (!user) {
        setStudentLoading(false);
        return;
      }

      const snap = await getDoc(doc(db, "students", user.uid));
      if (snap.exists()) {
        setStudent(snap.data());
      }
      setStudentLoading(false);
    };

    fetchStudent();
  }, []);

  // ✅ fetch courses matching student dept/year/section
  useEffect(() => {
    if (!student) return;

    const q = query(
      collection(db, "courses"),
      where("department", "==", student.department),
      where("year", "==", student.year),
      where("section", "==", student.section)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setCourses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, [student]);

  // --- UI STATES ---
  if (studentLoading) {
    return <p className=" text-center p-6"><ThreeDot variant="pulsate" color="#1f13a4" size="large" text="⏳ loading" textColor="#172d68" />
 </p>;
  }
 
  if (!student) {
    return <p className="p-6 text-red-500">⚠️ No student profile found. Please contact admin.</p>;
  }

  return (
    <div className="p-2 pt-8">
      {/* Student info */}
      <div className="mb-6 bg-white shadow rounded-lg p-4">
        <h2 className="text-xl pt-4 ml-3 font-bold">Hello {student.name} 👋</h2>
        <p className="text-gray-600 ml-3 mt-2">
          Dept: <strong className="mr-6 ">{student.department} </strong> | Year: <strong className="mr-6 "> {student.year} </strong> | Section: <strong className="mr-3 "> {student.section} </strong>
        </p>
        <p className=" text-gray-500  mt-3 pb-4 ml-3">Class Adviser: <strong> A.XAVIER MARY</strong></p>
      </div>

      {/* Course list */}
      <h3 className="text-2xl font-semibold mb-4">Your Courses</h3>
      {courses.length === 0 ? (
        <p className="text-gray-600">📭 No courses available for your section yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => navigate(`/course/${course.id}`)}
              className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition p-4"
            >
              {/* Thumbnail */}
                       {course.images && course.images.length > 0 ? (
  <img
    src={course.images[0].url}
    alt={course.name}
    className="h-32 w-full object-cover rounded-md mb-2"
  />
) : (
  <div className="h-32 w-full bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
    No Image
  </div>
)}


              {/* Course details */}
              <h4 className="text-lg font-bold">{course.name}</h4>
              <p className="text-sm text-gray-500 line-clamp-2">{course.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}




