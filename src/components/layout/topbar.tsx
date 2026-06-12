'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { Bell, Search, Zap, Menu, Command, ChevronDown, Sparkles, LogOut, Settings, User, Play, Monitor, X, Star } from 'lucide-react'
import { mockNotifications } from '@/lib/mock-data'
import { useDemo } from '@/lib/demo-mode'
import { useSubscription } from '@/lib/subscription-context'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

interface TopbarProps {
  onMenuToggle: () => void
}

export function Topbar({ onMenuToggle }: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const { isDemo, setDemoMode, setTourActive } = useDemo()
  const { subscription, openUpgrade } = useSubscription()
  const [showDemoDropdown, setShowDemoDropdown] = useState(false)
  const unreadCount = mockNotifications.filter(n => !n.read).length

  return (
    <header className="h-16 bg-[#060a16]/60 backdrop-blur-2xl border-b border-[rgba(79,140,255,0.06)] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl hover:bg-white/[0.04] text-foreground-muted/50 hover:text-foreground-muted transition-all duration-200"
        >
          <Menu className="w-[18px] h-[18px]" />
        </button>

        {/* Premium Search */}
        <div className="hidden md:flex items-center gap-2.5 bg-white/[0.03] hover:bg-white/[0.05] border border-[rgba(79,140,255,0.06)] hover:border-[rgba(79,140,255,0.12)] rounded-xl px-3.5 py-1.5 min-w-[300px] transition-all duration-200 group">
          <Search className="w-4 h-4 text-foreground-muted/30 group-focus-within:text-primary/60 transition-colors" />
          <input
            type="text"
            placeholder="Search commands, insights, reports..."
            className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-foreground-muted/25 w-full"
          />
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-white/[0.04] border border-[rgba(79,140,255,0.06)]">
            <Command className="w-2.5 h-2.5 text-foreground-muted/30" />
            <span className="text-[9px] font-mono text-foreground-muted/30">K</span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5">
        {/* Demo Mode Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowDemoDropdown(!showDemoDropdown)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all border",
              isDemo
                ? "bg-primary/10 border-primary/20 text-primary"
                : "bg-white/[0.03] border-[rgba(79,140,255,0.06)] text-foreground-muted/50 hover:text-foreground-muted hover:bg-white/[0.05]"
            )}
          >
            <div className={cn("relative", isDemo && "animate-pulse")}>
              <Monitor className="w-3.5 h-3.5" />
              {isDemo && <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-primary/20 blur-sm animate-pulse-glow" />}
            </div>
            <span>{isDemo ? 'Demo Active' : 'Demo Mode'}</span>
          </button>

          <AnimatePresence>
            {showDemoDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowDemoDropdown(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="absolute right-0 top-full mt-2 w-[300px] bg-[#080c1a]/95 backdrop-blur-2xl rounded-2xl border border-[rgba(79,140,255,0.1)] shadow-2xl z-50 overflow-hidden"
                >
                  <div className="p-3 border-b border-[rgba(79,140,255,0.06)]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold">Demo Mode</h4>
                        <p className="text-[10px] text-foreground-muted/40">Showcase NEXORA AI with sample data</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => { setDemoMode(true); setShowDemoDropdown(false) }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                        isDemo
                          ? "bg-primary/10 text-primary"
                          : "text-foreground-muted/60 hover:text-foreground-muted hover:bg-white/[0.03]"
                      )}
                    >
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/10 flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="text-left">
                        <span className="text-sm">Atlas Growth Studio</span>
                        {isDemo && <span className="ml-2 text-[9px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">Active</span>}
                        <p className="text-[10px] text-foreground-muted/40">Marketing Agency · 18 team members</p>
                      </div>
                    </button>

                    <button
                      onClick={() => { setDemoMode(false); setShowDemoDropdown(false) }}
                      disabled={!isDemo}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                        !isDemo
                          ? "opacity-30 cursor-not-allowed"
                          : "text-foreground-muted/60 hover:text-foreground-muted hover:bg-white/[0.03]"
                      )}
                    >
                      <div className="w-7 h-7 rounded-lg border border-glass-border flex items-center justify-center">
                        <X className="w-3.5 h-3.5 text-foreground-muted/40" />
                      </div>
                      <span>Exit Demo Mode</span>
                    </button>
                  </div>

                  {isDemo && (
                    <div className="p-2 border-t border-[rgba(79,140,255,0.06)]">
                      <button
                        onClick={() => { setTourActive(true); setShowDemoDropdown(false) }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-foreground-muted/50 hover:text-foreground-muted hover:bg-white/[0.03] transition-all"
                      >
                        <Play className="w-3 h-3" />
                        Take Product Tour
                      </button>
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Upgrade CTA / Plan Badge */}
        <div className="hidden sm:flex items-center gap-2">
          {subscription.status === 'trial' ? (
            <button
              onClick={() => openUpgrade()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent/10 border border-accent/20 hover:bg-accent/15 transition-all group"
            >
              <div className="relative">
                <Star className="w-3.5 h-3.5 text-accent" />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-accent leading-tight">Trial: {subscription.trialDaysRemaining}d</div>
                <div className="text-[8px] text-foreground-muted/40 leading-tight">Upgrade →</div>
              </div>
            </button>
          ) : (
            <Badge variant="glass" size="sm">
              <Zap className="w-3 h-3 mr-1 text-primary" />
              Active
            </Badge>
          )}
        </div>

        {/* AI Status */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5">
          <span className="status-dot active" />
          <span className="text-[11px] text-foreground-muted/40 font-medium">AI Ready</span>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-[rgba(79,140,255,0.06)] mx-1" />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex items-center justify-center w-9 h-9 rounded-xl hover:bg-white/[0.04] text-foreground-muted/50 hover:text-foreground-muted transition-all duration-200"
          >
            <Bell className="w-[18px] h-[18px]" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-gradient-to-br from-danger to-red-500 text-[9px] font-bold text-white flex items-center justify-center shadow-lg shadow-danger/30"
              >
                {unreadCount}
              </motion.span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="absolute right-0 top-full mt-2 w-[360px] bg-[#080c1a]/95 backdrop-blur-2xl rounded-2xl border border-[rgba(79,140,255,0.1)] shadow-2xl z-50 overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(79,140,255,0.06)]">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold">Notifications</h3>
                      <span className="text-[10px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">{unreadCount} new</span>
                    </div>
                    <button className="text-[11px] text-primary/60 hover:text-primary transition-colors">Mark all read</button>
                  </div>

                  {/* List */}
                  <div className="max-h-[360px] overflow-y-auto">
                    {mockNotifications.map((n) => (
                      <div
                        key={n.id}
                        className={cn(
                          "px-5 py-3.5 border-b border-[rgba(79,140,255,0.03)] hover:bg-white/[0.02] transition-colors cursor-pointer group",
                          !n.read && "bg-primary/[0.03]"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "mt-1.5 w-2 h-2 rounded-full shrink-0 relative",
                            n.type === 'critical' && 'bg-danger',
                            n.type === 'warning' && 'bg-warning',
                            n.type === 'success' && 'bg-accent',
                            n.type === 'info' && 'bg-info',
                          )}>
                            {!n.read && (
                              <div className={cn(
                                "absolute inset-[-3px] rounded-full animate-pulse-glow",
                                n.type === 'critical' && 'bg-danger/20',
                                n.type === 'warning' && 'bg-warning/20',
                                n.type === 'success' && 'bg-accent/20',
                                n.type === 'info' && 'bg-info/20',
                              )} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-foreground/90">{n.title}</p>
                              {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                            </div>
                            <p className="text-xs text-foreground-muted/60 mt-0.5 line-clamp-1">{n.message}</p>
                            <p className="text-[10px] text-foreground-muted/30 mt-1.5">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-2 border-t border-[rgba(79,140,255,0.06)]">
                    <button className="w-full text-center text-xs text-primary/60 hover:text-primary py-2 rounded-xl hover:bg-white/[0.03] transition-all">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 ml-1 rounded-xl hover:bg-white/[0.03] px-2 py-1.5 transition-all duration-200 group"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-xs font-bold text-white">S</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-accent border-2 border-[#060a16] shadow-[0_0_6px_rgba(6,214,160,0.4)]" />
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-medium text-foreground/80">Sarah</div>
              <div className="text-[9px] text-foreground-muted/40">Admin</div>
            </div>
            <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-foreground-muted/30 group-hover:text-foreground-muted/60 transition-colors" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-[#080c1a]/95 backdrop-blur-2xl rounded-2xl border border-[rgba(79,140,255,0.1)] shadow-2xl z-50 overflow-hidden"
                >
                  <div className="px-4 py-3.5 border-b border-[rgba(79,140,255,0.06)]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <span className="text-sm font-bold text-white">S</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Sarah Chen</div>
                        <div className="text-[10px] text-foreground-muted/40">sarah@nexora.ai</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-1.5 space-y-0.5">
                    {[
                      { icon: User, label: 'Profile' },
                      { icon: Settings, label: 'Settings' },
                      { icon: Sparkles, label: 'What\'s New' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm text-foreground-muted/60 hover:text-foreground-muted hover:bg-white/[0.03] transition-all"
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-[rgba(79,140,255,0.06)] p-1.5">
                    <button className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm text-danger/60 hover:text-danger hover:bg-danger/[0.04] transition-all">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
