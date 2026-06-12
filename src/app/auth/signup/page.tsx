'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AIOrb } from '@/components/ui/ai-orb'

export default function SignupPage() {
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
            <h1 className="text-3xl font-bold">Create your account</h1>
            <p className="text-sm text-foreground/50">Start your free trial — no credit card needed</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">First name</label>
                <Input placeholder="Sarah" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Last name</label>
                <Input placeholder="Chen" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Company</label>
              <Input placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Work email</label>
              <Input type="email" placeholder="sarah@company.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
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
              Create Account <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <p className="text-xs text-foreground/40 text-center">
              By signing up, you agree to our{' '}
              <Link href="#" className="text-primary hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
            </p>
          </form>

          <div className="text-center">
            <p className="text-sm text-foreground/50">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary hover:text-primary-light font-medium transition-colors">
                Sign in
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
            <h2 className="text-2xl font-bold gradient-text">Turn Data into Decisions</h2>
            <p className="text-sm text-foreground/50 max-w-sm mx-auto">
              Join thousands of businesses using NEXORA AI to grow smarter, faster, and more efficiently.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
