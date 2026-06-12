'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockAutomations } from '@/lib/mock-data'
import { Bot, Zap, Play, Pause, Plus, Clock, Activity, Sparkles, ArrowRight, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AutomationLab() {
  const [filter, setFilter] = useState<'all' | 'active' | 'paused' | 'draft'>('all')

  const filtered = filter === 'all' ? mockAutomations : mockAutomations.filter(a => a.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl lg:text-3xl font-bold">Automation Lab</h1>
            <Badge variant="accent" size="lg">
              <Bot className="w-3.5 h-3.5 mr-1" />
              AI Automations
            </Badge>
          </div>
          <p className="text-sm text-foreground/50">Build and manage AI-powered business automations</p>
        </div>
        <Button variant="gradient" size="sm">
          <Plus className="w-4 h-4 mr-1.5" />
          New Automation
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Active', value: mockAutomations.filter(a => a.status === 'active').length, icon: Play, color: 'text-accent', bg: 'bg-accent/10' },
          { label: 'Total Runs', value: mockAutomations.reduce((s, a) => s + a.runsCount, 0), icon: Activity, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Paused', value: mockAutomations.filter(a => a.status === 'paused').length, icon: Pause, color: 'text-warning', bg: 'bg-warning/10' },
          { label: 'Drafts', value: mockAutomations.filter(a => a.status === 'draft').length, icon: Clock, color: 'text-foreground/50', bg: 'bg-foreground/5' },
        ].map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div
              key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-4 border"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", item.bg)}>
                  <Icon className={cn("w-4.5 h-4.5", item.color)} />
                </div>
              </div>
              <div className="text-xl font-bold">{item.value}</div>
              <div className="text-xs text-foreground/50">{item.label}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2">
        {(['all', 'active', 'paused', 'draft'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all border capitalize",
              filter === f
                ? 'bg-primary/10 border-primary/30 text-primary'
                : 'border-glass-border text-foreground/50 hover:text-foreground hover:border-primary/20'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Automations */}
      <div className="space-y-3">
        {filtered.map((auto, i) => (
          <motion.div
            key={auto.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-xl p-5 border hover:border-primary/20 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                  auto.status === 'active' && 'bg-accent/10 border-accent/20',
                  auto.status === 'paused' && 'bg-warning/10 border-warning/20',
                  auto.status === 'draft' && 'bg-foreground/5 border-foreground/10',
                )}>
                  <Bot className={cn(
                    "w-5 h-5",
                    auto.status === 'active' && 'text-accent',
                    auto.status === 'paused' && 'text-warning',
                    auto.status === 'draft' && 'text-foreground/30',
                  )} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{auto.name}</h3>
                    <Badge variant={auto.status === 'active' ? 'accent' : auto.status === 'paused' ? 'warning' : 'default'} size="sm">
                      {auto.status}
                    </Badge>
                  </div>

                  {/* Flow visualization */}
                  <div className="flex items-center gap-2 text-xs text-foreground/60 flex-wrap">
                    <span className="glass-card rounded px-2 py-1 text-foreground/70 font-medium">{auto.trigger}</span>
                    <ArrowRight className="w-3 h-3 text-primary" />
                    <span className="glass-card rounded px-2 py-1 text-foreground/70 font-medium">{auto.action}</span>
                    <ArrowRight className="w-3 h-3 text-primary" />
                    <span className="glass-card rounded px-2 py-1 text-foreground/70 font-medium">{auto.output}</span>
                  </div>

                  <div className="flex items-center gap-3 mt-2 text-[10px] text-foreground/40">
                    <span>Last run: {auto.lastRun}</span>
                    <span>•</span>
                    <span>{auto.runsCount} total runs</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-foreground/40 hover:text-foreground transition-colors">
                  {auto.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-foreground/40 hover:text-foreground transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
