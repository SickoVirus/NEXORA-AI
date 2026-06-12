'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Sparkles, Swords, Target, Clock, Zap, CheckCircle2, TrendingUp, Lightbulb, BarChart3, Download, ArrowRight, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockStrategies } from '@/lib/mock-data'

const strategyTypes = [
  { value: 'growth', label: 'Growth Strategy' },
  { value: 'sales', label: 'Sales Strategy' },
  { value: 'marketing', label: 'Marketing Strategy' },
  { value: 'retention', label: 'Customer Retention' },
  { value: 'pricing', label: 'Pricing Strategy' },
  { value: 'cost', label: 'Cost Reduction' },
  { value: 'operations', label: 'Operations Strategy' },
  { value: 'launch', label: 'Launch Strategy' },
  { value: 'competitive', label: 'Competitive Strategy' },
]

const goals = [
  { value: 'revenue', label: 'Increase Revenue' },
  { value: 'growth', label: 'Accelerate Growth' },
  { value: 'efficiency', label: 'Improve Efficiency' },
  { value: 'market', label: 'Expand Market' },
  { value: 'retention', label: 'Improve Retention' },
]

const timeframes = [
  { value: '1month', label: '1 Month' },
  { value: '3months', label: '3 Months' },
  { value: '6months', label: '6 Months' },
  { value: '12months', label: '12 Months' },
]

const aggressiveness = [
  { value: 'conservative', label: 'Conservative' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'aggressive', label: 'Aggressive' },
  { value: 'very-aggressive', label: 'Very Aggressive' },
]

export default function StrategyStudio() {
  const [type, setType] = useState('')
  const [goal, setGoal] = useState('')
  const [timeframe, setTimeframe] = useState('')
  const [aggressive, setAggressive] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<typeof mockStrategies[0] | null>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 2500))
    setResult(mockStrategies[Math.floor(Math.random() * mockStrategies.length)])
    setIsGenerating(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl lg:text-3xl font-bold">Strategy Studio</h1>
            <Badge variant="secondary" size="lg">
              <Swords className="w-3.5 h-3.5 mr-1" />
              AI Generator
            </Badge>
          </div>
          <p className="text-sm text-foreground/50">Create AI-powered business strategies</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration panel */}
        <div className="glass-panel rounded-xl p-6 border space-y-5">
          <h2 className="text-lg font-semibold">Configure Strategy</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Strategy Type</label>
              <Select options={strategyTypes} placeholder="Select type" value={type} onChange={(e) => setType(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Goal</label>
              <Select options={goals} placeholder="Select goal" value={goal} onChange={(e) => setGoal(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Timeframe</label>
              <Select options={timeframes} placeholder="Select timeframe" value={timeframe} onChange={(e) => setTimeframe(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Aggressiveness</label>
              <Select options={aggressiveness} placeholder="Select level" value={aggressive} onChange={(e) => setAggressive(e.target.value)} />
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!type || !goal || !timeframe || !aggressive || isGenerating}
            variant="gradient"
            className="w-full h-12"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Strategy
              </>
            )}
          </Button>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {!result && !isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card rounded-xl p-10 border flex flex-col items-center justify-center text-center"
            >
              <Swords className="w-12 h-12 text-foreground/20 mb-4" />
              <h3 className="text-lg font-semibold text-foreground/60 mb-2">Ready to Create a Strategy</h3>
              <p className="text-sm text-foreground/40 max-w-sm">
                Configure your strategy preferences and let AI generate a comprehensive business strategy with goals, actions, KPIs, and budget estimates.
              </p>
            </motion.div>
          )}

          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card rounded-xl p-10 border flex flex-col items-center justify-center"
            >
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-3 h-3 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-3 h-3 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <p className="text-sm text-foreground/50">AI is analyzing your business data and creating an optimal strategy...</p>
            </motion.div>
          )}

          <AnimatePresence>
            {result && !isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Strategy header */}
                <div className="glass-card rounded-xl p-6 border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" size="sm">{result.type}</Badge>
                        <Badge variant="accent" size="sm">{result.timeframe}</Badge>
                        <Badge variant="warning" size="sm">{result.aggressiveness}</Badge>
                      </div>
                      <h2 className="text-xl font-bold">{result.goal}</h2>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent">{result.confidence}%</div>
                      <div className="text-xs text-foreground/50">AI Confidence</div>
                    </div>
                  </div>

                  {/* Confidence bar */}
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden mb-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.confidence}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>

                  <p className="text-sm text-foreground/70 leading-relaxed mb-4">{result.summary}</p>

                  <div className="flex items-center gap-2">
                    <Badge variant="glass" size="sm">
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Budget: {result.budget}
                    </Badge>
                  </div>
                </div>

                {/* KPIs */}
                <div className="glass-card rounded-xl p-5 border">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Key Performance Indicators
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {result.kpis.map((kpi, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                        {kpi}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="glass-card rounded-xl p-5 border">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Key Actions
                  </h3>
                  <div className="space-y-2">
                    {result.actions.map((action, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                        <span className="text-primary mt-0.5">{i + 1}.</span>
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button variant="gradient" size="sm">
                    <Sparkles className="w-4 h-4 mr-1.5" />
                    Apply Strategy
                  </Button>
                  <Button variant="glass" size="sm">
                    <Download className="w-4 h-4 mr-1.5" />
                    Export
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Lightbulb className="w-4 h-4 mr-1.5" />
                    Refine
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
