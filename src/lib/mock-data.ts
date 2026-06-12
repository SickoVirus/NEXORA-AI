export interface Metric {
  id: string
  label: string
  value: string
  change: number
  trend: 'up' | 'down' | 'neutral'
  icon: string
}

export interface Insight {
  id: string
  title: string
  category: 'strategic' | 'financial' | 'sales' | 'marketing' | 'customer' | 'operational'
  priority: 'critical' | 'high' | 'medium' | 'low'
  impact: number
  explanation: string
  action: string
  date: string
}

export interface Deal {
  id: string
  company: string
  value: number
  probability: number
  stage: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
  aiRecommendation: string
  riskLevel: 'low' | 'medium' | 'high'
  nextAction: string
  contact: string
  lastActivity: string
}

export interface Customer {
  id: string
  name: string
  company: string
  email: string
  healthScore: number
  revenuePotential: number
  churnRisk: 'low' | 'medium' | 'high'
  lastInteraction: string
  suggestedAction: string
  industry: string
  deals: number
}

export interface Automation {
  id: string
  name: string
  trigger: string
  action: string
  output: string
  status: 'active' | 'paused' | 'draft'
  lastRun: string
  runsCount: number
}

export interface Strategy {
  id: string
  type: string
  goal: string
  timeframe: string
  aggressiveness: string
  summary: string
  confidence: number
  budget: string
  kpis: string[]
  actions: string[]
}

export interface NeuralNode {
  id: string
  label: string
  sublabel: string
  status: 'healthy' | 'warning' | 'critical' | 'opportunity' | 'optimizing'
  x: number
  y: number
  connections: string[]
  metrics: { label: string; value: string; trend: 'up' | 'down' | 'neutral' }[]
  analysis: string
  mainProblem: string
  recommendedAction: string
  possibleAutomation: string
  impactScore: number
  relatedMetrics: string[]
}

export interface WarRoomProblem {
  id: string
  title: string
  icon: string
  description: string
  severity: 'critical' | 'high' | 'medium'
  symptoms: string[]
}

export interface WarRoomPlan {
  problemId: string
  diagnosis: string
  rootCauses: string[]
  immediateActions: { action: string; time: string; impact: string }[]
  sevenDayPlan: { day: string; actions: string[] }[]
  thirtyDayPlan: { week: string; actions: string[] }[]
  scripts: { title: string; content: string }[]
  kpis: { name: string; target: string; measurement: string }[]
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  expectedImpact: string
  confidenceScore: number
}

export const mockMetrics: Metric[] = [
  { id: '1', label: 'Revenue', value: '$284,500', change: 12.5, trend: 'up', icon: 'trending-up' },
  { id: '2', label: 'Sales Pipeline', value: '$892,000', change: 8.3, trend: 'up', icon: 'layers' },
  { id: '3', label: 'Active Deals', value: '43', change: -2.1, trend: 'down', icon: 'briefcase' },
  { id: '4', label: 'Conversion Rate', value: '24.8%', change: 3.2, trend: 'up', icon: 'target' },
  { id: '5', label: 'Customer Churn', value: '3.2%', change: -0.8, trend: 'down', icon: 'users' },
  { id: '6', label: 'AI Insights', value: '18', change: 5, trend: 'up', icon: 'brain' },
]

export const mockInsights: Insight[] = [
  { id: '1', title: 'Revenue Growth Opportunity in Enterprise Segment', category: 'strategic', priority: 'high', impact: 85, explanation: 'Your enterprise segment has grown 34% this quarter but only represents 22% of your customer base. Enterprise customers have 3.2x higher LTV and 40% lower churn rate. Shifting focus to enterprise could significantly improve revenue stability.', action: 'Launch an enterprise outreach campaign targeting companies with 50+ employees in your top-performing industries.', date: '2024-01-15' },
  { id: '2', title: 'Cash Flow Risk: 45% of Invoices Overdue', category: 'financial', priority: 'critical', impact: 92, explanation: 'Nearly half of your outstanding invoices are past due, with an average delay of 18 days. This is tying up approximately $127,000 in working capital that could be used for growth initiatives.', action: 'Implement automated payment reminders and offer 2% early payment discount to improve cash flow.', date: '2024-01-14' },
  { id: '3', title: 'Sales Pipeline Stagnation in Proposal Stage', category: 'sales', priority: 'high', impact: 78, explanation: '42% of deal value ($374K) has been stuck in the Proposal Sent stage for more than 14 days. This indicates follow-up friction or pricing concerns. Deals in this stage have a 60% higher chance of being lost.', action: 'Create a 3-touch follow-up sequence and offer a limited-time discount for deals pending over 14 days.', date: '2024-01-13' },
  { id: '4', title: 'Marketing ROI: LinkedIn Ads Outperforming by 3.2x', category: 'marketing', priority: 'medium', impact: 65, explanation: 'LinkedIn Ads are delivering a 312% ROI versus 98% for Google Ads and 145% for email campaigns. Despite this, only 18% of your marketing budget is allocated to LinkedIn.', action: 'Reallocate 20% of underperforming channel budget to LinkedIn Ads for next quarter.', date: '2024-01-12' },
  { id: '5', title: 'Top 5 Customers Show Early Churn Signals', category: 'customer', priority: 'critical', impact: 95, explanation: 'Your top 5 accounts (representing $84K/month in revenue) show declining engagement: support ticket volume down 40%, login frequency down 55%, feature usage down 35%. These are strong churn precursors.', action: 'Schedule executive check-ins with each at-risk account and assign dedicated success managers.', date: '2024-01-11' },
  { id: '6', title: 'Operational Bottleneck in Customer Onboarding', category: 'operational', priority: 'high', impact: 72, explanation: 'Average time-to-value for new customers is 23 days, compared to industry benchmark of 14 days. This delays revenue recognition and increases early-stage churn risk by 28%.', action: 'Implement a structured 7-day onboarding workflow with automated touchpoints and milestone tracking.', date: '2024-01-10' },
  { id: '7', title: 'Pricing Optimization Opportunity', category: 'strategic', priority: 'high', impact: 88, explanation: 'Competitive analysis shows your pricing is 15% below market average for similar features. Customers have shown willingness to pay more -- trial-to-paid conversion increased 22% after a recent 8% price test.', action: 'Implement a 12% price increase for new customers with a 30-day grandfather period for existing customers.', date: '2024-01-09' },
  { id: '8', title: 'Customer Sentiment Shift Detected', category: 'customer', priority: 'medium', impact: 58, explanation: 'Social media and review monitoring detected a 15% decrease in positive sentiment over the past 30 days. Key themes: response time and feature gaps. This could impact referral rates.', action: 'Address top complaints in next product update and launch a customer feedback campaign.', date: '2024-01-08' },
]

