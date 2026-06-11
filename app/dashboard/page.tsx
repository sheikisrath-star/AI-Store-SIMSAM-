'use client'

import { useState } from 'react'
import { Cpu, TrendingUp, ShoppingBag, Megaphone, Shield, BarChart3, Zap, Play, RefreshCw } from 'lucide-react'

type AgentRole = 'CEO' | 'PRODUCT' | 'MARKETING' | 'SUPPORT' | 'ANALYTICS'

interface AgentConfig {
  id: AgentRole
  name: string
  icon: React.ReactNode
  color: string
  description: string
  tasks: string[]
}

const AGENTS: AgentConfig[] = [
  { id: 'CEO', name: 'CEO Agent', icon: <Cpu className="w-5 h-5" />, color: 'from-purple-500 to-indigo-600', description: 'Market analysis & strategic direction', tasks: ['Analyze trending digital product niches', 'Plan Q3 product expansion strategy', 'Identify top competitor gaps to exploit'] },
  { id: 'PRODUCT', name: 'Product Agent', icon: <ShoppingBag className="w-5 h-5" />, color: 'from-atlas-500 to-blue-600', description: 'Builds & optimises product listings', tasks: ['Create AI Automation Masterclass product', 'Optimize pricing across all SKUs', 'Write 5 new product descriptions'] },
  { id: 'MARKETING', name: 'Marketing Agent', icon: <Megaphone className="w-5 h-5" />, color: 'from-pink-500 to-rose-600', description: 'Traffic, content & viral campaigns', tasks: ['Write 3 viral TikTok scripts', 'Draft email campaign for top seller', 'Generate 10 SEO blog post ideas'] },
  { id: 'SUPPORT', name: 'Support Agent', icon: <Shield className="w-5 h-5" />, color: 'from-green-500 to-teal-600', description: 'Customer ops & refund handling', tasks: ['Draft FAQ for new products', 'Respond to 5 refund requests', 'Create onboarding email series'] },
  { id: 'ANALYTICS', name: 'Analytics Agent', icon: <BarChart3 className="w-5 h-5" />, color: 'from-orange-500 to-amber-600', description: 'Revenue insights & optimisation', tasks: ['Identify top 3 conversion bottlenecks', 'Build 30-day sales forecast', 'A/B test landing page recommendations'] },
]

interface LogEntry { role: AgentRole; task: string; output: string; ts: string }

const MOCK_OUTPUTS: Record<AgentRole, string[]> = {
  CEO: [
    'Market analysis complete. Top opportunity: AI Workflow Automation (search volume +340% YoY). Recommend launching 2 products in this niche by end of month.',
    'Strategic gap found: Competitors charge $97–$197 for similar kits. Our $29–$49 range captures price-sensitive buyers. Recommend adding premium $99 tier with 1:1 consult.',
    'Q3 opportunity identified: Back-to-school + September LinkedIn surge. Launch "Freelance AI Pack" bundle to capture both audiences.',
  ],
  PRODUCT: [
    '"AI Automation Masterclass" created: 47-page guide, 12 Notion templates, prompt library. Suggested price: $39. SEO title: "AI Automation Masterclass — Save 10 Hours/Week".',
    'Pricing analysis complete. Recommend: AI Productivity Toolkit $29→$34 (+17% margin), Global E-Commerce Pack $19→$22. Combined revenue uplift: +$1,240/mo.',
    '5 descriptions rewritten with urgency triggers + social proof. Avg description length: 180 words. Readability score: Grade 8 (optimal for conversion).',
  ],
  MARKETING: [
    'TikTok script #1: "POV: You let AI run your business for 30 days" — Hook: zoom in on laptop showing $4,200 earnings. CTA: "Link in bio for the exact system." Est. reach: 40K–200K.',
    'Email campaign drafted for AI Productivity Toolkit. Subject: "You\'re still doing this manually?". Open rate benchmark: 31%. CTA click target: 8.5%.',
    'Top 10 SEO ideas generated. #1: "Best AI tools for freelancers 2026" — volume 8,100/mo, difficulty 38. Ready to brief content team.',
  ],
  SUPPORT: [
    'FAQ created: 12 questions covering delivery, refunds, compatibility, and updates. Estimated ticket deflection rate: 65%. Recommended for all product pages.',
    'Drafted 5 refund responses. Tone: empathetic + solution-focused. Included 20% loyalty discount offer — expected win-back rate: 28%.',
    'Onboarding email series (3 emails): Day 0 delivery, Day 2 quick-start tips, Day 7 success story prompt. Expected 30-day retention lift: +15%.',
  ],
  ANALYTICS: [
    'Conversion bottlenecks: (1) Cart page load >2.1s — fix: lazy-load images (+12% CVR). (2) Checkout has 4 fields too many — remove phone field (+8% CVR). (3) No urgency on product page — add countdown (+6% CVR).',
    '30-day forecast: $8,400–$11,200 revenue based on current 23 daily visitors and 4.1% CVR. Confidence interval: 78%.',
    'A/B test recommendation: Hero CTA "Shop All Products" vs "See What AI Built" — expected winner: variant B (+22% CTR based on competitor data).',
  ],
}

