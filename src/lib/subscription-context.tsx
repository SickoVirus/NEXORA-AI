'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { PlanTier, BillingCycle, SubscriptionState, UsageState } from './plans'
import { getDefaultSubscription, PLANS, isFeatureAvailable, isUsageExceeded, getUsagePercent, getUsageFromFeature, getNextPlan, type FeatureKey } from './plans'

interface SubscriptionContextType {
  subscription: SubscriptionState
  isLoading: boolean
  upgradeModalOpen: boolean
  setUpgradeModalOpen: (open: boolean) => void
  upgradeTargetPlan: PlanTier | null
  setUpgradeTargetPlan: (plan: PlanTier | null) => void
  openUpgrade: (plan?: PlanTier) => void
  changePlan: (plan: PlanTier) => void
  changeBillingCycle: (cycle: BillingCycle) => void
  isFeatureAvailable: (feature: FeatureKey) => boolean
  isUsageExceeded: (feature: FeatureKey) => boolean
  getUsagePercent: (feature: FeatureKey) => number
  getCurrentPlan: () => typeof PLANS[PlanTier]
  getNextPlanName: () => string | null
  checkFeatureAccess: (feature: FeatureKey) => { available: boolean; requiredPlan: string; reason: string }
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null)

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscription, setSubscription] = useState<SubscriptionState>(getDefaultSubscription)
  const [isLoading, setIsLoading] = useState(false)
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false)
  const [upgradeTargetPlan, setUpgradeTargetPlan] = useState<PlanTier | null>(null)

  const openUpgrade = useCallback((plan?: PlanTier) => {
    if (plan) setUpgradeTargetPlan(plan)
    setUpgradeModalOpen(true)
  }, [])

  const changePlan = useCallback((plan: PlanTier) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setSubscription(prev => ({
        ...prev,
        plan,
        status: plan === 'enterprise' ? 'trial' : 'active',
        trialDaysRemaining: 0,
        trialTotalDays: 14,
      }))
      setIsLoading(false)
    }, 800)
  }, [])

  const changeBillingCycle = useCallback((cycle: BillingCycle) => {
    setSubscription(prev => ({ ...prev, billingCycle: cycle }))
  }, [])

  const checkFeatureAccess = useCallback((feature: FeatureKey) => {
    const available = isFeatureAvailable(subscription.plan, feature)
    const nextPlan = getNextPlan(subscription.plan)
    const planName = nextPlan ? PLANS[nextPlan].name : 'Enterprise'
    return {
      available,
      requiredPlan: planName,
      reason: available ? '' : `Available on ${planName} plan and above`,
    }
  }, [subscription.plan])

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        isLoading,
        upgradeModalOpen,
        setUpgradeModalOpen,
        upgradeTargetPlan,
        setUpgradeTargetPlan,
        openUpgrade,
        changePlan,
        changeBillingCycle,
        isFeatureAvailable: (feature: FeatureKey) => isFeatureAvailable(subscription.plan, feature),
        isUsageExceeded: (feature: FeatureKey) => isUsageExceeded(subscription.plan, feature, getUsageFromFeature(subscription.usage, feature)),
        getUsagePercent: (feature: FeatureKey) => getUsagePercent(subscription.plan, feature, getUsageFromFeature(subscription.usage, feature)),
        getCurrentPlan: () => PLANS[subscription.plan],
        getNextPlanName: () => getNextPlan(subscription.plan) ? PLANS[getNextPlan(subscription.plan)!].name : null,
        checkFeatureAccess,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider')
  }
  return context
}
