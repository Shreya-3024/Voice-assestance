import { useEffect, useRef, useState } from 'react'

export function useSpeech(onText) {
  const recognitionRef = useRef(null)
  const onTextRef = useRef(onText)
  const [status, setStatus] = useState('Idle')
  const [error, setError] = useState('')

  useEffect(() => {
    onTextRef.current = onText
  }, [onText])

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
      onTextRef.current(text)
    }
    recognition.onerror = (event) => {
      setStatus('Idle')
      if (event.error === 'not-allowed') setError('Microphone permission was denied.')
      else if (event.error === 'no-speech') setError('No speech detected. Please try again.')
      else if (event.error === 'network') setError('Speech recognition could not connect. Check your internet connection or use text input.')
      else setError(`Microphone error: ${event.error}`)
    }
    recognition.onend = () => setStatus((current) => current === 'Listening' ? 'Idle' : current)
    recognitionRef.current = recognition
    return () => {
      recognition.abort()
      window.speechSynthesis?.cancel()
    }
  }, [])

  const startListening = () => {
    if (!recognitionRef.current) return
    setError('')
    if (window.speechSynthesis?.speaking) window.speechSynthesis.cancel()
    setStatus('Listening')
    try {
      recognitionRef.current.start()
    } catch (error) {
      setStatus('Idle')
      setError(`Could not start microphone: ${error.message}`)
    }
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setStatus('Idle')
  }
  const speak = (text) => {
    if (!('speechSynthesis' in window)) {
      setError('Text-to-speech is not supported in this browser.')
      return
    }
    window.speechSynthesis.cancel()
    const utterance = new window.SpeechSynthesisUtterance(text)
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
