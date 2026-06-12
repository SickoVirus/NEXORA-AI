'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { processCommand, getSuggestions, getDefaultTone, type AIResponse, type AITone } from '@/lib/ai-engine'
import { Sparkles, Send, X, Zap, TrendingUp, FileText, Lightbulb, BarChart3, Loader2, Bot, Command, ChevronRight, Shield, AlertTriangle, CheckCircle2, Target, Brain } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Message {
  id: string
  type: 'command' | 'response'
  content: string
  response?: AIResponse
}

export function CommandBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentTone, setCurrentTone] = useState<AITone>(getDefaultTone())
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setIsOpen(true) }
      if (e.key === 'Escape') { setIsOpen(false); setTimeout(() => setMessages([]), 200) }
    }
    window.addEventListener('keydown', handleKeyDown)

    // Listen for tone changes from Settings page
    const handleToneChange = (e: CustomEvent) => {
      setCurrentTone(e.detail.tone as AITone)
    }
    window.addEventListener('nexora-tone-change', handleToneChange as EventListener)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('nexora-tone-change', handleToneChange as EventListener)
    }
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus()
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (cmd?: string) => {
    const text = cmd || input
    if (!text.trim() || isProcessing) return

    const userMsg: Message = { id: Date.now().toString(), type: 'command', content: text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsProcessing(true)

    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))

    const response = processCommand(text, currentTone)
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      type: 'response',
      content: text,
      response,
    }
    setMessages(prev => [...prev, aiMsg])
    setIsProcessing(false)
  }

  const riskColors: Record<string, string> = { low: 'accent', medium: 'warning', high: 'warning', critical: 'danger' }
  const riskLabels: Record<string, string> = { low: 'Low Risk', medium: 'Medium Risk', high: 'High Risk', critical: 'Critical Risk' }

  const toneLabels: Record<AITone, string> = {
    strategic: 'Strategic',
    analytical: 'Analytical',
    aggressive: 'Aggressive Growth',
    conservative: 'Conservative',
    creative: 'Creative',
    'executive-summary': 'Executive Mode',
  }

  const suggestions = getSuggestions()

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5 bg-[#0c1324]/90 backdrop-blur-2xl rounded-2xl px-4 py-3 border border-primary/20 shadow-2xl hover:border-primary/40 hover:shadow-[0_0_30px_rgba(79,140,255,0.15)] transition-all duration-300 group hover-lift"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 text-primary" />
          <div className="absolute inset-0 w-5 h-5 rounded-full bg-primary/20 blur-sm animate-pulse-glow" />
        </div>
        <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">AI Command</span>
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-white/[0.04] border border-[rgba(79,140,255,0.08)]">
          <Command className="w-2.5 h-2.5 text-foreground-muted/30" />
          <span className="text-[9px] font-mono text-foreground-muted/30">K</span>
        </div>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[6vh] px-4 pb-4"
          >
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => { setIsOpen(false); setTimeout(() => setMessages([]), 200) }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -12 }}
              transition={{ type: 'spring', damping: 30, stiffness: 350 }}
              className="relative w-full max-w-2xl bg-[#080c1a]/95 backdrop-blur-2xl rounded-2xl border border-[rgba(79,140,255,0.1)] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(79,140,255,0.03)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgba(79,140,255,0.06)]">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">AI Command Center</span>
                    <Badge variant="glass" size="sm" className="text-[9px]">{toneLabels[currentTone]}</Badge>
                  </div>
                  <div className="text-[10px] text-foreground-muted/40">Ask NEXORA AI anything about your business</div>
                </div>
                {/* Tone selector */}
                <select
                  value={currentTone}
                  onChange={(e) => {
                    setCurrentTone(e.target.value as AITone)
                    if (typeof window !== 'undefined') localStorage.setItem('nexora-ai-tone', e.target.value)
                  }}
                  className="text-[10px] bg-white/[0.04] border border-[rgba(79,140,255,0.08)] rounded-lg px-2 py-1.5 text-foreground-muted/60 focus:outline-none focus:border-primary/30 cursor-pointer"
                >
                  {Object.entries(toneLabels).map(([value, label]) => (
                    <option key={value} value={value} className="bg-[#080c1a]">{label}</option>
                  ))}
                </select>
                <button
                  onClick={() => { setIsOpen(false); setTimeout(() => setMessages([]), 200) }}
                  className="w-8 h-8 rounded-xl hover:bg-white/[0.04] flex items-center justify-center text-foreground-muted/30 hover:text-foreground-muted transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages area */}
              <div className="max-h-[55vh] overflow-y-auto p-4 space-y-3 hide-scrollbar">
                {messages.length === 0 && !isProcessing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <p className="text-[10px] text-foreground-muted/30 text-center uppercase tracking-wider font-semibold">
                      Suggested Commands
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {suggestions.slice(0, 6).map((s, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => handleSubmit(s.text)}
                          className="flex items-center gap-2.5 rounded-xl px-3.5 py-3 text-sm text-foreground-muted/60 hover:text-foreground-muted bg-white/[0.02] hover:bg-white/[0.04] border border-[rgba(79,140,255,0.06)] hover:border-primary/15 transition-all group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center shrink-0">
                            {s.category === 'Sales' && <TrendingUp className="w-3.5 h-3.5 text-primary/70" />}
                            {s.category === 'Strategy' && <Brain className="w-3.5 h-3.5 text-primary/70" />}
                            {s.category === 'Risk' && <Shield className="w-3.5 h-3.5 text-primary/70" />}
                            {s.category === 'Marketing' && <BarChart3 className="w-3.5 h-3.5 text-primary/70" />}
                            {s.category === 'Customer' && <AlertTriangle className="w-3.5 h-3.5 text-primary/70" />}
                            {s.category === 'Executive' && <FileText className="w-3.5 h-3.5 text-primary/70" />}
                            {s.category === 'Finance' && <Zap className="w-3.5 h-3.5 text-primary/70" />}
                          </div>
                          <span className="text-xs flex-1 text-left">{s.text}</span>
                          <ChevronRight className="w-3 h-3 text-foreground-muted/20 group-hover:text-primary/40 transition-colors shrink-0" />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {messages.map((msg) => (
                  <div key={msg.id}>
                    {msg.type === 'command' && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/10 rounded-2xl px-4 py-2.5 max-w-[80%]">
                          <p className="text-sm text-foreground/90">{msg.content}</p>
                        </div>
                      </motion.div>
                    )}

                    {msg.type === 'response' && msg.response && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl bg-gradient-to-br from-[#0c1324]/80 to-[#080c1a]/80 border border-[rgba(79,140,255,0.1)] p-4 space-y-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative shrink-0">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                              <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md" />
                          </div>

                          <div className="flex-1 space-y-3">
                            {/* Header */}
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-sm font-semibold text-foreground/90">NEXORA AI</h4>
                              <Badge variant="accent" size="sm" className="text-[9px]">
                                {msg.response.tone === 'aggressive' ? 'Aggressive' :
                                  msg.response.tone === 'analytical' ? 'Analytical' :
                                  msg.response.tone === 'conservative' ? 'Conservative' :
                                  msg.response.tone === 'creative' ? 'Creative' :
                                  msg.response.tone === 'executive-summary' ? 'Executive' : 'Strategic'}
                              </Badge>
                              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 ml-auto">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                <span className="text-[9px] font-semibold text-accent">{msg.response.confidenceScore}%</span>
                              </div>
                              <Badge variant={riskColors[msg.response.riskLevel] as any} size="sm">{riskLabels[msg.response.riskLevel]}</Badge>
                            </div>

                            {/* Executive Summary */}
                            <div className="space-y-1">
                              <p className="text-[9px] font-semibold text-foreground-muted/40 uppercase tracking-wider">Executive Summary</p>
                              <p className="text-sm text-foreground/80 font-medium">{msg.response.executiveSummary}</p>
                            </div>

                            {/* Key Diagnosis */}
                            <div className="rounded-xl bg-white/[0.02] border border-[rgba(79,140,255,0.06)] p-3 space-y-2">
                              <p className="text-[9px] font-semibold text-foreground-muted/40 uppercase tracking-wider flex items-center gap-1.5">
                                <Brain className="w-3 h-3" /> Key Diagnosis
                              </p>
                              <p className="text-xs text-foreground-muted/60 leading-relaxed">{msg.response.keyDiagnosis}</p>
                            </div>

                            {/* Business Impact */}
                            <div className="rounded-xl bg-gradient-to-r from-warning/[0.04] to-transparent border border-warning/10 p-3 space-y-1.5">
                              <p className="text-[9px] font-semibold text-warning/70 uppercase tracking-wider flex items-center gap-1.5">
                                <Target className="w-3 h-3" /> Business Impact
                              </p>
                              <p className="text-xs text-foreground-muted/60 leading-relaxed">{msg.response.businessImpact}</p>
                            </div>

                            {/* Recommended Actions */}
                            <div className="space-y-1.5">
                              <p className="text-[9px] font-semibold text-foreground-muted/40 uppercase tracking-wider">Recommended Actions</p>
                              {msg.response.recommendedActions.map((action, i) => (
                                <div key={i} className="flex items-start gap-2.5 text-xs text-foreground-muted/60 glass-card rounded-xl px-3 py-2 border">
                                  <div className={cn(
                                    "w-5 h-5 rounded-lg flex items-center justify-center text-[9px] font-bold shrink-0",
                                    action.priority === 'critical' ? 'bg-danger/10 text-danger' :
                                    action.priority === 'high' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
                                  )}>
                                    {i + 1}
                                  </div>
                                  <div className="flex-1">
                                    <span>{action.action}</span>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge variant={action.priority === 'critical' ? 'danger' : action.priority === 'high' ? 'warning' : 'default'} size="sm">{action.priority}</Badge>
                                      <span className="text-[9px] text-foreground-muted/30">{action.time}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Suggested Automation */}
                            <div className="flex items-start gap-2.5 rounded-xl bg-gradient-to-r from-accent/[0.04] to-transparent border border-accent/10 px-3.5 py-2.5">
                              <div className="relative shrink-0 mt-0.5">
                                <Zap className="w-3.5 h-3.5 text-accent" />
                                <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-accent/20 blur-sm" />
                              </div>
                              <div>
                                <p className="text-[9px] font-semibold text-accent/80 uppercase tracking-wider">Suggested Automation</p>
                                <p className="text-xs text-foreground-muted/60">{msg.response.suggestedAutomation}</p>
                              </div>
                            </div>

                            {/* Next Best Step */}
                            <div className="flex items-start gap-2.5 rounded-xl bg-gradient-to-r from-primary/[0.04] to-transparent border border-primary/10 px-3.5 py-2.5">
                              <div className="relative shrink-0 mt-0.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                              </div>
                              <div>
                                <p className="text-[9px] font-semibold text-primary/80 uppercase tracking-wider">Next Best Step</p>
                                <p className="text-xs text-foreground-muted/70 font-medium">{msg.response.nextBestStep}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}

                {isProcessing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/40 to-secondary/40 border border-primary/20 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    </div>
                    <div className="flex-1">
                      <div className="rounded-2xl bg-white/[0.03] border border-[rgba(79,140,255,0.06)] px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1.5">
                            {[0, 150, 300].map((delay) => (
                              <div key={delay} className="w-2 h-2 rounded-full bg-gradient-to-br from-primary to-secondary" style={{ animation: `bounce 1.4s ease-in-out ${delay}ms infinite` }} />
                            ))}
                          </div>
                          <span className="text-sm text-foreground-muted/50 font-medium">
                            {currentTone === 'aggressive' ? 'Driving growth analysis...' :
                             currentTone === 'analytical' ? 'Running data models...' :
                             currentTone === 'conservative' ? 'Risk-assessing all factors...' :
                             currentTone === 'creative' ? 'Exploring innovative angles...' :
                             currentTone === 'executive-summary' ? 'Generating executive briefing...' :
                             'Analyzing your business data...'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-[rgba(79,140,255,0.06)]">
                <div className="flex items-center gap-2.5 rounded-2xl bg-white/[0.02] border border-[rgba(79,140,255,0.08)] focus-within:border-primary/20 transition-all px-4 py-2.5">
                  <Sparkles className="w-4 h-4 text-primary/50 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder="Type a command... e.g., Analyze my sales this month"
                    className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-foreground-muted/25"
                  />
                  <button
                    onClick={() => handleSubmit()}
                    disabled={!input.trim() || isProcessing}
                    className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary text-white transition-all flex items-center justify-center disabled:opacity-30 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  )
}
