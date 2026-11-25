const MODELS = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.5-flash'];

async function callGemini(apiKey, systemInstruction, contents, generationConfig = {}) {
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in backend/.env')
  }
  let lastError = null;

  for (const model of MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 700, ...generationConfig }
      })
    });

    const data = await response.json();
    if (response.ok) {
      const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim();
      if (text) return text;
    }
    lastError = data.error?.message || `Gemini returned HTTP ${response.status}`;
  }
  throw new Error(lastError || 'Gemini did not return a response');
}

export { callGemini };