export const mockDeals: Deal[] = [
  { id: '1', company: 'TechFlow Corp', value: 45000, probability: 25, stage: 'new', aiRecommendation: 'High fit. Schedule discovery call.', riskLevel: 'low', nextAction: 'Send calendar invite', contact: 'Sarah Chen', lastActivity: '2h ago' },
  { id: '2', company: 'Meridian Health', value: 78000, probability: 40, stage: 'contacted', aiRecommendation: 'Share case study and product demo.', riskLevel: 'low', nextAction: 'Send demo link', contact: 'Dr. James Wilson', lastActivity: '1d ago' },
  { id: '3', company: 'CloudBase Systems', value: 120000, probability: 60, stage: 'qualified', aiRecommendation: 'Strong match. Schedule technical deep dive.', riskLevel: 'medium', nextAction: 'Book technical demo', contact: 'Mike Torres', lastActivity: '3d ago' },
  { id: '4', company: 'Atlas Manufacturing', value: 95000, probability: 70, stage: 'proposal', aiRecommendation: 'Price sensitivity detected. Consider flex terms.', riskLevel: 'medium', nextAction: 'Send revised proposal', contact: 'Lisa Park', lastActivity: '5d ago' },
  { id: '5', company: 'NovaVision Labs', value: 156000, probability: 75, stage: 'proposal', aiRecommendation: 'Key decision maker engaged. Follow up quickly.', riskLevel: 'medium', nextAction: 'Follow up on proposal', contact: 'Dr. Alan Grant', lastActivity: '4d ago' },
  { id: '6', company: 'Pinnacle Financial', value: 210000, probability: 85, stage: 'negotiation', aiRecommendation: 'Competitor present. Emphasize AI capabilities.', riskLevel: 'high', nextAction: 'Prepare competitive comparison', contact: 'Jennifer Walsh', lastActivity: '1d ago' },
  { id: '7', company: 'GreenLeaf Energy', value: 67000, probability: 20, stage: 'new', aiRecommendation: 'Low engagement. Nurture with educational content.', riskLevel: 'low', nextAction: 'Add to nurture sequence', contact: 'Tom Bradley', lastActivity: '7d ago' },
  { id: '8', company: 'Spectrum Digital', value: 189000, probability: 90, stage: 'negotiation', aiRecommendation: 'Strong relationship. Close this week.', riskLevel: 'low', nextAction: 'Send contract for signature', contact: 'Rachel Kim', lastActivity: '12h ago' },
  { id: '9', company: 'Vertex Solutions', value: 34000, probability: 0, stage: 'lost', aiRecommendation: 'Lost to competitor. Analyze win/loss data.', riskLevel: 'low', nextAction: 'Send feedback survey', contact: 'David Park', lastActivity: '14d ago' },
  { id: '10', company: 'CoreBridge IT', value: 83000, probability: 50, stage: 'contacted', aiRecommendation: 'Engaged but unqualified. Verify budget authority.', riskLevel: 'medium', nextAction: 'Qualification call', contact: 'Priya Sharma', lastActivity: '2d ago' },
]

export const mockCustomers: Customer[] = [
  { id: '1', name: 'Sarah Chen', company: 'TechFlow Corp', email: 'sarah@techflow.io', healthScore: 92, revenuePotential: 45000, churnRisk: 'low', lastInteraction: '2h ago', suggestedAction: 'Upsell enterprise plan', industry: 'Technology', deals: 3 },
  { id: '2', name: 'Dr. James Wilson', company: 'Meridian Health', email: 'jwilson@meridian.com', healthScore: 78, revenuePotential: 78000, churnRisk: 'medium', lastInteraction: '1d ago', suggestedAction: 'Schedule check-in call', industry: 'Healthcare', deals: 2 },
  { id: '3', name: 'Mike Torres', company: 'CloudBase Systems', email: 'mike@cloudbase.io', healthScore: 88, revenuePotential: 120000, churnRisk: 'low', lastInteraction: '3d ago', suggestedAction: 'Share beta features', industry: 'Cloud Computing', deals: 4 },
  { id: '4', name: 'Lisa Park', company: 'Atlas Manufacturing', email: 'lisa@atlasmfg.com', healthScore: 65, revenuePotential: 95000, churnRisk: 'high', lastInteraction: '5d ago', suggestedAction: 'Executive intervention required', industry: 'Manufacturing', deals: 1 },
  { id: '5', name: 'Jennifer Walsh', company: 'Pinnacle Financial', email: 'jwalsh@pinnacle.com', healthScore: 85, revenuePotential: 210000, churnRisk: 'low', lastInteraction: '1d ago', suggestedAction: 'Prepare quarterly review', industry: 'Finance', deals: 5 },
  { id: '6', name: 'Rachel Kim', company: 'Spectrum Digital', email: 'rachel@spectrumdigital.com', healthScore: 95, revenuePotential: 189000, churnRisk: 'low', lastInteraction: '12h ago', suggestedAction: 'Close deal and celebrate', industry: 'Digital Media', deals: 2 },
  { id: '7', name: 'Priya Sharma', company: 'CoreBridge IT', email: 'priya@corebridge.io', healthScore: 72, revenuePotential: 83000, churnRisk: 'medium', lastInteraction: '2d ago', suggestedAction: 'Send product roadmap', industry: 'IT Services', deals: 3 },
  { id: '8', name: 'Tom Bradley', company: 'GreenLeaf Energy', email: 'tom@greenleaf.com', healthScore: 45, revenuePotential: 67000, churnRisk: 'high', lastInteraction: '7d ago', suggestedAction: 'Re-engagement campaign', industry: 'Energy', deals: 1 },
]

