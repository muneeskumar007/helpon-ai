

import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { db, functions } from '../firebase';

const Chatbot = ({ docId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const q = query(collection(db, `chats/${docId}/messages`), orderBy('createdAt'));
    const unsub = onSnapshot(q, snap => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [docId]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput('');

    await addDoc(collection(db, `chats/${docId}/messages`), {
      sender: 'user',
      text,
      createdAt: serverTimestamp(),
    });

    // Call Cloud Function for bot reply
    const generateReply = httpsCallable(functions, 'generateChatbotReply');
    const res = await generateReply({ message: text });

    await addDoc(collection(db, `chats/${docId}/messages`), {
      sender: 'bot',
      text: res.data.reply,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <div className="mt-4 p-4 border rounded">
      <h2 className="text-lg font-semibold mb-2">Chat</h2>
      <div className="h-40 overflow-y-auto border p-2 mb-2">
        {messages.map(m => (
          <div key={m.id} className={m.sender === 'user' ? 'text-right' : 'text-left'}>
            <p className="mb-1"><strong>{m.sender}:</strong> {m.text}</p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border p-2 rounded-l"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;