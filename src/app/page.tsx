'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AIOrb } from '@/components/ui/ai-orb'
import { Sparkles, ArrowRight, Check, Star, ChevronDown, Menu, X, Brain, Users, Target, TrendingUp, Bot, Lightbulb, Swords, FileText, Play, Shield, Activity, ChevronRight, Globe, Zap, BarChart3, Database, Clock, AlertTriangle, Layers, CheckCircle2, Search, Infinity } from 'lucide-react'
import { cn } from '@/lib/utils'

const productMockups = [
  { id: 'cmd', label: 'Command Center', icon: Activity, desc: 'Real-time AI business health monitoring' },
  { id: 'neural', label: 'Neural Map', icon: Globe, desc: 'Interactive business system visualization' },
  { id: 'warroom', label: 'War Room', icon: Swords, desc: 'AI crisis action planning' },
  { id: 'strategy', label: 'Strategy Studio', icon: Brain, desc: 'AI strategy generator' },
  { id: 'automation', label: 'Automation Lab', icon: Bot, desc: 'AI workflow builder' },
  { id: 'reports', label: 'Reports', icon: FileText, desc: 'Automated business reporting' },
]

const painPoints = [
  { icon: Database, text: 'Business data scattered across 10+ tools' },
  { icon: Clock, text: 'Decisions take days, not minutes' },
  { icon: FileText, text: 'Reports require hours of manual work' },
  { icon: AlertTriangle, text: 'Opportunities missed without detection' },
  { icon: Users, text: 'Teams work in silos with no visibility' },
  { icon: Search, text: 'No one knows what to prioritize' },
]

const solutions = [
  { icon: Lightbulb, title: 'AI Insights', desc: 'Continuous analysis of all business data to find patterns and opportunities' },
  { icon: Brain, title: 'Strategy Generation', desc: 'Create comprehensive business strategies with goals, KPIs, and budgets' },
  { icon: Bot, title: 'Report Automation', desc: 'Auto-generate executive, sales, and financial reports on schedule' },
  { icon: Target, title: 'CRM Intelligence', desc: 'AI-enhanced customer management with health scores and risk detection' },
  { icon: Activity, title: 'Business Health Score', desc: 'Real-time health monitoring across revenue, customers, and operations' },
  { icon: Zap, title: 'Automation Lab', desc: 'Build AI automations that handle repetitive tasks and workflows' },
]

const features = [
  { icon: Activity, title: 'AI Business Health Score', desc: 'Real-time health monitoring across 12 business dimensions with AI recommendations.', gradient: 'from-primary to-secondary' },
  { icon: Lightbulb, title: 'Strategic Insights', desc: 'AI continuously analyzes your data to surface actionable insights and opportunities.', gradient: 'from-secondary to-accent' },
  { icon: FileText, title: 'AI Reports', desc: 'Generate executive, sales, marketing, and financial reports automatically.', gradient: 'from-primary to-accent' },
  { icon: TrendingUp, title: 'Sales Intelligence', desc: 'Pipeline analysis, deal scoring, and AI recommendations for every opportunity.', gradient: 'from-accent to-primary' },
  { icon: AlertTriangle, title: 'Customer Risk Detection', desc: 'Proactive churn detection with health scoring and retention recommendations.', gradient: 'from-danger to-warning' },
  { icon: Bot, title: 'Automation Builder', desc: 'Visual workflow builder for AI-powered business automations and alerts.', gradient: 'from-accent to-secondary' },
  { icon: Database, title: 'Knowledge Vault', desc: 'AI-powered document search and Q&A across your entire knowledge base.', gradient: 'from-primary to-info' },
  { icon: Brain, title: 'Executive Summaries', desc: 'Daily AI-generated executive briefings with top priorities and risks.', gradient: 'from-secondary to-primary' },
]

const useCases = [
  { icon: BriefcaseIcon, title: 'Agency Owners', desc: 'Manage client accounts, track deliverables, and generate performance reports automatically.' },
  { icon: Users, title: 'Consultants', desc: 'Analyze client businesses, create strategic recommendations, and track outcomes.' },
  { icon: Target, title: 'Founders', desc: 'Get a complete view of your business health with daily AI executive briefings.' },
  { icon: TrendingUp, title: 'Sales Teams', desc: 'Close more deals with AI pipeline analysis, lead scoring, and follow-up automation.' },
  { icon: Bot, title: 'Operations Managers', desc: 'Automate workflows, detect bottlenecks, and improve operational efficiency.' },
  { icon: BarChart3, title: 'Marketing Teams', desc: 'Optimize channel mix, track ROI, and generate campaign performance reports.' },
]

