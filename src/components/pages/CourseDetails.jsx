
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      const snap = await getDoc(doc(db, "courses", id));
      if (snap.exists()) {
        setCourse(snap.data());
      } else {
        navigate("/dashboard"); // course not found
      }
    };
    fetchCourse();
  }, [id, navigate]);

  if (!course) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold mb-2">{course.name}</h2>
      <p className="text-gray-700 mb-4">{course.description}</p>

      {/* Image Preview */}
      {course.imageUrl && (
        <div className="mb-4">
          <img
            src={course.imageUrl}
            alt={course.name}
            className="max-w-md rounded shadow"
          />
        </div>
      )}

      {/* PDF Link */}
      {course.pdfUrl && (
        <div className="mb-4">
          <a
            href={course.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            📄 Open Course PDF
          </a>
        </div>
      )}

      <p className="text-sm text-gray-500">
        Adviser: {course.adviser} | Year: {course.year} | Dept:{" "}
        {course.department}-{course.section}
      </p>
    </div>
  );
}
