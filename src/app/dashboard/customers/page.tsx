'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockCustomers } from '@/lib/mock-data'
import { useDemoData, demoCustomers } from '@/lib/demo-mode'
import { formatCurrency } from '@/lib/utils'
import { Search, Mail, Sparkles, TrendingUp, AlertTriangle, MessageSquare, MoreHorizontal, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CustomersPage() {
  const [search, setSearch] = useState('')
  const { isDemo } = useDemoData()
  const customers = isDemo ? demoCustomers : mockCustomers

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl lg:text-3xl font-bold">Customers</h1>
            <Badge variant="accent" size="lg">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              AI Enhanced
            </Badge>
          </div>
          <p className="text-sm text-foreground/50">AI-powered customer intelligence and CRM</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="glass" size="sm">
            <Mail className="w-4 h-4 mr-1.5" />
            Bulk Email
          </Button>
          <Button variant="gradient" size="sm">
            <Sparkles className="w-4 h-4 mr-1.5" />
            AI Analysis
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers..."
          className="pl-10"
        />
      </div>

      {/* Customers grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((customer, i) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="glass-card rounded-xl p-5 border hover:border-primary/20 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                  {customer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{customer.name}</h3>
                  <p className="text-xs text-foreground/50">{customer.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-foreground/40 hover:text-foreground">
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-foreground/40 hover:text-foreground">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Health score */}
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-foreground/40 font-medium">Health Score</span>
                  <span className={cn(
                    "text-xs font-bold",
                    customer.healthScore >= 80 ? 'text-accent' : customer.healthScore >= 60 ? 'text-warning' : 'text-danger'
                  )}>
                    {customer.healthScore}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${customer.healthScore}%` }}
                    className={cn(
                      "h-full rounded-full",
                      customer.healthScore >= 80 ? 'bg-accent' : customer.healthScore >= 60 ? 'bg-warning' : 'bg-danger'
                    )}
                  />
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-accent">{formatCurrency(customer.revenuePotential, true)}</div>
                <div className="text-[10px] text-foreground/40">Potential</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-foreground/50 mb-3">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {customer.industry}
              </span>
              <span>•</span>
              <span>{customer.deals} deals</span>
              <span>•</span>
              <span>Last: {customer.lastInteraction}</span>
            </div>

            {/* Churn risk and action */}
            <div className="flex items-center justify-between">
              <Badge variant={customer.churnRisk === 'high' ? 'danger' : customer.churnRisk === 'medium' ? 'warning' : 'accent'} size="sm">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {customer.churnRisk} risk
              </Badge>
              <span className="text-xs text-primary font-medium">{customer.suggestedAction}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
