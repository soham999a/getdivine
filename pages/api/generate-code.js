export default async function handler(req, res) {
  console.log("OPENAI_KEY:", process.env.OPENAI_KEY);
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { prompt, language } = req.body;
  if (!prompt || !language) {
    return res.status(400).json({ error: 'Missing prompt or language' });
  }
  const apiKey = process.env.OPENAI_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not set' });
  }
  const systemPrompt = `You are a helpful assistant that writes clean, production-ready ${language} code. Only return the code, no explanations.`;
  const userPrompt = `Prompt from user: ${prompt}`;
  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.5,
      }),
    });
    if (!openaiRes.ok) {
      const error = await openaiRes.text();
      return res.status(500).json({ error });
    }
    const data = await openaiRes.json();
    const code = data.choices?.[0]?.message?.content?.trim() || '';
    return res.status(200).json({ code });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to generate code' });
  }
} 