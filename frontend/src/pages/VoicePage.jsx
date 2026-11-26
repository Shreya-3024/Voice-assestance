import { Bot, Mic, Square, Play, CircleStop, Send, Sparkles } from 'lucide-react'

export default function VoicePage({ status, error, started, messages, input, setInput, sendText, loading,
  startConversation, startListening, stopListening, stopSpeaking, endConversation }) {
  return (
    <main className="relative flex-1 p-4 md:p-8 overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_rgba(124,58,237,0.12),_transparent_38%)]">
      <div className="relative h-full max-w-7xl mx-auto flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-purple-300 mb-1">TechNova Solutions</p>
            <h1 className="text-2xl font-bold tracking-tight">Voice Assistant</h1>
            <p className="text-sm text-slate-400 mt-1">A helpful first conversation, powered by AI.</p>
          </div>
          <div className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${status === 'Listening' ? 'border-red-400/30 bg-red-500/15 text-red-300' : status === 'Speaking' ? 'border-purple-400/30 bg-purple-500/15 text-purple-300' : status === 'Processing' ? 'border-amber-400/30 bg-amber-500/10 text-amber-200' : 'border-white/10 bg-white/5 text-slate-300'}`}>
            <span className="mr-2">●</span>{status}
          </div>
        </div>
        {error && <div role="alert" className="mb-4 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">{error}</div>}
        <div className="grid flex-1 min-h-0 lg:grid-cols-[280px_1fr] gap-5">
          <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#151b33] to-[#101426] p-5 flex flex-col items-center justify-center shadow-xl shadow-black/10">
            <div className={`relative h-28 w-28 rounded-full grid place-items-center border transition-all duration-300 ${status === 'Listening' ? 'border-red-400/60 shadow-[0_0_40px_rgba(248,113,113,.25)]' : status === 'Speaking' ? 'border-purple-400/60 shadow-[0_0_40px_rgba(168,85,247,.25)]' : 'border-purple-500/30'}`}>
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700 grid place-items-center shadow-lg shadow-purple-900/40"><Bot size={34} /></div>
            </div>
            <p className="mt-4 font-medium">{status === 'Listening' ? 'Listening...' : status === 'Speaking' ? 'Assistant speaking' : status === 'Processing' ? 'Working on it...' : 'Ready to assist'}</p>
            <p className="mt-1 text-center text-xs leading-5 text-slate-500">Speak naturally or type your message below.</p>
            <div className="mt-6 w-full space-y-2">
              {!started ? (
                <button onClick={startConversation} disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 font-semibold flex justify-center items-center gap-2 shadow-lg shadow-purple-950/30 transition hover:brightness-110 disabled:opacity-50"><Play size={17} /> Start Conversation</button>
              ) : (
                <>
                  <button onClick={status === 'Listening' ? stopListening : startListening} disabled={loading || status === 'Processing'} className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 font-semibold flex justify-center items-center gap-2 transition hover:brightness-110 disabled:opacity-50">
                    {status === 'Listening' ? <Square size={16} /> : <Mic size={17} />}
                    {status === 'Listening' ? 'Stop Listening' : 'Start Speaking'}
                  </button>
                  <button onClick={stopSpeaking} disabled={status !== 'Speaking'} className="w-full rounded-xl border border-white/10 py-3 text-sm flex justify-center items-center gap-2 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"><CircleStop size={17} /> Stop Speaking</button>
                  <button onClick={endConversation} disabled={loading || messages.length === 0} className="w-full rounded-xl border border-red-400/30 text-red-300 py-3 text-sm flex justify-center items-center gap-2 transition hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-40"><Square size={16} /> {loading ? 'Please wait...' : 'End Conversation'}</button>
                </>
              )}
            </div>
          </section>
          <section className="bg-[#11162a]/90 rounded-2xl border border-white/10 p-4 md:p-5 flex flex-col min-h-[430px] min-w-0 shadow-xl shadow-black/10">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4 mb-4">
              <div className="h-9 w-9 rounded-xl bg-purple-500/15 text-purple-300 grid place-items-center"><Sparkles size={17} /></div>
              <div><p className="text-sm font-semibold">SalesAI Assistant</p><p className="text-xs text-slate-500">TechNova Solutions</p></div>
            </div>
            <div className="flex-1 min-h-[220px] overflow-y-auto space-y-4 pr-1">
              {messages.length === 0 && (
                <div className="h-full min-h-[220px] grid place-items-center text-center">
                  <div className="max-w-sm text-slate-400">
                    <Bot size={34} className="mx-auto mb-3 text-purple-300" />
                    <p className="font-medium text-slate-200">Your sales conversation starts here</p>
                    <p className="text-sm mt-1">Start a conversation, then speak or type to discuss a project.</p>
                  </div>
                </div>
              )}
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${message.role === 'assistant' ? 'rounded-tl-md bg-white/[0.06] border border-white/10 text-slate-200' : 'rounded-tr-md bg-gradient-to-br from-purple-600 to-indigo-600 text-white'}`}>
                    <p className="text-[10px] uppercase tracking-wider opacity-60 mb-1">{message.role === 'assistant' ? 'SalesAI' : 'You'}</p>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {loading && <div role="status" className="text-xs text-slate-400 animate-pulse">SalesAI is thinking...</div>}
            </div>
            <form onSubmit={(event) => { event.preventDefault(); if (input.trim()) sendText(input.trim()) }} className="mt-4 flex gap-2 rounded-xl border border-white/10 bg-[#090d1d] p-1.5 focus-within:border-purple-500/60">
              <input value={input} onChange={(event) => setInput(event.target.value)} placeholder={started ? 'Type your message...' : 'Start a conversation to send a message'} disabled={!started || loading} maxLength={4000}
                className="flex-1 min-w-0 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-600 disabled:opacity-60" />
              <button type="submit" aria-label="Send message" disabled={!started || loading || !input.trim()} className="rounded-lg bg-purple-600 px-3 grid place-items-center transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-40"><Send size={17} /></button>
            </form>
          </section>
        </div>
      </div>
    </main>
  )
}
