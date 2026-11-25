import { useEffect, useRef, useState } from 'react'

export function useSpeech(onText) {
  const recognitionRef = useRef(null)
  const [status, setStatus] = useState('Idle')
  const [error, setError] = useState('')

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser. Use Chrome or Edge and manual text input.')
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-IN'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setError('')
      setStatus('Listening')
    }
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript
      setStatus('Idle')
      onText(text)
    }
    recognition.onerror = (event) => {
      setStatus('Idle')
      if (event.error === 'not-allowed') setError('Microphone permission was denied.')
      else if (event.error === 'no-speech') setError('No speech detected. Please try again.')
      else setError(`Microphone error: ${event.error}`)
    }
    recognition.onend = () => setStatus((current) => current === 'Listening' ? 'Idle' : current)
    recognitionRef.current = recognition
  }, [onText])

  const startListening = () => {
    if (!recognitionRef.current) return
    if (window.speechSynthesis.speaking) window.speechSynthesis.cancel()
    setStatus('Listening')
    try { recognitionRef.current.start() } catch { setStatus('Idle') }
  }

  const stopListening = () => recognitionRef.current?.stop()
  const speak = (text) => {
    if (!('speechSynthesis' in window)) {
      setError('Text-to-speech is not supported in this browser.')
      return
    }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-IN'
    utterance.rate = 1
    utterance.onstart = () => setStatus('Speaking')
    utterance.onend = () => setStatus('Idle')
    utterance.onerror = () => setStatus('Idle')
    window.speechSynthesis.speak(utterance)
  }
  const stopSpeaking = () => {
    window.speechSynthesis?.cancel()
    setStatus('Idle')
  }

  return { status, setStatus, error, setError, startListening, stopListening, speak, stopSpeaking }
}
