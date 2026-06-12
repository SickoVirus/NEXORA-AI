'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockReports } from '@/lib/mock-data'
import { FileText, Download, Copy, Sparkles, Calendar, BarChart3, TrendingUp, Users, Target } from 'lucide-react'
import { cn } from '@/lib/utils'

const typeIcons: Record<string, typeof FileText> = {
  Executive: TrendingUp,
  Monthly: BarChart3,
  Quarterly: Target,
  Marketing: Users,
}

const typeColors: Record<string, string> = {
  Executive: 'text-primary bg-primary/10 border-primary/20',
  Monthly: 'text-accent bg-accent/10 border-accent/20',
  Quarterly: 'text-secondary bg-secondary/10 border-secondary/20',
  Marketing: 'text-info bg-info/10 border-info/20',
}

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl lg:text-3xl font-bold">Reports</h1>
            <Badge variant="accent" size="lg">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              AI Generated
            </Badge>
          </div>
          <p className="text-sm text-foreground/50">Generate and manage AI-powered business reports</p>
        </div>
        <Button variant="gradient" size="sm">
          <Sparkles className="w-4 h-4 mr-1.5" />
          Generate New Report
        </Button>
      </div>

      {/* Quick generate */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {['Weekly Executive', 'Monthly Review', 'Sales Report', 'Marketing ROI'].map((name, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-xl p-4 border text-left hover:border-primary/20 transition-all group"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs text-foreground/50">Quick Generate</span>
            </div>
            <span className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">{name}</span>
          </motion.button>
        ))}
      </div>

      {/* Reports */}
      <div className="space-y-4">
        {mockReports.map((report, i) => {
          const Icon = typeIcons[report.type] || FileText
          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-5 border hover:border-primary/20 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border",
                  typeColors[report.type] || 'text-foreground/50 bg-foreground/5 border-foreground/10'
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-base font-semibold group-hover:text-primary transition-colors">{report.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="glass" size="sm">{report.type}</Badge>
                        <span className="text-xs text-foreground/40 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {report.period}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-foreground/40 hover:text-foreground">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-foreground/40 hover:text-foreground">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed line-clamp-2">{report.summary}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
