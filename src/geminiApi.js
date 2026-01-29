// import { GoogleGenAI } from "@google/genai";

// // const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY });

// const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_REACT_APP_GEMINI_API_KEY });

// export async function generateGeminiReply(prompt) {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: prompt,
//   });
//   return response.text;
// }



const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function generateGeminiReply(prompt) {
  if (!API_KEY) {
    console.error("❌ Gemini API key missing");
    return "⚠️ AI service is not configured.";
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    console.error("❌ Gemini error:", errText);
    throw new Error("Gemini API failed");
  }

  const data = await res.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "🤔 No response from AI"
  );
}
