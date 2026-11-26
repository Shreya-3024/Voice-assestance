import { ArrowRight, BriefcaseBusiness, Clock, DollarSign, History, Sparkles, Target, User } from 'lucide-react'

export default function InsightsPage({ summary, onStartConversation, onViewHistory }) {
  if (!summary) return (
    <main className="relative flex-1 p-4 md:p-8 overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,_rgba(124,58,237,0.12),_transparent_38%)]">
      <div className="max-w-5xl">
        <p className="text-xs uppercase tracking-[0.2em] text-purple-300 mb-1">Sales overview</p>
        <h1 className="text-2xl font-bold mb-2">Business Insights</h1>
        <p className="text-slate-400">Your generated lead summaries will appear here after a conversation.</p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#11162a]/90 p-8 md:p-12 text-center shadow-xl shadow-black/10">
          <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-purple-500/15 text-purple-300 grid place-items-center"><Sparkles size={26} /></div>
          <h2 className="text-lg font-semibold">No insights yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">Complete a customer conversation to turn the discussion into clear requirements, budget, timeline and a recommended next step.</p>
          <button onClick={onStartConversation} className="mt-6 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold transition hover:bg-purple-500">Start a conversation</button>
        </div>
      </div>
    </main>
  )
  const cards = [
    { label: 'Customer', value: summary.customerName, icon: User },
    { label: 'Interested service', value: summary.interestedService, icon: BriefcaseBusiness },
    { label: 'Estimated budget', value: summary.estimatedBudget, icon: DollarSign },
    { label: 'Project timeline', value: summary.projectTimeline, icon: Clock }
  ]
  const interest = summary.interestLevel || 'Low'
  const interestColor = interest === 'High' ? 'text-emerald-300 bg-emerald-400/10' : interest === 'Medium' ? 'text-amber-300 bg-amber-400/10' : 'text-slate-300 bg-white/5'
  return (
    <main className="relative flex-1 p-4 md:p-8 overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,_rgba(124,58,237,0.12),_transparent_38%)]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div><p className="text-xs uppercase tracking-[0.2em] text-purple-300 mb-1">Sales overview</p><h1 className="text-2xl font-bold">Business Insights</h1><p className="text-sm text-slate-400 mt-1">AI-generated summary from your customer conversation</p></div>
          <div className="flex items-center gap-2">
            <button onClick={onViewHistory} className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 flex items-center gap-2 transition hover:bg-white/5"><History size={16} /> History</button>
            <div className={`px-3 py-2 rounded-lg text-sm font-semibold ${interestColor}`}>{interest} interest</div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {cards.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-[#11162a]/90 border border-white/10 rounded-xl p-5 flex gap-4 shadow-lg shadow-black/5">
              <div className="h-10 w-10 rounded-lg bg-purple-500/15 text-purple-300 grid place-items-center"><Icon size={19} /></div>
              <div className="min-w-0"><p className="text-xs text-slate-400">{label}</p><p className="mt-1 font-semibold break-words">{value || 'Not provided'}</p></div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-[#11162a]/90 border border-white/10 rounded-xl p-5"><p className="text-sm text-slate-400 mb-2">Customer requirements</p><p className="leading-6">{summary.requirements || 'Not provided'}</p></div>
          <div className="bg-[#11162a]/90 border border-white/10 rounded-xl p-5"><p className="text-sm text-slate-400 mb-2">Conversation summary</p><p className="leading-6">{summary.summary || 'Not provided'}</p></div>
        </div>
        <div className="mt-4 bg-gradient-to-r from-purple-600/20 to-indigo-600/10 border border-purple-400/20 rounded-xl p-5 flex items-start gap-3 shadow-lg shadow-black/5">
          <Target className="text-purple-300 shrink-0" /><div><p className="text-sm text-purple-300">Recommended next action</p><p className="mt-1">{summary.recommendedNextAction}</p></div><ArrowRight className="ml-auto text-purple-300" />
        </div>
      </div>
    </main>
  )
}
