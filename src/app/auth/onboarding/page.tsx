'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, Check, Building2, Users, Target, Wrench, Brain, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { industries, companySizes, goals, tools, aiPersonalities } from '@/lib/mock-data'

const steps = [
  { id: 'welcome', title: 'Welcome to NEXORA AI' },
  { id: 'company', title: 'Company Profile' },
  { id: 'industry', title: 'Industry' },
  { id: 'size', title: 'Team Size' },
  { id: 'goals', title: 'Your Goals' },
  { id: 'tools', title: 'Current Tools' },
  { id: 'personality', title: 'AI Personality' },
  { id: 'complete', title: 'You\'re Ready!' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [company, setCompany] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [selectedTools, setSelectedTools] = useState<string[]>([])
  const [selectedPersonality, setSelectedPersonality] = useState('')
  const totalSteps = steps.length

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id])
  }

  const toggleTool = (tool: string) => {
    setSelectedTools(prev => prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool])
  }

  const canProceed = () => {
    switch (step) {
      case 1: return company.trim().length > 0
      case 2: return selectedIndustry !== ''
      case 3: return selectedSize !== ''
      case 4: return selectedGoals.length > 0
      case 5: return selectedTools.length > 0
      case 6: return selectedPersonality !== ''
      default: return true
    }
  }

  const handleComplete = () => {
    router.push('/dashboard')
  }

  const progress = ((step + 1) / totalSteps) * 100

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-foreground/40 font-medium">Step {step + 1} of {totalSteps}</span>
            <span className="text-xs text-foreground/40 font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
            />
          </div>
        </div>

        {/* Steps container */}
        <div className="glass-panel rounded-2xl border border-glass-border p-8 lg:p-10">
          {/* Step dots */}
          <div className="flex items-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div
                key={s.id}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  i <= step ? 'bg-primary' : i === step + 1 ? 'bg-primary/30' : 'bg-white/10'
                )}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Welcome */}
            {step === 0 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-6"
              >
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold gradient-text">Welcome to NEXORA AI</h1>
                  <p className="text-foreground/60 max-w-md mx-auto">
                    Let's set up your AI Command Center. We'll tailor everything to your business so you can start making better decisions immediately.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                  {[
                    { icon: Brain, text: 'AI-Powered Insights' },
                    { icon: Target, text: 'Smart Strategies' },
                    { icon: Users, text: 'Customer Intelligence' },
                    { icon: Wrench, text: 'Auto Automation' },
                  ].map((item, i) => (
                    <div key={i} className="glass-card rounded-xl p-3 text-center">
                      <item.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                      <span className="text-xs text-foreground/70">{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Company */}
            {step === 1 && (
              <motion.div
                key="company"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 mb-2">
                  <Building2 className="w-8 h-8 text-primary" />
                  <div>
                    <h2 className="text-2xl font-bold">What's your company called?</h2>
                    <p className="text-sm text-foreground/50">We'll use this to personalize your experience</p>
                  </div>
                </div>
                <Input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g., Acme Corporation"
                  className="text-lg h-12"
                />
              </motion.div>
            )}

            {/* Industry */}
            {step === 2 && (
              <motion.div
                key="industry"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-1">What industry are you in?</h2>
                  <p className="text-sm text-foreground/50 mb-4">This helps us provide relevant insights</p>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-2">
                  {industries.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setSelectedIndustry(ind)}
                      className={cn(
                        "glass-card rounded-xl px-4 py-3 text-sm text-left transition-all",
                        selectedIndustry === ind
                          ? 'border-primary/40 bg-primary/10 text-primary'
                          : 'hover:border-primary/20'
                      )}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Size */}
            {step === 3 && (
              <motion.div
                key="size"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-1">How big is your team?</h2>
                  <p className="text-sm text-foreground/50 mb-4">Select your company size</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {companySizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "glass-card rounded-xl px-5 py-4 text-sm transition-all flex items-center gap-3",
                        selectedSize === size
                          ? 'border-primary/40 bg-primary/10 text-primary'
                          : 'hover:border-primary/20'
                      )}
                    >
                      <Users className={cn("w-5 h-5", selectedSize === size ? 'text-primary' : 'text-foreground/30')} />
                      {size}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Goals */}
            {step === 4 && (
              <motion.div
                key="goals"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-1">What are your main goals?</h2>
                  <p className="text-sm text-foreground/50 mb-4">Select all that apply</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {goals.map((goal) => {
                    const icons = {
                      sales: TrendingUpIcon,
                      costs: DollarIcon,
                      automate: ZapIcon,
                      marketing: MegaphoneIcon,
                      operations: SettingsIcon,
                      data: BarChartIcon,
                    }
                    const Icon = icons[goal.id as keyof typeof icons]
                    return (
                      <button
                        key={goal.id}
                        onClick={() => toggleGoal(goal.id)}
                        className={cn(
                          "glass-card rounded-xl px-5 py-4 text-sm transition-all flex items-center gap-3",
                          selectedGoals.includes(goal.id)
                            ? 'border-primary/40 bg-primary/10 text-primary'
                            : 'hover:border-primary/20'
                        )}
                      >
                        <Icon className={cn("w-5 h-5", selectedGoals.includes(goal.id) ? 'text-primary' : 'text-foreground/30')} />
                        <span>{goal.label}</span>
                        {selectedGoals.includes(goal.id) && (
                          <Check className="w-4 h-4 ml-auto text-primary" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Tools */}
            {step === 5 && (
              <motion.div
                key="tools"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-1">What tools do you currently use?</h2>
                  <p className="text-sm text-foreground/50 mb-4">Select all tools you use</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {tools.map((tool) => (
                    <button
                      key={tool}
                      onClick={() => toggleTool(tool)}
                      className={cn(
                        "glass-card rounded-xl px-4 py-3 text-sm transition-all flex items-center gap-2",
                        selectedTools.includes(tool)
                          ? 'border-primary/40 bg-primary/10 text-primary'
                          : 'hover:border-primary/20'
                      )}
                    >
                      <span className="flex-1">{tool}</span>
                      {selectedTools.includes(tool) && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* AI Personality */}
            {step === 6 && (
              <motion.div
                key="personality"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-1">Choose your AI personality</h2>
                  <p className="text-sm text-foreground/50 mb-4">How should your AI assistant behave?</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {aiPersonalities.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPersonality(p.id)}
                      className={cn(
                        "glass-card rounded-xl px-5 py-4 transition-all text-left",
                        selectedPersonality === p.id
                          ? 'border-primary/40 bg-primary/10'
                          : 'hover:border-primary/20'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Brain className={cn("w-5 h-5", selectedPersonality === p.id ? 'text-primary' : 'text-foreground/30')} />
                        <div>
                          <div className={cn(
                            "text-sm font-medium",
                            selectedPersonality === p.id ? 'text-primary' : 'text-foreground/80'
                          )}>
                            {p.label}
                          </div>
                          <div className="text-xs text-foreground/50">{p.description}</div>
                        </div>
                        {selectedPersonality === p.id && (
                          <Check className="w-4 h-4 ml-auto text-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Complete */}
            {step === 7 && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold gradient-text">You're All Set!</h1>
                  <p className="text-foreground/60 max-w-md mx-auto">
                    Your AI Command Center is ready. NEXORA AI is now configured for your business.
                  </p>
                </div>
                <div className="glass-card rounded-xl p-4 max-w-sm mx-auto text-left space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent" />
                    <span className="text-foreground/70">Company profile created</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent" />
                    <span className="text-foreground/70">Industry preferences set</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent" />
                    <span className="text-foreground/70">{selectedGoals.length} goals configured</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent" />
                    <span className="text-foreground/70">{selectedTools.length} tools connected</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent" />
                    <span className="text-foreground/70">AI personality: {aiPersonalities.find(p => p.id === selectedPersonality)?.label}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-glass-border">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              className={cn(
                "flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors",
                step === 0 && 'invisible'
              )}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            {step < totalSteps - 1 ? (
              <Button
                onClick={() => setStep(Math.min(totalSteps - 1, step + 1))}
                disabled={!canProceed()}
                variant="gradient"
                size="lg"
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                variant="gradient"
                size="lg"
              >
                Launch Command Center <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Inline icons
function TrendingUpIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
}

function DollarIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
}

function ZapIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
}

function MegaphoneIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>
}

function SettingsIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
}

function BarChartIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>
}
