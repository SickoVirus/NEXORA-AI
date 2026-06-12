'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

// ===== ATLAS GROWTH STUDIO — Demo Company =====

export const demoCompany = {
  name: 'Atlas Growth Studio',
  industry: 'Marketing Agency',
  teamSize: 18,
  mrr: 84500,
  arr: 1014000,
  pipelineValue: 212000,
  activeClients: 34,
  churnRisk: 12,
  monthlyGrowth: 18,
  marketingROI: 3.4,
  openTasks: 27,
  activeAutomations: 8,
}

export const demoMetrics = [
  { id: 'd1', label: 'Revenue', value: '$84,500', change: 18.2, trend: 'up' as const, icon: 'trending-up' },
  { id: 'd2', label: 'Sales Pipeline', value: '$212,000', change: 12.5, trend: 'up' as const, icon: 'layers' },
  { id: 'd3', label: 'Active Clients', value: '34', change: 8.3, trend: 'up' as const, icon: 'briefcase' },
  { id: 'd4', label: 'Conversion Rate', value: '22.4%', change: -3.1, trend: 'down' as const, icon: 'target' },
  { id: 'd5', label: 'Client Churn', value: '12%', change: -5.2, trend: 'down' as const, icon: 'users' },
  { id: 'd6', label: 'Monthly Growth', value: '18%', change: 4.6, trend: 'up' as const, icon: 'brain' },
]

export const demoInsights = [
  { id: 'd1', title: 'Highest-Value Deals Delayed After Proposal', category: 'sales' as const, priority: 'critical' as const, impact: 88, explanation: 'Your highest-value deals are delayed by an average of 9 days after proposal delivery. This friction is concentrated in the $15K+ segment where competitive pressure is highest. Each day of delay reduces close probability by 4%.', action: 'Implement a 3-touch executive follow-up sequence for all deals over $15K and assign senior team members to handle objections.', date: '2024-01-15' },
  { id: 'd2', title: 'SaaS Clients Generate 41% Higher Lifetime Value', category: 'strategic' as const, priority: 'high' as const, impact: 92, explanation: 'Clients from the SaaS segment generate 41% higher lifetime value than the average client. Their retention rate is 89% vs 74% average, and they upsell 2.3x more frequently. This segment represents a significant growth opportunity.', action: 'Create a dedicated SaaS client acquisition program with tailored case studies and ROI calculators for SaaS prospects.', date: '2024-01-14' },
  { id: 'd3', title: 'Meta Ads ROI Dropped From 3.8x to 2.4x', category: 'marketing' as const, priority: 'high' as const, impact: 76, explanation: 'Your Meta Ads ROI dropped from 3.8x to 2.4x this month. The decline correlates with a 40% increase in CPM and lower engagement rates on video creatives. Creative fatigue and audience saturation in the current targeting segments are the likely causes.', action: 'Refresh all ad creative with new messaging angles and expand audience targeting to 3 new lookalike segments based on highest-value clients.', date: '2024-01-13' },
  { id: 'd4', title: 'Three Clients Show Critical Churn Signals', category: 'customer' as const, priority: 'critical' as const, impact: 95, explanation: 'Three clients show churn risk due to reduced engagement. One client ($8.4K/month) has not logged in for 21 days. Two others have reduced service usage by 60%+. Combined at-risk revenue: $14,200/month.', action: 'Schedule emergency check-in calls with all three at-risk clients. Prepare customized value reports showing the ROI they have achieved.', date: '2024-01-12' },
  { id: 'd5', title: 'Reactivation Campaign Could Recover $12,400 Monthly', category: 'operational' as const, priority: 'medium' as const, impact: 72, explanation: 'A 2-step reactivation campaign could recover approximately $12,400 in monthly revenue from churned clients. Analysis shows 34% of churned clients were open to re-engagement within 60 days of leaving.', action: 'Launch a 2-touch reactivation sequence targeting all clients who churned in the last 90 days with personalized win-back offers.', date: '2024-01-11' },
  { id: 'd6', title: 'Google Ads Underfunded Despite Strong Performance', category: 'marketing' as const, priority: 'medium' as const, impact: 65, explanation: 'Google Search Ads are delivering 2.8x ROAS for branded terms but only 1.1x for non-branded. Budget allocation to non-branded campaigns could be optimized by shifting to high-intent long-tail keywords.', action: 'Restructure Google Ads account to prioritize branded and high-intent long-tail keywords. Pause low-performing broad match campaigns.', date: '2024-01-10' },
]

