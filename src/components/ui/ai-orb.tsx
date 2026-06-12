'use client'

import { cn } from "@/lib/utils"

interface AIOrbProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  pulsing?: boolean
}

export function AIOrb({ size = 'md', className, pulsing = true }: AIOrbProps) {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  }

  return (
    <div className={cn("relative flex items-center justify-center", sizes[size], className)}>
      {/* Outermost ambient glow */}
      <div className={cn(
        "absolute inset-0 rounded-full",
        "bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/5",
        "blur-2xl",
        pulsing && "animate-pulse-glow"
      )} style={{ animationDuration: '4s' }} />

      {/* Orbit ring 1 - outer */}
      <div className={cn(
        "absolute inset-1 rounded-full",
        "border border-primary/10",
        pulsing && "animate-spin-slow"
      )}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/30 blur-sm" />
      </div>

      {/* Orbit ring 2 - middle */}
      <div className={cn(
        "absolute inset-3 rounded-full",
        "border border-secondary/15",
        pulsing && "animate-spin-slow"
      )} style={{ animationDirection: 'reverse', animationDuration: '10s' }}>
        <div className="absolute top-1/2 -right-1 w-1.5 h-1.5 rounded-full bg-secondary/40 blur-sm" />
      </div>

      {/* Orbit ring 3 - inner */}
      <div className={cn(
        "absolute inset-5 rounded-full",
        "border border-accent/20",
        pulsing && "animate-spin-slow"
      )} style={{ animationDuration: '6s' }}>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent/40 blur-sm" />
      </div>

      {/* Core glow */}
      <div className={cn(
        "absolute w-[45%] h-[45%] rounded-full",
        "bg-gradient-to-br from-primary via-secondary to-accent",
        "shadow-[0_0_30px_rgba(79,140,255,0.3),0_0_60px_rgba(139,92,246,0.15),0_0_100px_rgba(6,214,160,0.08)]",
        pulsing && "animate-breathe"
      )} />

      {/* Inner core */}
      <div className={cn(
        "absolute w-[30%] h-[30%] rounded-full",
        "bg-gradient-to-br from-white/50 to-white/5",
        "top-[28%] left-[28%]"
      )} />

      {/* Center dot */}
      <div className="absolute w-[12%] h-[12%] rounded-full bg-white/60 blur-[1px]" />
    </div>
  )
}
