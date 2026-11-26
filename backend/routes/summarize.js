import express from 'express'
import { callGemini, getGeminiErrorMessage } from '../services/gemini.js'
import { summarizeSystemPrompt } from '../prompts/summarizePrompt.js'

export const summarizeRouter = express.Router()

const allowedKeys = [
  'customerName', 'interestedService', 'requirements', 'estimatedBudget',
  'projectTimeline', 'interestLevel', 'summary', 'recommendedNextAction'
]

const responseSchema = {
  type: 'OBJECT',
  properties: {
    customerName: { type: 'STRING' },
    interestedService: { type: 'STRING' },
    requirements: { type: 'STRING' },
    estimatedBudget: { type: 'STRING' },
    projectTimeline: { type: 'STRING' },
    interestLevel: { type: 'STRING', enum: ['High', 'Medium', 'Low'] },
    summary: { type: 'STRING' },
    recommendedNextAction: { type: 'STRING' }
  },
  required: allowedKeys,
  propertyOrdering: allowedKeys
}

summarizeRouter.post('/summarize', async (req, res) => {
  const { transcript } = req.body
  if (!Array.isArray(transcript) || transcript.length === 0 || transcript.length > 500) {
    return res.status(400).json({ error: 'A conversation transcript is required.' })
  }
  if (transcript.some((item) =>
    !item || !['assistant', 'user'].includes(item.role) ||
    typeof item.content !== 'string' || !item.content.trim()
  )) {
    return res.status(400).json({ error: 'Transcript messages must include a valid role and non-empty text.' })
  }

  const cleanTranscript = transcript
    .slice(-100)
    .map((item) => `${item.role === 'assistant' ? 'SalesAI' : 'Customer'}: ${item.content.slice(0, 2000)}`)
    .join('\n')

  try {
    const raw = await callGemini(
      process.env.GEMINI_API_KEY,
      summarizeSystemPrompt,
      [{ role: 'user', parts: [{ text: cleanTranscript }] }],
      {
        responseMimeType: 'application/json',
        responseSchema,
        temperature: 0.2,
        maxOutputTokens: 1000
      }
    )
    const parsed = JSON.parse(raw.replace(/```json|```/gi, '').trim())
    const summary = Object.fromEntries(allowedKeys.map((key) => [
      key,
      typeof parsed[key] === 'string' && parsed[key].trim() ? parsed[key].trim() : 'Not provided'
    ]))
    if (!['High', 'Medium', 'Low'].includes(summary.interestLevel)) {
      return res.status(502).json({ error: 'AI returned an invalid interest level. Please retry the summary.' })
    }
    res.json({ summary })
  } catch (error) {
    console.error(error)
    const message = error instanceof SyntaxError
      ? 'AI returned an invalid summary format. Please retry the summary.'
      : getGeminiErrorMessage(error, 'conversation summary')
    res.status(502).json({ error: message })
  }
})