export const mockAutomations: Automation[] = [
  { id: '1', name: 'Cold Lead Follow-up', trigger: 'Lead goes cold (14 days no contact)', action: 'Generate personalized follow-up email', output: 'Draft email in Gmail', status: 'active', lastRun: '2h ago', runsCount: 147 },
  { id: '2', name: 'Weekly Executive Report', trigger: 'Every Monday 8:00 AM', action: 'Compile business metrics from all sources', output: 'PDF report emailed to team', status: 'active', lastRun: '1d ago', runsCount: 24 },
  { id: '3', name: 'Sales Drop Alert', trigger: 'Sales drop >10% week-over-week', action: 'Analyze pipeline and recommend actions', output: 'Slack alert with strategic recommendations', status: 'active', lastRun: '4h ago', runsCount: 8 },
  { id: '4', name: 'Churn Risk Detection', trigger: 'Customer health score drops below 60', action: 'Create retention task for account manager', output: 'Task created in Action Center', status: 'active', lastRun: '1h ago', runsCount: 56 },
  { id: '5', name: 'Invoice Reminder', trigger: 'Invoice overdue by 7 days', action: 'Draft payment reminder email', output: 'Email ready for review in outbox', status: 'paused', lastRun: '3d ago', runsCount: 32 },
  { id: '6', name: 'Campaign Optimization', trigger: 'Campaign ROAS drops below 2.0', action: 'Analyze performance and suggest optimizations', output: 'Optimization report generated', status: 'draft', lastRun: 'Never', runsCount: 0 },
  { id: '7', name: 'New Lead Enrichment', trigger: 'New lead captured in CRM', action: 'Enrich with company data and score', output: 'Lead enriched with 15+ data points', status: 'active', lastRun: '30m ago', runsCount: 892 },
]

export const mockStrategies: Strategy[] = [
  { id: '1', type: 'growth', goal: 'Increase MRR by 40% in 6 months', timeframe: '6 months', aggressiveness: 'Aggressive', summary: 'Leverage enterprise segment expansion and pricing optimization to drive 40% MRR growth. Focus on top-of-funnel expansion through LinkedIn Ads (3.2x ROI) while improving conversion rates with AI-powered demo personalization.', confidence: 87, budget: '$45,000 - $65,000', kpis: ['MRR Growth: +40%', 'Enterprise % of Revenue: 22% to 35%', 'Demo-to-Trial Conversion: +25%', 'Average Deal Size: +18%'], actions: ['Launch enterprise LinkedIn campaign ($12K/month)', 'Implement pricing optimization (12% increase)', 'Build AI demo personalization engine', 'Create enterprise onboarding track', 'Hire 2 enterprise SDRs'] },
  { id: '2', type: 'sales', goal: 'Improve close rate from 24% to 35%', timeframe: '3 months', aggressiveness: 'Moderate', summary: 'Fix pipeline friction points identified in the Proposal stage, implement AI-powered lead scoring, and deploy automated follow-up sequences to compress the sales cycle and improve win rates.', confidence: 82, budget: '$18,000 - $28,000', kpis: ['Close Rate: 24% to 35%', 'Sales Cycle Length: -30%', 'Proposal Win Rate: +40%', 'Lead Response Time: <5 min'], actions: ['Build 3-touch follow-up automation for proposals', 'Implement AI lead scoring model', 'Deploy live chat with AI qualification', 'Create battle cards for top competitors', 'Weekly pipeline review with AI insights'] },
  { id: '3', type: 'marketing', goal: 'Increase qualified leads by 60%', timeframe: '4 months', aggressiveness: 'Aggressive', summary: 'Shift marketing mix toward highest-ROI channels (LinkedIn), launch account-based marketing for enterprise targets, and implement AI-powered content personalization across all touchpoints.', confidence: 79, budget: '$35,000 - $60,000', kpis: ['Qualified Leads/Month: +60%', 'Marketing ROI: +120%', 'Enterprise Leads: +80%', 'Content Engagement: +45%'], actions: ['Reallocate budget to LinkedIn (40% of total spend)', 'Launch ABM program for 50 target accounts', 'AI-powered content personalization engine', 'Create enterprise thought leadership content', 'Implement multi-touch attribution'] },
]

export const mockReports = [
  { id: '1', title: 'Weekly Executive Report', period: 'Jan 8 - Jan 14, 2024', type: 'Executive', summary: 'The business showed strong momentum this week with revenue up 12.5% QoQ. However, customer churn signals in top accounts and invoice collection delays require immediate attention.', generatedAt: '2024-01-15' },
  { id: '2', title: 'Monthly Business Review - December 2023', period: 'Dec 1 - Dec 31, 2023', type: 'Monthly', summary: 'December closed with record revenue of $284,500, exceeding target by 8.2%. Marketing spend efficiency improved 15% due to LinkedIn channel optimization.', generatedAt: '2024-01-02' },
  { id: '3', title: 'Sales Performance Report - Q4 2023', period: 'Oct 1 - Dec 31, 2023', type: 'Quarterly', summary: 'Q4 exceeded pipeline targets by 22% with $2.1M in new business generated. The enterprise segment grew 34% and now represents 28% of total revenue.', generatedAt: '2024-01-01' },
  { id: '4', title: 'Marketing ROI Analysis - Q4 2023', period: 'Oct 1 - Dec 31, 2023', type: 'Marketing', summary: 'LinkedIn Ads delivered 312% ROI, significantly outperforming other channels. Total marketing spend was $52,000 with an overall ROI of 168%.', generatedAt: '2024-01-01' },
]

export const mockKnowledgeFiles = [
  { id: '1', name: 'Q4 2023 Strategic Plan.pdf', category: 'Strategy', size: '2.4 MB', updated: '1 week ago', type: 'pdf' },
  { id: '2', name: 'Sales Playbook v3.docx', category: 'Sales', size: '1.8 MB', updated: '2 weeks ago', type: 'doc' },
  { id: '3', name: 'Brand Guidelines 2024.pdf', category: 'Brand', size: '4.2 MB', updated: '3 weeks ago', type: 'pdf' },
  { id: '4', name: 'Product Roadmap Q1 2024.pptx', category: 'Product', size: '3.1 MB', updated: '4 days ago', type: 'ppt' },
  { id: '5', name: 'Customer Research Report.pdf', category: 'Research', size: '5.7 MB', updated: '1 month ago', type: 'pdf' },
  { id: '6', name: 'Employee Handbook 2024.docx', category: 'HR', size: '1.2 MB', updated: '2 months ago', type: 'doc' },
  { id: '7', name: 'Competitive Analysis Matrix.xlsx', category: 'Strategy', size: '890 KB', updated: '1 week ago', type: 'xls' },
  { id: '8', name: 'Standard Operating Procedures.docx', category: 'Operations', size: '3.4 MB', updated: '3 weeks ago', type: 'doc' },
]

