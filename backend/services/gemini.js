const MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.8-flash',
  'gemini-3.7-flash',
  'gemini-3.5-flash'
];

async function callGemini(apiKey, systemInstruction, contents, generationConfig = {}) {
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in backend/.env')
  }
  let lastError = null;

  for (const model of MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 700, ...generationConfig }
        })
      });
    } catch (error) {
      lastError = error.name === 'TimeoutError'
        ? `Gemini request timed out for ${model}`
        : error.message;
      continue;
    }

    const data = await response.json();
    if (response.ok) {
      const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim();
      if (text) return text;
    }
    lastError = data.error?.message || `Gemini returned HTTP ${response.status}`;
    if (![404, 429, 500, 502, 503, 504].includes(response.status)) {
      throw new Error(lastError);
    }
  }
  throw new Error(lastError || 'Gemini did not return a response');
}

function getGeminiErrorMessage(error, action) {
  const message = error instanceof Error ? error.message : ''
  if (/quota|rate.?limit|resource_exhausted|high demand/i.test(message)) {
    return 'Gemini usage limit reached. Check your AI Studio quota and try again later.'
  }
  if (/api key|api_key|unauthorized|permission denied/i.test(message)) {
    return 'Gemini rejected the API key. Check backend/.env and your AI Studio key permissions.'
  }
  if (/timeout|timed out|abort/i.test(message)) {
    return 'The AI service timed out. Please try again.'
  }
  return `The ${action} could not be completed. Please try again.`
}

export { callGemini, getGeminiErrorMessage };
