import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY });

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_REACT_APP_GEMINI_API_KEY });

export async function generateGeminiReply(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
}