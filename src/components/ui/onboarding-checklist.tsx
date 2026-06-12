'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Circle, Sparkles, ArrowRight, Zap, ChevronRight } from 'lucide-react'
import { Button } from './button'
import { Badge } from './badge'
import { cn } from '@/lib/utils'

export interface OnboardingStep {
  id: string
  title: string
  description: string
  action: string
  actionLink: string
  completed: boolean
  optional?: boolean
  icon: string
}

interface OnboardingChecklistProps {
  steps: OnboardingStep[]
  onAction: (step: OnboardingStep) => void
  onDismiss: () => void
  compact?: boolean
}

const defaultSteps: OnboardingStep[] = [
  { id: 'source', title: 'Connect Your First Data Source', description: 'Bring your business data into NEXORA AI to get started with personalized insights.', action: 'Connect Data', actionLink: '/dashboard/integrations', completed: false, icon: 'Database' },
  { id: 'insight', title: 'Generate Your First AI Insight', description: 'Let AI analyze your data and discover hidden opportunities and risks.', action: 'Run Analysis', actionLink: '/dashboard/insights', completed: false, icon: 'Lightbulb' },
  { id: 'neural', title: 'Explore Your Neural Map', description: 'See your business as an interconnected system with AI-powered node analysis.', action: 'Open Map', actionLink: '/dashboard/neural-map', completed: false, icon: 'Network' },
  { id: 'report', title: 'Create Your First AI Report', description: 'Generate a professional business report with AI-powered insights and recommendations.', action: 'Create Report', actionLink: '/dashboard/reports', completed: false, icon: 'FileText' },
  { id: 'automation', title: 'Set Up Your First Automation', description: 'Save time by automating repetitive tasks and workflows with AI.', action: 'Build Automation', actionLink: '/dashboard/automation-lab', completed: false, optional: true, icon: 'Zap' },
  { id: 'tour', title: 'Take the Product Tour', description: 'Get a guided walkthrough of all the key features NEXORA AI offers.', action: 'Start Tour', actionLink: '/dashboard', completed: false, optional: true, icon: 'Play' },
]

export function OnboardingChecklist({ steps = defaultSteps, onAction, onDismiss, compact = false }: OnboardingChecklistProps) {
  const [minimized, setMinimized] = useState(false)
  const completedCount = steps.filter(s => s.completed).length
  const totalCount = steps.length
  const progress = (completedCount / totalCount) * 100
  const allDone = completedCount === totalCount

  if (allDone) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border",
        "bg-gradient-to-b from-accent/[0.04] to-transparent border-accent/[0.08]"
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-accent/[0.02] rounded-full blur-2xl pointer-events-none" />

      <div className="relative p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-accent" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground/90">
                {completedCount === 0 ? 'Welcome! Let\'s Get Started' : 'Keep Going!'}
              </h3>
              <p className="text-xs text-foreground-muted/50">
                {completedCount} of {totalCount} steps completed
              </p>
            </div>
          </div>

          {!compact && (
            <button
              onClick={() => setMinimized(!minimized)}
              className="text-[11px] text-accent/60 hover:text-accent transition-colors shrink-0 mt-1"
            >
              {minimized ? 'Show' : 'Minimize'}
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-accent to-primary"
          />
        </div>

        {/* Steps */}
        <AnimatePresence>
          {!minimized && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              {steps.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={cn(
                    "flex items-start gap-3 rounded-xl p-3 transition-all",
                    step.completed
                      ? 'opacity-40'
                      : 'bg-white/[0.02] border border-glass-border hover:bg-white/[0.03]'
                  )}
                >
                  {/* Status icon */}
                  <div className={cn(
                    "mt-0.5 shrink-0",
                    step.completed ? 'text-accent' : 'text-foreground-muted/30'
                  )}>
                    {step.completed ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={cn(
                        "text-sm font-medium",
                        step.completed ? 'text-foreground/50 line-through' : 'text-foreground/80'
                      )}>
                        {step.title}
                      </span>
                      {step.optional && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/[0.04] text-foreground-muted/40">
                          Optional
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-foreground-muted/50 leading-relaxed">{step.description}</p>
                  </div>

                  {/* Action button */}
                  {!step.completed && (
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={() => onAction(step)}
                      className="shrink-0 h-8 text-xs"
                    >
                      {step.action}
                      <ArrowRight className="w-3 h-3 ml-1.5" />
                    </Button>
                  )}
                </motion.div>
              ))}

              {/* Dismiss */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={onDismiss}
                  className="text-[10px] text-foreground-muted/30 hover:text-foreground-muted/60 transition-colors"
                >
                  Dismiss checklist
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export { defaultSteps }