export const mockTasks = [
  { id: '1', title: 'Follow up with Pinnacle Financial proposal', priority: 'urgent', impact: 92, effort: 'low', status: 'todo', due: 'Today', category: 'sales' },
  { id: '2', title: 'Schedule executive check-in for at-risk top accounts', priority: 'urgent', impact: 95, effort: 'medium', status: 'todo', due: 'Today', category: 'customer' },
  { id: '3', title: 'Review and approve Q1 marketing budget reallocation', priority: 'high', impact: 78, effort: 'low', status: 'in-progress', due: 'Tomorrow', category: 'marketing' },
  { id: '4', title: 'Implement automated invoice reminder sequence', priority: 'high', impact: 85, effort: 'medium', status: 'todo', due: 'This week', category: 'operations' },
  { id: '5', title: 'Prepare competitive comparison for Spectrum Digital negotiation', priority: 'high', impact: 88, effort: 'low', status: 'in-progress', due: 'Tomorrow', category: 'sales' },
  { id: '6', title: 'Create enterprise onboarding workflow', priority: 'medium', impact: 72, effort: 'high', status: 'todo', due: 'Next week', category: 'operations' },
  { id: '7', title: 'Schedule LinkedIn Ads performance review', priority: 'medium', impact: 65, effort: 'low', status: 'done', due: 'Yesterday', category: 'marketing' },
  { id: '8', title: 'Review pricing optimization proposal', priority: 'high', impact: 88, effort: 'medium', status: 'todo', due: 'This week', category: 'strategy' },
  { id: '9', title: 'Send customer feedback survey to GreenLeaf Energy', priority: 'low', impact: 45, effort: 'low', status: 'done', due: 'Last week', category: 'customer' },
  { id: '10', title: 'Prepare monthly investor update report', priority: 'high', impact: 82, effort: 'medium', status: 'in-progress', due: '2 days', category: 'executive' },
]

export const mockNotifications = [
  { id: '1', title: 'Pipeline Alert', message: '42% of deal value stuck in Proposal stage', type: 'warning', time: '1h ago', read: false },
  { id: '2', title: 'Churn Risk Detected', message: 'Top 5 accounts showing churn signals', type: 'critical', time: '2h ago', read: false },
  { id: '3', title: 'Report Ready', message: 'Weekly Executive Report is ready for review', type: 'success', time: '4h ago', read: false },
  { id: '4', title: 'Revenue Milestone', message: 'Monthly revenue target 78% achieved', type: 'info', time: '1d ago', read: true },
  { id: '5', title: 'Invoice Alert', message: '12 invoices overdue by 7+ days', type: 'warning', time: '1d ago', read: true },
]

export const mockPipelineData = {
  new: { value: 112000, count: 2 },
  contacted: { value: 161000, count: 2 },
  qualified: { value: 120000, count: 1 },
  proposal: { value: 251000, count: 2 },
  negotiation: { value: 399000, count: 2 },
  won: { value: 0, count: 0 },
  lost: { value: 34000, count: 1 },
}

export const chartData = {
  revenue: [
    { month: 'Jan', value: 210000 }, { month: 'Feb', value: 225000 }, { month: 'Mar', value: 248000 },
    { month: 'Apr', value: 235000 }, { month: 'May', value: 268000 }, { month: 'Jun', value: 284500 },
    { month: 'Jul', value: 292000 }, { month: 'Aug', value: 278000 }, { month: 'Sep', value: 295000 },
    { month: 'Oct', value: 310000 }, { month: 'Nov', value: 322000 }, { month: 'Dec', value: 345000 },
  ],
  salesPipeline: [
    { month: 'Jan', value: 450000 }, { month: 'Feb', value: 520000 }, { month: 'Mar', value: 580000 },
    { month: 'Apr', value: 620000 }, { month: 'May', value: 710000 }, { month: 'Jun', value: 892000 },
  ],
  marketingChannels: [
    { name: 'LinkedIn Ads', value: 45, roi: 312 },
    { name: 'Google Ads', value: 25, roi: 98 },
    { name: 'Email', value: 18, roi: 145 },
    { name: 'Content', value: 12, roi: 178 },
  ],
  customerHealth: [
    { name: 'Healthy', value: 62 }, { name: 'At Risk', value: 22 }, { name: 'Critical', value: 16 },
  ],
}

export const onboardingSteps = [
  { id: 'company', title: 'Company Profile', description: 'Tell us about your business' },
  { id: 'industry', title: 'Industry', description: 'What industry are you in?' },
  { id: 'size', title: 'Team Size', description: 'How many people are in your company?' },
  { id: 'goals', title: 'Goals', description: 'What do you want to achieve?' },
  { id: 'tools', title: 'Current Tools', description: 'What tools do you currently use?' },
  { id: 'personality', title: 'AI Personality', description: 'How should your AI assistant behave?' },
]

export const industries = [
  'Technology / SaaS', 'Healthcare', 'Finance / Banking', 'Manufacturing', 'Retail / E-commerce',
  'Real Estate', 'Education', 'Consulting', 'Marketing / Agency', 'Legal', 'Construction',
  'Hospitality', 'Transportation / Logistics', 'Energy', 'Non-Profit', 'Other',
]

export const companySizes = [
  'Solo (1)', 'Small Team (2-10)', 'Growing Team (11-50)', 'Mid-Size (51-200)', 'Large (200+)',
]

export const goals = [
  { id: 'sales', label: 'Increase Sales', icon: 'trending-up' },
  { id: 'costs', label: 'Reduce Costs', icon: 'dollar-sign' },
  { id: 'automate', label: 'Automate Work', icon: 'zap' },
  { id: 'marketing', label: 'Improve Marketing', icon: 'megaphone' },
  { id: 'operations', label: 'Improve Operations', icon: 'settings' },
  { id: 'data', label: 'Analyze Data', icon: 'bar-chart' },
]

export const tools = [
  'Excel', 'Google Sheets', 'CRM (HubSpot/Salesforce)', 'Shopify', 'Notion',
  'Gmail', 'Slack', 'Google Analytics', 'QuickBooks', 'Zapier', 'Stripe',
]

export const aiPersonalities = [
  { id: 'strategic', label: 'Strategic', description: 'Long-term thinking with balanced recommendations' },
  { id: 'analytical', label: 'Analytical', description: 'Data-driven decisions with detailed analysis' },
  { id: 'aggressive', label: 'Aggressive Growth', description: 'Push hard for rapid business growth' },
  { id: 'conservative', label: 'Conservative', description: 'Cautious, risk-aware recommendations' },
  { id: 'creative', label: 'Creative', description: 'Innovative, out-of-the-box strategies' },
]

// ===== BUSINESS NEURAL MAP =====

