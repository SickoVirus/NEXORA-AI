'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockDeals, mockPipelineData } from '@/lib/mock-data'
import { useDemoData, demoDeals } from '@/lib/demo-mode'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, Target, Sparkles, AlertTriangle, Brain, ArrowRight, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

const stageConfig: Record<string, { label: string; color: string }> = {
  new: { label: 'New Leads', color: 'border-primary/30 bg-primary/5' },
  contacted: { label: 'Contacted', color: 'border-info/30 bg-info/5' },
  qualified: { label: 'Qualified', color: 'border-secondary/30 bg-secondary/5' },
  proposal: { label: 'Proposal Sent', color: 'border-warning/30 bg-warning/5' },
  negotiation: { label: 'Negotiation', color: 'border-warning/50 bg-warning/10' },
  won: { label: 'Won', color: 'border-accent/30 bg-accent/5' },
  lost: { label: 'Lost', color: 'border-danger/30 bg-danger/5' },
}

export default function PipelinePage() {
  const { isDemo } = useDemoData()
  const deals = isDemo ? demoDeals : mockDeals
  const stages = ['new', 'contacted', 'qualified', 'proposal', 'negotiation'] as const

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl lg:text-3xl font-bold">Pipeline</h1>
            <Badge variant="accent" size="lg">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              AI Powered
            </Badge>
          </div>
          <p className="text-sm text-foreground/50">AI-enhanced sales pipeline with intelligent recommendations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="glass" size="sm">
            <Brain className="w-4 h-4 mr-1.5" />
            Forecast
          </Button>
          <Button variant="gradient" size="sm">
            <Sparkles className="w-4 h-4 mr-1.5" />
            AI Analysis
          </Button>
        </div>
      </div>

      {/* Pipeline summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Pipeline Value', value: formatCurrency(892000), icon: TrendingUp, color: 'text-accent', bg: 'bg-accent/10' },
          { label: 'Active Deals', value: '16', icon: Target, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'AI Forecast', value: formatCurrency(450000), icon: Brain, color: 'text-secondary', bg: 'bg-secondary/10' },
          { label: 'Stuck Deals', value: '$374K', icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10' },
        ].map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div
              key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-4 border"
            >
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center mb-2", item.bg)}>
                <Icon className={cn("w-4.5 h-4.5", item.color)} />
              </div>
              <div className="text-xl font-bold">{item.value}</div>
              <div className="text-xs text-foreground/50">{item.label}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Pipeline columns */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 overflow-x-auto">
        {stages.map((stage) => {
          const stageDeals = deals.filter(d => d.stage === stage)
          const conf = stageConfig[stage]
          return (
            <div key={stage} className="min-w-[250px]">
              <div className={cn("rounded-xl p-3 border mb-3", conf.color)}>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{conf.label}</h3>
                  <Badge variant="glass" size="sm">{stageDeals.length}</Badge>
                </div>
                <div className="text-lg font-bold mt-1">
                  {formatCurrency(stageDeals.reduce((s, d) => s + d.value, 0), true)}
                </div>
              </div>
              <div className="space-y-2">
                {stageDeals.map((deal) => (
                  <motion.div
                    key={deal.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-xl p-3 border hover:border-primary/20 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-semibold">{deal.company}</h4>
                      <Badge variant={deal.riskLevel === 'high' ? 'danger' : deal.riskLevel === 'medium' ? 'warning' : 'accent'} size="sm">
                        {deal.riskLevel}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-bold text-primary">{formatCurrency(deal.value)}</span>
                      <span className="text-xs text-foreground/50">{deal.probability}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/5 overflow-hidden mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${deal.probability}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                    <p className="text-[10px] text-foreground/50 mb-2">{deal.aiRecommendation}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-foreground/30">{deal.lastActivity}</span>
                      <button className="text-[10px] text-primary hover:text-primary-light font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {deal.nextAction}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
