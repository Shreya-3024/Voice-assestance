import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { chatRouter } from './routes/chat.js'
import { summarizeRouter } from './routes/summarize.js'

const app = express()
const port = process.env.PORT || 3001
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:5173'

app.use(cors({ origin: allowedOrigin }))
app.use(express.json({ limit: '500kb' }))
app.use('/api', chatRouter)
app.use('/api', summarizeRouter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'SalesAI backend' })
})

app.use((error, _req, res, _next) => {
  if (error?.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Request is too large.' })
  }
  res.status(500).json({ error: 'Unexpected server error.' })
})

app.listen(port, () => console.log(`SalesAI backend running at http://localhost:${port}`))
