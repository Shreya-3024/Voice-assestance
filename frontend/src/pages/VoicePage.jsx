import { Mic, Square, Play, CircleStop } from 'lucide-react'

export default function VoicePage({ status, error, started, messages, input, setInput, sendText, loading,
  startConversation, startListening, stopSpeaking, endConversation }) {
  return (
    <main className="flex-1 p-4 md:p-8 overflow-hidden">
      <div className="h-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div><h1 className="text-2xl font-bold">Voice Assistant</h1><p className="text-sm text-slate-400">AI-powered sales conversation</p></div>
          <div className={`rounded-full px-3 py-1.5 text-xs font-semibold ${status === 'Listening' ? 'bg-red-500/20 text-red-300' : status === 'Speaking' ? 'bg-purple-500/20 text-purple-300' : 'bg-white/5 text-slate-300'}`}>
            ● {status}
          </div>
        </div>
        {error && <div className="mb-4 rounded-lg border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">{error}</div>}
        <div className="grid lg:grid-cols-[280px_1fr] gap-5 md:h-[calc(100vh-150px)]">
          <section className="rounded-2xl border border-white/10 bg-[#11162a] p-5 flex flex-col items-center justify-center">
            <div className={`relative h-28 w-28 rounded-full grid place-items-center border-4 ${status === 'Listening' ? 'border-red-400/60 shadow-[0_0_40px_rgba(248,113,113,.25)]' : status === 'Speaking' ? 'border-purple-400/60 shadow-[0_0_40px_rgba(168,85,247,.25)]' : 'border-purple-500/30'}`}>
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700 grid place-items-center"><Mic size={34} /></div>
            </div>
            <p className="mt-4 text-sm text-slate-400">{status === 'Listening' ? 'Listening...' : status === 'Speaking' ? 'Assistant speaking' : 'Ready to assist'}</p>
            <div className="mt-6 w-full space-y-2">
              {!started ? (
                <button onClick={startConversation} className="w-full rounded-xl bg-purple-600 py-3 font-semibold flex justify-center items-center gap-2"><Play size={17} /> Start Conversation</button>
              ) : (
                <>
                  <button onClick={startListening} disabled={loading || status === 'Listening'} className="w-full rounded-xl bg-purple-600 py-3 font-semibold flex justify-center items-center gap-2 disabled:opacity-50"><Mic size={17} /> Start Speaking</button>
                  <button onClick={stopSpeaking} className="w-full rounded-xl border border-white/10 py-3 text-sm flex justify-center items-center gap-2"><CircleStop size={17} /> Stop Speaking</button>
                  <button onClick={endConversation} disabled={loading} className="w-full rounded-xl border border-red-400/30 text-red-300 py-3 text-sm flex justify-center items-center gap-2"><Square size={16} /> End Conversation</button>
                </>
              )}
            </div>
          </section>
          <section className="bg-[#11162a] rounded-2xl border border-white/10 p-4 flex flex-col min-h-[430px]">
            <div className="flex-1 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'assistant' ? 'bg-white/8 border border-white/10' : 'bg-purple-600'}`}>{message.content}</div>
                </div>
              ))}
              {loading && <div className="text-xs text-slate-400 animate-pulse">SalesAI is thinking...</div>}
            </div>
            <form onSubmit={(event) => { event.preventDefault(); if (input.trim()) sendText(input.trim()) }} className="mt-4 flex gap-2">
              <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type a message..." disabled={!started}
                className="flex-1 min-w-0 rounded-xl border border-white/10 bg-[#090d1d] px-4 py-3 text-sm outline-none focus:border-purple-500 disabled:opacity-50" />
              <button type="submit" disabled={!started || loading || !input.trim()} className="rounded-xl bg-purple-600 px-4 grid place-items-center disabled:opacity-40"><SendIcon /></button>
            </form>
          </section>
        </div>
      </div>
    </main>
  )
}

function SendIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4Z"/></svg>
}
