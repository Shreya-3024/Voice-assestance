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
  const [history, setHistory] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      return Array.isArray(saved)
        ? saved.filter((item) => item?.id && item?.summary && item?.date)
        : []
    } catch (error) {
      console.error('Could not read conversation history from LocalStorage.', error)
      return []
    }
  })
  const [selectedSummaryId, setSelectedSummaryId] = useState(() => history[0]?.id || null)
  const [summary, setSummary] = useState(() => history[0]?.summary || null)
  const [storageWarning, setStorageWarning] = useState('')

  const sendText = useCallback(async (text) => {
    if (!text.trim()) return
    speech.setError('')
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
      speech.setStatus('Idle')
    } finally {
      setLoading(false)
    }
  }, [messages])

  const speech = useSpeech(sendText)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
      setStorageWarning('')
    } catch (error) {
      console.error('Could not save conversation history to LocalStorage.', error)
      setStorageWarning('This browser could not save history. Your summaries may be lost when you close this tab.')
    }
  }, [history])

  const startConversation = async () => {
    speech.setError('')
    speech.stopListening()
    speech.stopSpeaking()
    setStarted(true)
    setMessages([])
    setSummary(null)
    setSelectedSummaryId(null)
    setPage('voice')
    setLoading(true)
    speech.setStatus('Processing')
    try {
      const reply = await chatWithSalesAI('Start the sales conversation.', [])
      setMessages([{ role: 'assistant', content: reply }])
      speech.speak(reply)
    } catch (error) {
      speech.setError(error.message)
      setStarted(false)
      speech.setStatus('Idle')
    } finally {
      setLoading(false)
    }
  }

  const endConversation = async () => {
    if (messages.length === 0) {
      speech.setError('There is no conversation to summarise.')
      return
    }
    speech.setError('')
    speech.stopListening()
    speech.stopSpeaking()
    speech.setStatus('Processing')
    setLoading(true)
    try {
      const result = await summarizeConversation(messages)
      const record = {
        id: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        date: new Date().toISOString(),
        summary: result
      }
      setSummary(result)
      setSelectedSummaryId(record.id)
      setHistory((current) => [record, ...current])
      setStarted(false)
      setPage('insights')
    } catch (error) {
      speech.setError(error.message)
    } finally {
      setLoading(false)
      speech.setStatus('Idle')
    }
  }

  const deleteSummary = (id) => {
    const updatedHistory = history.filter((item) => item.id !== id)
    setHistory(updatedHistory)
    if (selectedSummaryId === id) {
      const nextSummary = updatedHistory[0] || null
      setSummary(nextSummary?.summary || null)
      setSelectedSummaryId(nextSummary?.id || null)
    }
  }
  const viewSummary = (item) => {
    setSummary(item.summary)
    setSelectedSummaryId(item.id)
    setPage('insights')
  }

  return (
    <div className="min-h-screen md:h-screen flex flex-col md:flex-row bg-navy">
      <Sidebar page={page} setPage={setPage} />
      {page === 'voice' && <VoicePage status={speech.status} error={speech.error} started={started}
        messages={messages} input={input} setInput={setInput} sendText={sendText} loading={loading}
        startConversation={startConversation} startListening={speech.startListening}
        stopListening={speech.stopListening} stopSpeaking={speech.stopSpeaking} endConversation={endConversation} />}
      {page === 'insights' && <InsightsPage summary={summary} onStartConversation={startConversation}
        onViewHistory={() => setPage('history')} />}
      {page === 'history' && <HistoryPage history={history} storageWarning={storageWarning}
        viewSummary={viewSummary} deleteSummary={deleteSummary} onNewConversation={() => setPage('voice')} />}
    </div>
  )
}
