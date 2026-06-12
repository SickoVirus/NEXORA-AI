'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Lock, Zap, Database, Lightbulb, Swords, Network } from 'lucide-react'
import { Button } from './button'
import { Badge } from './badge'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'gradient' | 'glass' | 'default'
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  upgradePrompt?: boolean
  plannedFeature?: string
  illustration?: 'default' | 'neural' | 'warroom' | 'data' | 'insight'
  compact?: boolean
}

function getIllustration(type: string) {
  switch (type) {
    case 'neural':
      return (
        <svg className="w-full h-full" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="40" stroke="rgba(79,140,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="60" cy="60" r="25" stroke="rgba(79,140,255,0.1)" strokeWidth="1" />
          <circle cx="60" cy="60" r="55" stroke="rgba(79,140,255,0.05)" strokeWidth="0.5" />
          <circle cx="60" cy="35" r="4" fill="rgba(79,140,255,0.3)" />
          <circle cx="85" cy="60" r="4" fill="rgba(139,92,246,0.3)" />
          <circle cx="60" cy="85" r="4" fill="rgba(6,214,160,0.3)" />
          <circle cx="35" cy="60" r="4" fill="rgba(56,189,248,0.3)" />
          <circle cx="72" cy="43" r="3" fill="rgba(79,140,255,0.2)" />
          <circle cx="77" cy="77" r="3" fill="rgba(139,92,246,0.2)" />
          <circle cx="43" cy="72" r="3" fill="rgba(56,189,248,0.2)" />
          <line x1="60" y1="35" x2="85" y2="60" stroke="rgba(79,140,255,0.08)" strokeWidth="0.5" />
          <line x1="85" y1="60" x2="60" y2="85" stroke="rgba(139,92,246,0.08)" strokeWidth="0.5" />
          <line x1="60" y1="85" x2="35" y2="60" stroke="rgba(6,214,160,0.08)" strokeWidth="0.5" />
          <line x1="35" y1="60" x2="60" y2="35" stroke="rgba(56,189,248,0.08)" strokeWidth="0.5" />
        </svg>
      )
    case 'warroom':
      return (
        <svg className="w-full h-full" viewBox="0 0 120 120" fill="none">
          <rect x="20" y="30" width="80" height="60" rx="8" stroke="rgba(79,140,255,0.15)" strokeWidth="1" />
          <rect x="20" y="30" width="80" height="16" rx="8" stroke="rgba(79,140,255,0.1)" strokeWidth="1" />
          <circle cx="60" cy="38" r="2" fill="rgba(239,68,68,0.4)" />
          <line x1="35" y1="58" x2="85" y2="58" stroke="rgba(79,140,255,0.08)" strokeWidth="0.5" />
          <line x1="35" y1="68" x2="70" y2="68" stroke="rgba(79,140,255,0.08)" strokeWidth="0.5" />
          <line x1="35" y1="78" x2="60" y2="78" stroke="rgba(79,140,255,0.08)" strokeWidth="0.5" />
        </svg>
      )
    case 'data':
      return (
        <svg className="w-full h-full" viewBox="0 0 120 120" fill="none">
          <rect x="30" y="25" width="60" height="16" rx="4" stroke="rgba(79,140,255,0.12)" strokeWidth="1" />
          <rect x="30" y="47" width="60" height="16" rx="4" stroke="rgba(79,140,255,0.08)" strokeWidth="1" />
          <rect x="30" y="69" width="60" height="16" rx="4" stroke="rgba(79,140,255,0.05)" strokeWidth="1" />
          <circle cx="42" cy="33" r="3" fill="rgba(79,140,255,0.2)" />
          <circle cx="42" cy="55" r="3" fill="rgba(139,92,246,0.2)" />
          <circle cx="42" cy="77" r="3" fill="rgba(6,214,160,0.2)" />
        </svg>
      )
    default:
      return (
        <svg className="w-full h-full" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="50" r="20" stroke="rgba(79,140,255,0.12)" strokeWidth="1" />
          <circle cx="60" cy="50" r="10" stroke="rgba(79,140,255,0.08)" strokeWidth="1" />
          <circle cx="60" cy="30" r="2" fill="rgba(79,140,255,0.2)" />
          <circle cx="80" cy="50" r="2" fill="rgba(139,92,246,0.2)" />
          <circle cx="60" cy="70" r="2" fill="rgba(6,214,160,0.2)" />
          <circle cx="40" cy="50" r="2" fill="rgba(56,189,248,0.2)" />
          <line x1="60" y1="30" x2="80" y2="50" stroke="rgba(79,140,255,0.06)" strokeWidth="0.5" />
          <line x1="80" y1="50" x2="60" y2="70" stroke="rgba(139,92,246,0.06)" strokeWidth="0.5" />
          <line x1="60" y1="70" x2="40" y2="50" stroke="rgba(6,214,160,0.06)" strokeWidth="0.5" />
          <line x1="40" y1="50" x2="60" y2="30" stroke="rgba(56,189,248,0.06)" strokeWidth="0.5" />
        </svg>
      )
  }
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  upgradePrompt,
  plannedFeature,
  illustration = 'default',
  compact = false,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col items-center justify-center text-center",
        compact ? "py-8 px-4" : "py-12 sm:py-20 px-6"
      )}
    >
      {/* Illustration */}
      <div className={cn(
        "relative",
        compact ? "w-20 h-20 mb-4" : "w-32 h-32 mb-6"
      )}>
        {icon ? (
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/[0.04] to-secondary/[0.02] border border-primary/[0.06] flex items-center justify-center">
            <div className="text-foreground-muted/30">
              {icon}
            </div>
          </div>
        ) : (
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/[0.04] to-secondary/[0.02] border border-primary/[0.06] flex items-center justify-center p-4">
            {getIllustration(illustration)}
          </div>
        )}

        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.03] to-transparent blur-xl pointer-events-none" />
      </div>

      {/* Upgrade badge */}
      {upgradePrompt && (
        <Badge variant="warning" size="sm" className="mb-3">
          <Lock className="w-3 h-3 mr-1" />
          Premium Feature
        </Badge>
      )}

      {/* Planned badge */}
      {plannedFeature && (
        <Badge variant="accent" size="sm" className="mb-3">
          <Sparkles className="w-3 h-3 mr-1" />
          {plannedFeature}
        </Badge>
      )}

      {/* Title */}
      <h3 className={cn(
        "font-bold text-foreground/80",
        compact ? "text-base" : "text-xl"
      )}>
        {title}
      </h3>

      {/* Description */}
      <p className={cn(
        "text-foreground-muted/50 mt-2 max-w-md leading-relaxed",
        compact ? "text-xs" : "text-sm"
      )}>
        {description}
      </p>

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className={cn(
          "flex items-center gap-3",
          compact ? "mt-4" : "mt-6"
        )}>
          {action && (
            <Button
              variant={action.variant || 'gradient'}
              size={compact ? 'sm' : 'default'}
              onClick={action.onClick}
            >
              {upgradePrompt && <Zap className="w-3.5 h-3.5 mr-1.5" />}
              {!upgradePrompt && <Sparkles className="w-3.5 h-3.5 mr-1.5" />}
              {action.label}
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="ghost"
              size={compact ? 'sm' : 'default'}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}

      {/* Planned feature note */}
      {plannedFeature && !action && (
        <p className="text-[10px] text-foreground-muted/30 mt-3">
          This feature is coming soon
        </p>
      )}
    </motion.div>
  )
}
