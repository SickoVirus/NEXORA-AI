'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Sparkles, Zap, Users, Shield, ArrowRight, Star, ChevronRight, CreditCard } from 'lucide-react'
import { PayPalButton } from './paypal-button'
import { Button } from './button'
import { Badge } from './badge'
import { cn } from '@/lib/utils'
import { useSubscription } from '@/lib/subscription-context'
import { PLANS, type BillingCycle, type PlanTier } from '@/lib/plans'

export function UpgradeModal() {
  const {
    upgradeModalOpen,
    setUpgradeModalOpen,
    upgradeTargetPlan,
    changePlan,
    changeBillingCycle,
    subscription,
  } = useSubscription()
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(subscription.billingCycle)
  const [selectedPlan, setSelectedPlan] = useState<PlanTier>(upgradeTargetPlan || 'growth')
  const [isProcessing, setIsProcessing] = useState(false)
  const currentPlan = subscription.plan

  const handleSelectPlan = (plan: PlanTier) => {
    setSelectedPlan(plan)
  }

  const handleUpgrade = () => {
    setIsProcessing(true)
    setTimeout(() => {
      changePlan(selectedPlan)
      changeBillingCycle(billingCycle)
      setIsProcessing(false)
      setUpgradeModalOpen(false)
    }, 1500)
  }

  const handleClose = () => {
    if (!isProcessing) setUpgradeModalOpen(false)
  }

  const planIcons: Record<string, React.ReactNode> = {
    starter: <Zap className="w-5 h-5" />,
    growth: <Sparkles className="w-5 h-5" />,
    scale: <Shield className="w-5 h-5" />,
    enterprise: <Star className="w-5 h-5" />,
  }

  return (
    <AnimatePresence>
      {upgradeModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-[5%] md:left-[10%] md:right-[10%] md:bottom-[5%] z-[101] bg-[#080c1a] rounded-3xl border border-[rgba(79,140,255,0.1)] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between px-6 py-4 border-b border-[rgba(79,140,255,0.06)] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Upgrade Your Plan</h2>
                  <p className="text-xs text-foreground-muted/50">Unlock more power for your business</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-foreground-muted/40 hover:text-foreground-muted hover:bg-white/[0.04] transition-all"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Billing toggle */}
            <div className="flex items-center justify-center pt-6 pb-2 shrink-0">
              <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-glass-border rounded-xl p-1">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    billingCycle === 'monthly'
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-foreground-muted/50 hover:text-foreground-muted border border-transparent'
                  )}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    billingCycle === 'annual'
                      ? 'bg-accent/10 text-accent border border-accent/20'
                      : 'text-foreground-muted/50 hover:text-foreground-muted border border-transparent'
                  )}
                >
                  Annual <span className="text-[10px] ml-1 opacity-70">Save 17%</span>
                </button>
              </div>
            </div>

            {/* Plans grid */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {(['starter', 'growth', 'scale', 'enterprise'] as PlanTier[]).map((planId) => {
                  const plan = PLANS[planId]
                  const isCurrent = planId === currentPlan
                  const isSelected = selectedPlan === planId
                  const price = billingCycle === 'annual' ? plan.annualPrice / 12 : plan.monthlyPrice

                  return (
                    <motion.button
                      key={planId}
                      onClick={() => !isCurrent && handleSelectPlan(planId)}
                      disabled={isCurrent}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: ['starter', 'growth', 'scale', 'enterprise'].indexOf(planId) * 0.05 }}
                      className={cn(
                        "relative text-left rounded-2xl border p-5 transition-all duration-200 flex flex-col",
                        isCurrent
                          ? 'border-accent/30 bg-accent/[0.03] opacity-60'
                          : isSelected
                            ? 'border-primary/40 bg-primary/[0.04] shadow-lg shadow-primary/5'
                            : 'border-[rgba(79,140,255,0.08)] bg-white/[0.02] hover:border-primary/20 hover:bg-white/[0.03]'
                      )}
                    >
                      {/* Popular badge */}
                      {plan.popular && !isCurrent && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <Badge variant="default" size="sm" className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/20">
                            <Star className="w-3 h-3 mr-1" />
                            Most Popular
                          </Badge>
                        </div>
                      )}

                      {/* Current badge */}
                      {isCurrent && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <Badge variant="accent" size="sm">Current Plan</Badge>
                        </div>
                      )}

                      {/* Plan header */}
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className={cn(
                          "w-9 h-9 rounded-xl flex items-center justify-center",
                          planId === 'starter' && 'bg-primary/10 text-primary',
                          planId === 'growth' && 'bg-secondary/10 text-secondary',
                          planId === 'scale' && 'bg-accent/10 text-accent',
                          planId === 'enterprise' && 'bg-warning/10 text-warning',
                        )}>
                          {planIcons[planId]}
                        </div>
                        <div>
                          <div className="text-sm font-bold">{plan.name}</div>
                          <div className="text-[10px] text-foreground-muted/40">{plan.tagline}</div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        {planId === 'enterprise' ? (
                          <div className="text-2xl font-bold">Custom</div>
                        ) : (
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold">${price}</span>
                            <span className="text-xs text-foreground-muted/40">/month</span>
                          </div>
                        )}
                        {billingCycle === 'annual' && planId !== 'enterprise' && (
                          <div className="text-[10px] text-accent/70 mt-0.5">
                            ${plan.annualPrice}/year (save ${plan.annualSavings})
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <div className="flex-1 space-y-2.5">
                        {plan.features.slice(0, 7).map((feature, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className={cn(
                              "w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                              feature.included
                                ? 'bg-accent/10 text-accent'
                                : 'bg-white/[0.03] text-foreground-muted/20'
                            )}>
                              {feature.included ? (
                                <Check className="w-2.5 h-2.5" />
                              ) : (
                                <div className="w-2 h-0.5 rounded-full bg-foreground-muted/20" />
                              )}
                            </div>
                            <span className={cn(
                              "text-xs leading-relaxed",
                              feature.included
                                ? feature.highlighted ? 'text-foreground/90 font-medium' : 'text-foreground/70'
                                : 'text-foreground-muted/30 line-through'
                            )}>
                              {feature.label}
                              {feature.limit && (
                                <span className="text-[10px] text-foreground-muted/40 ml-1">({feature.limit})</span>
                              )}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* PayPal button */}
                      {(planId === 'starter' || planId === 'growth' || planId === 'scale') && !isCurrent && (
                        <div className="mt-3 pt-3 border-t border-glass-border">
                          <div className="text-[10px] text-foreground-muted/30 mb-2 text-center">Or pay directly with PayPal</div>
                          <PayPalButton amount={price} planName={plan.name} billingCycle={billingCycle} />
                        </div>
                      )}

                      {/* More features indicator */}
                      {plan.features.length > 7 && (
                        <div className="text-[10px] text-foreground-muted/30 mt-2 flex items-center gap-1">
                          <ChevronRight className="w-3 h-3" />
                          {plan.features.length - 7} more features
                        </div>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 px-6 py-4 border-t border-[rgba(79,140,255,0.06)] flex items-center justify-between">
              <div className="text-xs text-foreground-muted/40">
                <span className="text-foreground-muted/60">Current plan:</span>{' '}
                <span className="font-semibold text-foreground/80">{PLANS[currentPlan].name}</span>
                {selectedPlan !== currentPlan && (
                  <span className="ml-2">
                    → <span className="font-semibold text-primary">{PLANS[selectedPlan].name}</span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="gradient"
                  size="sm"
                  onClick={handleUpgrade}
                  disabled={selectedPlan === currentPlan || isProcessing}
                  className="min-w-[140px]"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                      />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      {selectedPlan === currentPlan ? 'Current Plan' : `Upgrade to ${PLANS[selectedPlan].name}`}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
