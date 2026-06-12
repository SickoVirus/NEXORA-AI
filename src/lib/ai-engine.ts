/**
 * NEXORA AI Engine — Premium Business AI Response System
 * 
 * This engine simulates a world-class AI business consultant that provides
 * structured, realistic, and strategic responses to business queries.
 * Supports 6 AI tones and generates responses matching each tone's personality.
 */

export type AITone = 'strategic' | 'analytical' | 'aggressive' | 'conservative' | 'creative' | 'executive-summary'

export interface AIResponse {
  executiveSummary: string
  keyDiagnosis: string
  businessImpact: string
  recommendedActions: { action: string; priority: 'critical' | 'high' | 'medium'; time: string }[]
  suggestedAutomation: string
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  confidenceScore: number
  nextBestStep: string
  tone: AITone
}

const toneConfig: Record<AITone, { prefix: string; style: string; riskMultiplier: number; confidenceDelta: number }> = {
  'strategic': {
    prefix: 'Strategic Analysis',
    style: 'Long-term thinking with balanced, comprehensive recommendations focused on sustainable growth.',
    riskMultiplier: 1,
    confidenceDelta: 0,
  },
  'analytical': {
    prefix: 'Data-Driven Analysis',
    style: 'Detailed quantitative breakdown with specific metrics, benchmarks, and data-backed conclusions.',
    riskMultiplier: 1.1,
    confidenceDelta: 3,
  },
  'aggressive': {
    prefix: 'Growth-First Analysis',
    style: 'Bold, aggressive recommendations prioritizing rapid growth and market capture. Higher risk tolerance.',
    riskMultiplier: 1.3,
    confidenceDelta: -2,
  },
  'conservative': {
    prefix: 'Risk-Aware Analysis',
    style: 'Cautious recommendations prioritizing stability, risk mitigation, and proven methods.',
    riskMultiplier: 0.8,
    confidenceDelta: 2,
  },
  'creative': {
    prefix: 'Innovative Analysis',
    style: 'Creative, unconventional approaches with innovative solutions and out-of-the-box thinking.',
    riskMultiplier: 1.2,
    confidenceDelta: -1,
  },
  'executive-summary': {
    prefix: 'Executive Briefing',
    style: 'Ultra-concise, high-level summary focused on bottom-line impact and key decisions only.',
    riskMultiplier: 1,
    confidenceDelta: 0,
  },
}

// ===== REALISTIC BUSINESS SCENARIOS =====

