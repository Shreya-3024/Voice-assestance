import express from 'express'
import { callGemini } from '../services/gemini.js'
import { summarizeSystemPrompt } from '../prompts/summarizePrompt.js'

export const summarizeRouter = express.Router()

const allowedKeys = [
  'customerName', 'interestedService', 'requirements', 'estimatedBudget',
  'projectTimeline', 'interestLevel', 'summary', 'recommendedNextAction'
]

summarizeRouter.post('/summarize', async (req, res) => {
  const { transcript } = req.body
  if (!Array.isArray(transcript) || transcript.length === 0) {
    return res.status(400).json({ error: 'A conversation transcript is required.' })
  }

  const cleanTranscript = transcript
    .slice(-100)
    .map((item) => `${item.role === 'assistant' ? 'SalesAI' : 'Customer'}: ${String(item.content).slice(0, 2000)}`)
    .join('\n')

  try {
    const raw = await callGemini(
      process.env.GEMINI_API_KEY,
      summarizeSystemPrompt,
      [{ role: 'user', parts: [{ text: cleanTranscript }] }],
      { responseMimeType: 'application/json', temperature: 0.2, maxOutputTokens: 1000 }
    )
    const parsed = JSON.parse(raw.replace(/```json|```/gi, '').trim())
    const summary = Object.fromEntries(allowedKeys.map((key) => [
      key,
      typeof parsed[key] === 'string' && parsed[key].trim() ? parsed[key].trim() : 'Not provided'
    ]))
    if (!['High', 'Medium', 'Low'].includes(summary.interestLevel)) summary.interestLevel = 'Low'
    res.json({ summary })
  } catch (error) {
    console.error(error)
    res.status(502).json({ error: 'The conversation summary could not be generated.' })
  }
})
