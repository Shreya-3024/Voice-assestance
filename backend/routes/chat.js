import express from 'express'
import { callGemini, getGeminiErrorMessage } from '../services/gemini.js'
import { salesSystemPrompt } from '../prompts/salesPrompt.js'

export const chatRouter = express.Router()

chatRouter.post('/chat', async (req, res) => {
  const { message, history = [] } = req.body
  if (typeof message !== 'string' || !message.trim() || message.length > 4000) {
    return res.status(400).json({ error: 'A valid customer message is required.' })
  }
  if (!Array.isArray(history) || history.length > 100 ||
    history.some((item) => !item || !['assistant', 'user'].includes(item.role) ||
      typeof item.content !== 'string' || !item.content.trim())) {
    return res.status(400).json({ error: 'Conversation history must contain valid messages.' })
  }

  const contents = [
    ...history.slice(-20).map((item) => ({
      role: item.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: item.content }]
    })),
    { role: 'user', parts: [{ text: message }] }
  ]

  try {
    const reply = await callGemini(process.env.GEMINI_API_KEY, salesSystemPrompt, contents)
    res.json({ reply })
  } catch (error) {
    console.error(error)
    res.status(502).json({ error: getGeminiErrorMessage(error, 'AI response') })
  }
})
