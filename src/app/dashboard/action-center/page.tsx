'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockTasks } from '@/lib/mock-data'
import { useDemoData, demoTasks } from '@/lib/demo-mode'
import { CheckSquare2, Sparkles, AlertTriangle, Target, Clock, CheckCircle2, Filter, Plus, ListChecks, Columns } from 'lucide-react'
import { cn } from '@/lib/utils'

const priorityConfig = {
  urgent: { color: 'text-danger', bg: 'bg-danger/10 border-danger/20', label: 'Urgent' },
  high: { color: 'text-warning', bg: 'bg-warning/10 border-warning/20', label: 'High' },
  medium: { color: 'text-primary', bg: 'bg-primary/10 border-primary/20', label: 'Medium' },
  low: { color: 'text-foreground/50', bg: 'bg-foreground/5 border-foreground/10', label: 'Low' },
}

export default function ActionCenter() {
  const [view, setView] = useState<'list' | 'kanban'>('list')
  const [filter, setFilter] = useState<'all' | 'todo' | 'in-progress' | 'done'>('all')
  const { isDemo } = useDemoData()
  const tasks = isDemo ? demoTasks : mockTasks

  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl lg:text-3xl font-bold">Action Center</h1>
            <Badge variant="accent" size="lg">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              AI Suggested
            </Badge>
          </div>
          <p className="text-sm text-foreground/50">AI-prioritized tasks and actions for your business</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="glass" size="sm">
            <Plus className="w-4 h-4 mr-1.5" />
            Add Task
          </Button>
          <Button variant="gradient" size="sm">
            <Sparkles className="w-4 h-4 mr-1.5" />
            AI Suggest Tasks
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Tasks', value: tasks.length, icon: ListChecks, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Urgent', value: tasks.filter(t => t.priority === 'urgent').length, icon: AlertTriangle, color: 'text-danger', bg: 'bg-danger/10' },
          { label: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length, icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
          { label: 'Completed', value: tasks.filter(t => t.status === 'done').length, icon: CheckCircle2, color: 'text-accent', bg: 'bg-accent/10' },
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

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {(['all', 'todo', 'in-progress', 'done'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border capitalize",
                filter === f
                  ? 'bg-primary/10 border-primary/30 text-primary'
                  : 'border-glass-border text-foreground/50 hover:text-foreground hover:border-primary/20'
              )}
            >
              {f === 'in-progress' ? 'In Progress' : f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 glass-card rounded-lg p-1 border">
          <button
            onClick={() => setView('list')}
            className={cn("p-1.5 rounded", view === 'list' ? 'bg-primary/20 text-primary' : 'text-foreground/40 hover:text-foreground')}
          >
            <ListChecks className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView('kanban')}
            className={cn("p-1.5 rounded", view === 'kanban' ? 'bg-primary/20 text-primary' : 'text-foreground/40 hover:text-foreground')}
          >
            <Columns className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tasks list */}
      <div className="space-y-2">
        {filtered.map((task, i) => {
          const priority = priorityConfig[task.priority as keyof typeof priorityConfig]
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              className={cn(
                "glass-card rounded-xl p-4 border transition-all hover:border-primary/20",
                task.status === 'done' && 'opacity-50'
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn("w-5 h-5 rounded-lg border-2 flex items-center justify-center mt-0.5 transition-colors cursor-pointer",
                  task.status === 'done' ? 'border-accent bg-accent' : 'border-foreground/20 hover:border-primary/50'
                )}>
                  {task.status === 'done' && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn(
                      "text-sm font-medium",
                      task.status === 'done' ? 'line-through text-foreground/40' : 'text-foreground/90'
                    )}>
                      {task.title}
                    </span>
                    <Badge variant={task.priority === 'urgent' ? 'danger' : task.priority === 'high' ? 'warning' : 'default'} size="sm">
                      {priority?.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-foreground/40">
                    <span>Due: {task.due}</span>
                    <span>Impact: {task.impact}%</span>
                    <span>Effort: {task.effort}</span>
                    <Badge variant="glass" size="sm" className="capitalize">{task.category}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex-1 w-16">
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${task.impact}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