export const demoDeals = [
  { id: 'd1', company: 'VertuStack Inc.', value: 28000, probability: 25, stage: 'new' as const, aiRecommendation: 'Good product-market fit. Schedule discovery.', riskLevel: 'low' as const, nextAction: 'Send intro deck', contact: 'Marcus Webb', lastActivity: '4h ago' },
  { id: 'd2', company: 'Pulse Media Group', value: 42000, probability: 40, stage: 'contacted' as const, aiRecommendation: 'High urgency client. Move quickly.', riskLevel: 'low' as const, nextAction: 'Schedule demo call', contact: 'Elena Torres', lastActivity: '1d ago' },
  { id: 'd3', company: 'NorthWave SaaS', value: 55000, probability: 60, stage: 'qualified' as const, aiRecommendation: 'Strong strategic fit. Share case studies.', riskLevel: 'medium' as const, nextAction: 'Send 3 case studies', contact: 'James Kim', lastActivity: '2d ago' },
  { id: 'd4', company: 'CrestPoint Financial', value: 35000, probability: 70, stage: 'proposal' as const, aiRecommendation: 'Delayed 9 days. Follow up urgently.', riskLevel: 'high' as const, nextAction: 'Executive follow-up call', contact: 'Sarah Mitchell', lastActivity: '9d ago' },
  { id: 'd5', company: 'BrightLine Agency', value: 18000, probability: 75, stage: 'proposal' as const, aiRecommendation: 'Good fit but price sensitive. Offer flex terms.', riskLevel: 'medium' as const, nextAction: 'Send revised payment terms', contact: 'David Park', lastActivity: '5d ago' },
  { id: 'd6', company: 'OmniCore Health', value: 34000, probability: 85, stage: 'negotiation' as const, aiRecommendation: 'Ready to close. Send contract this week.', riskLevel: 'low' as const, nextAction: 'Send contract', contact: 'Dr. Lisa Chen', lastActivity: '1d ago' },
]

export const demoCustomers = [
  { id: 'd1', name: 'Marcus Webb', company: 'VertuStack Inc.', email: 'marcus@vertustack.io', healthScore: 88, revenuePotential: 28000, churnRisk: 'low' as const, lastInteraction: '4h ago', suggestedAction: 'Schedule quarterly review', industry: 'SaaS', deals: 2 },
  { id: 'd2', name: 'Elena Torres', company: 'Pulse Media Group', email: 'elena@pulsemedia.com', healthScore: 72, revenuePotential: 42000, churnRisk: 'medium' as const, lastInteraction: '1d ago', suggestedAction: 'Share performance report', industry: 'Media', deals: 1 },
  { id: 'd3', name: 'Dr. Lisa Chen', company: 'OmniCore Health', email: 'lchen@omicore.com', healthScore: 94, revenuePotential: 34000, churnRisk: 'low' as const, lastInteraction: '1d ago', suggestedAction: 'Upsell analytics package', industry: 'Healthcare', deals: 3 },
  { id: 'd4', name: 'James Kim', company: 'NorthWave SaaS', email: 'james@northwave.io', healthScore: 78, revenuePotential: 55000, churnRisk: 'low' as const, lastInteraction: '2d ago', suggestedAction: 'Schedule technical demo', industry: 'SaaS', deals: 2 },
  { id: 'd5', name: 'Sarah Mitchell', company: 'CrestPoint Financial', email: 'sarah@crestpoint.com', healthScore: 52, revenuePotential: 35000, churnRisk: 'high' as const, lastInteraction: '9d ago', suggestedAction: 'Executive intervention required', industry: 'Finance', deals: 1 },
  { id: 'd6', name: 'David Park', company: 'BrightLine Agency', email: 'david@brightline.agency', healthScore: 68, revenuePotential: 18000, churnRisk: 'medium' as const, lastInteraction: '5d ago', suggestedAction: 'Send renewal proposal', industry: 'Agency', deals: 1 },
]

