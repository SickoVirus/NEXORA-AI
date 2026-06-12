'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useDemo, tourSteps } from '@/lib/demo-mode'
import { cn } from '@/lib/utils'
import { X, ChevronLeft, ChevronRight, Brain, Lightbulb, Layers, Swords, Zap, FileText, Users, Sparkles, Play } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  Brain, Lightbulb, Layers, Swords, Zap, FileText, Users, Sparkles,
}

export function ProductTour() {
  const { isDemo, tourActive, setTourActive, currentTourStep, setCurrentTourStep } = useDemo()
  const [visible, setVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (tourActive) {
      // Small delay for the badge animation
      const t = setTimeout(() => setVisible(true), 400)
      return () => clearTimeout(t)
    } else {
      setVisible(false)
    }
  }, [tourActive])

  const goToStep = useCallback((step: number) => {
    if (step < 0 || step >= tourSteps.length) {
      setTourActive(false)
      setCurrentTourStep(0)
      return
    }
    setCurrentTourStep(step)
    const route = tourSteps[step].route
    if (route) router.push(route)
  }, [router, setTourActive, setCurrentTourStep])

  const currentStep = tourSteps[currentTourStep] || tourSteps[0]
  const IconComponent = iconMap[currentStep.icon] || Lightbulb
  const progress = ((currentTourStep + 1) / tourSteps.length) * 100

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!tourActive || !visible) return
      if (e.key === 'Escape') { setTourActive(false); setCurrentTourStep(0) }
      if (e.key === 'ArrowRight') goToStep(currentTourStep + 1)
      if (e.key === 'ArrowLeft') goToStep(currentTourStep - 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [tourActive, visible, currentTourStep, goToStep, setTourActive, setCurrentTourStep])

  return (
    <AnimatePresence>
      {tourActive && visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] pointer-events-auto"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            onClick={() => { setTourActive(false); setCurrentTourStep(0) }}
          />

          {/* Tooltip card */}
          <motion.div
            key={currentTourStep}
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[480px] max-w-[90vw]"
          >
            <div className="relative bg-[#080c1a]/98 backdrop-blur-2xl rounded-2xl border border-primary/15 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(79,140,255,0.05)] overflow-hidden">
              {/* Top gradient bar */}
              <div className="h-0.5 bg-gradient-to-r from-primary via-secondary to-accent" style={{ width: `${progress}%`, transition: 'width 0.5s ease' }} />

              <div className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-md" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-semibold text-primary/60 uppercase tracking-wider">
                        Step {currentTourStep + 1} of {tourSteps.length}
                      </span>
                      <Badge className="text-[8px] bg-primary/10 text-primary/70 border-primary/20">
                        {Math.round(((currentTourStep + 1) / tourSteps.length) * 100)}%
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold text-foreground/90">{currentStep.title}</h3>
                    <p className="text-sm text-foreground-muted/60 mt-1 leading-relaxed">
                      {currentStep.description}
                    </p>
                  </div>

                  <button
                    onClick={() => { setTourActive(false); setCurrentTourStep(0) }}
                    className="w-8 h-8 rounded-xl hover:bg-white/[0.04] flex items-center justify-center text-foreground-muted/30 hover:text-foreground-muted transition-all shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress dots */}
                <div className="flex items-center gap-1.5">
                  {tourSteps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToStep(i)}
                      className={cn(
                        "h-1 rounded-full transition-all duration-300 cursor-pointer",
                        i === currentTourStep
                          ? "w-6 bg-gradient-to-r from-primary to-secondary"
                          : i < currentTourStep
                            ? "w-2 bg-primary/40"
                            : "w-2 bg-white/[0.08] hover:bg-white/[0.12]"
                      )}
                    />
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => goToStep(currentTourStep - 1)}
                      disabled={currentTourStep === 0}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-foreground-muted/50 hover:text-foreground-muted hover:bg-white/[0.04] transition-all disabled:opacity-20 disabled:cursor-not-allowed border border-transparent"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      Previous
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setTourActive(false); setCurrentTourStep(0) }}
                      className="px-3 py-1.5 rounded-xl text-xs text-foreground-muted/30 hover:text-foreground-muted/60 transition-all"
                    >
                      Skip Tour
                    </button>

                    {currentTourStep === tourSteps.length - 1 ? (
                      <button
                        onClick={() => { setTourActive(false); setCurrentTourStep(0) }}
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Complete Tour
                      </button>
                    ) : (
                      <button
                        onClick={() => goToStep(currentTourStep + 1)}
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all"
                      >
                        Next
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Keyboard shortcuts hint */}
              <div className="px-5 py-2 border-t border-[rgba(79,140,255,0.04)] bg-white/[0.01]">
                <div className="flex items-center justify-center gap-4">
                  <span className="text-[9px] text-foreground-muted/20 flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] font-mono text-[8px]">←</kbd>
                    <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] font-mono text-[8px]">→</kbd>
                    Navigate
                  </span>
                  <span className="text-[9px] text-foreground-muted/20 flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] font-mono text-[8px]">ESC</kbd>
                    Close
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Inline Badge component to avoid circular imports
function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium border", className)}>
      {children}
    </span>
  )
}
