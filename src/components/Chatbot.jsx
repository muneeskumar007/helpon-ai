
import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase";   // ✅ import auth (🔥 added)

// ... your knowledgeBase & getBotReply stay the same ...
// api

import { generateGeminiReply } from "../geminiApi"; // Adjust path as needed



// const knowledgeBase = {
//   // Greetings
//   "hello": "👋 Hey! How can I help you today?",
//   "hlo": "👋 Hey! How can I help you today?",
//   "hi": "Hi there! 😊 What do you want to know?",
//   "hey": "Hello 👋, need help with login or files?",
//   "bye": "Goodbye! 👋 Have a wonderful day!",

//   // Auth
//   "login": "🔑 To login, use your email & password on the login page.",
//   "signup": "📝 Go to Sign Up and provide email, password & name.",
//   "logout": "🚪 Click the logout button in the top right to sign out.",
//   "password reset": "🔒 Forgot your password? Use the reset option on login.",

//   // Files & Upload
//   "upload": "📤 Use Upload Manager in your dashboard to upload documents.",
//   "view files": "📂 Open Home or Document Viewer to see uploaded files.",
//   "delete file": "🗑️ In File List, click delete on the file you want removed.",
//   "pdf": "📑 PDFs can be uploaded and previewed in the viewer.",
//   "images": "🖼️ Supported formats: JPG, PNG, GIF. Upload via Upload Manager.",

//   // Profile
//   "profile": "👤 You can edit your profile in the Profile section.",
//   "update details": "✏️ Go to Profile > Edit to update your details.",
//   "change password": "🔐 From Profile settings, you can change your password.",

//   // Search & Navigation
//   "search": "🔍 Use the search bar to find your documents.",
//   "back": "⬅️ Use the back arrow (top left) to return to the menu.",
//   "home": "🏠 Home shows all categories & cards.",
//   "dashboard": "📊 Dashboard gives you access to uploads, profile, and files.",

//   // Support
//   "help": "🤝 I can help with login, signup, upload, profile, or file viewing.",
//   "contact": "📧 Reach out to support@example.com for extra help.",
//   "error": "⚠️ If you see an error, refresh or try logging in again.",
// };



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
    <div className=" h-dvh overflow-hidden no-scrollbar flex flex-col  bg-gray-900 text-white">
      {/* Header */}
      {/* <div className="p-4 border-b border-gray-700 bg-gray-800 shadow-md">
        <h2 className="text-lg font-semibold text-blue-400">💬 HelpBot</h2>
      </div> */}

      {/* Messages */}
      <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-900">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <span
              className={`px-4 py-2 rounded-2xl shadow-md ${
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

      {/* Input */}
      <div className="p-3 border-t border-gray-700 bg-gray-800 flex">
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
    </div>
  );
}