const scenarios: Record<string, (tone: AITone) => AIResponse> = {
  'sales-analysis': (tone) => ({
    executiveSummary: 'Your sales pipeline shows strong top-of-funnel activity but significant friction in the middle stages. Revenue is growing 12.5% YoY, but profit margins are compressing 2.3% due to increased customer acquisition costs.',
    keyDiagnosis: 'Revenue is growing ($284.5K MRR, +12.5%), but profit margin is decreasing due to CAC rising 18% while deal velocity has slowed 23%. Enterprise segment (34% QoQ growth) is outperforming mid-market (-2% growth). 42% of pipeline value ($374K) is stuck in Proposal stage for 14+ days.',
    businessImpact: 'If pipeline friction persists, Q2 revenue projection drops from $892K to an estimated $640K (-28%). Each day of delay in the Proposal stage reduces close probability by 4%. Current trajectory suggests $180K in potentially lost revenue this quarter.',
    recommendedActions: [
      { action: 'Implement 3-touch automated follow-up sequence for all proposals pending >7 days', priority: 'critical', time: 'Today' },
      { action: 'Prioritize 8 high-value deals ($374K total) in Proposal stage with executive involvement', priority: 'critical', time: 'Today' },
      { action: 'Shift 20% of SDR capacity from mid-market to enterprise outbound', priority: 'high', time: 'This week' },
      { action: 'Deploy AI lead scoring to prioritize inbound leads with >70% propensity to buy', priority: 'medium', time: 'This week' },
    ],
    suggestedAutomation: 'Create automated pipeline health monitoring that alerts when deals stagnate in any stage for >7 days, with auto-generated follow-up tasks for sales reps.',
    riskLevel: 'high',
    confidenceScore: 94 + toneConfig[tone].confidenceDelta,
    nextBestStep: 'Audit the 8 stuck deals in Proposal stage today. Send personalized follow-ups from senior leadership. Set up pipeline automation by end of week.',
    tone,
  }),

  'growth-strategy': (tone) => ({
    executiveSummary: 'Your business has strong fundamentals with clear growth levers in enterprise expansion, pricing optimization, and channel reallocation. The most impactful move is increasing enterprise focus while fixing pricing below market average.',
    keyDiagnosis: 'Enterprise segment growing 34% QoQ but only 22% of customer base. LinkedIn Ads delivering 312% ROI but underfunded at 18% of budget. Pricing is 15% below market average — recent 8% test price increase showed 22% conversion improvement without churn increase.',
    businessImpact: 'Capturing enterprise opportunity alone could add $340K in annual revenue. Pricing optimization (12% increase for new customers) could add $185K ARR. Combined, these initiatives could drive 40% MRR growth within 6 months.',
    recommendedActions: [
      { action: 'Implement 12% price increase for new customers with 30-day grandfather period for existing', priority: 'critical', time: 'This week' },
      { action: 'Launch enterprise LinkedIn campaign with $12K/month budget allocation', priority: 'high', time: 'This week' },
      { action: 'Build AI-powered demo personalization engine to improve enterprise conversion', priority: 'high', time: '2 weeks' },
      { action: 'Create enterprise onboarding track reducing time-to-value from 23 to 14 days', priority: 'medium', time: '30 days' },
    ],
    suggestedAutomation: 'Auto-optimize marketing channel budget allocation based on real-time ROI data, shifting funds to highest-performing channels weekly.',
    riskLevel: 'medium',
    confidenceScore: 87 + toneConfig[tone].confidenceDelta,
    nextBestStep: 'Implement the pricing increase immediately — it has the highest impact-to-effort ratio and requires no technical development.',
    tone,
  }),

  'risk-detection': (tone) => ({
    executiveSummary: 'Three critical risks require immediate attention: top accounts showing churn signals ($84K/month at risk), cash flow bottleneck from slow collections ($127K tied up), and pipeline stagnation in Proposal stage ($374K stuck).',
    keyDiagnosis: 'Top 5 accounts show 55% reduced engagement (support tickets -40%, logins -55%, feature usage -35%). 45% of invoices overdue averaging 18 days late. 42% of deal value stuck in Proposal stage. Cash flow risk materializing within 30 days if unaddressed.',
    businessImpact: 'Combined potential impact: $250K+ in monthly recurring revenue at risk. Churn of top 5 accounts alone represents $1M+ annualized revenue loss. Cash flow gap of $127K constrains growth investment capacity.',
    recommendedActions: [
      { action: 'Schedule executive check-ins with top 5 at-risk accounts within 48 hours', priority: 'critical', time: 'Today' },
      { action: 'Implement automated invoice reminder sequence with escalating urgency', priority: 'critical', time: 'Today' },
      { action: 'Deploy churn risk monitoring dashboard with automated health score alerts', priority: 'high', time: 'This week' },
      { action: 'Create 3-touch follow-up automation for all deals in Proposal stage', priority: 'high', time: 'This week' },
    ],
    suggestedAutomation: 'Auto-detect churn signals (engagement drops, support ticket changes, login frequency) and create retention tasks with personalized action plans for account managers.',
    riskLevel: 'critical',
    confidenceScore: 96 + toneConfig[tone].confidenceDelta,
    nextBestStep: 'Call your top 2 at-risk accounts personally today. Then set up the automated invoice reminders — this alone can recover $127K in working capital.',
    tone,
  }),

  'lead-conversion': (tone) => ({
    executiveSummary: 'Lead volume is healthy (127 qualified leads/month) but conversion rates are below industry benchmarks at 12%. The primary issue is response time (12 hours vs <5 minute benchmark) and lack of personalized follow-up.',
    keyDiagnosis: 'Leads are increasing (+18% MoM) but conversion rate is dropping (-2.3 points). 90% of leads go cold within 7 days of initial contact. Average lead response time is 12 hours — industry benchmark is under 5 minutes. No lead scoring in place to prioritize hot leads.',
    businessImpact: 'Improving response time to under 5 minutes could boost conversion from 12% to 18-22%. This would add approximately 8-12 additional closed deals per month worth an estimated $85K-$120K in incremental revenue.',
    recommendedActions: [
      { action: 'Deploy AI qualification chatbot for instant lead response (<30 second response time)', priority: 'critical', time: 'Today' },
      { action: 'Implement lead scoring model to prioritize prospects with >70% propensity to buy', priority: 'high', time: 'This week' },
      { action: 'Create personalized follow-up sequences segmented by lead source and industry', priority: 'high', time: 'This week' },
      { action: 'Set up real-time lead activity alerts for sales team', priority: 'medium', time: 'This week' },
    ],
    suggestedAutomation: 'Auto-qualify leads via AI chatbot, score them in real-time, route hot leads instantly to sales, and trigger personalized follow-up sequences based on lead behavior and source.',
    riskLevel: 'high',
    confidenceScore: 88 + toneConfig[tone].confidenceDelta,
    nextBestStep: 'Set up AI chatbot for instant lead response today — it takes 30 minutes and has the single biggest impact on conversion rates.',
    tone,
  }),

  'marketing-roi': (tone) => ({
    executiveSummary: 'Marketing spend efficiency varies dramatically by channel. LinkedIn Ads outperform at 312% ROI but receive only 18% of budget, while Google Ads underperform at 98% ROI with 25% allocation. Rebalancing could significantly improve overall ROI.',
    keyDiagnosis: 'LinkedIn Ads: 312% ROI, 18% budget allocation. Email: 145% ROI, 18% budget. Content: 178% ROI, 12% budget. Google Ads: 98% ROI, 25% budget. Cost per lead increased 45% across all channels in the last quarter.',
    businessImpact: 'Reallocating 20% of budget from Google Ads to LinkedIn would increase overall marketing ROI from 168% to approximately 210%, generating an estimated $45K in additional value per quarter without increasing total spend.',
    recommendedActions: [
      { action: 'Shift 20% of Google Ads budget to LinkedIn Ads immediately', priority: 'high', time: 'This week' },
      { action: 'Implement multi-touch attribution to understand full-funnel channel impact', priority: 'high', time: '2 weeks' },
      { action: 'Launch retargeting campaign for LinkedIn engaged users', priority: 'medium', time: 'This week' },
      { action: 'A/B test LinkedIn ad creative targeting enterprise decision-makers', priority: 'medium', time: '2 weeks' },
    ],
    suggestedAutomation: 'Auto-optimize channel budget allocation weekly based on real-time ROAS data, with manual override for strategic campaigns.',
    riskLevel: 'medium',
    confidenceScore: 82 + toneConfig[tone].confidenceDelta,
    nextBestStep: 'Move 20% of Google Ads budget to LinkedIn Ads. Monitor for 2 weeks — if ROAS improves as projected, continue reallocation.',
    tone,
  }),

  'customer-churn': (tone) => ({
    executiveSummary: 'Customer churn is accelerating, with top accounts showing critical disengagement signals. The root cause is slow time-to-value (23 days vs 14-day benchmark) and insufficient proactive support for high-value accounts.',
    keyDiagnosis: 'Monthly churn rate increased 40% (from 2.3% to 3.2%). Top 5 accounts ($84K/month) show churn precursors: support tickets -40%, login frequency -55%, feature usage -35%. Customer health score dropped from 71% to 62% in 60 days.',
    businessImpact: 'At-risk top accounts represent $1.08M in annualized revenue. If churn rate continues accelerating to 4.5%, annual revenue loss from churn grows from $115K to $195K. Customer acquisition cost at $2,800 makes each lost customer increasingly expensive to replace.',
    recommendedActions: [
      { action: 'Schedule executive sponsor check-ins with top 5 at-risk accounts within 48 hours', priority: 'critical', time: 'Today' },
      { action: 'Assign dedicated success managers to accounts over $5K/month (ratio: 1:30 max)', priority: 'critical', time: 'This week' },
      { action: 'Implement 7-day onboarding acceleration program to hit time-to-value benchmark', priority: 'high', time: 'This week' },
      { action: 'Deploy automated health score monitoring with escalation triggers', priority: 'high', time: 'This week' },
    ],
    suggestedAutomation: 'Continuous health score monitoring with automated alerts. When score drops below 70, create retention task. Below 60, escalate to executive team with personalized action plan.',
    riskLevel: 'critical',
    confidenceScore: 93 + toneConfig[tone].confidenceDelta,
    nextBestStep: 'Call each of your top 5 at-risk accounts today. Find out why engagement dropped. Fix the underlying issue before implementing any automated system.',
    tone,
  }),

  'cash-flow': (tone) => ({
    executiveSummary: 'Cash flow is under serious pressure with 45% of invoices overdue by an average of 18 days. This is tying up $127K in working capital that could fund growth initiatives or serve as a buffer against unexpected expenses.',
    keyDiagnosis: 'Outstanding receivables: $127K across 45% of invoices. Average payment delay: 18 days and increasing. No automated collection process in place — follow-ups are manual and inconsistent. DSO (Days Sales Outstanding) has increased from 32 to 45 days in 6 months.',
    businessImpact: '$127K in working capital represents 44% of monthly revenue, severely constraining growth investment capacity. At 18-day average delay, the cost of carry is approximately $4,200/month in opportunity cost. If left unaddressed, could lead to missed payroll within 60 days during seasonal dips.',
    recommendedActions: [
      { action: 'Implement automated payment reminder sequence (Day 1, 7, 14, 21 overdue)', priority: 'critical', time: 'Today' },
      { action: 'Offer 2% early payment discount for invoices paid within 5 days', priority: 'high', time: 'This week' },
      { action: 'Call top 10 overdue accounts personally to negotiate payment plans', priority: 'critical', time: 'Today' },
      { action: 'Implement dunning process with escalating urgency through automated workflows', priority: 'high', time: 'This week' },
    ],
    suggestedAutomation: 'Auto-send escalating payment reminders: Day 1 (friendly reminder), Day 7 (payment link), Day 14 (late notice + fee warning), Day 21 (final notice + collections handoff).',
    riskLevel: 'critical',
    confidenceScore: 91 + toneConfig[tone].confidenceDelta,
    nextBestStep: 'Call your top 10 overdue accounts today. Most will pay within 48 hours of a personal call. This alone can recover $50K+ this week.',
    tone,
  }),

  'executive-briefing': (tone) => ({
    executiveSummary: 'Business performance is strong with 12.5% revenue growth, but three areas need attention: customer churn risk in top accounts, cash flow from slow collections, and pipeline friction in Proposal stage. Prioritize retention and cash flow this week.',
    keyDiagnosis: 'Revenue: $284.5K MRR (+12.5% YoY). Pipeline: $892K total (42% stuck in Proposal). Customers: 847 active (62% health score, declining). Cash flow: $127K in overdue invoices (45% of total). Risks: 3 critical, 4 high-priority. Automation coverage: 42%, saving 47 hrs/week.',
    businessImpact: 'Top-line is healthy but margin pressure from rising CAC (+18%) and slow collections ($127K tied up) offsetting growth. Key risk: $84K/month in accounts showing churn precursors. Key opportunity: pricing optimization could add $185K ARR.',
    recommendedActions: [
      { action: 'Executive check-ins with top 5 at-risk accounts (today)', priority: 'critical', time: 'Today' },
      { action: 'Automated invoice reminders for overdue accounts (today)', priority: 'critical', time: 'Today' },
      { action: 'Pipeline follow-up automation for stuck deals (this week)', priority: 'high', time: 'This week' },
      { action: 'Pricing increase implementation for new customers (this week)', priority: 'high', time: 'This week' },
    ],
    suggestedAutomation: 'Enable daily AI business scan with morning briefing email containing top 3 priorities, risk alerts, and recommended actions.',
    riskLevel: 'high',
    confidenceScore: 89 + toneConfig[tone].confidenceDelta,
    nextBestStep: 'Focus today on customer retention calls and cash flow recovery — these two actions protect the most revenue in the shortest time.',
    tone,
  }),
}

