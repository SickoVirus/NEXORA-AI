// ===== NEXORA AI — Plans & Monetization System =====

export type PlanTier = 'starter' | 'growth' | 'scale' | 'enterprise'

export type BillingCycle = 'monthly' | 'annual'

export interface PlanFeature {
  label: string
  included: boolean
  limit?: string
  highlighted?: boolean
}

export interface Plan {
  id: PlanTier
  name: string
  tagline: string
  monthlyPrice: number
  annualPrice: number
  annualSavings: number
  popular?: boolean
  features: PlanFeature[]
  usageLimits: UsageLimits
  cta: string
  color: string
}

export interface UsageLimits {
  dataSources: number
  aiReportsPerMonth: number
  aiInsightsPerWeek: number
  automations: number
  teamMembers: number
  customDashboards: boolean
  advancedIntegrations: boolean
  neuralMap: boolean
  warRoom: boolean
  strategyStudio: boolean
  crmIntelligence: boolean
  advancedSecurity: boolean
  prioritySupport: boolean
  customAiModels: boolean
  ssoEnabled: boolean
}

export type FeatureKey = keyof UsageLimits

export const PLANS: Record<PlanTier, Plan> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    tagline: 'For solo founders and small teams',
    monthlyPrice: 29,
    annualPrice: 290,
    annualSavings: 58,
    features: [
      { label: 'AI Command Center', included: true },
      { label: 'Data Sources', included: true, limit: '3 sources', highlighted: true },
      { label: 'AI Reports', included: true, limit: '5/month' },
      { label: 'AI Insights', included: true, limit: '10/week' },
      { label: 'Automations', included: true, limit: '3 automations' },
      { label: 'Team Members', included: true, limit: '2 members' },
      { label: 'CRM Intelligence', included: false },
      { label: 'Strategy Studio', included: false },
      { label: 'Business Neural Map', included: false },
      { label: 'AI War Room', included: false },
      { label: 'Advanced Integrations', included: false },
      { label: 'Custom Dashboards', included: false },
      { label: 'Priority Support', included: false },
    ],
    usageLimits: {
      dataSources: 3,
      aiReportsPerMonth: 5,
      aiInsightsPerWeek: 10,
      automations: 3,
      teamMembers: 2,
      customDashboards: false,
      advancedIntegrations: false,
      neuralMap: false,
      warRoom: false,
      strategyStudio: false,
      crmIntelligence: false,
      advancedSecurity: false,
      prioritySupport: false,
      customAiModels: false,
      ssoEnabled: false,
    },
    cta: 'Start Free Trial',
    color: 'from-primary/10 to-primary/5',
  },
  growth: {
    id: 'growth',
    name: 'Growth',
    tagline: 'For growing teams',
    monthlyPrice: 99,
    annualPrice: 990,
    annualSavings: 198,
    popular: true,
    features: [
      { label: 'AI Command Center', included: true },
      { label: 'Unlimited AI Insights', included: true, highlighted: true },
      { label: 'AI Reports', included: true, limit: '25/month' },
      { label: 'Automations', included: true, limit: '25 automations' },
      { label: 'CRM Intelligence', included: true, highlighted: true },
      { label: 'Strategy Studio', included: true },
      { label: 'Business Neural Map', included: true },
      { label: 'Team Workspace', included: true, limit: '10 members' },
      { label: 'Data Sources', included: true, limit: '10 sources' },
      { label: 'AI War Room', included: false },
      { label: 'Advanced Integrations', included: false },
      { label: 'Custom Dashboards', included: false },
      { label: 'Priority Support', included: false },
    ],
    usageLimits: {
      dataSources: 10,
      aiReportsPerMonth: 25,
      aiInsightsPerWeek: Infinity,
      automations: 25,
      teamMembers: 10,
      customDashboards: false,
      advancedIntegrations: false,
      neuralMap: true,
      warRoom: false,
      strategyStudio: true,
      crmIntelligence: true,
      advancedSecurity: false,
      prioritySupport: false,
      customAiModels: false,
      ssoEnabled: false,
    },
    cta: 'Start Free Trial',
    color: 'from-primary/20 to-secondary/10',
  },
  scale: {
    id: 'scale',
    name: 'Scale',
    tagline: 'For serious businesses',
    monthlyPrice: 249,
    annualPrice: 2490,
    annualSavings: 498,
    features: [
      { label: 'Everything in Growth', included: true, highlighted: true },
      { label: 'Unlimited AI Reports', included: true },
      { label: 'Unlimited Automations', included: true },
      { label: 'AI War Room', included: true, highlighted: true },
      { label: 'Advanced Integrations', included: true },
      { label: 'Custom Dashboards', included: true },
      { label: 'Priority Support', included: true },
      { label: 'Advanced Security & Compliance', included: true },
      { label: 'Team Members', included: true, limit: 'Unlimited' },
      { label: 'Data Sources', included: true, limit: 'Unlimited' },
      { label: 'Custom AI Models', included: false },
      { label: 'SSO', included: false },
    ],
    usageLimits: {
      dataSources: Infinity,
      aiReportsPerMonth: Infinity,
      aiInsightsPerWeek: Infinity,
      automations: Infinity,
      teamMembers: Infinity,
      customDashboards: true,
      advancedIntegrations: true,
      neuralMap: true,
      warRoom: true,
      strategyStudio: true,
      crmIntelligence: true,
      advancedSecurity: true,
      prioritySupport: true,
      customAiModels: false,
      ssoEnabled: false,
    },
    cta: 'Start Free Trial',
    color: 'from-primary/20 to-accent/10',
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For larger organizations',
    monthlyPrice: 0,
    annualPrice: 0,
    annualSavings: 0,
    features: [
      { label: 'Everything in Scale', included: true, highlighted: true },
      { label: 'Custom AI Models', included: true },
      { label: 'Dedicated Onboarding', included: true },
      { label: 'Advanced Permissions', included: true },
      { label: 'SSO / SAML', included: true },
      { label: 'Custom Integrations', included: true },
      { label: 'Dedicated Success Manager', included: true },
      { label: 'SLA Guarantee', included: true },
      { label: 'Custom Contracts', included: true },
      { label: 'White-label Options', included: true },
      { label: 'On-premise Deployment', included: true },
    ],
    usageLimits: {
      dataSources: Infinity,
      aiReportsPerMonth: Infinity,
      aiInsightsPerWeek: Infinity,
      automations: Infinity,
      teamMembers: Infinity,
      customDashboards: true,
      advancedIntegrations: true,
      neuralMap: true,
      warRoom: true,
      strategyStudio: true,
      crmIntelligence: true,
      advancedSecurity: true,
      prioritySupport: true,
      customAiModels: true,
      ssoEnabled: true,
    },
    cta: 'Contact Sales',
    color: 'from-accent/20 to-primary/10',
  },
}

