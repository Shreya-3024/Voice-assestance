import express from 'express'
import { callGemini } from '../services/gemini.js'
import { salesSystemPrompt } from '../prompts/salesPrompt.js'

export const chatRouter = express.Router()

chatRouter.post('/chat', async (req, res) => {
  const { message, history = [] } = req.body
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'A valid customer message is required.' })
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
    res.status(502).json({ error: 'The AI service could not respond. Please try again.' })
  }
})
