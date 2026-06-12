'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useSubscription } from '@/lib/subscription-context'
import { PLANS, type BillingCycle, type PlanTier, type Plan } from '@/lib/plans'
import { Check, Sparkles, Zap, Users, Shield, Star, ArrowRight, HelpCircle, X, CreditCard } from 'lucide-react'
import { PayPalButton } from '@/components/ui/paypal-button'

const FAQS = [
  { q: 'Can I switch plans at any time?', a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately. When downgrading, the new limits apply at the start of your next billing cycle.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex, Discover) and PayPal. Enterprise plans can be invoiced monthly or annually.' },
  { q: 'Is there a free trial?', a: 'Yes, all plans come with a 14-day free trial. No credit card required to start. You can upgrade, downgrade, or cancel at any time during the trial.' },
  { q: 'What happens when I hit my usage limits?', a: 'We\'ll notify you when you\'re approaching your limits. You can upgrade your plan at any time to unlock more capacity. Your data is never locked.' },
  { q: 'Can I get a refund?', a: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, contact our support team for a full refund.' },
  { q: 'Do you offer discounts for annual billing?', a: 'Yes! Save 17% by choosing annual billing. We also offer custom pricing for non-profits and educational institutions.' },
]

const ALL_FEATURES: { label: string; key: string; tiers: Record<PlanTier, boolean | string> }[] = [
  { label: 'AI Command Center', key: 'command-center', tiers: { starter: true, growth: true, scale: true, enterprise: true } },
  { label: 'AI Insights', key: 'insights', tiers: { starter: '10/week', growth: 'Unlimited', scale: 'Unlimited', enterprise: 'Unlimited' } },
  { label: 'AI Reports', key: 'reports', tiers: { starter: '5/month', growth: '25/month', scale: 'Unlimited', enterprise: 'Unlimited' } },
  { label: 'Automations', key: 'automations', tiers: { starter: '3', growth: '25', scale: 'Unlimited', enterprise: 'Unlimited' } },
  { label: 'Data Sources', key: 'sources', tiers: { starter: '3', growth: '10', scale: 'Unlimited', enterprise: 'Unlimited' } },
  { label: 'Team Members', key: 'members', tiers: { starter: '2', growth: '10', scale: 'Unlimited', enterprise: 'Unlimited' } },
  { label: 'Business Neural Map', key: 'neural-map', tiers: { starter: false, growth: true, scale: true, enterprise: true } },
  { label: 'CRM Intelligence', key: 'crm', tiers: { starter: false, growth: true, scale: true, enterprise: true } },
  { label: 'Strategy Studio', key: 'strategy', tiers: { starter: false, growth: true, scale: true, enterprise: true } },
  { label: 'AI War Room', key: 'warroom', tiers: { starter: false, growth: false, scale: true, enterprise: true } },
  { label: 'Advanced Integrations', key: 'integrations', tiers: { starter: false, growth: false, scale: true, enterprise: true } },
  { label: 'Custom Dashboards', key: 'dashboards', tiers: { starter: false, growth: false, scale: true, enterprise: true } },
  { label: 'Advanced Security', key: 'security', tiers: { starter: false, growth: false, scale: true, enterprise: true } },
  { label: 'Priority Support', key: 'support', tiers: { starter: false, growth: false, scale: true, enterprise: true } },
  { label: 'Custom AI Models', key: 'ai-models', tiers: { starter: false, growth: false, scale: false, enterprise: true } },
  { label: 'SSO / SAML', key: 'sso', tiers: { starter: false, growth: false, scale: false, enterprise: true } },
  { label: 'Dedicated Success Manager', key: 'manager', tiers: { starter: false, growth: false, scale: false, enterprise: true } },
]

export default function PricingPage() {
  const { subscription, changePlan, changeBillingCycle, openUpgrade } = useSubscription()
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>(subscription.billingCycle)
  const [showComparison, setShowComparison] = useState(false)
  const currentPlan = subscription.plan

  const handleCycleChange = (cycle: BillingCycle) => {
    setSelectedCycle(cycle)
    changeBillingCycle(cycle)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold">Pricing Plans</h1>
        </div>
        <p className="text-sm text-foreground-muted/60">
          Choose the plan that fits your business. All plans include a 14-day free trial. No credit card required.
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <Badge variant="accent" size="sm">
            <Sparkles className="w-3 h-3 mr-1" />
            Current: {PLANS[currentPlan].name}
          </Badge>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-glass-border rounded-xl p-1">
          <button
            onClick={() => handleCycleChange('monthly')}
            className={cn(
              "px-5 py-2.5 rounded-lg text-sm font-medium transition-all",
              selectedCycle === 'monthly'
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'text-foreground-muted/50 hover:text-foreground-muted border border-transparent'
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => handleCycleChange('annual')}
            className={cn(
              "px-5 py-2.5 rounded-lg text-sm font-medium transition-all",
              selectedCycle === 'annual'
                ? 'bg-accent/10 text-accent border border-accent/20'
                : 'text-foreground-muted/50 hover:text-foreground-muted border border-transparent'
            )}
          >
            Annual <span className="text-[10px] ml-1.5 bg-accent/20 text-accent px-1.5 py-0.5 rounded-full">Save 17%</span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.values(PLANS) as Plan[]).map((plan, i) => {
          const isCurrent = plan.id === currentPlan
          const price = selectedCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice / 12

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={cn(
                "relative rounded-2xl border p-6 transition-all duration-200 flex flex-col",
                isCurrent
                  ? 'border-accent/30 bg-accent/[0.03] ring-1 ring-accent/20'
                  : plan.popular
                    ? 'border-primary/30 bg-primary/[0.03] shadow-xl shadow-primary/5'
                    : 'border-[rgba(79,140,255,0.08)] bg-white/[0.02] hover:border-primary/20'
              )}
            >
              {/* Popular badge */}
              {plan.popular && !isCurrent && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="default" size="default" className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/20">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              {/* Current badge */}
              {isCurrent && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="accent" size="default">Current Plan</Badge>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-5 pt-2">
                <div className={cn(
                  "w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center",
                  plan.id === 'starter' && 'bg-primary/10 text-primary',
                  plan.id === 'growth' && 'bg-secondary/10 text-secondary',
                  plan.id === 'scale' && 'bg-accent/10 text-accent',
                  plan.id === 'enterprise' && 'bg-warning/10 text-warning',
                )}>
                  {plan.id === 'starter' && <Zap className="w-6 h-6" />}
                  {plan.id === 'growth' && <Sparkles className="w-6 h-6" />}
                  {plan.id === 'scale' && <Shield className="w-6 h-6" />}
                  {plan.id === 'enterprise' && <Star className="w-6 h-6" />}
                </div>
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="text-xs text-foreground-muted/50 mt-1">{plan.tagline}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-5">
                {plan.id === 'enterprise' ? (
                  <div className="text-3xl font-bold">Custom</div>
                ) : (
                  <div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">${price}</span>
                      <span className="text-sm text-foreground-muted/40">/month</span>
                    </div>
                    {selectedCycle === 'annual' && (
                      <div className="text-[11px] text-accent/70 mt-1">
                        ${plan.annualPrice}/year — save ${plan.annualSavings}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* CTA */}
              {(plan.id === 'starter' || plan.id === 'growth' || plan.id === 'scale') && !isCurrent ? (
                <div className="mb-5 space-y-2">
                  <Button
                    variant="gradient"
                    size="default"
                    className="w-full"
                    onClick={() => openUpgrade(plan.id)}
                  >
                    {plan.id === 'starter' ? 'Start Free Trial' : 'Start Free Trial'}
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-glass-border" />
                    </div>
                    <div className="relative flex justify-center text-[10px]">
                      <span className="px-2 bg-[#080c1a] text-foreground-muted/40">or pay directly</span>
                    </div>
                  </div>
                  <PayPalButton amount={selectedCycle === 'monthly' ? plan.monthlyPrice : Math.round(plan.annualPrice / 12)} planName={plan.name} billingCycle={selectedCycle} />
                </div>
              ) : (
                <Button
                  variant={isCurrent ? 'glass' : plan.popular ? 'gradient' : 'outline'}
                  size="default"
                  className="w-full mb-5"
                  onClick={() => isCurrent ? null : openUpgrade(plan.id)}
                  disabled={isCurrent}
                >
                  {isCurrent ? 'Current Plan' : plan.cta}
                  {!isCurrent && <ArrowRight className="w-4 h-4 ml-1.5" />}
                </Button>
              )}

              {/* Features */}
              <div className="flex-1 space-y-3">
                {plan.features.slice(0, 8).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                      feature.included
                        ? 'bg-accent/10 text-accent'
                        : 'bg-white/[0.03] text-foreground-muted/20'
                    )}>
                      {feature.included ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                    </div>
                    <div>
                      <span className={cn(
                        "text-xs leading-relaxed",
                        feature.included
                          ? feature.highlighted ? 'text-foreground/90 font-medium' : 'text-foreground/70'
                          : 'text-foreground-muted/40'
                      )}>
                        {feature.label}
                      </span>
                      {feature.limit && (
                        <span className="text-[10px] text-foreground-muted/40 ml-1 font-medium">
                          {feature.limit}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* More features indicator */}
              {plan.features.length > 8 && (
                <div className="text-[10px] text-foreground-muted/30 mt-3 text-center">
                  +{plan.features.length - 8} more features
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Full Feature Comparison */}
      <div className="glass-card rounded-2xl border overflow-hidden">
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/10 flex items-center justify-center">
              <HelpCircle className="w-3.5 h-3.5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold">Full Feature Comparison</h3>
          </div>
          <Badge variant="glass" size="sm">{showComparison ? 'Hide' : 'Show All'}</Badge>
        </button>

        {showComparison && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-[rgba(79,140,255,0.06)]"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(79,140,255,0.06)]">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-foreground-muted/60 uppercase tracking-wider">Feature</th>
                    {(['starter', 'growth', 'scale', 'enterprise'] as PlanTier[]).map((id) => (
                      <th key={id} className="px-4 py-3 text-center text-xs font-semibold text-foreground-muted/60">
                        <span className={cn(id === currentPlan && 'text-accent')}>
                          {PLANS[id].name}
                          {id === currentPlan && <span className="ml-1 text-[9px]">(Current)</span>}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ALL_FEATURES.map((feature, i) => (
                    <tr key={feature.key} className={cn(
                      'border-b border-[rgba(79,140,255,0.03)] hover:bg-white/[0.02] transition-colors',
                      i % 2 === 0 && 'bg-white/[0.01]'
                    )}>
                      <td className="px-5 py-3 text-xs text-foreground/70">{feature.label}</td>
                      {(['starter', 'growth', 'scale', 'enterprise'] as PlanTier[]).map((id) => {
                        const val = feature.tiers[id]
                        return (
                          <td key={id} className="px-4 py-3 text-center">
                            {val === true ? (
                              <Check className="w-4 h-4 text-accent mx-auto" />
                            ) : val === false ? (
                              <X className="w-4 h-4 text-foreground-muted/20 mx-auto" />
                            ) : (
                              <span className="text-xs text-foreground/60">{val as string}</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-lg font-semibold text-center mb-5">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="glass-card rounded-xl px-5 py-4 border"
            >
              <h4 className="text-sm font-medium text-foreground/80 mb-1.5">{faq.q}</h4>
              <p className="text-xs text-foreground-muted/60 leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enterprise CTA */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/[0.06] via-accent/[0.03] to-secondary/[0.04] border border-primary/[0.08] p-8 text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="relative">
          <h2 className="text-xl font-bold mb-2">Need a custom plan?</h2>
          <p className="text-sm text-foreground-muted/60 max-w-md mx-auto mb-5">
            We offer custom pricing for larger organizations with specific requirements.
            Get dedicated support, custom AI models, and enterprise-grade security.
          </p>
          <Button variant="gradient" size="lg" onClick={() => openUpgrade('enterprise')}>
            <Star className="w-4 h-4 mr-2" />
            Contact Sales
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
