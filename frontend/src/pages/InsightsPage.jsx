import { DollarSign, User, BriefcaseBusiness, Clock, Target, ArrowRight } from 'lucide-react'

export default function InsightsPage({ summary }) {
  if (!summary) return (
    <main className="flex-1 p-4 md:p-8"><h1 className="text-2xl font-bold mb-2">Business Insights</h1><p className="text-slate-400">End a conversation to generate its business summary.</p></main>
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
    <main className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-6"><div><h1 className="text-2xl font-bold">Business Insights</h1><p className="text-sm text-slate-400">AI-generated conversation summary</p></div><div className={`px-3 py-2 rounded-lg text-sm font-semibold ${interestColor}`}>{interest} interest</div></div>
        <div className="grid sm:grid-cols-2 gap-4">
          {cards.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-[#11162a] border border-white/10 rounded-xl p-5 flex gap-4">
              <div className="h-10 w-10 rounded-lg bg-purple-500/15 text-purple-300 grid place-items-center"><Icon size={19} /></div>
              <div><p className="text-xs text-slate-400">{label}</p><p className="mt-1 font-semibold">{value}</p></div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-[#11162a] border border-white/10 rounded-xl p-5"><p className="text-sm text-slate-400 mb-2">Customer requirements</p><p>{summary.requirements}</p></div>
          <div className="bg-[#11162a] border border-white/10 rounded-xl p-5"><p className="text-sm text-slate-400 mb-2">Conversation summary</p><p>{summary.summary}</p></div>
        </div>
        <div className="mt-4 bg-gradient-to-r from-purple-600/20 to-indigo-600/10 border border-purple-400/20 rounded-xl p-5 flex items-start gap-3">
          <Target className="text-purple-300 shrink-0" /><div><p className="text-sm text-purple-300">Recommended next action</p><p className="mt-1">{summary.recommendedNextAction}</p></div><ArrowRight className="ml-auto text-purple-300" />
        </div>
      </div>
    </main>
  )
}
