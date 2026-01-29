
import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase";  

import { generateGeminiReply } from "../geminiApi"; // Adjust path as needed
import './pages/Admin.css';




function getBotReply(message) {
  const lower = message.toLowerCase().trim();
  if (knowledgeBase[lower]) return knowledgeBase[lower];
  for (let key in knowledgeBase) {
    if (lower.includes(key)) return knowledgeBase[key];
  }
  return `🤔 Sorry, I don’t know that yet. Try: login, signup, upload, profile, search, help`;
}


export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const listRef = useRef(null);

  // Watch auth state and set userId
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    // Add user message
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input }
    ]);
    try {
      let reply;
      // Try knowledge base first
      const kbReply = getBotReply(input);
      if (kbReply.startsWith("🤔")) {
        // Not found in KB, use Gemini
        reply = await generateGeminiReply(input);
        // Fallback if Gemini returns nothing
        if (!reply) reply = "Sorry, I couldn't generate a response.";
      } else {
        reply = kbReply;
      }
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: reply }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error getting reply. Please try again." }
      ]);
    }
    setInput("");
    setLoading(false);
  };

  

  if (!userId) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>⚠️ Please login to use HelpBot</p>
      </div>
    );
  }

  return (
   
// {/* <div className="h-dvh w-full max-w-2xl mx-auto flex flex-col bg-white overflow-hidden">

//       <div
//   ref={listRef}
//   className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-3"
// >

//         {messages.map((m, idx) => (
//           <div
//             key={idx}
//             className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
//           >
           
//             <span
//   className={`max-w-[80%] break-words whitespace-pre-wrap px-4 py-2 rounded-2xl shadow-md ${
//     m.sender === "user"
//       ? "bg-blue-600 text-white rounded-br-none"
//       : "bg-gray-700 text-gray-200 rounded-bl-none"
//   }`}
// >

//               {m.text}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Input */}
//       <div className="p-3 border-t border-gray-700 bg-gray-800 flex">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 border border-gray-600 bg-gray-700 text-white p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Type a message..."
//           disabled={loading}
//           onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
//         />
//         <button
//           onClick={handleSend}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-r-lg font-medium"
//           disabled={loading}
//         >
//           {loading ? "..." : "Send"}
//         </button>
//       </div>
//     </div> */}


<div className="h-dvh w-full max-w-2xl mx-auto flex flex-col bg-gray-800 overflow-hidden">

  {/* Messages container */}
  <div
    ref={listRef}
    className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-3 relative"
    style={{ scrollBehavior: "smooth" }}
    onScroll={(e) => {
      const container = e.currentTarget;
      if (container.scrollTop > 5) {
        container.classList.add("scroll-shadow");
      } else {
        container.classList.remove("scroll-shadow");
      }
    }}
  >
    {messages.map((m, idx) => (
      <div
        key={idx}
        className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
      >
        <span
          className={`max-w-[80%] break-words whitespace-pre-wrap px-4 py-2 rounded-2xl shadow-md ${
            m.sender === "user"
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-gray-700 text-gray-200 rounded-bl-none"
          }`}
        >
          {m.text}
        </span>
      </div>
    ))}
  </div>

  {/* Input bar - sticky to bottom */}
  {/* <div className="sticky bottom-0 z-10 p-3 border-t border-gray-700 bg-gray-800 flex"> */}
    < div className="flex p-3 bg-gray-800 border-t sticky bottom-0 z-10">
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="flex-1 border border-gray-600 bg-gray-700 text-white p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Type a message..."
      disabled={loading}
      onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
    />
    <button
      onClick={handleSend}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-r-lg font-medium"
      disabled={loading}
    >
      {loading ? "..." : "Send"}
    </button>
  </div>


  {/* Input bar sticky to bottom */}
  {/* <form
    onSubmit={sendMessage}
    className="flex p-3 bg-gray-800 border-t sticky bottom-0 z-10"
  >
    <input
      type="text"
      value={newMsg}
      onChange={(e) => setNewMsg(e.target.value)}
      placeholder="Type your message..."
      className="flex-1 border border-gray-600 bg-gray-700 text-white p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition"
    >
      Send
    </button>
  </form> */}
</div>

  );
}