export default function DashboardPage() {
  const [selectedAgent, setSelectedAgent] = useState<AgentRole>('CEO')
  const [selectedTask, setSelectedTask] = useState(0)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [running, setRunning] = useState(false)
  const [pipelineRunning, setPipelineRunning] = useState(false)

  const agent = AGENTS.find(a => a.id === selectedAgent)!

  async function runAgent() {
    setRunning(true)
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800))
    const outputs = MOCK_OUTPUTS[selectedAgent]
    const output = outputs[selectedTask % outputs.length]
    const entry: LogEntry = {
      role: selectedAgent,
      task: agent.tasks[selectedTask],
      output,
      ts: new Date().toLocaleTimeString(),
    }
    setLogs(prev => [entry, ...prev].slice(0, 20))
    setRunning(false)
  }

  async function runFullPipeline() {
    setPipelineRunning(true)
    for (const a of AGENTS) {
      await new Promise(r => setTimeout(r, 900))
      const outputs = MOCK_OUTPUTS[a.id]
      setLogs(prev => [{
        role: a.id,
        task: a.tasks[0],
        output: outputs[0],
        ts: new Date().toLocaleTimeString(),
      }, ...prev].slice(0, 20))
    }
    setPipelineRunning(false)
  }

  const stats = [
    { label: 'Products Live', value: '6', delta: '+2 this week', icon: <ShoppingBag className="w-4 h-4" /> },
    { label: 'Revenue (30d)', value: '$4,840', delta: '+18% vs last month', icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Agent Tasks Run', value: String(logs.length + 14), delta: 'Today', icon: <Zap className="w-4 h-4" /> },
    { label: 'Conversion Rate', value: '4.1%', delta: '+0.6pp this week', icon: <BarChart3 className="w-4 h-4" /> },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900">AI Command Center</h1>
          <p className="text-slate-500 mt-1">5 autonomous agents running your business</p>
        </div>
        <button onClick={runFullPipeline} disabled={pipelineRunning} className="btn-primary flex items-center gap-2 self-start sm:self-auto">
          {pipelineRunning
            ? <><RefreshCw className="w-4 h-4 animate-spin" /> Running pipeline...</>
            : <><Zap className="w-4 h-4" /> Run Full Pipeline</>}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(s => (
          <div key={s.label} className="card p-5">
            <div className="flex items-center gap-2 text-slate-400 mb-2 text-sm">{s.icon}{s.label}</div>
            <p className="text-2xl font-black text-slate-900">{s.value}</p>
            <p className="text-xs text-green-600 mt-1">{s.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Agent panel */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="font-bold text-slate-900 mb-4">Select Agent</h2>
          {AGENTS.map(a => (
            <button
              key={a.id}
              onClick={() => { setSelectedAgent(a.id); setSelectedTask(0) }}
              className={`w-full p-4 rounded-2xl border text-left transition-all ${selectedAgent === a.id ? 'border-atlas-300 bg-atlas-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 bg-gradient-to-br ${a.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>{a.icon}</div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{a.name}</p>
                  <p className="text-xs text-slate-500">{a.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Task runner */}
        <div className="lg:col-span-3 space-y-5">
          <div className="card p-6">
            <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${agent.color} text-white text-xs font-semibold px-3 py-1 rounded-full mb-4`}>
              {agent.icon} {agent.name}
            </div>
            <h3 className="font-bold text-slate-900 mb-3">Choose a task</h3>
            <div className="space-y-2 mb-5">
              {agent.tasks.map((task, i) => (
                <label key={task} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedTask === i ? 'border-atlas-300 bg-atlas-50' : 'border-slate-100 hover:border-slate-200'}`}>
                  <input type="radio" name="task" checked={selectedTask === i} onChange={() => setSelectedTask(i)} className="text-atlas-600" />
                  <span className="text-sm text-slate-700">{task}</span>
                </label>
              ))}
            </div>
            <button onClick={runAgent} disabled={running} className="btn-primary flex items-center gap-2">
              {running
                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Running...</>
                : <><Play className="w-4 h-4" /> Run {agent.name}</>}
            </button>
          </div>

          {/* Activity log */}
          <div className="card p-6">
            <h3 className="font-bold text-slate-900 mb-4">Activity Log</h3>
            {logs.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">Run an agent to see results here</p>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {logs.map((log, i) => {
                  const a = AGENTS.find(x => x.id === log.role)!
                  return (
                    <div key={i} className="border border-slate-100 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`inline-flex items-center gap-1.5 bg-gradient-to-r ${a.color} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}>
                          {a.icon} {a.name}
                        </div>
                        <span className="text-xs text-slate-400">{log.ts}</span>
                      </div>
                      <p className="text-xs text-slate-400 mb-1.5">Task: {log.task}</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{log.output}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
