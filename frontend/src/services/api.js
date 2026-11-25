const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function chatWithSalesAI(message, history) {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history })
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Chat request failed.')
  return data.reply
}

export async function summarizeConversation(transcript) {
  const response = await fetch(`${API_URL}/api/summarize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transcript })
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Summary request failed.')
  return data.summary
}
