import { BarChart3, History, Mic, Sparkles } from 'lucide-react'

export default function Sidebar({ page, setPage }) {
  const items = [
    { id: 'voice', label: 'Voice Assistant', icon: Mic },
    { id: 'insights', label: 'Business Insights', icon: BarChart3 },
    { id: 'history', label: 'Conversation History', icon: History }
  ]
  return (
    <aside className="w-full md:w-64 md:min-h-screen bg-[#0d1225] border-b md:border-b-0 md:border-r border-white/10 p-4 md:p-6">
      <div className="flex items-center gap-3 mb-5 md:mb-10">
        <div className="h-10 w-10 rounded-xl bg-purple-600 grid place-items-center"><Sparkles size={21} /></div>
        <div><p className="font-bold tracking-wide">SalesAI</p><p className="text-xs text-slate-400">TechNova Solutions</p></div>
      </div>
      <nav className="flex md:flex-col gap-2">
        {items.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setPage(id)}
            className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-3 rounded-lg px-3 py-3 text-sm transition ${page === id ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
            <Icon size={18} /><span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
