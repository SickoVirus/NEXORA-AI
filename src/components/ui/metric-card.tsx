'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string
  change: number
  trend: 'up' | 'down' | 'neutral'
  icon: LucideIcon
  index?: number
}

export function MetricCard({ label, value, change, trend, icon: Icon, index = 0 }: MetricCardProps) {
  const trendColors = {
    up: 'text-accent bg-accent/10 border-accent/20',
    down: 'text-danger bg-danger/10 border-danger/20',
    neutral: 'text-foreground-muted/50 bg-foreground/5 border-foreground/10',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', damping: 25, stiffness: 300 }}
      className="glass-card rounded-xl p-4 lg:p-5 border card-interactive hover-lift-sm group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center group-hover:from-primary/15 group-hover:to-primary/10 transition-all duration-300">
              <Icon className="w-[18px] h-[18px] text-primary" />
            </div>
            <div className="absolute inset-0 rounded-xl bg-primary/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className={cn(
          "flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border",
          trendColors[trend]
        )}>
          {trend === 'up' && <TrendingUp className="w-3 h-3" />}
          {trend === 'down' && <TrendingDown className="w-3 h-3" />}
          {trend === 'neutral' && <Minus className="w-3 h-3" />}
          <span>{change >= 0 ? '+' : ''}{change}%</span>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
        <p className="text-[11px] text-foreground-muted/50 font-medium">{label}</p>
      </div>

      {/* Mini trend visualization */}
      <div className="mt-3.5 flex items-center gap-2">
        <div className="flex-1 h-[3px] rounded-full bg-white/[0.04] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(Math.abs(change) * 3, 100)}%` }}
            transition={{ delay: 0.3 + index * 0.05, duration: 0.8, ease: 'easeOut' }}
            className={cn(
              "h-full rounded-full",
              trend === 'up' && 'bg-gradient-to-r from-accent to-accent/40',
              trend === 'down' && 'bg-gradient-to-r from-danger to-danger/40',
              trend === 'neutral' && 'bg-gradient-to-r from-foreground-muted/30 to-foreground-muted/10',
            )}
          />
        </div>
        <span className="text-[9px] text-foreground-muted/30 font-mono">{value}</span>
      </div>

      {/* Subtle bottom shine */}
      <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  )
}