// ===== TONE MODIFIERS =====

function applyTone(response: AIResponse, tone: AITone): AIResponse {
  const config = toneConfig[tone]
  
  // For executive-summary, truncate to key points
  if (tone === 'executive-summary') {
    return {
      ...response,
      executiveSummary: response.keyDiagnosis.split('.')[0] + '.',
      keyDiagnosis: response.keyDiagnosis,
      recommendedActions: response.recommendedActions.slice(0, 3),
      nextBestStep: response.nextBestStep,
      tone,
    }
  }

  return { ...response, tone }
}

// ===== PUBLIC API =====

export function getDefaultTone(): AITone {
  if (typeof window === 'undefined') return 'strategic'
  return (localStorage.getItem('nexora-ai-tone') as AITone) || 'strategic'
}

export function getToneConfig(tone: AITone) {
  return toneConfig[tone]
}

export function processCommand(input: string, tone: AITone = 'strategic'): AIResponse {
  const lower = input.toLowerCase()
  let response: AIResponse

  if (lower.includes('sales') && (lower.includes('analysis') || lower.includes('this month') || lower.includes('pipeline'))) {
    response = scenarios['sales-analysis'](tone)
  } else if (lower.includes('growth') || lower.includes('strategy') || lower.includes('expand')) {
    response = scenarios['growth-strategy'](tone)
  } else if (lower.includes('risk') || lower.includes('problem') || lower.includes('threat') || lower.includes('danger')) {
    response = scenarios['risk-detection'](tone)
  } else if (lower.includes('lead') || lower.includes('convert') || lower.includes('customer acquisition')) {
    response = scenarios['lead-conversion'](tone)
  } else if (lower.includes('market') || lower.includes('roi') || lower.includes('channel') || lower.includes('ad spend')) {
    response = scenarios['marketing-roi'](tone)
  } else if ((lower.includes('churn') || lower.includes('retention') || lower.includes('customer health')) && !lower.includes('acquisition')) {
    response = scenarios['customer-churn'](tone)
  } else if (lower.includes('cash') || lower.includes('invoice') || lower.includes('payment') || lower.includes('overdue')) {
    response = scenarios['cash-flow'](tone)
  } else if (lower.includes('briefing') || lower.includes('overview') || lower.includes('summary') || lower.includes('executive')) {
    response = scenarios['executive-briefing'](tone)
  } else if (lower.includes('sales')) {
    response = scenarios['sales-analysis'](tone)
  } else if (lower.includes('report') || lower.includes('generate')) {
    response = scenarios['executive-briefing'](tone)
  } else {
    // Default to executive briefing for general queries
    response = scenarios['executive-briefing'](tone)
  }

  return applyTone(response, tone)
}

export function getSuggestions(): { text: string; category: string }[] {
  return [
    { text: 'Analyze my sales this month', category: 'Sales' },
    { text: 'Create a growth strategy for next quarter', category: 'Strategy' },
    { text: 'Find risks in my business', category: 'Risk' },
    { text: 'Why are my leads not converting?', category: 'Sales' },
    { text: 'Analyze my marketing channel ROI', category: 'Marketing' },
    { text: 'Detect customer churn signals', category: 'Customer' },
    { text: 'Generate an executive briefing', category: 'Executive' },
    { text: 'Our cash flow is getting tight', category: 'Finance' },
  ]
}