const testimonials = [
  { name: 'Marcus Rivera', role: 'CEO, TechFlow Dynamics', content: 'NEXORA AI found a churn risk in our top account that our entire team missed. We saved $84K in monthly revenue because of that alert.', rating: 5, company: 'TechFlow Dynamics' },
  { name: 'Dr. Elena Chen', role: 'COO, Meridian Health Systems', content: 'We generated our entire Q1 strategic plan in under 10 minutes. The AI\'s recommendations were more comprehensive than our previous consultant engagement.', rating: 5, company: 'Meridian Health' },
  { name: 'James Whitfield', role: 'Founder, CloudBase Technologies', content: 'The Neural Map alone is worth the subscription. Seeing my entire business as an interconnected system changed how I think about growth.', rating: 5, company: 'CloudBase Technologies' },
  { name: 'Priya Sharma', role: 'VP Operations, CoreBridge IT', content: 'We reduced report generation from 8 hours to 3 minutes. My team spends their time acting on insights instead of creating spreadsheets.', rating: 5, company: 'CoreBridge IT' },
]

const pricingPlans = [
  {
    name: 'Starter', price: '$29', desc: 'For solo founders and small teams getting started with AI-powered insights.',
    features: ['AI Command Center', '3 data sources', '5 AI reports/month', '10 AI insights/week', '3 automations', '2 team members', 'Email support'],
    cta: 'Start Free Trial', popular: false,
  },
  {
    name: 'Growth', price: '$99', desc: 'For growing businesses ready to scale with AI capabilities.',
    features: ['Unlimited AI insights', '25 AI reports/month', '25 automations', 'CRM Intelligence', 'Strategy Studio', 'Business Neural Map', 'Up to 10 team members', 'Priority support'],
    cta: 'Start Free Trial', popular: true,
  },
  {
    name: 'Scale', price: '$249', desc: 'For serious businesses needing maximum AI capabilities.',
    features: ['Unlimited AI reports', 'Unlimited automations', 'AI War Room', 'Advanced integrations', 'Custom dashboards', 'Advanced security', 'Unlimited team members', '24/7 priority support'],
    cta: 'Start Free Trial', popular: false,
  },
  {
    name: 'Enterprise', price: 'Custom', desc: 'For larger organizations with custom requirements.',
    features: ['Custom AI models', 'Dedicated onboarding', 'Advanced permissions & SSO', 'Custom integrations', 'Dedicated success manager', 'SLA guarantee', 'White-label options', 'On-premise deployment'],
    cta: 'Contact Sales', popular: false,
  },
]

const faqs = [
  { q: 'Is my business data secure?', a: 'Absolutely. We use enterprise-grade AES-256 encryption at rest and TLS 1.3 in transit. We are SOC 2 compliant and never share your data with third parties. Your business intelligence stays yours.' },
  { q: 'Do I need technical knowledge to use NEXORA AI?', a: 'Not at all. NEXORA AI is designed for business owners and teams, not engineers. If you can ask a question, you can use it. Connect your tools in minutes and start getting AI-powered insights immediately.' },
  { q: 'Can I use NEXORA AI without integrations?', a: 'Yes. You can manually input data, upload spreadsheets, or connect your tools. The more data you connect, the smarter the insights become, but you get value even with basic setup.' },
  { q: 'Is this for small businesses or enterprises?', a: 'Both. Our Starter plan is perfect for solo founders and small teams. Growth scales with growing businesses, and Enterprise handles complex organizations with custom needs.' },
  { q: 'Can I export reports and insights?', a: 'Yes. Every insight, report, and action plan can be exported as PDF, copied to clipboard, or shared via email. You own your data completely.' },
  { q: 'Can my entire team use it?', a: 'Yes. NEXORA AI supports team collaboration with role-based access, shared dashboards, and team notifications. Each plan includes a specific number of team members.' },
  { q: 'What data sources do you support?', a: 'We connect with Google Sheets, Excel, HubSpot, Salesforce, Shopify, Stripe, QuickBooks, Gmail, Slack, Notion, Google Analytics, Meta Ads, and more through our integrations.' },
  { q: 'Can I cancel my subscription?', a: 'Absolutely. No long-term contracts. You can upgrade, downgrade, or cancel at any time. Your data remains accessible for export.' },
]

function BriefcaseIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { scrollYProgress } = useScroll()
  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* ===== DYNAMIC NAV ===== */}
      <motion.nav
        style={{ opacity: navOpacity }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#060a16]/80 backdrop-blur-2xl border-b border-[rgba(79,140,255,0.06)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-9 h-9">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary opacity-90" />
              <div className="absolute inset-0 rounded-xl bg-primary/30 blur-md" />
              <Sparkles className="relative w-4 h-4 text-white" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[17px] font-bold tracking-tight gradient-text">NEXORA</span>
              <span className="text-[9px] font-semibold text-primary tracking-[0.2em] uppercase">AI</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {['product', 'features', 'use-cases', 'pricing', 'faq'].map((item) => (
              <button key={item} onClick={() => scrollTo(item)} className="text-sm text-foreground-muted/50 hover:text-foreground-muted transition-colors capitalize">
                {item.replace('-', ' ')}
              </button>
            ))}
            <Link href="/auth/login"><Button variant="ghost" size="sm" className="text-sm">Sign In</Button></Link>
            <Link href="/auth/signup"><Button variant="gradient" size="sm" className="text-sm">Get Started <ArrowRight className="w-3.5 h-3.5 ml-1.5" /></Button></Link>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-foreground-muted/50 hover:text-foreground-muted">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-[rgba(79,140,255,0.06)] px-4 py-4 space-y-3">
              {['product', 'features', 'use-cases', 'pricing', 'faq'].map((item) => (
                <button key={item} onClick={() => scrollTo(item)} className="block w-full text-left text-sm text-foreground-muted/50 hover:text-foreground-muted py-2 capitalize">
                  {item.replace('-', ' ')}
                </button>
              ))}
              <div className="flex gap-2 pt-2">
                <Link href="/auth/login" className="flex-1"><Button variant="glass" className="w-full">Sign In</Button></Link>
                <Link href="/auth/signup" className="flex-1"><Button variant="gradient" className="w-full">Get Started</Button></Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ===== 1. HERO ===== */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-background" />
        <div className="absolute inset-0 bg-dot-grid opacity-30" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-br from-primary/6 via-secondary/3 to-accent/3 rounded-full blur-[150px]" />
        <div className="absolute top-10 left-[10%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-[10%] w-[250px] h-[250px] bg-secondary/5 rounded-full blur-[80px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-6">
                <Badge variant="accent" size="lg">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  AI Business Command Center
                </Badge>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-balance"
              >
                Turn Your Business Into an{' '}
                <span className="gradient-text">Intelligent Command Center</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-lg text-foreground-muted/70 leading-relaxed mb-8 max-w-xl"
              >
                Stop guessing what to do next. NEXORA AI analyzes your entire business — detects risks, finds opportunities, 
                creates strategies, generates reports, and automates decisions. 
                <span className="text-foreground/80 font-medium"> Run your company like a mission control.</span>
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link href="/auth/signup">
                  <Button variant="gradient" size="xl" className="w-full sm:w-auto text-base">
                    Start Free <Sparkles className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button variant="glass" size="xl" className="w-full sm:w-auto text-base" onClick={() => scrollTo('product')}>
                  <Play className="w-5 h-5 mr-2" /> See Demo
                </Button>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                className="flex items-center gap-5 mt-8"
              >
                <div className="flex -space-x-2">
                  {['MR', 'EC', 'JW', 'PS'].map((initials, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background flex items-center justify-center text-[9px] font-bold text-white shadow-lg">
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => (<Star key={i} className="w-3.5 h-3.5 fill-warning text-warning" />))}
                  </div>
                  <span className="text-sm text-foreground-muted/50">Trusted by 2,000+ businesses</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent rounded-full blur-3xl" />
                <AIOrb size="xl" pulsing={true} />

                {/* Floating metric cards */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                  className="absolute -left-16 top-8 glass-card rounded-2xl p-3.5 border shadow-2xl"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <div className="text-xs text-foreground-muted/40">Revenue Growth</div>
                      <div className="text-sm font-bold text-accent">+12.5%</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
                  className="absolute -right-16 bottom-12 glass-card rounded-2xl p-3.5 border shadow-2xl"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-foreground-muted/40">Health Score</div>
                      <div className="text-sm font-bold gradient-text">78.5</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-panel-strong rounded-2xl px-5 py-3 border shadow-2xl whitespace-nowrap"
                >
                  <div className="flex items-center gap-3">
                    <span className="status-dot active" />
                    <span className="text-xs text-foreground-muted/50">AI System Online · </span>
                    <span className="text-xs font-semibold text-accent">All Systems Operational</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Trust bar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-16 pt-8 border-t border-[rgba(79,140,255,0.06)]"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs text-foreground-muted/30">
              <span className="font-semibold tracking-wider uppercase">Trusted by teams at</span>
              {['TechFlow', 'Meridian Health', 'CloudBase', 'Pinnacle Financial', 'Spectrum Digital', 'CoreBridge IT'].map((c) => (
                <span key={c} className="text-foreground-muted/20 font-bold tracking-wider text-sm opacity-50">{c}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 2. PROBLEM ===== */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-danger/[0.02] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <Badge variant="danger" size="lg" className="mb-4">
              <AlertTriangle className="w-3 h-3 mr-1" />
              The Problem
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Running a business today is chaos</h2>
            <p className="text-foreground-muted/60 max-w-2xl mx-auto">Your data is scattered. Your tools don't talk to each other. And you're making decisions without a complete picture.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {painPoints.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="glass-card rounded-xl p-5 border border-danger/10 hover:border-danger/20 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-danger/10 border border-danger/20 flex items-center justify-center shrink-0">
                      <Icon className="w-[18px] h-[18px] text-danger" />
                    </div>
                    <p className="text-sm text-foreground-muted/70 group-hover:text-foreground-muted/90 transition-colors">{item.text}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== 3. SOLUTION ===== */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <Badge variant="accent" size="lg" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              The Solution
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">One AI command center for your entire business</h2>
            <p className="text-foreground-muted/60 max-w-2xl mx-auto">Connect your tools, get instant insights, and let AI do the heavy lifting.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {solutions.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="glass-card rounded-xl p-6 border hover:border-primary/20 transition-all group card-interactive"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5.5 h-5.5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-foreground-muted/60 leading-relaxed">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== 4. PRODUCT SHOWCASE ===== */}
      <section id="product" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <Badge variant="default" size="lg" className="mb-4">
              <Globe className="w-3 h-3 mr-1" />
              Product
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Everything you need, one command center</h2>
            <p className="text-foreground-muted/60 max-w-2xl mx-auto">Six powerful modules that work together to run your business.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productMockups.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="glass-card rounded-xl p-6 border hover:border-primary/20 transition-all group cursor-pointer relative overflow-hidden"
                >
                  {/* Mock preview gradient */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-50" />
                  
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/5 border border-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-base font-semibold group-hover:text-primary transition-colors">{item.label}</h3>
                      <Badge variant="accent" size="sm">
                        <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                        AI
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground-muted/60">{item.desc}</p>
                    
                    {/* Mini preview bar */}
                    <div className="mt-4 flex items-center gap-1.5">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="h-1 rounded-full bg-primary/10 flex-1 group-hover:bg-primary/20 transition-colors" style={{ width: `${[68, 42, 55][j]}%` }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Preview CTA */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <Link href="/auth/signup">
              <Button variant="gradient" size="lg">
                Explore All Features <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== 5. FEATURES ===== */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <Badge variant="secondary" size="lg" className="mb-4">
              <Zap className="w-3 h-3 mr-1" />
              Features
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Powerful AI capabilities, simple interface</h2>
            <p className="text-foreground-muted/60 max-w-2xl mx-auto">Every feature is designed to save you time and help you make better decisions.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="glass-card rounded-xl p-5 border hover-lift-sm group card-interactive"
                >
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br shadow-lg", feature.gradient)}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold mb-1.5 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-xs text-foreground-muted/60 leading-relaxed">{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== 6. USE CASES ===== */}
      <section id="use-cases" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <Badge variant="default" size="lg" className="mb-4">
              <Users className="w-3 h-3 mr-1" />
              Use Cases
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Built for every role</h2>
            <p className="text-foreground-muted/60 max-w-2xl mx-auto">From founders to operations managers, NEXORA AI adapts to how you work.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="glass-card rounded-xl p-5 border hover-lift-sm group card-interactive"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/5 border border-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-xs text-foreground-muted/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== 7. BEFORE VS AFTER ===== */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Before vs. After NEXORA</h2>
            <p className="text-foreground-muted/60">See how your business operations transform.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Before */}
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="rounded-2xl bg-gradient-to-br from-danger/[0.04] to-transparent border border-danger/10 p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-danger/10 border border-danger/20 flex items-center justify-center">
                  <X className="w-4 h-4 text-danger" />
                </div>
                <h3 className="text-base font-semibold text-danger">Before NEXORA</h3>
              </div>
              <div className="space-y-3.5">
                {[
                  { icon: Clock, text: 'Manual reports that take hours to compile' },
                  { icon: Layers, text: 'Scattered tools with no central view' },
                  { icon: Clock, text: 'Slow, reactive decision-making' },
                  { icon: AlertTriangle, text: 'Constant firefighting, no strategy' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-danger/10 border border-danger/20 flex items-center justify-center shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-danger" />
                    </div>
                    <span className="text-sm text-foreground-muted/70">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* After */}
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="rounded-2xl bg-gradient-to-br from-accent/[0.06] to-transparent border border-accent/15 p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-accent">After NEXORA</h3>
              </div>
              <div className="space-y-3.5">
                {[
                  { icon: Sparkles, text: 'AI recommendations delivered daily' },
                  { icon: BarChart3, text: 'Automated insights from all your data' },
                  { icon: Target, text: 'Clear priorities ranked by impact' },
                  { icon: TrendingUp, text: 'Faster growth with data-driven strategy' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span className="text-sm text-foreground-muted/70">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 8. TESTIMONIALS ===== */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Trusted by business leaders</h2>
            <p className="text-foreground-muted/60">See what companies are saying about NEXORA AI.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="glass-card rounded-xl p-6 border hover-lift-sm"
              >
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm text-foreground-muted/70 leading-relaxed mb-4">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-white">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-foreground-muted/40">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. PRICING ===== */}
      <section id="pricing" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <Badge variant="default" size="lg" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Pricing
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-foreground-muted/60">Start free. Upgrade when you grow. No hidden fees.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  "rounded-2xl p-6 border relative transition-all duration-300",
                  plan.popular
                    ? 'bg-gradient-to-b from-primary/[0.08] to-transparent border-primary/20 scale-[1.02] shadow-xl shadow-primary/5'
                    : 'glass-card border'
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-semibold shadow-lg shadow-primary/20">
                    Most Popular
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="text-base font-semibold mb-1">{plan.name}</h3>
                  <p className="text-xs text-foreground-muted/50 mb-4">{plan.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                    <span className="text-sm text-foreground-muted/50">{plan.name !== 'Enterprise' ? '/month' : ''}</span>
                  </div>
                </div>
                <div className="space-y-2.5 mb-6">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-sm text-foreground-muted/70">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link href="/auth/signup">
                  <Button variant={plan.popular ? 'gradient' : plan.name === 'Enterprise' ? 'glass' : 'glass'} className="w-full h-11">
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10. FAQ ===== */}
      <section id="faq" className="py-24 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Questions? We have answers.</h2>
            <p className="text-foreground-muted/60">Everything you need to know about NEXORA AI.</p>
          </motion.div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                className="glass-card rounded-xl border hover:border-primary/15 transition-all"
              >
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <span className="text-sm font-medium text-foreground/80">{faq.q}</span>
                  <ChevronDown className={cn("w-4 h-4 text-foreground-muted/30 transition-transform duration-200 shrink-0 ml-4", openFaq === i && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="px-5 pb-4 text-sm text-foreground-muted/60 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 11. FINAL CTA ===== */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-12 lg:p-16 border border-primary/20 shadow-2xl shadow-primary/5"
          >
            {/* Premium background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/5" />
            <div className="absolute inset-0 bg-dot-grid-dense opacity-20" />
            <div className="absolute inset-0 bg-scan-line pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-primary/10 to-secondary/5 rounded-full blur-[120px]" />

            <div className="relative">
              <AIOrb size="lg" className="mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Your business deserves a command center.</h2>
              <p className="text-lg text-foreground-muted/60 mb-8 max-w-lg mx-auto">
                Join 2,000+ businesses using NEXORA AI to turn data into decisions, strategies, and growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/auth/signup">
                  <Button variant="gradient" size="xl" className="text-base">
                    Start Free <Sparkles className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button variant="glass" size="xl" className="text-base" onClick={() => scrollTo('product')}>
                  <Play className="w-5 h-5 mr-2" /> Watch Demo
                </Button>
              </div>
              <div className="flex items-center justify-center gap-2 mt-6">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span className="text-sm text-foreground-muted/50">No credit card required · 14-day free trial · Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[rgba(79,140,255,0.06)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-bold gradient-text">NEXORA AI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-foreground-muted/30">
              <a href="#" className="hover:text-foreground-muted/60 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground-muted/60 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground-muted/60 transition-colors">Contact</a>
              <a href="#" className="hover:text-foreground-muted/60 transition-colors">Documentation</a>
            </div>
            <div className="text-sm text-foreground-muted/20">© 2024 NEXORA AI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