export const demoNotifications = [
  { id: 'd1', title: 'Deal Alert', message: 'CrestPoint Financial proposal delayed 9 days — escalate', type: 'critical' as const, time: '2h ago', read: false },
  { id: 'd2', title: 'Churn Risk Detected', message: '3 clients showing critical engagement drops — $14.2K at risk', type: 'critical' as const, time: '3h ago', read: false },
  { id: 'd3', title: 'Report Ready', message: 'Weekly Performance Report for Atlas Growth Studio is ready', type: 'success' as const, time: '5h ago', read: false },
  { id: 'd4', title: 'Revenue Milestone', message: 'Monthly growth target 83% achieved — $84.5K MRR', type: 'info' as const, time: '1d ago', read: true },
  { id: 'd5', title: 'Marketing Alert', message: 'Meta Ads ROI dropped from 3.8x to 2.4x — investigate', type: 'warning' as const, time: '1d ago', read: true },
]

export const demoChartData = {
  revenue: [
    { month: 'Jul', value: 52000 }, { month: 'Aug', value: 58000 }, { month: 'Sep', value: 61200 },
    { month: 'Oct', value: 68000 }, { month: 'Nov', value: 74500 }, { month: 'Dec', value: 84500 },
  ],
  marketingChannels: [
    { name: 'Google Ads', value: 35, roi: 280 },
    { name: 'Meta Ads', value: 25, roi: 240 },
    { name: 'LinkedIn', value: 22, roi: 340 },
    { name: 'Email', value: 18, roi: 310 },
  ],
}

export const demoTasks = [
  { id: 'd1', title: 'Follow up with CrestPoint Financial proposal (delayed 9 days)', priority: 'urgent' as const, impact: 88, effort: 'low' as const, status: 'todo' as const, due: 'Today', category: 'sales' as const },
  { id: 'd2', title: 'Schedule emergency check-in with 3 at-risk clients', priority: 'urgent' as const, impact: 95, effort: 'medium' as const, status: 'todo' as const, due: 'Today', category: 'customer' as const },
  { id: 'd3', title: 'Refresh Meta Ads creative — swap 4 underperforming creatives', priority: 'high' as const, impact: 76, effort: 'medium' as const, status: 'in-progress' as const, due: 'Tomorrow', category: 'marketing' as const },
  { id: 'd4', title: 'Create SaaS client acquisition program proposal', priority: 'high' as const, impact: 92, effort: 'high' as const, status: 'todo' as const, due: 'This week', category: 'strategy' as const },
  { id: 'd5', title: 'Send OmniCore Health contract for signature', priority: 'high' as const, impact: 85, effort: 'low' as const, status: 'todo' as const, due: 'Tomorrow', category: 'sales' as const },
  { id: 'd6', title: 'Launch churned client reactivation campaign', priority: 'medium' as const, impact: 72, effort: 'medium' as const, status: 'todo' as const, due: 'This week', category: 'operations' as const },
  { id: 'd7', title: 'Review client performance reports — prepare top 10', priority: 'medium' as const, impact: 62, effort: 'medium' as const, status: 'in-progress' as const, due: 'This week', category: 'customer' as const },
  { id: 'd8', title: 'Prepare investor pitch deck with Q1 results', priority: 'high' as const, impact: 90, effort: 'high' as const, status: 'todo' as const, due: '3 days', category: 'executive' as const },
]

// ===== GUIDED TOUR STEPS =====

export interface TourStep {
  target: string
  title: string
  description: string
  icon: string
  route?: string
}