// ===== USAGE STATE =====

export interface UsageState {
  dataSourcesUsed: number
  aiReportsUsed: number
  aiInsightsUsed: number
  automationsUsed: number
  teamMembersUsed: number
}

export function getDefaultUsage(): UsageState {
  return {
    dataSourcesUsed: 2,
    aiReportsUsed: 3,
    aiInsightsUsed: 7,
    automationsUsed: 2,
    teamMembersUsed: 1,
  }
}

// ===== SUBSCRIPTION STATE =====

export interface SubscriptionState {
  plan: PlanTier
  billingCycle: BillingCycle
  status: 'trial' | 'active' | 'past_due' | 'cancelled'
  trialDaysRemaining: number
  trialTotalDays: number
  usage: UsageState
  nextBillingDate: string
  memberSince: string
}

export function getDefaultSubscription(): SubscriptionState {
  return {
    plan: 'starter',
    billingCycle: 'monthly',
    status: 'trial',
    trialDaysRemaining: 11,
    trialTotalDays: 14,
    usage: getDefaultUsage(),
    nextBillingDate: '2024-02-15',
    memberSince: '2024-01-15',
  }
}

// ===== FEATURE KEY TO USAGE STATE MAPPING =====
// Maps UsageLimits feature keys that have numeric limits to the corresponding UsageState keys

