import { Calendar, Eye, Mic, Trash2 } from 'lucide-react'

export default function HistoryPage({ history, storageWarning, viewSummary, deleteSummary, onNewConversation }) {
  return (
    <main className="relative flex-1 p-4 md:p-8 overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,_rgba(124,58,237,0.12),_transparent_38%)]">
      <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div><p className="text-xs uppercase tracking-[0.2em] text-purple-300 mb-1">Your activity</p><h1 className="text-2xl font-bold mb-1">Conversation History</h1><p className="text-sm text-slate-400">Review and manage completed customer conversations.</p></div>
        <button onClick={onNewConversation} className="rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition hover:bg-purple-500"><Mic size={16} /> Voice assistant</button>
      </div>
      {storageWarning && <div role="alert" className="mb-4 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">{storageWarning}</div>}
      {history.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#11162a]/90 p-10 text-center text-slate-400 shadow-xl shadow-black/10">
          <Calendar className="mx-auto mb-3 text-purple-300" />
          <p className="font-medium text-slate-200">No completed conversations yet</p>
          <p className="mt-1 text-sm">Summaries will be saved here when you end a conversation.</p>
          <button onClick={onNewConversation} className="mt-5 rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/5">Go to Voice Assistant</button>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div key={item.id} className="bg-[#11162a]/90 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 shadow-lg shadow-black/5 transition hover:border-purple-400/20">
              <div className="sm:flex-1 min-w-0">
                <p className="font-semibold truncate">{item.summary.customerName || 'Customer name not provided'}</p>
                <p className="text-sm text-slate-400 truncate">{item.summary.interestedService || 'Service not provided'}</p>
              </div>
              <div className="sm:text-right"><p className="text-xs text-slate-400">{item.summary.estimatedBudget || 'Budget not provided'}</p><p className="mt-1 text-xs text-slate-500">{item.date ? new Date(item.date).toLocaleString() : 'Date unavailable'}</p></div>
              <div className="flex gap-2">
                <button onClick={() => viewSummary(item)} className="rounded-lg bg-purple-600 px-3 py-2 text-sm flex gap-2 items-center transition hover:bg-purple-500"><Eye size={15} /> View summary</button>
                <button onClick={() => deleteSummary(item.id)} aria-label={`Delete summary for ${item.summary.customerName || 'customer'}`} title="Delete summary" className="rounded-lg border border-red-400/20 text-red-300 px-3 py-2 transition hover:bg-red-400/10"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </main>
  )
}
