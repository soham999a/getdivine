import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (recommended)
const API_KEY = process.env.GEMINI_API_KEY;

// Ensure the API_KEY is set
if (!API_KEY) {
  console.error("GEMINI_API_KEY environment variable not set.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ message: 'Error generating response' });
  }
} 