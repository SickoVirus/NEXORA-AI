'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AIOrb } from '@/components/ui/ai-orb'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary opacity-80" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary blur-sm opacity-60" />
              <Sparkles className="relative w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold gradient-text">NEXORA</span>
              <span className="text-[10px] text-foreground/40 font-medium tracking-widest uppercase ml-1">AI</span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-sm text-foreground/50">Sign in to your command center</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Email</label>
              <Input type="email" placeholder="sarah@company.com" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground/80">Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-primary hover:text-primary-light transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="gradient" className="w-full h-12 text-base">
              Sign In <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-foreground/50">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-primary hover:text-primary-light font-medium transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right - Visual */}
      <div className="hidden lg:flex flex-1 bg-surface items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute inset-0 bg-dot-grid opacity-50" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative text-center"
        >
          <AIOrb size="xl" />
          <div className="mt-6 space-y-2">
            <h2 className="text-2xl font-bold gradient-text">Your AI Command Center</h2>
            <p className="text-sm text-foreground/50 max-w-sm mx-auto">
              Turn your scattered business data into clear AI-powered decisions, strategies, and automated actions.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
