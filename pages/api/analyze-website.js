import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: 'Missing website description' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Refined prompt to emphasize JSON output only
    const prompt = `Analyze the following website description and provide:
1. Estimated development time in weeks
2. Recommended technology stack
3. Estimated cost in Indian Rupees (INR)

Format the entire response SOLELY as a JSON object with these keys: timeEstimate (string), techStack (array of strings), costEstimate (string).
Do NOT include any other text, explanations, or markdown outside the JSON object.
Be realistic and consider Indian market rates.

Website Description: ${description}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // More robust cleaning to extract only the JSON object
    let cleanedText = text.trim();
    // Remove markdown code block if present
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.substring(7).trim();
      if (cleanedText.endsWith('```')) {
        cleanedText = cleanedText.slice(0, -3).trim();
      }
    }
    // Attempt to find and extract the JSON object by finding the first '{' and last '}'
    const jsonStartIndex = cleanedText.indexOf('{');
    const jsonEndIndex = cleanedText.lastIndexOf('}');

    if (jsonStartIndex === -1 || jsonEndIndex === -1 || jsonEndIndex < jsonStartIndex) {
        console.error('Could not find valid JSON object in response:', text);
         return res.status(500).json({ error: 'API response did not contain a valid JSON object.', rawResponse: text });
    }

    cleanedText = cleanedText.substring(jsonStartIndex, jsonEndIndex + 1);


    let parsedAnalysis;
    try {
      parsedAnalysis = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Error parsing Gemini API response after cleaning:', cleanedText, parseError);
      return res.status(500).json({ error: 'Failed to parse analysis from API response. Cleaned text: ' + cleanedText });
    }

    // Validate the structure of the parsed JSON
    if (typeof parsedAnalysis.timeEstimate !== 'string' || !Array.isArray(parsedAnalysis.techStack) || typeof parsedAnalysis.costEstimate !== 'string') {
         console.error('Parsed JSON has incorrect structure:', parsedAnalysis);
         return res.status(500).json({ error: 'API response JSON structure is incorrect.', parsedData: parsedAnalysis });
    }

    return res.status(200).json(parsedAnalysis);
  } catch (error) {
    console.error('Error analyzing website with Gemini API:', error);
    if (error.response && error.response.error) {
      return res.status(error.status || 500).json({ error: `API Error: ${error.response.error.message}` });
    }
    if (error.status === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    }
    return res.status(500).json({ error: 'Failed to analyze website using Gemini API' });
  }
} 