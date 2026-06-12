'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useDemo } from '@/lib/demo-mode'
import { Sparkles, Play, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function DemoBadge() {
  const { isDemo, setDemoMode, setTourActive, tourActive } = useDemo()

  return (
    <AnimatePresence>
      {isDemo && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] pointer-events-auto"
        >
          <div className="flex items-center gap-2 bg-gradient-to-r from-primary/[0.15] via-primary/[0.08] to-secondary/[0.08] backdrop-blur-2xl rounded-2xl border border-primary/20 shadow-[0_0_30px_rgba(79,140,255,0.15)] px-4 py-2.5">
            {/* Animated glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 animate-pulse-glow pointer-events-none" />

            {/* Icon */}
            <div className="relative">
              <Sparkles className="w-4 h-4 text-primary" />
              <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary/30 blur-sm animate-pulse-glow" />
            </div>

            {/* Text */}
            <div className="flex items-center gap-2 relative">
              <span className="text-xs font-semibold text-primary/90">DEMO</span>
              <span className="text-[10px] text-foreground-muted/50">Atlas Growth Studio</span>

              <span className="divider-dot mx-0.5" />

              {/* Company quick stats */}
              <span className="text-[9px] text-foreground-muted/40 font-mono">
                $84.5K MRR · 34 Clients · 18% Growth
              </span>
            </div>

            {/* Tour button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setTourActive(!tourActive)
              }}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all border",
                tourActive
                  ? "bg-accent/20 border-accent/30 text-accent"
                  : "bg-white/[0.04] border-primary/10 text-foreground-muted/50 hover:text-foreground-muted hover:bg-white/[0.06]"
              )}
            >
              <Play className={cn("w-3 h-3", tourActive && "animate-pulse")} />
              {tourActive ? 'Tour Active' : 'Take Tour'}
            </button>

            {/* Divider */}
            <div className="w-px h-4 bg-white/[0.06]" />

            {/* End demo */}
            <button
              onClick={() => setDemoMode(false)}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] text-foreground-muted/30 hover:text-danger/70 hover:bg-danger/[0.06] transition-all border border-transparent hover:border-danger/20"
            >
              <X className="w-3 h-3" />
              End
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
