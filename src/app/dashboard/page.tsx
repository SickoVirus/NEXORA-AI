'use client'

import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { AIOrb } from '@/components/ui/ai-orb'
import { MetricCard } from '@/components/ui/metric-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockMetrics, mockInsights, mockDeals, mockTasks, chartData as mockChartData } from '@/lib/mock-data'
import { useDemoData, demoMetrics, demoInsights, demoDeals, demoTasks, demoChartData } from '@/lib/demo-mode'
import { formatCurrency } from '@/lib/utils'
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle2, Clock, ArrowRight, Brain, Bot, Zap, Users, Activity, BarChart3, Download, Target, Eye, ChevronRight, Lightbulb, PieChart as PieChartIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03 }
  }
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 25, stiffness: 300 } }
} as const

export default function CommandCenter() {
  const { isDemo } = useDemoData()
  const metrics = isDemo ? demoMetrics : mockMetrics
  const insights = isDemo ? demoInsights : mockInsights
  const deals = isDemo ? demoDeals : mockDeals
  const tasks = isDemo ? demoTasks : mockTasks
  const chartData = isDemo ? demoChartData : mockChartData

  const topInsights = insights.slice(0, 3)
  const topDeals = deals.slice(0, 4)
  const priorityTasks = tasks.filter(t => t.status !== 'done').slice(0, 5)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* ===== HEADER ===== */}
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md animate-pulse-glow" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Command Center</h1>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20">
              <span className="status-dot active" />
              <span className="text-[10px] font-semibold text-accent">Live</span>
            </div>
          </div>
          <p className="text-sm text-foreground-muted/60">Your AI-powered business mission control</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="glass" size="sm" className="h-9">
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export
          </Button>
          <Button variant="gradient" size="sm" className="h-9">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            AI Briefing
          </Button>
        </div>
      </motion.div>

      {/* ===== AI HEALTH + EXECUTIVE SUMMARY ===== */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Health Score - Premium Orb */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/[0.06] via-secondary/[0.03] to-accent/[0.04] border border-primary/[0.08] p-6 flex flex-col items-center justify-center text-center group">
          {/* Subtle scan line */}
          <div className="absolute inset-0 bg-scan-line pointer-events-none" />
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-dot-grid-dense opacity-30 pointer-events-none" />

          <div className="relative">
            <AIOrb size="lg" />
          </div>

          <div className="relative mt-4 space-y-1">
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl font-bold tracking-tight gradient-text">78.5</span>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20">
                <TrendingUp className="w-3 h-3 text-accent" />
                <span className="text-[9px] font-semibold text-accent">+3.2%</span>
              </div>
            </div>
            <p className="text-sm text-foreground-muted/50 font-medium">AI Business Health Score</p>
          </div>

          {/* Health bars */}
          <div className="relative mt-5 w-full space-y-2.5">
            {[
              { label: 'Revenue Health', value: 85, color: 'bg-accent' },
              { label: 'Customer Health', value: 62, color: 'bg-warning' },
              { label: 'Pipeline Health', value: 78, color: 'bg-primary' },
            ].map((item, i) => (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-foreground-muted/40">{item.label}</span>
                  <span className={cn("font-semibold", item.color.replace('bg-', 'text-'))}>{item.value}%</span>
                </div>
                <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                    className={cn("h-full rounded-full", item.color)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Summary */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-base font-semibold">AI Executive Summary</h2>
            <Badge variant="accent" size="sm" className="ml-auto">
              <Sparkles className="w-3 h-3 mr-1" />
              Updated 2m ago
            </Badge>
          </div>

          <p className="text-sm text-foreground-muted/70 leading-relaxed mb-5">
            Your business is showing <span className="text-accent font-semibold">strong momentum</span> with 12.5% revenue growth this quarter.
            The enterprise segment is driving growth at <span className="text-primary font-semibold">34% QoQ</span>.
            <span className="text-warning font-semibold"> 3 critical risks</span> require immediate attention: top accounts showing churn signals,
            invoice collection delays, and pipeline stagnation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Revenue Growth', value: '+12.5%', color: 'text-accent', bar: 'bg-accent', barWidth: '75%' },
              { label: 'Pipeline Value', value: '$892K', color: 'text-primary', bar: 'bg-primary', barWidth: '60%' },
              { label: 'Critical Risks', value: '3', color: 'text-danger', bar: 'bg-danger', barWidth: '30%' },
            ].map((item, i) => (
              <div key={item.label} className="card-premium rounded-xl p-3.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-foreground-muted/40">{item.label}</span>
                  <span className={cn("text-sm font-bold", item.color)}>{item.value}</span>
                </div>
                <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: item.barWidth }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                    className={cn("h-full rounded-full", item.bar)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ===== METRICS GRID ===== */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {metrics.map((metric, i) => {
          const icons = {
            'trending-up': TrendingUp,
            'layers': BarChart3,
            'briefcase': Activity,
            'target': Zap,
            'users': Users,
            'brain': Brain,
          }
          return (
            <MetricCard
              key={metric.id}
              label={metric.label}
              value={metric.value}
              change={metric.change}
              trend={metric.trend}
              icon={icons[metric.icon as keyof typeof icons] || TrendingUp}
              index={i}
            />
          )
        })}
      </motion.div>

      {/* ===== AI INSIGHTS + PRIORITY ACTIONS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* AI Insights */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/10 flex items-center justify-center">
                <Lightbulb className="w-3.5 h-3.5 text-primary" />
              </div>
              <h2 className="text-base font-semibold">AI Insights</h2>
              <Badge variant="default" size="sm">8 total</Badge>
            </div>
            <Button variant="ghost" size="sm" className="text-xs h-7">
              View All <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>

          <div className="space-y-2.5">
            {topInsights.map((insight, i) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-xl p-4 border hover:border-primary/15 transition-all cursor-pointer group card-interactive"
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border relative",
                    insight.priority === 'critical' && 'bg-danger/10 border-danger/20',
                    insight.priority === 'high' && 'bg-warning/10 border-warning/20',
                    insight.priority === 'medium' && 'bg-primary/10 border-primary/20',
                  )}>
                    {insight.priority === 'critical' ? (
                      <>
                        <AlertTriangle className="w-4 h-4 text-danger" />
                        <div className="absolute inset-0 rounded-lg bg-danger/10 animate-pulse-glow" />
                      </>
                    ) : (
                      <Lightbulb className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h4 className="text-sm font-semibold text-foreground/90 group-hover:text-primary transition-colors duration-200">
                        {insight.title}
                      </h4>
                      <Badge variant={insight.priority === 'critical' ? 'danger' : insight.priority === 'high' ? 'warning' : 'default'} size="sm">
                        {insight.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-foreground-muted/60 line-clamp-2 leading-relaxed">{insight.explanation}</p>
                    {/* Impact indicator */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 max-w-[100px]">
                        <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${insight.impact}%` }}
                            transition={{ delay: 0.3 + i * 0.08, duration: 0.8 }}
                            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                          />
                        </div>
                      </div>
                      <span className="text-[9px] text-foreground-muted/30 font-mono">{insight.impact}% impact</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-foreground-muted/20 group-hover:text-primary/40 transition-colors mt-2 shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Priority Actions */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/10 flex items-center justify-center">
              <Target className="w-3.5 h-3.5 text-accent" />
            </div>
            <h2 className="text-base font-semibold">Today's Priorities</h2>
          </div>

          <div className="space-y-2">
            {priorityTasks.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="glass-card rounded-xl p-3.5 border hover:border-primary/15 transition-all cursor-pointer group card-interactive"
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-1.5 shrink-0 relative",
                    task.priority === 'urgent' && 'bg-danger',
                    task.priority === 'high' && 'bg-warning',
                    task.priority === 'medium' && 'bg-primary',
                    task.priority === 'low' && 'bg-foreground-muted/30',
                  )}>
                    {task.priority === 'urgent' && (
                      <div className="absolute inset-[-3px] rounded-full bg-danger/20 animate-pulse-glow" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium text-foreground/90">{task.title}</h4>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-[10px] text-foreground-muted/40 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.due}
                      </span>
                      <span className="divider-dot" />
                      <span className="text-[10px] text-foreground-muted/40">Impact: {task.impact}%</span>
                      <span className="divider-dot" />
                      <span className="text-[10px] text-foreground-muted/40 capitalize">{task.category}</span>
                    </div>
                  </div>
                  {/* Mini impact bar */}
                  <div className="w-10 h-1 rounded-full bg-white/[0.04] overflow-hidden self-center">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${task.impact}%` }}
                      transition={{ delay: 0.2 + i * 0.04, duration: 0.6 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Button variant="glass" size="sm" className="w-full text-xs h-9">
            View All Tasks <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </motion.div>
      </div>

      {/* ===== CHARTS SECTION ===== */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Revenue Trend Chart */}
        <div className="glass-card rounded-2xl p-5 border">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/10 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
            </div>
            <h2 className="text-base font-semibold">Revenue Trend</h2>
            <Badge variant="accent" size="sm" className="ml-auto">+12.5% YoY</Badge>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData.revenue}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f8cff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4f8cff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(79,140,255,0.06)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(8,13,26,0.95)',
                    border: '1px solid rgba(79,140,255,0.15)',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  }}
                  labelStyle={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="value" stroke="#4f8cff" strokeWidth={2} fill="url(#revenueGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Marketing Channels Chart */}
        <div className="glass-card rounded-2xl p-5 border">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-secondary/10 to-accent/5 border border-secondary/10 flex items-center justify-center">
              <PieChartIcon className="w-3.5 h-3.5 text-secondary" />
            </div>
            <h2 className="text-base font-semibold">Marketing ROI by Channel</h2>
            <Badge variant="secondary" size="sm" className="ml-auto">168% Avg ROI</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.marketingChannels}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {chartData.marketingChannels.map((entry, i) => (
                      <Cell key={i} fill={['#4f8cff', '#8b5cf6', '#06d6a0', '#38bdf8'][i]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(8,13,26,0.95)',
                      border: '1px solid rgba(79,140,255,0.15)',
                      borderRadius: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center space-y-2">
              {chartData.marketingChannels.map((channel, i) => (
                <div key={channel.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className={['w-2 h-2 rounded-full', 'bg-primary', 'bg-secondary', 'bg-accent', 'bg-info'][i]} />
                    <span className="text-foreground-muted/60">{channel.name}</span>
                  </div>
                  <span className="font-semibold text-foreground/80">{channel.roi}%</span>
                </div>
              ))
            }
            </div>
          </div>
        </div>
      </motion.div>

      {/* ===== PIPELINE OVERVIEW ===== */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/10 flex items-center justify-center">
              <BarChart3 className="w-3.5 h-3.5 text-primary" />
            </div>
            <h2 className="text-base font-semibold">Sales Pipeline</h2>
            <Badge variant="default" size="sm">
              <Eye className="w-3 h-3 mr-1" />
              AI Monitored
            </Badge>
          </div>
          <Button variant="ghost" size="sm" className="text-xs h-7">
            View Full Pipeline <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'].map((stage, i) => {
            const stageDeals = mockDeals.filter(d => d.stage === stage)
            const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0)
            const stageColors: Record<string, string> = {
              new: 'border-primary/20 bg-gradient-to-b from-primary/[0.04] to-transparent',
              contacted: 'border-info/20 bg-gradient-to-b from-info/[0.04] to-transparent',
              qualified: 'border-secondary/20 bg-gradient-to-b from-secondary/[0.04] to-transparent',
              proposal: 'border-warning/20 bg-gradient-to-b from-warning/[0.04] to-transparent',
              negotiation: 'border-warning/30 bg-gradient-to-b from-warning/[0.06] to-transparent',
              won: 'border-accent/20 bg-gradient-to-b from-accent/[0.04] to-transparent',
              lost: 'border-danger/20 bg-gradient-to-b from-danger/[0.04] to-transparent',
            }
            const stageLabels: Record<string, string> = {
              new: 'New Leads', contacted: 'Contacted', qualified: 'Qualified',
              proposal: 'Proposal', negotiation: 'Negotiation', won: 'Won', lost: 'Lost'
            }
            return (
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  "rounded-xl p-3.5 border text-center transition-all duration-200 hover:scale-[1.02] cursor-pointer",
                  stageColors[stage]
                )}
              >
                <div className="text-[10px] font-medium text-foreground-muted/40 mb-1.5 uppercase tracking-wider">{stageLabels[stage]}</div>
                <div className="text-lg font-bold text-foreground/90">{stageDeals.length}</div>
                <div className="text-[10px] text-foreground-muted/40 mt-0.5 font-mono">{formatCurrency(totalValue, true)}</div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* ===== ACTIVE AUTOMATIONS ===== */}
      <motion.div variants={itemVariants}>
        <div className="glass-card rounded-2xl border p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/10 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-accent" />
              </div>
              <h2 className="text-base font-semibold">Active Automations</h2>
              <Badge variant="accent" size="sm">
                <Activity className="w-3 h-3 mr-1" />
                4 Running
              </Badge>
            </div>
            <Button variant="ghost" size="sm" className="text-xs h-7">
              Manage <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { name: 'Cold Lead Follow-up', status: 'active', runs: '147', icon: Zap, desc: 'Auto-email generation' },
              { name: 'Weekly Report', status: 'active', runs: '24', icon: BarChart3, desc: 'Monday 8 AM digest' },
              { name: 'Sales Drop Alert', status: 'active', runs: '8', icon: AlertTriangle, desc: '10% drop detection' },
              { name: 'Churn Detection', status: 'active', runs: '56', icon: Activity, desc: 'Risk score monitoring' },
            ].map((auto, i) => {
              const Icon = auto.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="card-premium rounded-xl p-3.5 hover:border-accent/15 transition-all group"
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="relative">
                      <Icon className="w-4 h-4 text-accent" />
                      <div className="absolute inset-0 w-4 h-4 rounded-full bg-accent/15 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xs font-semibold text-foreground/80 flex-1">{auto.name}</span>
                    <span className="status-dot active" />
                  </div>
                  <p className="text-[10px] text-foreground-muted/40 mb-2">{auto.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-foreground-muted/30">{auto.runs} total runs</span>
                    <span className="text-[9px] text-accent/60 font-medium">View →</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