export const neuralNodes: NeuralNode[] = [
  {
    id: 'revenue',
    label: 'Revenue',
    sublabel: '$284.5K MRR',
    status: 'healthy',
    x: 50, y: 10,
    connections: ['sales', 'cashflow', 'customers', 'opportunities'],
    metrics: [
      { label: 'MRR', value: '$284,500', trend: 'up' },
      { label: 'Growth Rate', value: '+12.5%', trend: 'up' },
      { label: 'ARR', value: '$3.41M', trend: 'up' },
    ],
    analysis: 'Revenue is healthy with consistent growth. Enterprise segment driving 34% QoQ growth. Pricing is 15% below market average, presenting an optimization opportunity.',
    mainProblem: 'Over-reliance on mid-market segment. Enterprise adoption needs acceleration.',
    recommendedAction: 'Launch enterprise-focused sales campaign and implement 12% pricing increase for new customers.',
    possibleAutomation: 'Auto-generate weekly revenue forecast and alert when growth drops below 8%',
    impactScore: 92,
    relatedMetrics: ['Sales Pipeline', 'Deal Velocity', 'Avg Deal Size'],
  },
  {
    id: 'sales',
    label: 'Sales',
    sublabel: '$892K Pipeline',
    status: 'warning',
    x: 25, y: 30,
    connections: ['revenue', 'marketing', 'customers', 'automations'],
    metrics: [
      { label: 'Pipeline Value', value: '$892K', trend: 'up' },
      { label: 'Active Deals', value: '43', trend: 'down' },
      { label: 'Conversion Rate', value: '24.8%', trend: 'up' },
    ],
    analysis: 'Pipeline is growing but 42% of deal value is stuck in Proposal stage for 14+ days. Follow-up friction and pricing concerns detected.',
    mainProblem: 'Deals stalling in Proposal stage with poor follow-up discipline.',
    recommendedAction: 'Create 3-touch automated follow-up sequence and offer limited-time discounts for stuck deals.',
    possibleAutomation: 'Auto-detect stalled deals and generate personalized follow-up emails',
    impactScore: 85,
    relatedMetrics: ['Win Rate', 'Sales Cycle', 'Lead Response'],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    sublabel: '168% ROI',
    status: 'opportunity',
    x: 75, y: 30,
    connections: ['sales', 'customers', 'opportunities', 'revenue'],
    metrics: [
      { label: 'Marketing ROI', value: '168%', trend: 'up' },
      { label: 'Qualified Leads', value: '127', trend: 'up' },
      { label: 'LinkedIn ROI', value: '312%', trend: 'up' },
    ],
    analysis: 'LinkedIn Ads outperforming all channels at 312% ROI but only 18% of budget allocated. Significant scaling opportunity.',
    mainProblem: 'Budget misallocation - underfunding highest-performing channel.',
    recommendedAction: 'Reallocate 20% of budget from underperforming channels to LinkedIn Ads.',
    possibleAutomation: 'Auto-optimize channel budget allocation based on real-time ROI data',
    impactScore: 78,
    relatedMetrics: ['CAC', 'Lead Quality', 'Channel Mix'],
  },
  {
    id: 'customers',
    label: 'Customers',
    sublabel: '62% Health',
    status: 'critical',
    x: 50, y: 50,
    connections: ['revenue', 'sales', 'risks', 'operations'],
    metrics: [
      { label: 'Active Customers', value: '847', trend: 'up' },
      { label: 'Health Score', value: '62%', trend: 'down' },
      { label: 'Churn Rate', value: '3.2%', trend: 'down' },
    ],
    analysis: 'Top 5 accounts ($84K/month) showing critical churn signals with 55% reduced engagement. Overall health score declining.',
    mainProblem: 'Enterprise at-risk accounts need immediate executive intervention.',
    recommendedAction: 'Schedule executive check-ins and assign dedicated success managers to top 5 at-risk accounts.',
    possibleAutomation: 'Auto-detect churn signals and create retention tasks for account managers',
    impactScore: 95,
    relatedMetrics: ['NPS', 'Retention Rate', 'LTV'],
  },
  {
    id: 'operations',
    label: 'Operations',
    sublabel: 'Optimizing',
    status: 'optimizing',
    x: 25, y: 70,
    connections: ['customers', 'automations', 'risks', 'team'],
    metrics: [
      { label: 'Onboarding Time', value: '23 days', trend: 'down' },
      { label: 'Process Efficiency', value: '73%', trend: 'up' },
      { label: 'Automation Coverage', value: '42%', trend: 'up' },
    ],
    analysis: 'Onboarding time (23 days) exceeds benchmark (14 days). Automation initiatives showing positive impact on efficiency.',
    mainProblem: 'Customer onboarding is too slow, delaying time-to-value and increasing churn risk.',
    recommendedAction: 'Implement structured 7-day onboarding workflow with automated milestone tracking.',
    possibleAutomation: 'Auto-create onboarding tasks and send milestone notifications to new customers',
    impactScore: 72,
    relatedMetrics: ['Time-to-Value', 'Efficiency Score', 'Process Completion'],
  },
  {
    id: 'team',
    label: 'Team',
    sublabel: '12 Members',
    status: 'healthy',
    x: 75, y: 70,
    connections: ['operations', 'automations', 'strategy'],
    metrics: [
      { label: 'Team Size', value: '12', trend: 'up' },
      { label: 'Productivity', value: '87%', trend: 'up' },
      { label: 'Satisfaction', value: '4.2/5', trend: 'up' },
    ],
    analysis: 'Team is performing well with high productivity. Recent hires in sales and engineering showing strong ramp-up.',
    mainProblem: 'No critical issues detected. Team capacity is sufficient for current growth rate.',
    recommendedAction: 'Maintain current trajectory. Consider hiring 2 enterprise SDRs to accelerate growth.',
    possibleAutomation: 'Auto-track team productivity metrics and flag capacity constraints',
    impactScore: 65,
    relatedMetrics: ['Capacity', 'Productivity', 'Retention'],
  },
  {
    id: 'cashflow',
    label: 'Cash Flow',
    sublabel: '$127K Stuck',
    status: 'critical',
    x: 5, y: 50,
    connections: ['revenue', 'risks', 'operations'],
    metrics: [
      { label: 'Outstanding Invoices', value: '$127K', trend: 'down' },
      { label: 'Avg Payment Delay', value: '18 days', trend: 'up' },
      { label: 'Overdue Rate', value: '45%', trend: 'up' },
    ],
    analysis: 'Nearly half of invoices are overdue tying up $127K in working capital. Average delay increasing to 18 days.',
    mainProblem: 'Serious cash flow bottleneck from poor invoice collection processes.',
    recommendedAction: 'Implement automated payment reminders and offer 2% early payment discount.',
    possibleAutomation: 'Auto-send escalating payment reminders and generate dunning letters',
    impactScore: 88,
    relatedMetrics: ['DSO', 'Collection Rate', 'Working Capital'],
  },
  {
    id: 'risks',
    label: 'Risks',
    sublabel: '3 Critical',
    status: 'critical',
    x: 50, y: 85,
    connections: ['customers', 'cashflow', 'opportunities', 'strategy'],
    metrics: [
      { label: 'Critical Risks', value: '3', trend: 'up' },
      { label: 'High Priority', value: '4', trend: 'up' },
      { label: 'Mitigated', value: '2', trend: 'up' },
    ],
    analysis: 'Three critical risks: top accounts churning, cash flow bottleneck, and pipeline stagnation. Combined potential impact of $250K+ MRR.',
    mainProblem: 'Multiple simultaneous critical risks requiring coordinated response.',
    recommendedAction: 'Activate AI War Room to create comprehensive risk mitigation plan.',
    possibleAutomation: 'Auto-escalate risks based on severity score and notify relevant team members',
    impactScore: 96,
    relatedMetrics: ['Risk Score', 'Impact Potential', 'Mitigation Rate'],
  },
  {
    id: 'opportunities',
    label: 'Opportunities',
    sublabel: '7 Detected',
    status: 'opportunity',
    x: 85, y: 50,
    connections: ['revenue', 'marketing', 'risks', 'strategy'],
    metrics: [
      { label: 'Growth Opps', value: '7', trend: 'up' },
      { label: 'Est. Value', value: '$1.2M', trend: 'up' },
      { label: 'Avg Impact', value: '82%', trend: 'up' },
    ],
    analysis: 'Seven significant opportunities identified with estimated $1.2M collective value. Pricing optimization and enterprise expansion are highest priority.',
    mainProblem: 'Opportunities are well-documented but lack assigned ownership and timelines.',
    recommendedAction: 'Assign owners to each opportunity with clear timelines and success metrics.',
    possibleAutomation: 'Auto-track opportunity progress and send weekly update to stakeholders',
    impactScore: 85,
    relatedMetrics: ['Pipeline Impact', 'Revenue Potential', 'Priority Score'],
  },
  {
    id: 'automations',
    label: 'Automations',
    sublabel: '4 Active',
    status: 'healthy',
    x: 25, y: 50,
    connections: ['operations', 'team', 'risks', 'strategy'],
    metrics: [
      { label: 'Active', value: '4', trend: 'up' },
      { label: 'Total Runs', value: '1,175', trend: 'up' },
      { label: 'Time Saved', value: '47 hrs/wk', trend: 'up' },
    ],
    analysis: 'Active automations saving 47 hours per week. New automation opportunities identified for invoice collection and proposal follow-up.',
    mainProblem: 'Automation coverage at 42% - significant opportunity to expand.',
    recommendedAction: 'Prioritize building automations for cash flow management and sales follow-up.',
    possibleAutomation: 'Auto-suggest new automation opportunities based on business data patterns',
    impactScore: 75,
    relatedMetrics: ['Coverage', 'Efficiency Gain', 'Error Reduction'],
  },
  {
    id: 'reports',
    label: 'Reports',
    sublabel: '4 Generated',
    status: 'healthy',
    x: 5, y: 35,
    connections: ['revenue', 'strategy', 'opportunities'],
    metrics: [
      { label: 'Reports This Month', value: '4', trend: 'up' },
      { label: 'Avg Report Score', value: '86%', trend: 'up' },
      { label: 'AI Insights Generated', value: '18', trend: 'up' },
    ],
    analysis: 'All reports are generating on schedule with high-quality AI insights. Weekly executive reports show strong team engagement with actionable recommendations.',
    mainProblem: 'Reports lack automated distribution and integration with decision-making workflows.',
    recommendedAction: 'Set up automated report distribution and integrate AI recommendations with Action Center.',
    possibleAutomation: 'Auto-distribute reports to stakeholders and create tasks from AI recommendations',
    impactScore: 68,
    relatedMetrics: ['Report Quality', 'AI Accuracy', 'Team Engagement'],
  },
  {
    id: 'strategy',
    label: 'Strategy',
    sublabel: '3 Plans Active',
    status: 'healthy',
    x: 50, y: 30,
    connections: ['revenue', 'risks', 'opportunities', 'automations', 'reports'],
    metrics: [
      { label: 'Active Strategies', value: '3', trend: 'up' },
      { label: 'Avg Confidence', value: '83%', trend: 'up' },
      { label: 'KPI Achievement', value: '76%', trend: 'up' },
    ],
    analysis: 'Three active strategies (Growth, Sales, Marketing) all showing strong progress. KPI achievement at 76% across all strategies.',
    mainProblem: 'Strategy execution tracking is manual and lacks real-time visibility.',
    recommendedAction: 'Automate KPI tracking and create real-time strategy dashboards.',
    possibleAutomation: 'Auto-update strategy KPIs from connected data sources',
    impactScore: 80,
    relatedMetrics: ['KPI Progress', 'Strategy ROI', 'Execution Speed'],
  },
]

