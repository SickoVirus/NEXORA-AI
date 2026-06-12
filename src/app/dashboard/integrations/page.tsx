'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Puzzle, Sparkles, Check, ExternalLink, Zap, Mail, BarChart3, ShoppingCart, CreditCard, MessageSquare, BookOpen, Radio, PieChart } from 'lucide-react'
import { cn } from '@/lib/utils'

const integrations = [
  { name: 'Google Sheets', icon: BarChart3, color: 'text-accent', bg: 'bg-accent/10', connected: true },
  { name: 'Excel', icon: BarChart3, color: 'text-accent', bg: 'bg-accent/10', connected: true },
  { name: 'HubSpot', icon: Zap, color: 'text-warning', bg: 'bg-warning/10', connected: true },
  { name: 'Salesforce', icon: Zap, color: 'text-primary', bg: 'bg-primary/10', connected: false },
  { name: 'Shopify', icon: ShoppingCart, color: 'text-accent', bg: 'bg-accent/10', connected: true },
  { name: 'Stripe', icon: CreditCard, color: 'text-secondary', bg: 'bg-secondary/10', connected: true },
  { name: 'QuickBooks', icon: BarChart3, color: 'text-accent', bg: 'bg-accent/10', connected: false },
  { name: 'Gmail', icon: Mail, color: 'text-danger', bg: 'bg-danger/10', connected: true },
  { name: 'Slack', icon: MessageSquare, color: 'text-secondary', bg: 'bg-secondary/10', connected: true },
  { name: 'Notion', icon: BookOpen, color: 'text-foreground/70', bg: 'bg-foreground/5', connected: false },
  { name: 'Google Analytics', icon: PieChart, color: 'text-warning', bg: 'bg-warning/10', connected: true },
  { name: 'Meta Ads', icon: Radio, color: 'text-primary', bg: 'bg-primary/10', connected: false },
  { name: 'TikTok Ads', icon: Radio, color: 'text-foreground/70', bg: 'bg-foreground/5', connected: false },
  { name: 'Zapier', icon: Zap, color: 'text-warning', bg: 'bg-warning/10', connected: false },
]

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl lg:text-3xl font-bold">Integrations</h1>
            <Badge variant="accent" size="lg">
              <Puzzle className="w-3.5 h-3.5 mr-1" />
              Connected
            </Badge>
          </div>
          <p className="text-sm text-foreground/50">Connect your business tools to NEXORA AI</p>
        </div>
        <Button variant="gradient" size="sm">
          <Sparkles className="w-4 h-4 mr-1.5" />
          Browse All
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Connected', value: integrations.filter(i => i.connected).length, icon: Check, color: 'text-accent', bg: 'bg-accent/10' },
          { label: 'Available', value: integrations.length, icon: Puzzle, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Data Syncs', value: '1,247', icon: Zap, color: 'text-warning', bg: 'bg-warning/10' },
          { label: 'Last Sync', value: '2 min ago', icon: ExternalLink, color: 'text-secondary', bg: 'bg-secondary/10' },
        ].map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-4 border"
            >
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center mb-2", item.bg)}>
                <Icon className={cn("w-4.5 h-4.5", item.color)} />
              </div>
              <div className="text-xl font-bold">{item.value}</div>
              <div className="text-xs text-foreground/50">{item.label}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Integrations grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {integrations.map((integration, i) => {
          const Icon = integration.icon
          return (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={cn(
                "glass-card rounded-xl p-4 border transition-all hover:border-primary/20 group",
                integration.connected && "border-accent/20"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border", integration.bg)}>
                  <Icon className={cn("w-5 h-5", integration.color)} />
                </div>
                {integration.connected ? (
                  <Badge variant="accent" size="sm">
                    <Check className="w-3 h-3 mr-0.5" />
                    Connected
                  </Badge>
                ) : (
                  <Button variant="glass" size="sm" className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    Connect
                  </Button>
                )}
              </div>
              <h3 className="text-sm font-semibold">{integration.name}</h3>
              <p className="text-xs text-foreground/40 mt-1">
                {integration.connected ? 'Data syncing actively' : 'Connect to sync data'}
              </p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