export const tourSteps: TourStep[] = [
  { target: '#ai-health-score', title: 'AI Business Health Score', description: 'Your real-time business health score powered by AI. It analyzes 12+ data points across revenue, clients, pipeline, and operations to give you a single, actionable number.', icon: 'Brain', route: '/dashboard' },
  { target: '#ai-insights', title: 'AI Recommendations', description: 'AI-powered insights that detect risks, find opportunities, and recommend actions. Each insight includes impact scoring, diagnosis, and suggested automation.', icon: 'Lightbulb', route: '/dashboard' },
  { target: '#neural-map', title: 'Business Neural Map', description: 'An interactive map of your entire business as an interconnected AI-powered system. Click any node — Revenue, Clients, Cash Flow, Risks — to see deep analysis and actions.', icon: 'Network', route: '/dashboard/neural-map' },
  { target: '#war-room', title: 'AI War Room', description: 'A focused crisis management workspace. Select any urgent business problem and NEXORA AI generates a complete action plan with root causes, scripts, KPIs, and 30-day roadmap.', icon: 'Swords', route: '/dashboard/war-room' },
  { target: '#strategy-studio', title: 'Strategy Studio', description: 'Generate AI-powered business strategies with specific KPIs, budgets, and action plans. Choose growth, sales, or marketing strategies with configurable aggressiveness.', icon: 'Brain', route: '/dashboard/strategy-studio' },
  { target: '#automation-lab', title: 'Automation Lab', description: 'Visual workflow builder for AI automations. Set triggers, actions, and outputs. Monitor runs, time saved, and automation coverage across your business.', icon: 'Zap', route: '/dashboard/automation-lab' },
  { target: '#reports', title: 'Reports', description: 'AI-generated executive, monthly, and quarterly reports. Each report contains strategic analysis, key metrics, risk assessment, and actionable recommendations.', icon: 'FileText', route: '/dashboard/reports' },
  { target: '#customers', title: 'CRM Intelligence', description: 'AI-powered CRM with health scores, churn risk detection, sentiment analysis, and smart recommendations for every client. Prioritize accounts that need attention.', icon: 'Users', route: '/dashboard/customers' },
]

// ===== DEMO MODE CONTEXT =====

interface DemoContextType {
  demoMode: boolean
  setDemoMode: (value: boolean) => void
  tourActive: boolean
  setTourActive: (value: boolean) => void
  currentTourStep: number
  setCurrentTourStep: (value: number) => void
  isDemo: boolean
}

const DemoContext = createContext<DemoContextType>({
  demoMode: false,
  setDemoMode: () => {},
  tourActive: false,
  setTourActive: () => {},
  currentTourStep: 0,
  setCurrentTourStep: () => {},
  isDemo: false,
})

export function DemoProvider({ children }: { children: ReactNode }) {
  const [demoMode, setDemoMode] = useState(false)
  const [tourActive, setTourActive] = useState(false)
  const [currentTourStep, setCurrentTourStep] = useState(0)

  // Persist demo mode
  useEffect(() => {
    const stored = localStorage.getItem('nexora-demo-mode')
    if (stored === 'true') setDemoMode(true)
  }, [])

  const setDemoModeWithStorage = useCallback((value: boolean) => {
    setDemoMode(value)
    localStorage.setItem('nexora-demo-mode', value ? 'true' : 'false')
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('nexora-demo-change', { detail: { demoMode: value } }))
    }
  }, [])

  return (
    <DemoContext.Provider
      value={{
        demoMode,
        setDemoMode: setDemoModeWithStorage,
        tourActive,
        setTourActive,
        currentTourStep,
        setCurrentTourStep,
        isDemo: demoMode,
      }}
    >
      {children}
    </DemoContext.Provider>
  )
}

export function useDemo() {
  return useContext(DemoContext)
}

// ===== DEMO DATA SELECTION HOOK =====
// Pages call useDemoData() to check if demo is active
// and conditionally use demo data vs mock data

export function useDemoData() {
  const { isDemo } = useDemo()
  return { isDemo }
}
