'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockKnowledgeFiles } from '@/lib/mock-data'
import { Search, FileText, Sparkles, Database, Upload, Download, MessageSquare, FolderOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

const fileIcons: Record<string, typeof FileText> = {
  pdf: FileText,
  doc: FileText,
  ppt: FileText,
  xls: FileText,
}

const categoryColors: Record<string, string> = {
  Strategy: 'text-secondary bg-secondary/10 border-secondary/20',
  Sales: 'text-primary bg-primary/10 border-primary/20',
  Brand: 'text-accent bg-accent/10 border-accent/20',
  Product: 'text-info bg-info/10 border-info/20',
  Research: 'text-warning bg-warning/10 border-warning/20',
  HR: 'text-danger bg-danger/10 border-danger/20',
  Operations: 'text-foreground/70 bg-foreground/5 border-foreground/10',
}

export default function KnowledgeVault() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const categories = ['all', ...new Set(mockKnowledgeFiles.map(f => f.category))]
  const filtered = mockKnowledgeFiles.filter(f => {
    const matchName = f.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'all' || f.category === category
    return matchName && matchCat
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl lg:text-3xl font-bold">Knowledge Vault</h1>
            <Badge variant="secondary" size="lg">
              <Database className="w-3.5 h-3.5 mr-1" />
              AI Search
            </Badge>
          </div>
          <p className="text-sm text-foreground/50">Your company knowledge base, searchable by AI</p>
        </div>
        <Button variant="gradient" size="sm">
          <Upload className="w-4 h-4 mr-1.5" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search knowledge..."
              className="pl-10"
            />
          </div>

          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider px-3 mb-2">Categories</h3>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all",
                  category === cat
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/50 hover:text-foreground hover:bg-white/5'
                )}
              >
                <FolderOpen className="w-4 h-4" />
                <span className="capitalize">{cat}</span>
                <span className="ml-auto text-xs text-foreground/30">{cat === 'all' ? mockKnowledgeFiles.length : mockKnowledgeFiles.filter(f => f.category === cat).length}</span>
              </button>
            ))}
          </div>

          {/* AI Chat Quick */}
          <div className="glass-card rounded-xl p-4 border">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold">Ask AI About Docs</h3>
            </div>
            <p className="text-xs text-foreground/50 mb-3">Ask questions about your documents</p>
            <div className="glass-card rounded-lg px-3 py-2 text-xs text-foreground/40">
              "What's our Q4 strategy?"
            </div>
          </div>
        </div>

        {/* Files grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {filtered.map((file, i) => {
              const Icon = fileIcons[file.type] || FileText
              return (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="glass-card rounded-xl p-4 border hover:border-primary/20 transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center border",
                      categoryColors[file.category] || 'text-foreground/50 bg-foreground/5 border-foreground/10'
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <button className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-foreground/40 hover:text-foreground opacity-0 group-hover:opacity-100 transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="text-sm font-medium mb-1 line-clamp-2">{file.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-foreground/40">
                    <Badge variant="glass" size="sm">{file.category}</Badge>
                    <span>{file.size}</span>
                  </div>
                  <p className="text-[10px] text-foreground/30 mt-2">{file.updated}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