export const neuralConnections = [
  { from: 'revenue', to: 'sales', strength: 85, label: 'Pipeline-driven' },
  { from: 'revenue', to: 'cashflow', strength: 75, label: 'Inflow dependency' },
  { from: 'revenue', to: 'customers', strength: 90, label: 'Customer-driven' },
  { from: 'revenue', to: 'opportunities', strength: 70, label: 'Growth potential' },
  { from: 'sales', to: 'marketing', strength: 80, label: 'Lead generation' },
  { from: 'sales', to: 'customers', strength: 65, label: 'Account handoff' },
  { from: 'sales', to: 'automations', strength: 60, label: 'Process support' },
  { from: 'marketing', to: 'customers', strength: 75, label: 'Targeting impact' },
  { from: 'marketing', to: 'opportunities', strength: 85, label: 'Channel insights' },
  { from: 'customers', to: 'risks', strength: 90, label: 'Churn signals' },
  { from: 'customers', to: 'operations', strength: 70, label: 'Service delivery' },
  { from: 'operations', to: 'automations', strength: 80, label: 'Efficiency driver' },
  { from: 'operations', to: 'team', strength: 65, label: 'Workflow distribution' },
  { from: 'team', to: 'automations', strength: 55, label: 'Capability multiplier' },
  { from: 'cashflow', to: 'risks', strength: 85, label: 'Liquidity risk' },
  { from: 'risks', to: 'opportunities', strength: 60, label: 'Risk/reward balance' },
  { from: 'risks', to: 'strategy', strength: 80, label: 'Strategic response' },
  { from: 'opportunities', to: 'strategy', strength: 85, label: 'Strategic input' },
  { from: 'automations', to: 'strategy', strength: 65, label: 'Execution layer' },
  { from: 'strategy', to: 'revenue', strength: 75, label: 'Outcome impact' },
]

