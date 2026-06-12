'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Lightbulb, Swords, Bot, FileText, Users,
  TrendingUp, Database, CheckSquare2, Settings, Puzzle,
  ChevronLeft, ChevronRight, Sparkles, Activity, Network, Zap,
  CreditCard
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { href: '/dashboard', label: 'Command Center', icon: LayoutDashboard },
  { href: '/dashboard/neural-map', label: 'Neural Map', icon: Network },
  { href: '/dashboard/war-room', label: 'War Room', icon: Swords },
  { href: '/dashboard/insights', label: 'Insights Engine', icon: Lightbulb },
  { href: '/dashboard/strategy-studio', label: 'Strategy Studio', icon: Bot },
  { href: '/dashboard/automation-lab', label: 'Automation Lab', icon: Zap },
  { href: '/dashboard/reports', label: 'Reports', icon: FileText },
  { href: '/dashboard/customers', label: 'Customers', icon: Users },
  { href: '/dashboard/pipeline', label: 'Pipeline', icon: TrendingUp },
  { href: '/dashboard/knowledge-vault', label: 'Knowledge Vault', icon: Database },
  { href: '/dashboard/action-center', label: 'Action Center', icon: CheckSquare2 },
  { href: '/dashboard/integrations', label: 'Integrations', icon: Puzzle },
  { href: '/dashboard/pricing', label: 'Pricing', icon: CreditCard },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 264 }}
      transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      className={cn(
        "fixed left-0 top-0 h-full z-40",
        "bg-[#060a16]/95 backdrop-blur-2xl border-r border-[rgba(79,140,255,0.08)]",
        "flex flex-col overflow-hidden"
      )}
    >
      {/* Logo Section */}
      <div className={cn(
        "flex items-center gap-3 h-[68px] shrink-0 border-b border-[rgba(79,140,255,0.06)]",
        collapsed ? "justify-center px-2" : "px-5"
      )}>
        <div className="relative flex items-center justify-center w-9 h-9 shrink-0">
          {/* Glow */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/40 to-secondary/30 blur-md animate-breathe" />
          {/* Icon bg */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary opacity-90" />
          <Sparkles className="relative w-[18px] h-[18px] text-white" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col"
          >
            <div className="flex items-baseline gap-1">
              <span className="text-[17px] font-bold tracking-tight gradient-text">NEXORA</span>
              <span className="text-[10px] font-semibold text-primary tracking-[0.2em] uppercase">AI</span>
            </div>
            <span className="text-[9px] text-foreground-muted/50 tracking-wider uppercase mt-px">Command Center</span>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-0.5 hide-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group",
                collapsed && "justify-center px-2 py-2.5",
                isActive
                  ? "text-white"
                  : "text-foreground-muted/60 hover:text-foreground-muted"
              )}
            >
              {/* Active bg */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-bg"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/12 via-primary/8 to-transparent border border-primary/10"
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />
              )}

              {/* Hover bg */}
              {!isActive && (
                <div className="absolute inset-0 rounded-xl bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
              )}

              {/* Active left indicator */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-gradient-to-b from-primary via-secondary to-accent"
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />
              )}

              {/* Icon container */}
              <div className={cn(
                "relative flex items-center justify-center w-5 h-5 shrink-0 z-10 transition-colors duration-200",
                isActive ? "text-primary" : "text-foreground-muted/50 group-hover:text-foreground-muted/80"
              )}>
                <Icon className="w-[18px] h-[18px]" />
              </div>

              {/* Label */}
              {!collapsed && (
                <span className="z-10">{item.label}</span>
              )}

              {/* Active dot indicator when collapsed */}
              {collapsed && isActive && (
                <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(79,140,255,0.5)]" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="shrink-0 border-t border-[rgba(79,140,255,0.06)]">
        {/* Plan & Upgrade */}
        {!collapsed ? (
          <div className="px-4 py-3">
            <div className="relative rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 p-3 overflow-hidden group cursor-pointer" onClick={() => router.push('/dashboard/pricing')}>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
              <div className="relative">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-primary/80 uppercase tracking-wider">Starter Plan</span>
                    <div className="text-[7px] px-1 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Trial</div>
                  </div>
                  <span className="text-[9px] text-primary/60 group-hover:text-primary transition-colors">Upgrade →</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex-1 h-1 rounded-full bg-white/[0.04] overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: '35%' }} />
                  </div>
                  <span className="text-[8px] text-foreground-muted/30">11 days left</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-2">
            <div
              className="relative w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center cursor-pointer group"
              onClick={() => router.push('/dashboard/pricing')}
            >
              <CreditCard className="w-4 h-4 text-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent flex items-center justify-center">
                <Zap className="w-2 h-2 text-white" />
              </div>
            </div>
          </div>
        )}

        {/* AI Status */}
        {!collapsed ? (
          <div className="px-4 pb-1">
            <div className="flex items-center gap-2">
              <span className="status-dot active" />
              <span className="text-[9px] text-foreground-muted/30">AI System · v2.4</span>
              <span className="text-[9px] text-foreground-muted/20 ml-auto">All ops</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-1">
            <span className="status-dot active" />
          </div>
        )}

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center h-9 text-foreground-muted/30 hover:text-foreground-muted/60 hover:bg-white/[0.02] transition-all duration-200"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>
    </motion.aside>
  )
}
