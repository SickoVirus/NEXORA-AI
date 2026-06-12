'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { warRoomProblemList, warRoomPlans } from '@/lib/mock-data'
import type { WarRoomProblem, WarRoomPlan } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { Sparkles, TrendingDown, Users, AlertTriangle, BarChart3, DollarSign, Zap, CreditCard, ChevronRight, Target, Clock, Calendar, FileText, Shield, Brain, Activity, CheckCircle2, Loader2, Swords, ListChecks, ArrowRight, Copy } from 'lucide-react'

const problemIcons: Record<string, any> = {
  'trending-down': TrendingDown,
  'users': Users,
  'alert-triangle': AlertTriangle,
  'bar-chart': BarChart3,
  'dollar-sign': DollarSign,
  'zap': Zap,
  'credit-card': CreditCard,
}

const severityConfig = {
  critical: { color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20', icon: AlertTriangle },
  high: { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20', icon: AlertTriangle },
  medium: { color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', icon: Activity },
}

function ProblemCard({ problem, onSelect, index }: { problem: WarRoomProblem; onSelect: (p: WarRoomProblem) => void; index: number }) {
  const Icon = problemIcons[problem.icon] || AlertTriangle
  const severity = severityConfig[problem.severity]

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      onClick={() => onSelect(problem)}
      className="glass-card rounded-xl p-5 border text-left hover:border-primary/20 transition-all group card-interactive hover-lift-sm w-full"
    >
      <div className="flex items-start gap-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center border shrink-0", severity.bg, severity.border)}>
          <Icon className={cn("w-6 h-6", severity.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="text-sm font-bold text-foreground/90 group-hover:text-primary transition-colors">{problem.title}</h3>
            <Badge variant={problem.severity === 'critical' ? 'danger' : problem.severity === 'high' ? 'warning' : 'default'} size="sm">
              {problem.severity}
            </Badge>
          </div>
          <p className="text-xs text-foreground-muted/60 mb-2">{problem.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {problem.symptoms.slice(0, 2).map((s) => (
              <Badge key={s} variant="glass" size="sm" className="text-[9px]">{s}</Badge>
            ))}
            {problem.symptoms.length > 2 && (
              <Badge variant="glass" size="sm" className="text-[9px]">+{problem.symptoms.length - 2}</Badge>
            )}
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-foreground-muted/20 group-hover:text-primary/40 transition-colors mt-2 shrink-0" />
      </div>
    </motion.button>
  )
}

function ActionPlan({ plan, onBack }: { plan: WarRoomPlan; onBack: () => void }) {
  const riskColors = { low: 'accent', medium: 'warning', high: 'warning', critical: 'danger' } as const

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Plan header */}
      <div className="glass-panel-strong rounded-2xl p-6 border border-primary/20">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="default" size="lg">
                <Swords className="w-3.5 h-3.5 mr-1" />
                AI War Room
              </Badge>
              <Badge variant={riskColors[plan.riskLevel]} size="lg">
                {plan.riskLevel.toUpperCase()} Risk
              </Badge>
            </div>
            <h2 className="text-xl font-bold mt-2">Action Plan Generated</h2>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold gradient-text">{plan.confidenceScore}%</div>
            <div className="text-[10px] text-foreground-muted/40">AI Confidence</div>
          </div>
        </div>

        {/* Confidence bar */}
        <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${plan.confidenceScore}%` }}
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          />
        </div>

        {/* Expected impact */}
        <div className="flex items-start gap-2 glass-card rounded-xl p-3 border border-accent/10">
          <Target className="w-4 h-4 text-accent mt-0.5 shrink-0" />
          <p className="text-sm text-foreground-muted/70">{plan.expectedImpact}</p>
        </div>
      </div>

      {/* Diagnosis */}
      <div className="glass-card rounded-xl p-5 border">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold">AI Diagnosis</h3>
        </div>
        <p className="text-sm text-foreground-muted/70 leading-relaxed">{plan.diagnosis}</p>
      </div>

      {/* Root Causes */}
      <div className="glass-card rounded-xl p-5 border">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-warning" />
          <h3 className="text-sm font-semibold">Root Causes</h3>
        </div>
        <div className="space-y-2">
          {plan.rootCauses.map((cause, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-foreground-muted/70">
              <span className="text-warning shrink-0 mt-0.5">{i + 1}.</span>
              <span>{cause}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Immediate Actions */}
      <div className="glass-card rounded-xl p-5 border border-danger/10">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-danger" />
          <h3 className="text-sm font-semibold text-danger">Immediate Actions</h3>
        </div>
        <div className="space-y-2">
          {plan.immediateActions.map((action, i) => (
            <div key={i} className="flex items-start gap-3 glass-card rounded-xl p-3 border">
              <div className={cn(
                "w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0",
                action.impact === 'Critical' ? 'bg-danger/10 text-danger' : action.impact === 'High' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
              )}>
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground-muted/80">{action.action}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={action.impact === 'Critical' ? 'danger' : action.impact === 'High' ? 'warning' : 'default'} size="sm">{action.impact}</Badge>
                  <span className="text-[10px] text-foreground-muted/30">{action.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Plan */}
      <div className="glass-card rounded-xl p-5 border">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold">7-Day Action Plan</h3>
        </div>
        <div className="space-y-2">
          {plan.sevenDayPlan.map((day) => (
            <div key={day.day} className="glass-card rounded-xl p-3 border">
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="default" size="sm">{day.day}</Badge>
              </div>
              <div className="space-y-1">
                {day.actions.map((action, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-foreground-muted/60">
                    <CheckCircle2 className="w-3 h-3 text-accent/60 mt-0.5 shrink-0" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 30-Day Plan */}
      <div className="glass-card rounded-xl p-5 border">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold">30-Day Plan</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {plan.thirtyDayPlan.map((week) => (
            <div key={week.week} className="glass-card rounded-xl p-3 border">
              <Badge variant="default" size="sm" className="mb-2">{week.week}</Badge>
              <div className="space-y-1">
                {week.actions.map((action, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-[10px] text-foreground-muted/60">
                    <ArrowRight className="w-2.5 h-2.5 text-primary/60 mt-0.5 shrink-0" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scripts */}
      <div className="glass-card rounded-xl p-5 border border-accent/10">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-semibold">Scripts & Templates</h3>
        </div>
        <div className="space-y-3">
          {plan.scripts.map((script, i) => (
            <div key={i} className="glass-card rounded-xl p-3 border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold text-foreground/80">{script.title}</h4>
                <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <pre className="text-[10px] text-foreground-muted/50 whitespace-pre-wrap font-mono bg-black/20 rounded-lg p-2.5 leading-relaxed">{script.content}</pre>
            </div>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="glass-card rounded-xl p-5 border">
        <div className="flex items-center gap-2 mb-3">
          <ListChecks className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold">KPIs to Monitor</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {plan.kpis.map((kpi) => (
            <div key={kpi.name} className="flex items-center justify-between glass-card rounded-xl px-3.5 py-2.5 border">
              <div>
                <div className="text-xs text-foreground-muted/70">{kpi.name}</div>
                <div className="text-[10px] text-foreground-muted/30">{kpi.measurement}</div>
              </div>
              <Badge variant="accent" size="sm">{kpi.target}</Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom actions */}
      <div className="flex items-center gap-2">
        <Button variant="glass" onClick={onBack} size="sm">
          Back to Problems
        </Button>
        <Button variant="gradient" size="sm">
          <Sparkles className="w-4 h-4 mr-1.5" />
          Apply Plan
        </Button>
        <Button variant="ghost" size="sm">
          <Copy className="w-4 h-4 mr-1.5" />
          Export
        </Button>
      </div>
    </motion.div>
  )
}

export default function WarRoomPage() {
  const [selectedProblem, setSelectedProblem] = useState<WarRoomProblem | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [plan, setPlan] = useState<WarRoomPlan | null>(null)

  const handleProblemSelect = async (problem: WarRoomProblem) => {
    setSelectedProblem(problem)
    setIsGenerating(true)
    setPlan(null)

    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1500))

    const generatedPlan = warRoomPlans[problem.id] || warRoomPlans['default']
    setPlan(generatedPlan)
    setIsGenerating(false)
  }

  const handleBack = () => {
    setSelectedProblem(null)
    setPlan(null)
    setIsGenerating(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-danger to-warning flex items-center justify-center">
                <Swords className="w-4 h-4 text-white" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-danger/20 blur-md animate-pulse-glow" />
            </div>
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight">AI War Room</h1>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-danger/10 border border-danger/20">
              <span className="status-dot danger" />
              <span className="text-[10px] font-semibold text-danger">Active</span>
            </div>
          </div>
          <p className="text-sm text-foreground-muted/50">Select an urgent problem. AI will generate a complete action plan.</p>
        </div>
        {selectedProblem && (
          <Button variant="ghost" size="sm" onClick={handleBack}>
            Back
          </Button>
        )}
      </div>

      {/* Problem selection or plan */}
      {!selectedProblem ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {warRoomProblemList.map((problem, i) => (
            <ProblemCard key={problem.id} problem={problem} onSelect={handleProblemSelect} index={i} />
          ))}
        </div>
      ) : isGenerating ? (
        /* Loading state */
        <div className="glass-card rounded-2xl p-12 border flex flex-col items-center justify-center text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-danger/20 via-warning/20 to-primary/20 flex items-center justify-center">
              <Swords className="w-8 h-8 text-danger" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-danger/20 animate-spin-slow" style={{ borderTopColor: 'transparent' }} />
            <div className="absolute inset-[-8px] rounded-full border border-warning/10 animate-spin-slow" style={{ borderBottomColor: 'transparent', animationDirection: 'reverse', animationDuration: '8s' }} />
          </div>
          <div className="flex gap-2 mb-4">
            {[0, 150, 300].map((delay) => (
              <div key={delay} className="w-3 h-3 rounded-full bg-gradient-to-br from-danger to-warning" style={{ animation: `bounce 1.4s ease-in-out ${delay}ms infinite` }} />
            ))}
          </div>
          <h3 className="text-lg font-semibold mb-2">AI War Room in Session</h3>
          <p className="text-sm text-foreground-muted/50 max-w-sm">
            Analyzing your business data for <span className="text-danger font-medium">{selectedProblem.title}</span>. Generating comprehensive action plan...
          </p>
          <div className="mt-6 w-64 space-y-2">
            {['Diagnosing root causes...', 'Analyzing business data...', 'Generating action plan...', 'Creating scripts...', 'Calculating expected impact...'].map((step, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-foreground-muted/40">
                <div className={cn("w-1.5 h-1.5 rounded-full", i === 0 ? 'bg-warning animate-pulse-glow' : 'bg-foreground-muted/20')} />
                <span className={i === 0 ? 'text-foreground-muted/70' : ''}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      ) : plan ? (
        <ActionPlan plan={plan} onBack={handleBack} />
      ) : null}
    </div>
  )
}