// ===== AI WAR ROOM =====

export const warRoomProblems: WarRoomProblem[] = [
  { id: 'sales-drop', title: 'Sales Are Dropping', icon: 'trending-down', description: 'Revenue declining despite steady lead flow. Deals not closing at expected rates.', severity: 'critical', symptoms: ['Deal velocity decreased 23%', 'Win rate dropped from 28% to 21%', 'Average deal size shrinking 15%', 'Sales cycle extending by 11 days'] },
  { id: 'lead-conversion', title: 'Leads Not Converting', icon: 'users', description: 'Lead volume is healthy but conversion rates are below industry benchmarks.', severity: 'high', symptoms: ['Lead-to-opportunity conversion at 12%', '90% of leads go cold within 7 days', 'Demo-to-trial conversion dropping', 'Lead quality scores declining'] },
  { id: 'churn', title: 'Customer Churn Increasing', icon: 'alert-triangle', description: 'Customer retention declining with increasing churn signals across accounts.', severity: 'critical', symptoms: ['Monthly churn rate increased 40%', 'Customer health scores dropping', 'Support ticket volume decreasing 35%', 'Account login frequency down 55%'] },
  { id: 'marketing-perf', title: 'Marketing Underperforming', icon: 'bar-chart', description: 'Marketing campaigns not delivering expected ROI across most channels.', severity: 'high', symptoms: ['Overall marketing ROI dropped to 98%', 'Cost per lead increased 45%', 'Email engagement declined 30%', 'Content marketing traffic flat'] },
  { id: 'high-costs', title: 'Costs Are Too High', icon: 'dollar-sign', description: 'Operating expenses growing faster than revenue, squeezing margins.', severity: 'medium', symptoms: ['Cost-to-revenue ratio increased 18%', 'Customer acquisition cost up 32%', 'Team productivity metrics declining', 'Tool stack redundancy detected'] },
  { id: 'productivity', title: 'Team Productivity Low', icon: 'zap', description: 'Team output not scaling with headcount growth. Process inefficiencies mounting.', severity: 'medium', symptoms: ['Output per team member down 15%', 'Meeting time increased 40%', 'Project completion rate declining', 'Cross-team collaboration friction'] },
  { id: 'cashflow', title: 'Cash Flow Weak', icon: 'credit-card', description: 'Working capital constrained by slow collections and rising operational costs.', severity: 'critical', symptoms: ['45% of invoices overdue', 'Average payment delay at 18 days', '$127K in outstanding receivables', 'Operating margin compressed 12%'] },
]

