'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { Topbar } from '@/components/layout/topbar'
import { CommandBar } from '@/components/layout/command-bar'
import { DemoProvider } from '@/lib/demo-mode'
import { SubscriptionProvider } from '@/lib/subscription-context'
import { DemoBadge } from '@/components/demo/demo-badge'
import { ProductTour } from '@/components/demo/product-tour'
import { TrialBanner } from '@/components/ui/trial-banner'
import { UpgradeModal } from '@/components/ui/upgrade-modal'
import { OnboardingChecklist, defaultSteps } from '@/components/ui/onboarding-checklist'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

function DashboardInner({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [onboardingDismissed, setOnboardingDismissed] = useState(false)
  const [onboardingSteps, setOnboardingSteps] = useState(defaultSteps)
  const pathname = usePathname()
  const router = useRouter()

  const handleOnboardingAction = (step: typeof defaultSteps[0]) => {
    setOnboardingSteps(prev =>
      prev.map(s => s.id === step.id ? { ...s, completed: true } : s)
    )
    router.push(step.actionLink)
  }

  // Show onboarding checklist on main dashboard pages
  const showOnboarding = !onboardingDismissed && !pathname.includes('settings') && !pathname.includes('pricing')

  return (
    <div className="min-h-screen bg-background">
      {/* Subtle background grid */}
      <div className="fixed inset-0 bg-grid-subtle pointer-events-none" />
      <div className="fixed inset-0 bg-dot-grid-dense opacity-30 pointer-events-none" />

      {/* Demo Badge - floating in center top */}
      <DemoBadge />

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-[280px] h-full"
            >
              <Sidebar />
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#080c1a]/80 backdrop-blur-sm flex items-center justify-center text-foreground-muted/50 hover:text-foreground-muted border border-[rgba(79,140,255,0.1)]"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="lg:pl-[264px] transition-all duration-300">
        <Topbar onMenuToggle={() => setMobileSidebarOpen(true)} />
        <main className="p-4 lg:p-6 min-h-[calc(100vh-4rem)]">
          {/* Trial Banner */}
          <div className="mb-4">
            <TrialBanner />
          </div>

          {/* Onboarding Checklist */}
          {showOnboarding && (
            <div className="mb-4 max-w-2xl">
              <OnboardingChecklist
                steps={onboardingSteps}
                onAction={handleOnboardingAction}
                onDismiss={() => setOnboardingDismissed(true)}
                compact
              />
            </div>
          )}

          {/* Page transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Product Tour overlay */}
      <ProductTour />

      {/* Global Upgrade Modal */}
      <UpgradeModal />

      {/* Global AI Command Bar */}
      <CommandBar />
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DemoProvider>
      <SubscriptionProvider>
        <DashboardInner>{children}</DashboardInner>
      </SubscriptionProvider>
    </DemoProvider>
  )
}
