import { useEffect, useState, useRef } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [student, setStudent] = useState(null);
  const [anonId, setAnonId] = useState(null);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null); // 🔹 Ref for auto-scroll


  // Track logged-in user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // fetch student profile from Firestore
        const ref = doc(db, "students", authUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const studentData = snap.data();
          setStudent(studentData);

          // generate anon id per session
          setAnonId(
            "orang" + Math.random().toString(36).substring(2, 7).toUpperCase()
          );
        }
      } else {
        setStudent(null);
      }
       setLoading(false);
    });
    return () => unsub();
  }, []);

  // Listen for realtime messages once we know section
  useEffect(() => {
    if (!student) return;

    const sectionKey = `${student.department}-${student.section}`;
    const q = query(
      collection(db, "chats", sectionKey, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, [student]);


// Auto-scroll when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMsg.trim() || !student) return;

    const sectionKey = `${student.department}-${student.section}`;
    await addDoc(collection(db, "chats", sectionKey, "messages"), {
      userId: anonId,
      message: newMsg.trim(),
      createdAt: serverTimestamp(),
    });

    setNewMsg("");
  };

    // Format Firestore timestamp with date and time
const formatTime = (ts) => {
  if (!ts) return "";
  const date = ts.toDate();

  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const isYesterday =
    date.getDate() === today.getDate() - 1 &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const timeStr = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) {
    return `Today • ${timeStr}`;
  } else if (isYesterday) {
    return `Yesterday • ${timeStr}`;
  } else {
    const dateStr = date.toLocaleDateString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return `${dateStr} • ${timeStr}`;
  }
};

// ⏳ Loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 animate-pulse">Loading chat...</p>
      </div>
    );
  }


if (!student) {
  return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-500">Please log in to access the chat.</p>
    </div>
  );
}

const sectionKey = student?.department && student?.section
  ? `${student.department}-${student.section}`
  : "Unknown";




  // const sectionKey = `${student.department}-${student.section}`;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-2xl h-screen flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-700">
        Section Chat – {sectionKey}
      </h2>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto border p-3 rounded-lg bg-gray-50 space-y-3">
        {messages.map((msg) => {
          const isMine = msg.userId === anonId;
          return (
            <div
              key={msg.id}
              className={`flex flex-col  ${
                isMine ? "items-end" : "items-start"
              }`}
            >
              <span className="text-xs text-gray-500 mb-1">
                {msg.userId} • {formatTime(msg.createdAt)}
              </span>
              <span
                className={`px-3 py-2 rounded-lg max-w-[75%] break-words ${
                  isMine
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.message}
              </span>
            </div>
          );
        })}
        <div ref={bottomRef} /> {/* 🔹 Keeps scroll at bottom */}
      </div>

      {/* Input */}
      <form onSubmit={sendMessage}   className="p-3  border-gray-700 bg-gray-800 flex">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
           className="flex-1 border border-gray-600 bg-gray-700 text-white p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
         
          // className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
