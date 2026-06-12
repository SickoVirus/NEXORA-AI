'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { InsightCard } from '@/components/ui/insight-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { mockInsights } from '@/lib/mock-data'
import { useDemoData, demoInsights } from '@/lib/demo-mode'
import { Lightbulb, Filter, Sparkles, Brain, TrendingUp, Users, Target, Settings, AlertTriangle, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'all', label: 'All Insights', icon: Lightbulb },
  { id: 'strategic', label: 'Strategic', icon: Brain },
  { id: 'financial', label: 'Financial', icon: TrendingUp },
  { id: 'sales', label: 'Sales', icon: Target },
  { id: 'marketing', label: 'Marketing', icon: Users },
  { id: 'customer', label: 'Customer', icon: Users },
  { id: 'operational', label: 'Operational', icon: Settings },
]

const priorityOptions = [
  { value: 'all', label: 'All Priorities' },
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  const { isDemo } = useDemoData()
  const insights = isDemo ? demoInsights : mockInsights

  const filtered = insights.filter(i => {
    const catMatch = activeCategory === 'all' || i.category === activeCategory
    const priMatch = priorityFilter === 'all' || i.priority === priorityFilter
    return catMatch && priMatch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl lg:text-3xl font-bold">Insights Engine</h1>
            <Badge variant="accent" size="lg">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              AI Powered
            </Badge>
          </div>
          <p className="text-sm text-foreground/50">AI-generated insights to grow and optimize your business</p>
        </div>
        <Button variant="gradient" size="sm">
          <Sparkles className="w-4 h-4 mr-1.5" />
          Generate New Insights
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Critical Alerts', value: '2', icon: AlertTriangle, color: 'text-danger', bg: 'bg-danger/10' },
          { label: 'High Priority', value: '4', icon: Brain, color: 'text-warning', bg: 'bg-warning/10' },
          { label: 'Medium Priority', value: '1', icon: Target, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Avg Impact Score', value: '79%', icon: BarChart3, color: 'text-accent', bg: 'bg-accent/10' },
        ].map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 flex-1">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border",
                  activeCategory === cat.id
                    ? 'bg-primary/10 border-primary/30 text-primary'
                    : 'bg-transparent border-glass-border text-foreground/50 hover:text-foreground hover:border-primary/20'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            )
          })}
        </div>
        <div className="w-full sm:w-40">
          <Select
            options={priorityOptions}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Insights grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((insight, i) => (
          <InsightCard key={insight.id} insight={insight} index={i} />
        ))}
      </div>
    </div>
  )
}