export const warRoomPlans: Record<string, WarRoomPlan> = {
  'sales-drop': {
    problemId: 'sales-drop',
    diagnosis: 'Your sales decline stems from a combination of pipeline stagnation in the Proposal stage (42% of deals stuck), reduced follow-up discipline, and increased competitive pressure in the mid-market segment. The 23% decrease in deal velocity correlates directly with the lack of automated follow-up sequences.',
    rootCauses: [
      'No systematic follow-up process for proposals sent >7 days ago',
      'Sales team spending 40% of time on manual data entry instead of selling',
      'Competitive intelligence not being used effectively in negotiations',
      'Lead response time has increased to 12 hours (benchmark: <5 minutes)',
    ],
    immediateActions: [
      { action: 'Audit all 18 deals in Proposal stage and prioritize top 8 by value', time: 'Today', impact: 'High' },
      { action: 'Implement 3-touch follow-up cadence for pending proposals', time: 'Today', impact: 'Critical' },
      { action: 'Reduce lead response time to under 5 minutes with live chat', time: '48 hours', impact: 'High' },
      { action: 'Create competitive battle cards for top 3 competitors', time: 'This week', impact: 'Medium' },
    ],
    sevenDayPlan: [
      { day: 'Day 1', actions: ['Audit pipeline and identify stuck deals', 'Set up proposal follow-up sequence', 'Notify sales team of new process'] },
      { day: 'Day 2-3', actions: ['Implement live chat with AI qualification', 'Create battle cards', 'Train team on competitive positioning'] },
      { day: 'Day 4-5', actions: ['Review first batch of follow-ups', 'Adjust messaging based on response', 'Set up pipeline dashboard with alerts'] },
      { day: 'Day 6-7', actions: ['Measure initial results', 'Gather team feedback', 'Refine process for Week 2'] },
    ],
    thirtyDayPlan: [
      { week: 'Week 1', actions: ['Pipeline audit complete', 'Follow-up automation live', 'Response time improved to <5 min'] },
      { week: 'Week 2', actions: ['AI lead scoring implemented', 'Sales team trained on new tools', 'First pipeline health dashboard ready'] },
      { week: 'Week 3', actions: ['Monitor conversion improvements', 'A/B test follow-up messaging', 'Adjust lead routing rules'] },
      { week: 'Week 4', actions: ['Full process optimization', 'Team performance review', 'Set new quarterly targets'] },
    ],
    scripts: [
      { title: 'Proposal Follow-up Email', content: 'Subject: Following up on [Proposal Name]\n\nHi [Name],\n\nI wanted to check in on the proposal we sent on [Date]. I know you\'ve been reviewing it, and I wanted to see if you have any questions.\n\nWe\'ve actually had several clients with similar needs who found [specific feature/benefit] to be a game-changer.\n\nWould 15 minutes this Thursday work to walk through any questions you might have?\n\nBest,\n[Your Name]' },
      { title: 'Competitive Differentiator Script', content: 'When a prospect mentions [Competitor]:\n\n"I understand you\'re considering [Competitor]. They\'re a solid company. What many of our clients found when they compared us is that [Your Company] offers [specific advantage] that directly addresses [prospect pain point].\n\nFor example, [Case Study Client] switched from [Competitor] and saw [specific result] within 30 days.\n\nWould it be helpful to walk through a side-by-side comparison?"' },
    ],
    kpis: [
      { name: 'Win Rate', target: '28% to 35%', measurement: 'Monthly' },
      { name: 'Sales Cycle Length', target: '45 to 30 days', measurement: 'Per deal' },
      { name: 'Lead Response Time', target: '<5 minutes', measurement: 'Daily' },
      { name: 'Proposal-to-Close Rate', target: '40%', measurement: 'Weekly' },
    ],
    riskLevel: 'high',
    expectedImpact: 'Recovering $374K in stuck pipeline and improving win rate by 7 percentage points, adding an estimated $180K in closed revenue within 30 days.',
    confidenceScore: 87,
  },
  'churn': {
    problemId: 'churn',
    diagnosis: 'Customer churn is accelerating due to three primary factors: declining engagement among top accounts, slow time-to-value (23 days vs 14 day benchmark), and insufficient proactive support. Your top 5 accounts ($84K/month) show critical churn precursors with 55% reduced activity.',
    rootCauses: [
      'No automated churn detection system in place',
      'Account managers covering too many accounts (1:120 ratio)',
      'Customer onboarding taking nearly twice as long as industry standard',
      'No executive engagement program for high-value accounts',
    ],
    immediateActions: [
      { action: 'Schedule executive check-ins with top 5 at-risk accounts', time: 'Today', impact: 'Critical' },
      { action: 'Implement health score monitoring with automated alerts', time: 'Today', impact: 'High' },
      { action: 'Assign dedicated success managers to accounts over $5K/month', time: '48 hours', impact: 'High' },
      { action: 'Create 7-day onboarding acceleration program', time: 'This week', impact: 'Medium' },
    ],
    sevenDayPlan: [
      { day: 'Day 1', actions: ['Contact top 5 at-risk accounts personally', 'Set up health score dashboard', 'Alert team on critical accounts'] },
      { day: 'Day 2-3', actions: ['Assign success managers to high-value accounts', 'Create onboarding acceleration checklist', 'Implement engagement tracking'] },
      { day: 'Day 4-5', actions: ['Review account health daily', 'Send personalized value-add content', 'Schedule QBRs for top accounts'] },
      { day: 'Day 6-7', actions: ['Measure engagement improvement', 'Adjust account plans', 'Document learnings'] },
    ],
    thirtyDayPlan: [
      { week: 'Week 1', actions: ['Executive check-ins completed', 'Health monitoring live', 'Success managers assigned'] },
      { week: 'Week 2', actions: ['Onboarding program launched', 'Engagement tracking active', 'First weekly health reports generated'] },
      { week: 'Week 3', actions: ['Analyze engagement trends', 'Adjust account strategies', 'Scale successful tactics'] },
      { week: 'Week 4', actions: ['Full retention program operational', 'Team performance review', 'Set new retention targets'] },
    ],
    scripts: [
      { title: 'Executive Check-in Email', content: 'Subject: Ensuring [Company Name] is getting maximum value\n\nHi [Name],\n\nAs your executive sponsor at [Your Company], I wanted to personally check in on how things are going.\n\nI noticed your team has been less active recently, and I want to make sure we\'re delivering the value you expected.\n\nWould you be open to a 30-minute call this week to discuss your experience and any ways we can improve?\n\nLooking forward to connecting.\n\nBest,\n[Executive Name]' },
      { title: 'Re-engagement Sequence - Email 1', content: 'Subject: We miss you, [Name]\n\nIt\'s been a while since your team last used [Feature]. We\'ve shipped several updates since then that I think you\'ll love:\n\n- New: [Feature 1]\n- Improved: [Feature 2]\n- Now integrates with: [Tool]\n\nHere\'s a quick 2-minute video showing what\'s new:\n[Video Link]\n\nWant a quick walkthrough? Just reply to this email.' },
    ],
    kpis: [
      { name: 'Monthly Churn Rate', target: '3.2% to 1.5%', measurement: 'Monthly' },
      { name: 'Customer Health Score', target: '62% to 78%', measurement: 'Weekly' },
      { name: 'Time-to-Value', target: '23 to 14 days', measurement: 'Per customer' },
      { name: 'Account Engagement Score', target: '+40%', measurement: 'Weekly' },
    ],
    riskLevel: 'critical',
    expectedImpact: 'Preserving $84K/month in at-risk revenue and reducing overall churn rate from 3.2% to 1.5%, saving an estimated $360K in annual revenue.',
    confidenceScore: 91,
  },
  'default': {
    problemId: 'lead-conversion',
    diagnosis: 'Lead conversion is underperforming due to slow response times (12 hours vs <5 min benchmark), lack of qualification automation, and generic follow-up that fails to engage prospects. 90% of leads go cold within 7 days.',
    rootCauses: [
      'No automated lead qualification system',
      'Response time significantly exceeds industry benchmark',
      'Follow-up sequence is generic, not personalized',
      'Sales team lacks real-time lead engagement data',
    ],
    immediateActions: [
      { action: 'Set up instant lead response with AI qualification chatbot', time: 'Today', impact: 'Critical' },
      { action: 'Create personalized follow-up sequences based on lead source', time: 'Today', impact: 'High' },
      { action: 'Implement lead scoring model to prioritize hot leads', time: '48 hours', impact: 'High' },
    ],
    sevenDayPlan: [
      { day: 'Day 1', actions: ['Deploy AI qualification chatbot', 'Map lead source to follow-up sequences', 'Set response time monitoring'] },
      { day: 'Day 2-4', actions: ['Implement lead scoring', 'Create personalized templates', 'Train team on new process'] },
      { day: 'Day 5-7', actions: ['Monitor conversion rates', 'A/B test messaging', 'Optimize based on data'] },
    ],
    thirtyDayPlan: [
      { week: 'Week 1', actions: ['AI qualification live', 'Response time <5 min', 'Personalized sequences active'] },
      { week: 'Week 2', actions: ['Lead scoring operational', 'A/B testing messaging', 'First optimization batch'] },
      { week: 'Week 3-4', actions: ['Full optimization', 'Team performance review', 'Scale winning tactics'] },
    ],
    scripts: [
      { title: 'Website Visitor Follow-up', content: 'Subject: Saw you checking us out\n\nHi [Name],\n\nI noticed you were exploring our [Product/Feature] page. Great choice!\n\nHere\'s a quick case study showing how [Similar Company] achieved [Result] using this:\n[Link]\n\nWould you be open to a 10-minute chat to see if this could work for you too?' },
    ],
    kpis: [
      { name: 'Lead Response Time', target: '<5 minutes', measurement: 'Daily' },
      { name: 'Lead-to-Opportunity Rate', target: '12% to 25%', measurement: 'Weekly' },
      { name: 'Cold Lead Rate', target: '90% to 50%', measurement: 'Weekly' },
    ],
    riskLevel: 'high',
    expectedImpact: 'Improving lead-to-opportunity conversion from 12% to 25%, adding approximately 80 qualified opportunities per month.',
    confidenceScore: 84,
  },
}

export const warRoomProblemList = warRoomProblems
