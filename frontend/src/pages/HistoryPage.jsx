import { Eye, Trash2, Calendar } from 'lucide-react'

export default function HistoryPage({ history, viewSummary, deleteSummary }) {
  return (
    <main className="flex-1 p-4 md:p-8 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-1">Conversation History</h1><p className="text-sm text-slate-400 mb-6">Previously completed sales conversations</p>
      {history.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#11162a] p-10 text-center text-slate-400"><Calendar className="mx-auto mb-3" />No completed conversations yet.</div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div key={item.id} className="bg-[#11162a] border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="sm:flex-1"><p className="font-semibold">{item.summary.customerName}</p><p className="text-sm text-slate-400">{item.summary.interestedService}</p></div>
              <p className="text-xs text-slate-500">{new Date(item.date).toLocaleString()}</p>
              <div className="flex gap-2">
                <button onClick={() => viewSummary(item)} className="rounded-lg bg-purple-600 px-3 py-2 text-sm flex gap-2 items-center"><Eye size={15} /> View</button>
                <button onClick={() => deleteSummary(item.id)} className="rounded-lg border border-red-400/20 text-red-300 px-3 py-2"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
