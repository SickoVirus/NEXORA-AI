'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { neuralNodes, neuralConnections } from '@/lib/mock-data'
import type { NeuralNode } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { Brain, Network, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown, Minus, Activity, Target, Lightbulb, Bot } from 'lucide-react'

const statusConfig: Record<string, { color: string; bg: string; border: string; glow: string; icon: any; label: string }> = {
  healthy: { color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/30', glow: 'shadow-accent/20', icon: CheckCircle2, label: 'Healthy' },
  warning: { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30', glow: 'shadow-warning/20', icon: AlertTriangle, label: 'Warning' },
  critical: { color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/30', glow: 'shadow-danger/20', icon: AlertTriangle, label: 'Critical' },
  opportunity: { color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/30', glow: 'shadow-primary/20', icon: Lightbulb, label: 'Opportunity' },
  optimizing: { color: 'text-info', bg: 'bg-info/10', border: 'border-info/30', glow: 'shadow-info/20', icon: Activity, label: 'Optimizing' },
}

const trendIcons: Record<string, any> = { up: TrendingUp, down: TrendingDown, neutral: Minus }
const trendColors: Record<string, string> = { up: 'text-accent', down: 'text-danger', neutral: 'text-foreground-muted/50' }

function NodeDetail({ node, onClose }: { node: NeuralNode; onClose: () => void }) {
  const status = statusConfig[node.status]
  const StatusIcon = status.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="w-full lg:w-[380px] shrink-0 space-y-3 overflow-y-auto max-h-[calc(100vh-12rem)] hide-scrollbar"
    >
      {/* Header */}
      <div className="glass-panel-strong rounded-2xl p-5 border border-primary/15">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border", status.bg, status.border)}>
              <StatusIcon className={cn("w-5 h-5", status.color)} />
            </div>
            <div>
              <h3 className="font-bold text-lg">{node.label}</h3>
              <p className="text-xs text-foreground-muted/50">{node.sublabel}</p>
            </div>
          </div>
          <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full border shrink-0", status.border, status.bg)}>
            <div className={cn("w-1.5 h-1.5 rounded-full", status.color.replace('text-', 'bg-'))} />
            <span className={cn("text-[10px] font-semibold", status.color)}>{status.label}</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-2 mb-4">
          {node.metrics.map((m) => {
            const TrendIcon = trendIcons[m.trend]
            return (
              <div key={m.label} className="flex items-center justify-between glass-card rounded-xl px-3.5 py-2.5 border">
                <span className="text-xs text-foreground-muted/60">{m.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{m.value}</span>
                  <TrendIcon className={cn("w-3.5 h-3.5", trendColors[m.trend])} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Analysis */}
        <div className="space-y-3">
          <div>
            <h4 className="text-xs font-semibold text-foreground-muted/40 uppercase tracking-wider mb-1.5">AI Analysis</h4>
            <p className="text-xs text-foreground-muted/70 leading-relaxed">{node.analysis}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-foreground-muted/40 uppercase tracking-wider mb-1.5 text-danger/70">Main Problem</h4>
            <p className="text-xs text-foreground-muted/70 leading-relaxed">{node.mainProblem}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-foreground-muted/40 uppercase tracking-wider mb-1.5 text-accent/70">Recommended Action</h4>
            <p className="text-xs text-accent/80 font-medium">{node.recommendedAction}</p>
          </div>
        </div>

        {/* Impact Score */}
        <div className="mt-4 glass-card rounded-xl p-3 border">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-foreground-muted/50">Impact Score</span>
            <span className="text-lg font-bold gradient-text">{node.impactScore}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${node.impactScore}%` }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
        </div>

        {/* Automation suggestion */}
        <div className="flex items-start gap-2.5 glass-card rounded-xl p-3 border border-accent/10 mt-3">
          <Bot className="w-4 h-4 text-accent mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] font-semibold text-accent/70 uppercase tracking-wider">Suggested Automation</p>
            <p className="text-xs text-foreground-muted/60">{node.possibleAutomation}</p>
          </div>
        </div>

        {/* Related */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {node.relatedMetrics.map((m) => (
            <Badge key={m} variant="glass" size="sm">{m}</Badge>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function NeuralMapCanvas({ nodes: nodeList, onNodeClick }: { nodes: typeof neuralNodes; onNodeClick: (n: NeuralNode) => void }) {
  return (
    <div className="absolute inset-0">
      {/* SVG Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(79,140,255,0.1)" />
            <stop offset="50%" stopColor="rgba(79,140,255,0.25)" />
            <stop offset="100%" stopColor="rgba(79,140,255,0.1)" />
          </linearGradient>
          <linearGradient id="lineGradStrong" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(239,68,68,0.3)" />
            <stop offset="50%" stopColor="rgba(239,68,68,0.5)" />
            <stop offset="100%" stopColor="rgba(239,68,68,0.3)" />
          </linearGradient>
        </defs>
        {neuralConnections.map((conn, i) => {
          const from = nodeList.find(n => n.id === conn.from)
          const to = nodeList.find(n => n.id === conn.to)
          if (!from || !to) return null

          // Use percentage-based positions
          const x1 = `${from.x}%`
          const y1 = `${from.y}%`
          const x2 = `${to.x}%`
          const y2 = `${to.y}%`

          return (
            <g key={i}>
              {/* Connection line */}
              <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={conn.from === 'risks' || conn.to === 'risks' ? 'rgba(239,68,68,0.15)' : 'rgba(79,140,255,0.1)'}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="animate-dash-flow"
              />
              {/* Connection dot */}
              <circle
                cx={(from.x + to.x) / 2 + '%'}
                cy={(from.y + to.y) / 2 + '%'}
                r="2"
                fill="rgba(79,140,255,0.3)"
                className="animate-pulse-glow"
              />
            </g>
          )
        })}
      </svg>

      {/* Nodes */}
      {nodeList.map((node) => {
        const status = statusConfig[node.status]
        const StatusIcon = status.icon
        return (
          <motion.button
            key={node.id}
            id={`node-${node.id}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            onClick={() => onNodeClick(node)}
            className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ left: `${node.x}%`, top: `${node.y}%`, zIndex: 2 }}
          >
            <div className={cn(
              "relative flex flex-col items-center transition-all duration-300",
              "hover:scale-110"
            )}>
              {/* Glow */}
              <div className={cn(
                "absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                status.bg
              )} />
              
              {/* Node circle */}
              <div className={cn(
                "w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                "shadow-lg backdrop-blur-sm",
                status.border,
                status.bg,
                "group-hover:shadow-xl group-hover:scale-105",
                status.glow
              )}>
                <StatusIcon className={cn("w-7 h-7 lg:w-8 lg:h-8", status.color)} />
              </div>

              {/* Label */}
              <div className="mt-1.5 text-center">
                <div className="text-[10px] lg:text-xs font-bold text-foreground/90 whitespace-nowrap">{node.label}</div>
                <div className="text-[8px] lg:text-[9px] text-foreground-muted/40 whitespace-nowrap">{node.sublabel}</div>
              </div>

              {/* Status indicator */}
              <div className={cn(
                "absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
                status.color.replace('text-', 'bg-')
              )}>
                {node.status === 'critical' && (
                  <div className="absolute inset-[-4px] rounded-full bg-danger/20 animate-pulse-glow" />
                )}
              </div>
            </div>
          </motion.button>
        )
      })}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass-card rounded-xl p-3 border z-10">
        <div className="space-y-1.5">
          {Object.entries(statusConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2 text-[10px]">
              <div className={cn("w-2 h-2 rounded-full", config.color.replace('text-', 'bg-'))} />
              <span className="text-foreground-muted/50">{config.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function NeuralMapPage() {
  const [selectedNode, setSelectedNode] = useState<NeuralNode | null>(null)
  const [filter, setFilter] = useState<string | null>(null)

  const filteredNodes = filter
    ? neuralNodes.filter(n => n.status === filter)
    : neuralNodes

  const handleNodeClick = (node: NeuralNode) => {
    setSelectedNode(node)
  }

  return (
    <div className="h-[calc(100vh-7rem)] -mx-4 lg:-mx-6 -mt-4 lg:-mt-6 relative overflow-hidden bg-gradient-to-b from-background via-primary/[0.02] to-background">
      {/* Background grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-20" />
      <div className="absolute inset-0 bg-grid-subtle opacity-30" />

      {/* Header inside */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 lg:p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                  <Network className="w-4 h-4 text-white" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-secondary/20 blur-md" />
              </div>
              <h1 className="text-xl lg:text-2xl font-bold tracking-tight">Business Neural Map</h1>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20">
                <span className="status-dot active" />
                <span className="text-[10px] font-semibold text-accent">Real-time</span>
              </div>
            </div>
            <p className="text-xs text-foreground-muted/50">Your business as an interconnected AI-powered system. Click a node to explore.</p>
          </div>

          {/* Filter chips */}
          <div className="hidden lg:flex items-center gap-1.5">
            {[
              { id: null, label: 'All' },
              { id: 'critical', label: 'Critical', color: 'text-danger border-danger/30 bg-danger/10' },
              { id: 'warning', label: 'Warning', color: 'text-warning border-warning/30 bg-warning/10' },
              { id: 'opportunity', label: 'Opportunity', color: 'text-primary border-primary/30 bg-primary/10' },
              { id: 'healthy', label: 'Healthy', color: 'text-accent border-accent/30 bg-accent/10' },
            ].map((f) => (
              <button
                key={f.id || 'all'}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all border",
                  filter === f.id
                    ? f.color || 'bg-primary/10 border-primary/30 text-primary'
                    : 'border-glass-border text-foreground-muted/40 hover:text-foreground-muted/70'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex h-full">
        {/* Map area */}
        <div className="flex-1 relative pt-24">
          <NeuralMapCanvas nodes={filteredNodes} onNodeClick={handleNodeClick} />
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selectedNode && (
            <div className="lg:relative absolute right-0 top-0 h-full z-20 p-4 pt-24">
              <NodeDetail node={selectedNode} onClose={() => setSelectedNode(null)} />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile - show selected node */}
      {selectedNode && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedNode(null)}>
          <div className="absolute right-0 top-0 bottom-0 w-[90%] max-w-sm p-4 pt-20 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <NodeDetail node={selectedNode} onClose={() => setSelectedNode(null)} />
          </div>
        </div>
      )}
    </div>
  )
}
