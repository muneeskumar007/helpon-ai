




// src/components/pages/Admin.jsx
import { useEffect, useState } from "react";
;
import {
  collection,
  query,
  where,
  
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs
} from "firebase/firestore";



import { db } from "../../firebase";
import "./Admin.css";
import LightRays from "../../Backgrounds/LightRays/LightRays";
import { deleteFromCloudinary } from "../../utils/deleteFromCloudinary";

// Admin panel with progress uploads and file delete
export default function Admin() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    year: "",
    department: "",
    section: "",
    adviser: "",
    subject: "",        // ✅ ADD THIS
  subjects: {}, 
    
    images: [],
    pdfs: [],
    imageFiles: [],
    pdfFiles: [],
  });

  const [editId, setEditId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  // progress state: { images: { filename: percent }, pdfs: { filename: percent } }
  const [progress, setProgress] = useState({ images: {}, pdfs: {} });

  const staffInfo = (() => {
    try {
      return JSON.parse(localStorage.getItem("staff"));
    } catch {
      return null;
    }
  })();

  // Prefill department/section from staffInfo if present
  useEffect(() => {
    if (staffInfo) {
      setForm((f) => ({
        ...f,
        department: f.department || staffInfo.department || "",
        section: f.section || staffInfo.section || "",
      }));
    }
  }, [staffInfo]);

  useEffect(() => {
    if (isAuthenticated) fetchCourses();
  }, [isAuthenticated]);

  const fetchCourses = async () => {
    const q = staffInfo
      ? query(
          collection(db, "courses"),
          where("department", "==", staffInfo.department),
          where("section", "==", staffInfo.section)
        )
      : collection(db, "courses");

    const snapshot = await getDocs(q);
    setCourses(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  // XHR uploader that supports progress
  const uploadWithProgress = (file, fileType, onProgress) =>
    new Promise((resolve, reject) => {
      try {
        const formData = new FormData();
        const preset =
          fileType === "pdf"
            ? import.meta.env.VITE_CLOUD_PDF_PRESET
            : import.meta.env.VITE_CLOUD_IMAGE_PRESET;
        const folder = fileType === "pdf" ? "coursePdfs" : "courseImages";

        formData.append("file", file);
        formData.append("upload_preset", preset);
        formData.append("folder", folder);

        const endpoint =
          fileType === "pdf"
            ? `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/raw/upload`
            : `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`;

        const xhr = new XMLHttpRequest();
        xhr.open("POST", endpoint);

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            onProgress(percent);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const data = JSON.parse(xhr.responseText);
              if (!data.secure_url || !data.public_id) {
                console.error("Upload response:", data);
                reject(new Error("Cloudinary upload returned unexpected data"));
                return;
              }
              // normalize to { url, public_id, name, type }
              resolve({
                url: data.secure_url,
                public_id: data.public_id,
                name: data.original_filename || file.name,
                type: fileType,
              });
            } catch (err) {
              reject(err);
            }
          } else {
            try {
              const errData = JSON.parse(xhr.responseText || "{}");
              console.error("Upload failed:", errData);
            } catch {}
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        };

        xhr.onerror = () => reject(new Error("Network error during upload"));
        xhr.send(formData);
      } catch (err) {
        reject(err);
      }
    });

  // Accepts FileList/array and fileType 'image'|'pdf'
  const uploadFiles = async (files, fileType) => {
    const uploaded = [];
    for (const file of files) {
      // set initial 0% for UI
      setProgress((p) => ({
        ...p,
        [fileType === "pdf" ? "pdfs" : "images"]: {
          ...p[fileType === "pdf" ? "pdfs" : "images"],
          [file.name]: 0,
        },
      }));

      const item = await uploadWithProgress(
        file,
        fileType === "pdf" ? "pdf" : "image",
        (percent) =>
          setProgress((p) => ({
            ...p,
            [fileType === "pdf" ? "pdfs" : "images"]: {
              ...p[fileType === "pdf" ? "pdfs" : "images"],
              [file.name]: percent,
            },
          }))
      );

      // remove progress entry after done (optional small delay)
      setProgress((p) => {
        const copy = { ...p };
        const key = fileType === "pdf" ? "pdfs" : "images";
        if (copy[key]) delete copy[key][file.name];
        return copy;
      });

      uploaded.push(item);
    }
    return uploaded;
  };




const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.subject) {
    alert("Please select a subject");
    return;
  }

  try {
    let newImages = [];
    let newPdfs = [];

    // 🔹 upload images
    if (form.imageFiles?.length > 0) {
      newImages = await uploadFiles(form.imageFiles, "image");
    }

    // 🔹 upload pdfs
    if (form.pdfFiles?.length > 0) {
      newPdfs = await uploadFiles(form.pdfFiles, "pdf");
    }

    const department = form.department || staffInfo?.department || "CSE";
    const section = form.section || staffInfo?.section || "B";
    const year = form.year || staffInfo?.year || "2nd Year";

    

    // ✅ SUBJECT DATA MUST BE CREATED HERE
    const subjectData = {
      images: newImages,
      pdfs: newPdfs,
    };

    const courseData = {
      name: form.name,
      description: form.description,
      year,
      department,
      section,
      adviser: form.adviser,
      createdBy: staffInfo?.name || "Unknown",

      // ✅ subject-wise storage
      subjects: {
        ...(editId ? form.subjects || {} : {}),
        [form.subject]: subjectData,
      },

      updatedAt: new Date(),
    };

    if (editId) {
      await updateDoc(doc(db, "courses", editId), courseData);
    } else {
      await addDoc(collection(db, "courses"), {
        ...courseData,
        createdAt: new Date(),
      });
    }

    alert("Course saved successfully!");

    setEditId(null);
    setForm({
      name: "",
      description: "",
      year: "",
      department: staffInfo?.department || "",
      section: staffInfo?.section || "",
      adviser: "",
      subject: "",
      subjects: {},
      imageFiles: [],
      pdfFiles: [],
    });

    fetchCourses();
  } catch (err) {
    console.error("Save failed:", err);
    alert("Failed to save course. See console.");
  }
};



  const handleEdit = (course) => {
    setForm({
      ...course,
      imageFiles: [],
      pdfFiles: [],
    });
    setEditId(course.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (course) => {
    if (!window.confirm("Delete this course completely?")) return;
    try {
      if (course.images?.length) {
        for (const img of course.images) {
          await deleteFromCloudinary(img.public_id, "image");
        }
      }
      if (course.pdfs?.length) {
        for (const pdf of course.pdfs) {
          await deleteFromCloudinary(pdf.public_id, "raw");
        }
      }
      await deleteDoc(doc(db, "courses", course.id));
      fetchCourses();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed — see console.");
    }
  };



//   const handleFileDelete = async (courseId, file, type = "pdf") => {
//   if (!window.confirm(`Delete this ${type.toUpperCase()} file?`)) return;

//   try {
//     // 1️⃣ delete from cloudinary
//     await deleteFromCloudinary(file.public_id, type === "pdf" ? "raw" : "image");

//     // 2️⃣ fetch correct course document
//     const courseRef = doc(db, "courses", courseId);
//     const snap = await getDoc(courseRef);

//     if (!snap.exists()) {
//       console.error("Course not found");
//       return;
//     }

//     const data = snap.data();

//     // 3️⃣ filter out deleted file
//     const updatedFiles =
//       type === "pdf"
//         ? data.pdfs.filter((p) => p.public_id !== file.public_id)
//         : data.images.filter((i) => i.public_id !== file.public_id);

//     // 4️⃣ update Firestore
//     await updateDoc(courseRef, {
//       [type === "pdf" ? "pdfs" : "images"]: updatedFiles,
//       updatedAt: new Date(),
//     });

//     // 5️⃣ refresh UI
//     fetchCourses();

//     alert(`${type.toUpperCase()} deleted successfully.`);
//   } catch (err) {
//     console.error("Delete failed:", err);
//     alert("Failed to delete file.");
//   }
// };



const handleFileDelete = async (courseId, subject, file, type) => {
  if (!window.confirm("Delete file?")) return;

  const courseRef = doc(db, "courses", courseId);
  const snap = await getDoc(courseRef);

  if (!snap.exists()) return;

  const data = snap.data();

  const updatedSubject = {
    ...data.subjects[subject],
    [type === "pdf" ? "pdfs" : "images"]:
      data.subjects[subject][type === "pdf" ? "pdfs" : "images"]
        .filter(f => f.public_id !== file.public_id),
  };

  await updateDoc(courseRef, {
    subjects: {
      ...data.subjects,
      [subject]: updatedSubject,
    },
  });

  await deleteFromCloudinary(file.public_id, type === "pdf" ? "raw" : "image");

  fetchCourses();
};


  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === "2311") {
      setIsAuthenticated(true);
    } else alert("Incorrect password!");
  };

   if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gray-700">
        {/* <div className="absolute ray inset-0 -z-10">
          <LightRays />
        </div> */}
        
  <div className="absolute ray inset-0 z-0 pointer-events-none">
      <LightRays />
  </div>
        <div className="key p-6 max-w-md w-full shadow-xl rounded-2xl bg-white">
          <h2 className="text-2xl font-bold mb-6 text-center ">
            Admin Access
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full  text-2xl  border-r-amber-200 rounded-lg text-gray-900 px-3 py-2 focus:ring-2  placeholder-gray-300"
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

  // ---------- UI ----------
  return (
    <div className="relative min-h-screen bg-gray-700 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-6   text-gray-300 ">Admin Panel</h2>

        {/* FORM */}
        <div className="bg-white shadow-2xl rounded-xl p-6 mb-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <input
              className="input"
              placeholder="Course Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            
            <select
                  className="input"
                  
                 value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
                >
                  <option value="">2nd Year</option>
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
            
            <select
                  className="input"
                  
                  value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
                >
                  <option value="">CSE</option>
                 <option>CSE</option>
                  <option>ECE</option>
                  <option>EEE</option>
                  <option>MECH</option>
                </select>
                <select
                  className="input"
                  
                 value={form.section}
              onChange={(e) => setForm({ ...form, section: e.target.value })}
                >
                  <option value="">B</option>
                 <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </select>


                <select
  className="input col-span-2"
  value={form.subject}
  required
  onChange={(e) => setForm({ ...form, subject: e.target.value })}
>
  <option value="">Select Subject</option>
  <option>COMMON</option>
  <option>TOC</option>
  <option>Operating Systems</option>
  <option>DBMS</option>
  <option>Networks Essentials</option>
  <option>OOSE</option>
  <option>DAA</option>
  <option>DBMS LAB</option>
  <option>OS LAB</option>
  <option>NE LAB</option>
</select>

            
            <textarea
              className="col-span-2 input"
              placeholder="Description"
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            {/* Image Upload */}
            <div className="col-span-2">
              <label className="font-semibold heading">Upload Images</label>
              <input
               className="input"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setForm({ ...form, imageFiles: [...e.target.files] })}
              />

              {/* show progress per selected file */}
              {form.imageFiles?.length > 0 && (
                <div className="mt-2 space-y-1">
                  {Array.from(form.imageFiles).map((f) => (
                    <div key={f.name} className="text-sm">
                      {f.name} — {progress.images[f.name] ?? 0}%
                      <div className="w-full bg-gray-200 rounded h-2 mt-1">
                        <div
                          style={{ width: `${progress.images[f.name] ?? 0}%` }}
                          className="h-2 bg-indigo-600 rounded"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PDF Upload */}
            <div className="col-span-2">
              <label className="font-semibold mb-5 heading">Upload PDFs</label>
              <input
               className="input"
                type="file"
                multiple
                accept="application/pdf"
                onChange={(e) => setForm({ ...form, pdfFiles: [...e.target.files] })}
              />

              {form.pdfFiles?.length > 0 && (
                <div className="mt-2 space-y-1">
                  {Array.from(form.pdfFiles).map((f) => (
                    <div key={f.name} className="text-sm">
                      {f.name} — {progress.pdfs[f.name] ?? 0}%
                      <div className="w-full bg-gray-200 rounded h-2 mt-1">
                        <div
                          style={{ width: `${progress.pdfs[f.name] ?? 0}%` }}
                          className="h-2 bg-indigo-600 rounded"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="col-span-2 flex justify-end">
              <button className="bg-indigo-600 button text-white px-6 py-2 rounded-lg">
                {editId ? "Update Course" : "Add Course"}
              </button>
            </div>
          </form>
        </div>

        {/* Course List */}
        <h3 className="text-2xl font-bold mb-4 text-gray-200">Courses</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-4 rounded-xl shadow-md">
              <h4 className="font-bold text-lg">{course.name}</h4>
              <p className="text-gray-600">{course.description}</p>

              
              {course.images?.length > 0 && (
                <div className="mt-3">
                  <h4 className="font-semibold mb-1">Images</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {course.images.map((img, i) => (
                      <div key={i} className="relative">
                        <img
                          src={img.url}
                          alt={img.name || "Image"}
                          className="w-full h-20 object-cover rounded cursor-pointer"
                          onClick={() => window.open(img.url, "_blank")}
                        />

                        <button
                          className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                          onClick={() => handleFileDelete(course.id, img, "image")}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            
              {course.pdfs?.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-1">PDF Files</h4>
                  <ul className="space-y-2">
                    {course.pdfs.map((pdf, i) => (
                      <li key={i} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                        <a
                          href={pdf.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-700 font-medium underline"
                        >
                          {pdf.name || "PDF File"}
                        </a>

                        <div className="flex gap-2">
                          <button
                            className="bg-blue-600 text-white text-xs px-3 py-1 rounded"
                            onClick={() => window.open(pdf.url, "_blank")}
                          >
                            View
                          </button>
                          <button
                            className="bg-red-600 text-white text-xs px-3 py-1 rounded"
                            onClick={() => handleFileDelete(course.id, pdf, "pdf")}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-4 py-1 bg-yellow-500 text-white rounded"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </button>

                <button
                  className="px-4 py-1 bg-red-600 text-white rounded"
                  onClick={() => handleDelete(course)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* DEV / quick-test card: local test (only shown if no courses) */}
          {courses.length === 0 && (
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h4 className="font-bold text-lg mb-2">(dev) test image</h4>
              <img
                src={"/mnt/data/Screenshot 2025-12-06 164316.png"}
                alt="dev-screenshot"
                className="w-full h-40 object-contain rounded"
              />
              <p className="text-sm text-gray-500 mt-2">Local test image path (dev)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



 