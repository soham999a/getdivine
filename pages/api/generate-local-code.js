import { InferenceClient } from "@huggingface/inference";

const inference = new InferenceClient(process.env.HF_API_TOKEN);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { prompt, language } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  let systemPrompt = "You are a helpful assistant that generates code.";
  let userMessage = `Generate ${language} code for a website section based on the following description: ${prompt}\n\nProvide only the code, no explanations or extra text.`;

  if (language === 'html' || language === 'css' || language === 'javascript') {
    userMessage = `Generate a single HTML file that creates a website section based on the following description: ${prompt}\n\nIf the request includes CSS, embed it within <style> tags in the HTML <head>. If it includes JavaScript, embed it within <script> tags before the closing </body> tag. Provide only the full HTML code, no explanations or extra text.`;
  }

  try {
    const output = await inference.chatCompletion({
      model: "google/gemma-2-2b-it",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      parameters: {
        max_new_tokens: 2000, // Increased tokens for full HTML
        temperature: 0.7,
        // You might want to add stop sequences here, e.g., ["</html>"]
      },
    });

    // The output from chatCompletion is an object with choices containing message with content
    const generatedCode = output.choices[0].message.content;

    res.status(200).json({ code: generatedCode });
  } catch (error) {
    console.error('Error generating code with Hugging Face Inference API:', error);
    res.status(500).json({ message: 'Error generating code', error: error.message });
  }
} 