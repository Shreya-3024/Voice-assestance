import { Bot, Send, Square } from 'lucide-react'

export default function ChatPanel({ messages, input, setInput, sendText, loading }) {
  const submit = (event) => {
    event.preventEvent?.()
    if (input.trim()) sendText(input.trim())
  }
  return (
    <div className="flex-1 min-h-[360px] md:min-h-0 bg-[#11162a] rounded-2xl border border-white/10 p-4 flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.length === 0 && (
          <div className="h-full grid place-items-center text-center text-slate-500">
            <div><Bot size={36} className="mx-auto mb-3 text-purple-400" /><p>Start a conversation to meet your AI sales assistant.</p></div>
          </div>
        )}
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'assistant' ? 'bg-white/8 border border-white/10' : 'bg-purple-600'}`}>
              {message.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-xs text-slate-400 animate-pulse">SalesAI is thinking...</div>}
      </div>
      <form onSubmit={(event) => { event.preventDefault(); submit(event) }} className="mt-4 flex gap-2">
        <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type a message..."
          className="flex-1 min-w-0 rounded-xl border border-white/10 bg-[#090d1d] px-4 py-3 text-sm outline-none focus:border-purple-500" />
        <button type="submit" disabled={loading || !input.trim()} className="rounded-xl bg-purple-600 px-4 grid place-items-center disabled:opacity-40"><Send size={18} /></button>
      </form>
    </div>
  )
}
