'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { UpgradeModal } from '@/components/ui/upgrade-modal'
import { Settings, User, Shield, Bell, CreditCard, Link, Users, Palette, Sparkles, ChevronRight, Check, Brain, Zap, Shield as ShieldIcon, Target, Lightbulb, FileText, BarChart3, Database, Globe, Mail, Phone, MapPin, Key, Clock, Download, ArrowRight, Plus, X, Copy, ExternalLink, Lock, Star, Gift, RefreshCw, AlertCircle, Unlock, Camera, Wallet } from 'lucide-react'
import { PayPalButton } from '@/components/ui/paypal-button'
import { cn } from '@/lib/utils'
import { type AITone, getDefaultTone } from '@/lib/ai-engine'
import { useSubscription } from '@/lib/subscription-context'
import { PLANS, type PlanTier } from '@/lib/plans'

const settingsSections = [
  { id: 'profile', label: 'Company Profile', icon: User },
  { id: 'ai', label: 'AI Preferences', icon: Sparkles },
  { id: 'billing', label: 'Billing & Plan', icon: CreditCard },
  { id: 'team', label: 'Team Members', icon: Users },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'datasources', label: 'Data Sources', icon: Database },
  { id: 'integrations', label: 'Integrations', icon: Link },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const [selectedTone, setSelectedTone] = useState<AITone>(getDefaultTone())
  const { subscription, openUpgrade, changePlan } = useSubscription()

  useEffect(() => {
    // Scroll to section on change
    const section = document.getElementById(`section-${activeSection}`)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [activeSection])

  const handleToneChange = (tone: AITone) => {
    setSelectedTone(tone)
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexora-ai-tone', tone)
      window.dispatchEvent(new CustomEvent('nexora-tone-change', { detail: { tone } }))
    }
  }

  const toneEffects = [
    {
      label: 'Risk Tolerance',
      getLevel: (tone: AITone) => tone === 'aggressive' ? 'High' : tone === 'conservative' ? 'Low' : tone === 'creative' ? 'Medium' : 'Medium',
      getValue: (tone: AITone) => tone === 'aggressive' ? '85%' : tone === 'creative' ? '65%' : tone === 'conservative' ? '25%' : '50%',
    },
    {
      label: 'Data Detail',
      getLevel: (tone: AITone) => tone === 'analytical' ? 'High' : tone === 'executive-summary' ? 'Low' : 'Medium',
      getValue: (tone: AITone) => tone === 'analytical' ? '90%' : tone === 'executive-summary' ? '20%' : '55%',
    },
    {
      label: 'Action Urgency',
      getLevel: (tone: AITone) => tone === 'aggressive' ? 'High' : tone === 'conservative' ? 'Low' : 'Medium',
      getValue: (tone: AITone) => tone === 'aggressive' ? '95%' : tone === 'conservative' ? '30%' : '60%',
    },
    {
      label: 'Creativity',
      getLevel: (tone: AITone) => tone === 'creative' ? 'High' : tone === 'conservative' ? 'Low' : 'Medium',
      getValue: (tone: AITone) => tone === 'creative' ? '92%' : tone === 'conservative' ? '15%' : '50%',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-1">
        <h1 className="text-2xl lg:text-3xl font-bold">Settings</h1>
        {subscription.status === 'trial' && (
          <Badge variant="accent" size="sm">
            <Gift className="w-3 h-3 mr-1" />
            Trial: {subscription.trialDaysRemaining} days left
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-1 lg:sticky lg:top-20 lg:self-start">
          {settingsSections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all",
                  activeSection === section.id
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-foreground/50 hover:text-foreground hover:bg-white/5 border border-transparent'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{section.label}</span>
                <ChevronRight className="w-3 h-3 ml-auto" />
              </button>
            )
          })}

          {/* Quick upgrade card */}
          {subscription.status === 'trial' && (
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-primary/[0.06] to-accent/[0.04] border border-primary/[0.08]">
              <div className="flex items-center gap-2.5 mb-2">
                <Gift className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold">Free Trial</span>
              </div>
              <div className="text-[10px] text-foreground-muted/60 mb-3">{subscription.trialDaysRemaining} of {subscription.trialTotalDays} days remaining</div>
              <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden mb-3">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${((subscription.trialTotalDays - subscription.trialDaysRemaining) / subscription.trialTotalDays) * 100}%` }} />
              </div>
              <Button variant="gradient" size="sm" className="w-full text-xs" onClick={() => openUpgrade()}>
                <Zap className="w-3 h-3 mr-1" />
                Upgrade Now
              </Button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-5">
          <div className="glass-panel rounded-xl border p-6 space-y-6">
            {/* === PROFILE === */}
            {activeSection === 'profile' && (
              <motion.div id="section-profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Company Profile</h2>
                  <Badge variant="glass" size="sm">
                    <Globe className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-primary/20">
                      N
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-accent border-2 border-background flex items-center justify-center hover:bg-accent/90 transition-colors">
                      <Camera className="w-3 h-3 text-white" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">Nexora Technologies</h3>
                    <p className="text-xs text-foreground-muted/50">Member since {subscription.memberSince}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">Company Name</label>
                    <Input defaultValue="Nexora Technologies" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">Industry</label>
                    <Select options={[{ value: 'technology', label: 'Technology / SaaS' }, { value: 'healthcare', label: 'Healthcare' }, { value: 'finance', label: 'Finance' }, { value: 'marketing', label: 'Marketing' }]} value="technology" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">Company Size</label>
                    <Select options={[{ value: 'solo', label: 'Solo (1)' }, { value: 'small', label: 'Small Team (2-10)' }, { value: 'growing', label: 'Growing (11-50)' }, { value: 'mid', label: 'Mid-size (51-200)' }]} value="small" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">Website</label>
                    <Input defaultValue="https://nexora.ai" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">Business Email</label>
                    <Input defaultValue="hello@nexora.ai" icon={<Mail className="w-4 h-4 text-foreground-muted/30" />} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">Phone</label>
                    <Input defaultValue="+1 (555) 123-4567" icon={<Phone className="w-4 h-4 text-foreground-muted/30" />} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Address</label>
                  <Input defaultValue="123 Innovation Drive, San Francisco, CA 94105" icon={<MapPin className="w-4 h-4 text-foreground-muted/30" />} />
                </div>
                <div className="flex justify-end">
                  <Button variant="gradient" size="sm">Save Changes</Button>
                </div>
              </motion.div>
            )}

            {/* === AI PREFERENCES === */}
            {activeSection === 'ai' && (
              <motion.div id="section-ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <h2 className="text-lg font-semibold">AI Preferences</h2>
                <p className="text-sm text-foreground-muted/50">Choose how NEXORA AI communicates with you. This setting syncs across the entire app.</p>
                <div className="glass-card rounded-xl p-5 border">
                  <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-primary" />
                    AI Tone & Personality
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      { id: 'strategic' as AITone, label: 'Strategic', desc: 'Long-term thinking with balanced, comprehensive recommendations focused on sustainable growth', icon: Target, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
                      { id: 'analytical' as AITone, label: 'Analytical', desc: 'Data-driven decisions with detailed quantitative breakdowns and benchmarks', icon: BarChart3, color: 'text-info', bg: 'bg-info/10', border: 'border-info/20' },
                      { id: 'aggressive' as AITone, label: 'Aggressive Growth', desc: 'Bold, rapid-growth recommendations prioritizing market capture over caution', icon: Zap, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' },
                      { id: 'conservative' as AITone, label: 'Conservative', desc: 'Cautious recommendations prioritizing stability and risk mitigation', icon: ShieldIcon, color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/20' },
                      { id: 'creative' as AITone, label: 'Creative', desc: 'Innovative, unconventional approaches with out-of-the-box thinking', icon: Lightbulb, color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/20' },
                      { id: 'executive-summary' as AITone, label: 'Executive Summary Mode', desc: 'Ultra-concise, high-level briefings focused on bottom-line impact and decisions', icon: FileText, color: 'text-foreground-muted/80', bg: 'bg-white/[0.04]', border: 'border-glass-border' },
                    ].map((tone) => {
                      const Icon = tone.icon
                      const isSelected = selectedTone === tone.id
                      return (
                        <button
                          key={tone.id}
                          onClick={() => handleToneChange(tone.id)}
                          className={cn(
                            "w-full flex items-start gap-3 rounded-xl px-4 py-3.5 transition-all text-left border",
                            isSelected
                              ? `${tone.bg} ${tone.border} shadow-sm`
                              : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-glass-border'
                          )}
                        >
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border", isSelected ? `${tone.bg} ${tone.border}` : 'bg-white/[0.03] border-glass-border')}>
                            <Icon className={cn("w-4.5 h-4.5", isSelected ? tone.color : 'text-foreground-muted/40')} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className={cn("text-sm font-semibold", isSelected ? 'text-foreground' : 'text-foreground/70')}>{tone.label}</span>
                              {isSelected && (
                                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            <p className={cn("text-xs mt-0.5 leading-relaxed", isSelected ? 'text-foreground-muted/60' : 'text-foreground-muted/30')}>{tone.desc}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div className="glass-card rounded-xl p-5 border">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    Tone Effects
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {toneEffects.map((effect) => (
                      <div key={effect.label} className="rounded-lg bg-white/[0.02] border border-glass-border p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-foreground-muted/60">{effect.label}</span>
                          <span className={cn("text-xs font-semibold", effect.getLevel(selectedTone) === 'High' ? 'text-accent' : effect.getLevel(selectedTone) === 'Medium' ? 'text-warning' : 'text-foreground-muted/40')}>{effect.getLevel(selectedTone)}</span>
                        </div>
                        <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
                          <motion.div key={selectedTone} initial={{ width: 0 }} animate={{ width: effect.getValue(selectedTone) }} transition={{ duration: 0.5, ease: 'easeOut' }} className={cn("h-full rounded-full", effect.getLevel(selectedTone) === 'High' ? 'bg-accent' : effect.getLevel(selectedTone) === 'Medium' ? 'bg-warning' : 'bg-foreground-muted/20')} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* === BILLING & PLAN === */}
            {activeSection === 'billing' && (
              <motion.div id="section-billing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Billing & Plan</h2>
                  <Button variant="gradient" size="sm" onClick={() => openUpgrade()}>
                    <Zap className="w-3.5 h-3.5 mr-1.5" />
                    Change Plan
                  </Button>
                </div>

                {/* Current Plan Card */}
                <div className="glass-card rounded-xl p-5 border relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary/[0.03] rounded-full blur-2xl pointer-events-none" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold">{PLANS[subscription.plan].name} Plan</h3>
                          {subscription.status === 'trial' ? (
                            <Badge variant="accent" size="sm">Trial</Badge>
                          ) : (
                            <Badge variant="accent" size="sm">Active</Badge>
                          )}
                        </div>
                        <p className="text-xs text-foreground-muted/50">{PLANS[subscription.plan].tagline}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="rounded-xl bg-white/[0.02] border border-glass-border p-3.5">
                        <div className="text-[10px] text-foreground-muted/40 mb-1">Status</div>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "w-2 h-2 rounded-full",
                            subscription.status === 'active' ? 'bg-accent' : subscription.status === 'trial' ? 'bg-warning' : 'bg-danger'
                          )} />
                          <span className="text-sm font-semibold capitalize">{subscription.status}</span>
                        </div>
                      </div>
                      <div className="rounded-xl bg-white/[0.02] border border-glass-border p-3.5">
                        <div className="text-[10px] text-foreground-muted/40 mb-1">Billing Cycle</div>
                        <span className="text-sm font-semibold capitalize">{subscription.billingCycle}</span>
                      </div>
                      <div className="rounded-xl bg-white/[0.02] border border-glass-border p-3.5">
                        <div className="text-[10px] text-foreground-muted/40 mb-1">Next Billing</div>
                        <span className="text-sm font-semibold">{subscription.nextBillingDate}</span>
                      </div>
                    </div>

                    {/* Usage limits */}
                    <h4 className="text-sm font-semibold mb-3 mt-5">Usage This Month</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'AI Reports', used: subscription.usage.aiReportsUsed, limit: PLANS[subscription.plan].usageLimits.aiReportsPerMonth, color: 'bg-primary' },
                        { label: 'AI Insights', used: subscription.usage.aiInsightsUsed, limit: PLANS[subscription.plan].usageLimits.aiInsightsPerWeek, color: 'bg-secondary' },
                        { label: 'Automations', used: subscription.usage.automationsUsed, limit: PLANS[subscription.plan].usageLimits.automations, color: 'bg-accent' },
                        { label: 'Team Members', used: subscription.usage.teamMembersUsed, limit: PLANS[subscription.plan].usageLimits.teamMembers, color: 'bg-info' },
                      ].map((item) => {
                        const limitDisplay = item.limit === Infinity ? '∞' : item.limit
                        const percent = item.limit === Infinity ? 0 : Math.min((item.used / item.limit) * 100, 100)
                        const isNear = percent > 80
                        return (
                          <div key={item.label} className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-foreground-muted/70">{item.label}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold">{item.used}/{limitDisplay}</span>
                                {isNear && <AlertCircle className="w-3 h-3 text-warning" />}
                              </div>
                            </div>
                            <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percent}%` }}
                                className={cn("h-full rounded-full", item.color, percent > 80 ? 'bg-warning' : '')}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Upgrade prompt when near limits */}
                    {subscription.plan === 'starter' && (
                      <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-primary/[0.06] to-accent/[0.04] border border-primary/[0.08] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-primary" />
                          <span className="text-xs text-foreground-muted/60">Need more? Upgrade to Growth for higher limits.</span>
                        </div>
                        <Button variant="gradient" size="sm" className="text-xs h-8" onClick={() => openUpgrade('growth')}>
                          Upgrade
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="glass-card rounded-xl p-5 border">
                  <h3 className="text-sm font-semibold mb-4">Payment Method</h3>
                  <div className="rounded-xl bg-white/[0.02] border border-glass-border p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">PayPal</div>
                        <div className="text-[10px] text-foreground-muted/40">Pay securely with your PayPal account</div>
                      </div>
                      <Badge variant="accent" size="sm">Connected</Badge>
                    </div>
                    <div className="border-t border-glass-border pt-3">
                      <p className="text-[10px] text-foreground-muted/40 mb-2">PayPal is your default payment method. Your subscription of <strong className="text-foreground/70">${PLANS[subscription.plan].monthlyPrice}/month</strong> will be billed through PayPal.</p>
                      <PayPalButton amount={PLANS[subscription.plan].monthlyPrice} planName={PLANS[subscription.plan].name} />
                    </div>
                  </div>
                </div>

                {/* Billing History */}
                <div className="glass-card rounded-xl p-5 border">
                  <h3 className="text-sm font-semibold mb-4">Billing History</h3>
                  <div className="space-y-2">
                    {[
                      { date: 'Jan 15, 2024', amount: '$0.00', status: 'Trial', invoice: 'NXA-001' },
                      { date: 'Dec 15, 2023', amount: '$0.00', status: 'Trial', invoice: 'NXA-000' },
                    ].map((bill, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3.5 py-2.5">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-foreground-muted/60">{bill.date}</span>
                          <span className="text-xs font-semibold">{bill.amount}</span>
                          <Badge variant="glass" size="sm">{bill.status}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-foreground-muted/40">{bill.invoice}</span>
                          <Button variant="ghost" size="sm" className="text-xs h-7">
                            <Download className="w-3 h-3 mr-1" />
                            PDF
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Danger zone */}
                <div className="glass-card rounded-xl p-5 border border-danger/10">
                  <h3 className="text-sm font-semibold text-danger mb-2">Cancel Subscription</h3>
                  <p className="text-xs text-foreground-muted/50 mb-3">Once cancelled, your subscription will end at the end of the current billing period. Your data will remain accessible for 30 days.</p>
                  <Button variant="outline" size="sm" className="text-danger border-danger/20 hover:bg-danger/5">
                    Cancel Subscription
                  </Button>
                </div>
              </motion.div>
            )}

            {/* === TEAM === */}
            {activeSection === 'team' && (
              <motion.div id="section-team" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Team Members</h2>
                  <Button variant="gradient" size="sm">
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    Invite Member
                  </Button>
                </div>
                <p className="text-sm text-foreground-muted/50">Manage who has access to your NEXORA AI workspace.</p>

                <div className="glass-card rounded-xl p-5 border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold">Current Members ({subscription.usage.teamMembersUsed})</h3>
                    <Badge variant="glass" size="sm">{PLANS[subscription.plan].usageLimits.teamMembers === Infinity ? 'Unlimited' : `${subscription.usage.teamMembersUsed}/${PLANS[subscription.plan].usageLimits.teamMembers} members`}</Badge>
                  </div>

                  <div className="space-y-2">
                    {[
                      { name: 'Sarah Chen', email: 'sarah@nexora.ai', role: 'Admin', status: 'active', initials: 'SC' },
                      { name: 'Alex Rivera', email: 'alex@nexora.ai', role: 'Member', status: 'invited', initials: 'AR' },
                    ].map((member, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-glass-border p-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/10 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">{member.initials}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{member.name}</span>
                              <Badge variant={member.role === 'Admin' ? 'accent' : 'glass'} size="sm">{member.role}</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-foreground-muted/40">
                              <span>{member.email}</span>
                              <Badge variant={member.status === 'active' ? 'accent' : 'warning'} size="sm" className="text-[9px]">{member.status === 'active' ? 'Active' : 'Invited'}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="text-xs h-7">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-xs h-7 text-danger">Remove</Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Upgrade prompt */}
                  {subscription.plan === 'starter' && (
                    <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-primary/[0.06] to-accent/[0.04] border border-primary/[0.08] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-xs text-foreground-muted/60">Need more seats? Upgrade to Growth for up to 10 team members.</span>
                      </div>
                      <Button variant="gradient" size="sm" className="text-xs h-8" onClick={() => openUpgrade('growth')}>
                        Upgrade
                      </Button>
                    </div>
                  )}
                </div>

                {/* Invite Flow */}
                <div className="glass-card rounded-xl p-5 border">
                  <h3 className="text-sm font-semibold mb-4">Invite Team Member</h3>
                  <div className="flex items-end gap-3">
                    <div className="flex-1 space-y-2">
                      <label className="text-xs font-medium text-foreground/80">Email Address</label>
                      <Input placeholder="colleague@company.com" />
                    </div>
                    <div className="w-40 space-y-2">
                      <label className="text-xs font-medium text-foreground/80">Role</label>
                      <Select options={[{ value: 'member', label: 'Member' }, { value: 'admin', label: 'Admin' }, { value: 'viewer', label: 'Viewer' }]} value="member" />
                    </div>
                    <Button variant="gradient" size="sm" className="h-10">
                      <Mail className="w-4 h-4 mr-1.5" />
                      Send Invite
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* === SECURITY === */}
            {activeSection === 'security' && (
              <motion.div id="section-security" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <h2 className="text-lg font-semibold">Security</h2>

                <div className="glass-card rounded-xl p-5 border">
                  <h3 className="text-sm font-semibold mb-4">Password</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-foreground/80">Current Password</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-foreground/80">New Password</label>
                      <Input type="password" placeholder="Enter new password" />
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button variant="gradient" size="sm">Update Password</Button>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-5 border">
                  <h3 className="text-sm font-semibold mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-glass-border p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Authenticator App</div>
                        <div className="text-xs text-foreground-muted/40">Add an extra layer of security to your account</div>
                      </div>
                    </div>
                    <Button variant="glass" size="sm">Enable</Button>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-5 border">
                  <h3 className="text-sm font-semibold mb-4">API Keys</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Production API Key', key: 'nxr_prod_••••••••••', created: '2 months ago', lastUsed: '2 hours ago' },
                      { name: 'Development API Key', key: 'nxr_dev_••••••••••', created: '3 months ago', lastUsed: '1 day ago' },
                    ].map((apiKey, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-glass-border p-3.5">
                        <div className="flex items-center gap-3">
                          <Key className="w-4 h-4 text-foreground-muted/40" />
                          <div>
                            <div className="text-sm font-medium">{apiKey.name}</div>
                            <div className="text-xs text-foreground-muted/40">
                              <code className="bg-white/[0.03] px-1.5 py-0.5 rounded text-[10px]">{apiKey.key}</code>
                              <span className="ml-2">Last used: {apiKey.lastUsed}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="text-xs h-7">
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs h-7 text-danger">Revoke</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="glass" size="sm" className="mt-3">
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    Generate New Key
                  </Button>
                </div>

                {/* Advanced security - Scale+ only */}
                {subscription.plan !== 'scale' && subscription.plan !== 'enterprise' && (
                  <div className="glass-card rounded-xl p-5 border border-primary/10 bg-gradient-to-r from-primary/[0.04] to-transparent">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold">Unlock Advanced Security</h3>
                        <p className="text-xs text-foreground-muted/50">SSO, audit logs, advanced compliance, and more are available on Scale and Enterprise plans.</p>
                      </div>
                      <Button variant="gradient" size="sm" onClick={() => openUpgrade()}>
                        <Unlock className="w-3.5 h-3.5 mr-1.5" />
                        Upgrade
                      </Button>
                    </div>
                  </div>
                )}

                <div className="glass-card rounded-xl p-5 border">
                  <h3 className="text-sm font-semibold mb-4">Active Sessions</h3>
                  <div className="space-y-2">
                    {[
                      { device: 'Chrome on macOS', location: 'San Francisco, CA', ip: '192.168.1.1', current: true },
                      { device: 'Safari on iPhone', location: 'San Francisco, CA', ip: '192.168.1.2', current: false },
                    ].map((session, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3.5 py-2.5">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-foreground/70">{session.device}</span>
                          <span className="text-[10px] text-foreground-muted/40">{session.location}</span>
                          <code className="text-[9px] bg-white/[0.03] px-1.5 py-0.5 rounded text-foreground-muted/30">{session.ip}</code>
                        </div>
                        <div className="flex items-center gap-2">
                          {session.current ? (
                            <Badge variant="accent" size="sm">Current</Badge>
                          ) : (
                            <Button variant="ghost" size="sm" className="text-xs h-7 text-danger">Revoke</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* === DATA SOURCES === */}
            {activeSection === 'datasources' && (
              <motion.div id="section-datasources" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Data Sources</h2>
                  <Badge variant="glass" size="sm">{subscription.usage.dataSourcesUsed}/{PLANS[subscription.plan].usageLimits.dataSources === Infinity ? '∞' : PLANS[subscription.plan].usageLimits.dataSources} connected</Badge>
                </div>
                <p className="text-sm text-foreground-muted/50">Connect your business tools and data sources to power NEXORA AI insights.</p>

                <div className="space-y-3">
                  {/* Connected sources */}
                  {[
                    { name: 'Stripe', type: 'Payment', status: 'connected', lastSync: '2 min ago', icon: CreditCard, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                    { name: 'Google Analytics', type: 'Analytics', status: 'connected', lastSync: '5 min ago', icon: BarChart3, color: 'text-warning', bg: 'bg-warning/10' },
                  ].map((source, i) => {
                    const Icon = source.icon
                    return (
                      <div key={i} className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-glass-border p-3.5">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", source.bg)}>
                            <Icon className={cn("w-5 h-5", source.color)} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{source.name}</span>
                              <span className="status-dot active" />
                            </div>
                            <div className="text-xs text-foreground-muted/40">
                              {source.type} · Synced {source.lastSync}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="text-xs h-7">
                            <RefreshCw className="w-3 h-3 mr-1" />
                            Sync
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs h-7 text-danger">Disconnect</Button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Available to connect */}
                <h3 className="text-sm font-semibold mt-5">Available Integrations</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: 'HubSpot', desc: 'CRM, contacts, deals', icon: Users, color: 'text-warning', bg: 'bg-warning/10' },
                    { name: 'Salesforce', desc: 'CRM, pipeline, forecasts', icon: Users, color: 'text-info', bg: 'bg-info/10' },
                    { name: 'QuickBooks', desc: 'Accounting, invoices', icon: Database, color: 'text-accent', bg: 'bg-accent/10' },
                    { name: 'Google Ads', desc: 'Ad campaigns, spend', icon: Target, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                    { name: 'Meta Ads', desc: 'Social campaigns, spend', icon: Shield, color: 'text-info', bg: 'bg-info/10' },
                    { name: 'Intercom', desc: 'Support, conversations', icon: Mail, color: 'text-primary', bg: 'bg-primary/10' },
                  ].map((integration, i) => {
                    const Icon = integration.icon
                    const isNearLimit = subscription.usage.dataSourcesUsed >= PLANS[subscription.plan].usageLimits.dataSources && PLANS[subscription.plan].usageLimits.dataSources !== Infinity
                    return (
                      <div key={i} className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-glass-border p-3.5 hover:bg-white/[0.03] transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", integration.bg)}>
                            <Icon className={cn("w-5 h-5", integration.color)} />
                          </div>
                          <div>
                            <div className="text-sm font-medium">{integration.name}</div>
                            <div className="text-xs text-foreground-muted/40">{integration.desc}</div>
                          </div>
                        </div>
                        <Button
                          variant="glass"
                          size="sm"
                          className="text-xs h-8"
                          onClick={() => isNearLimit ? openUpgrade('growth') : null}
                        >
                          {isNearLimit ? (
                            <span className="flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              Upgrade
                            </span>
                          ) : 'Connect'}
                        </Button>
                      </div>
                    )
                  })}
                </div>

                {/* Near limit warning */}
                {subscription.usage.dataSourcesUsed >= PLANS[subscription.plan].usageLimits.dataSources && PLANS[subscription.plan].usageLimits.dataSources !== Infinity && (
                  <div className="p-4 rounded-xl bg-warning/5 border border-warning/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-warning" />
                      <span className="text-xs text-foreground-muted/70">You&apos;ve reached your data source limit. Upgrade to connect more.</span>
                    </div>
                    <Button variant="gradient" size="sm" className="text-xs h-8" onClick={() => openUpgrade('growth')}>
                      <Unlock className="w-3 h-3 mr-1" />
                      Upgrade
                    </Button>
                  </div>
                )}
              </motion.div>
            )}

            {/* === NOTIFICATIONS === */}
            {activeSection === 'notifications' && (
              <motion.div id="section-notifications" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <h2 className="text-lg font-semibold">Notifications</h2>
                <div className="space-y-3">
                  {[
                    { label: 'Pipeline alerts', desc: 'When deals get stuck or need attention' },
                    { label: 'Churn risk alerts', desc: 'When customer health scores drop' },
                    { label: 'Report ready', desc: 'When AI generates new reports' },
                    { label: 'Revenue milestones', desc: 'When you hit revenue targets' },
                    { label: 'Risk detection', desc: 'When AI identifies business risks' },
                    { label: 'Usage warnings', desc: 'When approaching plan limits' },
                    { label: 'Billing updates', desc: 'Invoices, receipts, and plan changes' },
                  ].map((n) => (
                    <div key={n.label} className="flex items-center justify-between glass-card rounded-lg px-4 py-3 border">
                      <div>
                        <div className="text-sm text-foreground/80">{n.label}</div>
                        <div className="text-xs text-foreground/40">{n.desc}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={!n.label.includes('Billing')} />
                        <div className="w-9 h-5 bg-white/10 rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                      </label>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* === INTEGRATIONS === */}
            {activeSection === 'integrations' && (
              <motion.div id="section-integrations" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <h2 className="text-lg font-semibold">Integrations</h2>
                <p className="text-sm text-foreground-muted/50">Connect your favorite tools and services to extend NEXORA AI&apos;s capabilities.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: 'Slack', desc: 'Receive AI insights in Slack', connected: true },
                    { name: 'Google Drive', desc: 'Import and export reports', connected: true },
                    { name: 'Zapier', desc: 'Connect with 5000+ apps', connected: false },
                    { name: 'Notion', desc: 'Sync knowledge vault', connected: false },
                    { name: 'Make', desc: 'Advanced automation workflows', connected: false, upgrade: true },
                    { name: 'Webhooks', desc: 'Custom webhook endpoints', connected: false, upgrade: true },
                  ].map((integration, i) => (
                    <div key={i} className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-glass-border p-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-glass-border flex items-center justify-center">
                          <span className="text-xs font-bold text-foreground-muted/40">{integration.name.slice(0, 2).toUpperCase()}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{integration.name}</span>
                            {integration.upgrade && <Lock className="w-3 h-3 text-foreground-muted/30" />}
                          </div>
                          <div className="text-xs text-foreground-muted/40">{integration.desc}</div>
                        </div>
                      </div>
                      {integration.upgrade ? (
                        <Button variant="glass" size="sm" className="text-xs h-8" onClick={() => openUpgrade()}>
                          <Lock className="w-3 h-3 mr-1" />
                          Upgrade
                        </Button>
                      ) : integration.connected ? (
                        <Badge variant="accent" size="sm">Connected</Badge>
                      ) : (
                        <Button variant="glass" size="sm" className="text-xs h-8">Connect</Button>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* === APPEARANCE === */}
            {activeSection === 'appearance' && (
              <motion.div id="section-appearance" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <h2 className="text-lg font-semibold">Appearance</h2>

                <div className="glass-card rounded-xl p-5 border">
                  <h3 className="text-sm font-semibold mb-4">Theme</h3>
                  <div className="flex items-center gap-3">
                    {[
                      { id: 'dark', label: 'Dark', icon: Target },
                      { id: 'system', label: 'System', icon: RefreshCw },
                    ].map((theme) => {
                      const Icon = theme.icon
                      return (
                        <button
                          key={theme.id}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border",
                            theme.id === 'dark'
                              ? 'bg-primary/10 border-primary/30 text-primary'
                              : 'bg-transparent border-glass-border text-foreground/50 hover:text-foreground hover:border-primary/20'
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          {theme.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="glass-card rounded-xl p-5 border">
                  <h3 className="text-sm font-semibold mb-4">Dashboard Layout</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'default', label: 'Default', desc: 'Standard grid layout' },
                      { id: 'compact', label: 'Compact', desc: 'Denser information display' },
                      { id: 'expanded', label: 'Expanded', desc: 'More whitespace', upgrade: true },
                      { id: 'focus', label: 'Focus Mode', desc: 'Minimal distractions', upgrade: true },
                    ].map((layout) => (
                      <button
                        key={layout.id}
                        className={cn(
                          "flex items-center gap-3 rounded-xl p-3.5 text-left transition-all border",
                          layout.id === 'default'
                            ? 'bg-primary/5 border-primary/20'
                            : 'border-glass-border hover:bg-white/[0.02]',
                          layout.upgrade && 'opacity-40'
                        )}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{layout.label}</span>
                            {layout.upgrade && <Lock className="w-3 h-3 text-foreground-muted/30" />}
                          </div>
                          <div className="text-xs text-foreground-muted/40">{layout.desc}</div>
                        </div>
                        {layout.upgrade && (
                          <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => openUpgrade()}>
                            <Unlock className="w-3 h-3 mr-1" />
                            Get
                          </Button>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <UpgradeModal />
    </div>
  )
}
