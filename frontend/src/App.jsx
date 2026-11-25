import { useCallback, useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import VoicePage from './pages/VoicePage'
import InsightsPage from './pages/InsightsPage'
import HistoryPage from './pages/HistoryPage'
import { useSpeech } from './hooks/useSpeech'
import { chatWithSalesAI, summarizeConversation } from './services/api'

const STORAGE_KEY = 'salesai-conversation-history'

export default function App() {
  const [page, setPage] = useState('voice')
  const [started, setStarted] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState(null)
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] } catch { return [] }
  })

  const sendText = useCallback(async (text) => {
    if (!text.trim()) return
    setLoading(true)
    speech.setStatus('Processing')
    setInput('')
    const customerMessage = { role: 'user', content: text.trim() }
    setMessages((current) => [...current, customerMessage])
    try {
      const reply = await chatWithSalesAI(text.trim(), messages)
      const assistantMessage = { role: 'assistant', content: reply }
      setMessages((current) => [...current, assistantMessage])
      speech.speak(reply)
    } catch (error) {
      speech.setError(error.message)
    } finally {
      setLoading(false)
      speech.setStatus('Idle')
    }
  }, [messages])

  const speech = useSpeech(sendText)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  }, [history])

  const startConversation = async () => {
    setStarted(true)
    setMessages([])
    setSummary(null)
    setLoading(true)
    try {
      const reply = await chatWithSalesAI('Start the sales conversation.', [])
      setMessages([{ role: 'assistant', content: reply }])
      speech.speak(reply)
    } catch (error) {
      speech.setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const endConversation = async () => {
    if (messages.length === 0) {
      speech.setError('There is no conversation to summarise.')
      return
    }
    window.speechSynthesis?.cancel()
    setLoading(true)
    try {
      const result = await summarizeConversation(messages)
      const record = { id: crypto.randomUUID(), date: new Date().toISOString(), summary: result }
      setSummary(result)
      setHistory((current) => [record, ...current])
      setStarted(false)
      setPage('insights')
      speech.setStatus('Idle')
    } catch (error) {
      speech.setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const deleteSummary = (id) => setHistory((current) => current.filter((item) => item.id !== id))
  const viewSummary = (item) => { setSummary(item.summary); setPage('insights') }

  return (
    <div className="min-h-screen md:h-screen flex flex-col md:flex-row bg-navy">
      <Sidebar page={page} setPage={setPage} />
      {page === 'voice' && <VoicePage status={speech.status} error={speech.error} started={started}
        messages={messages} input={input} setInput={setInput} sendText={sendText} loading={loading}
        startConversation={startConversation} startListening={speech.startListening}
        stopSpeaking={speech.stopSpeaking} endConversation={endConversation} />}
      {page === 'insights' && <InsightsPage summary={summary} />}
      {page === 'history' && <HistoryPage history={history} viewSummary={viewSummary} deleteSummary={deleteSummary} />}
    </div>
  )
}
