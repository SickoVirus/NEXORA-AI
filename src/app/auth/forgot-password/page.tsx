'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowLeft, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary opacity-80" />
            <Sparkles className="relative w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold gradient-text">NEXORA</span>
            <span className="text-[10px] text-foreground/40 font-medium tracking-widest uppercase ml-1">AI</span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Reset password</h1>
          <p className="text-sm text-foreground/50">Enter your email and we'll send you a reset link</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
              <Input type="email" placeholder="sarah@company.com" className="pl-10" />
            </div>
          </div>

          <Button type="submit" variant="gradient" className="w-full h-12 text-base">
            Send Reset Link
          </Button>
        </form>

        <div className="text-center">
          <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
