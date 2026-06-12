'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Zap, Clock, ArrowRight, Gift } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'
import { useSubscription } from '@/lib/subscription-context'

export function TrialBanner() {
  const { subscription, openUpgrade, setUpgradeModalOpen } = useSubscription()
  const [dismissed, setDismissed] = useState(false)
  const { trialDaysRemaining, trialTotalDays } = subscription
  const progress = 1 - (trialDaysRemaining / trialTotalDays)

  if (subscription.status !== 'trial' || dismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/[0.08] via-accent/[0.04] to-secondary/[0.06] border border-primary/[0.12] px-5 py-3.5"
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
          {/* Icon */}
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center">
              <Gift className="w-5 h-5 text-primary" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-sm font-semibold text-foreground/90">
                Your free trial ends in <span className="text-primary">{trialDaysRemaining} days</span>
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 font-medium">
                Active
              </span>
            </div>
            <p className="text-xs text-foreground-muted/60">
              You&apos;re currently on the <span className="font-semibold text-foreground/70">Starter</span> plan.
              Upgrade to <span className="font-semibold text-foreground/70">Growth</span> to unlock AI insights,
              Neural Map, Strategy Studio, and more.
            </p>

            {/* Progress bar */}
            <div className="mt-2.5 max-w-md">
              <div className="flex items-center justify-between text-[10px] text-foreground-muted/40 mb-1">
                <span>Trial progress</span>
                <span>{Math.round(progress * 100)}% complete</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="gradient"
              size="sm"
              onClick={() => openUpgrade()}
              className="h-9"
            >
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              Upgrade Now
            </Button>
            <button
              onClick={() => setDismissed(true)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground-muted/30 hover:text-foreground-muted hover:bg-white/[0.04] transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
