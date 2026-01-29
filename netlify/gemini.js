
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async (req) => {
  if (req.method !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const { prompt } = JSON.parse(req.body);

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Prompt missing" }),
      };
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: response.text(),
      }),
    };
  } catch (error) {
    console.error("Gemini error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "AI service temporarily unavailable",
      }),
    };
  }
};
