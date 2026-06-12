'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { AlertTriangle, Lightbulb, Target, Brain, Users, Settings, ArrowRight, Sparkles, Zap } from 'lucide-react'
import type { Insight } from '@/lib/mock-data'
import { Badge } from './badge'
import { Button } from './button'

const categoryConfig = {
  strategic: { icon: Brain, color: 'text-secondary', bg: 'bg-secondary/10 border-secondary/20', glow: 'shadow-secondary/10' },
  financial: { icon: Target, color: 'text-accent', bg: 'bg-accent/10 border-accent/20', glow: 'shadow-accent/10' },
  sales: { icon: Lightbulb, color: 'text-primary', bg: 'bg-primary/10 border-primary/20', glow: 'shadow-primary/10' },
  marketing: { icon: Users, color: 'text-info', bg: 'bg-info/10 border-info/20', glow: 'shadow-info/10' },
  customer: { icon: Users, color: 'text-warning', bg: 'bg-warning/10 border-warning/20', glow: 'shadow-warning/10' },
  operational: { icon: Settings, color: 'text-foreground-muted', bg: 'bg-foreground/5 border-foreground/10', glow: 'shadow-foreground/5' },
}

const priorityConfig = {
  critical: { variant: 'danger' as const, label: 'Critical' },
  high: { variant: 'warning' as const, label: 'High' },
  medium: { variant: 'default' as const, label: 'Medium' },
  low: { variant: 'secondary' as const, label: 'Low' },
}

interface InsightCardProps {
  insight: Insight
  index?: number
}

export function InsightCard({ insight, index = 0 }: InsightCardProps) {
  const config = categoryConfig[insight.category]
  const Icon = config.icon
  const priority = priorityConfig[insight.priority]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, type: 'spring', damping: 25, stiffness: 300 }}
      className="glass-card rounded-xl p-5 border card-interactive hover-lift-sm group"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={cn(
          "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border relative",
          config.bg
        )}>
          <Icon className={cn("w-5 h-5", config.color)} />
          <div className={cn(
            "absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity",
            config.glow
          )} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Badges row */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge variant={priority.variant} size="sm">{priority.label}</Badge>
            <Badge variant="glass" size="sm" className="capitalize">{insight.category}</Badge>
            <span className="text-[10px] text-foreground-muted/30 ml-auto">{insight.date}</span>
          </div>

          {/* Title */}
          <h4 className="text-sm font-semibold text-foreground/90 mb-2 group-hover:text-primary transition-colors duration-200">
            {insight.title}
          </h4>

          {/* Description */}
          <p className="text-xs text-foreground-muted/60 leading-relaxed mb-3 line-clamp-2">
            {insight.explanation}
          </p>

          {/* Impact meter */}
          <div className="flex items-center gap-3 mb-3.5">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] text-foreground-muted/40 font-medium uppercase tracking-wider">Impact</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-[10px] font-bold font-mono"
                >
                  {insight.impact}%
                </motion.span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${insight.impact}%` }}
                  transition={{ delay: 0.2 + index * 0.04, duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
                />
              </div>
            </div>
          </div>

          {/* Action */}
          <p className="text-xs text-foreground-muted/70 font-medium mb-3.5 flex items-start gap-1.5">
            <span className="text-primary shrink-0 mt-px">→</span>
            <span className="line-clamp-2">{insight.action}</span>
          </p>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Button variant="glass" size="sm" className="text-xs h-8 px-3 group/btn">
              <Sparkles className="w-3 h-3 mr-1.5 text-primary/70 group-hover/btn:text-primary transition-colors" />
              Apply
            </Button>
            <Button variant="ghost" size="sm" className="text-xs h-8 px-3">
              <Zap className="w-3 h-3 mr-1.5" />
              Automate
            </Button>
            <Button variant="ghost" size="sm" className="text-xs h-8 w-8 p-0 ml-auto">
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