const USAGE_FEATURES: Partial<Record<FeatureKey, keyof UsageState>> = {
  dataSources: 'dataSourcesUsed',
  aiReportsPerMonth: 'aiReportsUsed',
  aiInsightsPerWeek: 'aiInsightsUsed',
  automations: 'automationsUsed',
  teamMembers: 'teamMembersUsed',
}

export function getUsageFromFeature(usage: UsageState, feature: FeatureKey): number {
  const key = USAGE_FEATURES[feature]
  if (!key) return 0
  return usage[key]
}

// ===== UTILITY FUNCTIONS =====

export function getPlan(planTier: PlanTier): Plan {
  return PLANS[planTier]
}

export function getPlanPrice(plan: Plan, cycle: BillingCycle): number {
  return cycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice
}

export function isFeatureAvailable(
  planTier: PlanTier,
  feature: FeatureKey
): boolean {
  const plan = PLANS[planTier]
  return plan.usageLimits[feature] !== false && plan.usageLimits[feature] !== 0
}

export function getFeatureLimit(
  planTier: PlanTier,
  feature: FeatureKey
): number | boolean | 'Infinity' {
  return PLANS[planTier].usageLimits[feature]
}

export function isUsageExceeded(
  planTier: PlanTier,
  feature: FeatureKey,
  used: number
): boolean {
  const limit = PLANS[planTier].usageLimits[feature]
  if (limit === Infinity) return false
  if (typeof limit === 'boolean') return !limit
  return used >= limit
}

export function getUsagePercent(
  planTier: PlanTier,
  feature: FeatureKey,
  used: number
): number {
  const limit = PLANS[planTier].usageLimits[feature]
  if (limit === Infinity) return 0
  if (typeof limit === 'boolean') return limit ? 0 : 100
  return Math.min(Math.round((used / limit) * 100), 100)
}

export function getNextPlan(current: PlanTier): PlanTier | null {
  const tiers: PlanTier[] = ['starter', 'growth', 'scale', 'enterprise']
  const idx = tiers.indexOf(current)
  return idx < tiers.length - 1 ? tiers[idx + 1] : null
}

// ===== FEATURE-TO-PLAN MAPPING =====

export interface FeatureInfo {
  key: FeatureKey
  label: string
  description: string
  requiredPlan: PlanTier
  icon: string
}

export const FEATURE_GATES: Record<string, FeatureInfo> = {
  neuralMap: {
    key: 'neuralMap',
    label: 'Business Neural Map',
    description: 'Interactive AI-powered map of your business as an interconnected system',
    requiredPlan: 'growth',
    icon: 'Network',
  },
  strategyStudio: {
    key: 'strategyStudio',
    label: 'Strategy Studio',
    description: 'Generate AI-powered business strategies with KPIs and budgets',
    requiredPlan: 'growth',
    icon: 'Brain',
  },
  crmIntelligence: {
    key: 'crmIntelligence',
    label: 'CRM Intelligence',
    description: 'AI-powered CRM with health scores and churn detection',
    requiredPlan: 'growth',
    icon: 'Users',
  },
  warRoom: {
    key: 'warRoom',
    label: 'AI War Room',
    description: 'Focused crisis management workspace with complete action plans',
    requiredPlan: 'scale',
    icon: 'Swords',
  },
  advancedIntegrations: {
    key: 'advancedIntegrations',
    label: 'Advanced Integrations',
    description: 'Connect with advanced tools and APIs',
    requiredPlan: 'scale',
    icon: 'Puzzle',
  },
  customDashboards: {
    key: 'customDashboards',
    label: 'Custom Dashboards',
    description: 'Build and customize your own dashboards',
    requiredPlan: 'scale',
    icon: 'LayoutDashboard',
  },
  advancedSecurity: {
    key: 'advancedSecurity',
    label: 'Advanced Security',
    description: 'SSO, audit logs, and advanced compliance',
    requiredPlan: 'scale',
    icon: 'Shield',
  },
}
