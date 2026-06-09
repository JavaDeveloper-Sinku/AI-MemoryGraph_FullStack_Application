"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import {
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Send,
  Globe,
  Rocket,
  Sparkles,
  RefreshCw,
  Play,
  Check
} from "lucide-react"
import { cn } from "@/lib/utils"

// Data Structure
interface Message {
  id: string
  sender: "ai" | "user"
  text: string
  time: string
  highlights?: string[]
  codeWords?: string[]
  optimizationCard?: {
    title: string
    description: string
    actions: string[]
  }
}

interface TaskItem {
  id: string
  label: string
  done: boolean
}

interface ChatSession {
  id: string
  title: string
  time: string
  messages: Message[]
  goal: string
  completedTasks: TaskItem[]
  nextStep?: string
}

// Initial Sessions data
const initialSessions: ChatSession[] = [
  {
    id: "neural-arch",
    title: "Neural Architecture Design",
    time: "2 hours ago",
    goal: "Develop a high-performance spatial indexing system for the AI Memory Graph to support 1M+ active nodes with sub-50ms query latency.",
    nextStep: "Refactor traversal.py to use spatial hashing logic.",
    completedTasks: [
      { id: "task-1", label: "Schema Definition", done: true },
      { id: "task-2", label: "Base Graph Visualizer", done: true },
      { id: "task-3", label: "API Authentication", done: true },
      { id: "task-4", label: "Spatial Hashing Implementation", done: false },
      { id: "task-5", label: "Stress Testing (1M Nodes)", done: false },
    ],
    messages: [
      {
        id: "m1",
        sender: "ai",
        time: "09:41 AM",
        text: "Welcome back. I've successfully loaded the Neural Architecture project context. Your memory graph is 84% indexed. How would you like to proceed with the next design phase?",
        highlights: ["Neural Architecture"],
      },
      {
        id: "m2",
        sender: "user",
        time: "09:42 AM",
        text: "Can you analyze the bottleneck in our current memory indexing logic? We're seeing latency when the graph exceeds 5,000 nodes.",
      },
      {
        id: "m3",
        sender: "ai",
        time: "JUST NOW",
        text: "Analyzing the indexing pipeline... I've identified a redundant traversal step in the GraphBuffer class.",
        codeWords: ["GraphBuffer"],
        optimizationCard: {
          title: "OPTIMIZATION FOUND",
          description: "The O(N²) complexity during the 'Entity Linking' phase can be reduced to O(N log N) by implementing a spatial hashing index.",
          actions: ["Refactor Code", "Explain Hashing"],
        },
      },
    ],
  },
  {
    id: "proj-mercury",
    title: "Project Mercury Refinement",
    time: "Yesterday",
    goal: "Optimize pipeline throughput for connection events from 10k concurrent clients.",
    nextStep: "Calibrate connection pooling sizes in Redis proxy.",
    completedTasks: [
      { id: "task-m1", label: "Docker Swarm Orchestration", done: true },
      { id: "task-m2", label: "HAProxy SSL Offloading", done: true },
      { id: "task-m3", label: "Redis Cluster Sharding", done: false },
    ],
    messages: [
      {
        id: "m-m1",
        sender: "ai",
        time: "Yesterday",
        text: "MQTT connection logs for Project Mercury have been parsed. There is a connection queue timeout issue under heavy workloads. Should we examine pool settings?",
        highlights: ["Project Mercury"],
      },
      {
        id: "m-m2",
        sender: "user",
        time: "Yesterday",
        text: "Yes, analyze current connection pooling configurations.",
      },
    ],
  },
  {
    id: "mem-indexing",
    title: "Memory Indexing Logic",
    time: "Oct 24",
    goal: "Architect structural hashing schema to secure local graph checkpoints.",
    nextStep: "Integrate cryptographic checksum inside SQLite writer.",
    completedTasks: [
      { id: "task-i1", label: "SQLite Local Sync", done: true },
      { id: "task-i2", label: "AES-256 DB Wrapper", done: false },
    ],
    messages: [
      {
        id: "m-i1",
        sender: "ai",
        time: "Oct 24",
        text: "Secure memory index initialization is complete. Checkpoint files will be cached under the .memory directory locally.",
        highlights: [".memory"],
      },
    ],
  },
  {
    id: "visual-token",
    title: "Visual Token System",
    time: "Oct 22",
    goal: "Design coordinate transformation layer mapping node clusters on dynamic SVG canvas.",
    nextStep: "Map viewport bounding box triggers to active zoom scales.",
    completedTasks: [
      { id: "task-t1", label: "Canvas Anchor Calculus", done: true },
      { id: "task-t2", label: "SVG Coordinate Transformation", done: true },
    ],
    messages: [
      {
        id: "m-t1",
        sender: "ai",
        time: "Oct 22",
        text: "Visual tag offsets have been successfully calculated. Zoom bounding boxes are mapped correctly.",
      },
    ],
  },
]

export default function ChatPage() {
  const [sessions, setSessions] = React.useState<ChatSession[]>(initialSessions)
  const [activeSessionId, setActiveSessionId] = React.useState("neural-arch")
  const [typedMessage, setTypedMessage] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0]

  // Switch session
  const handleSelectSession = (id: string) => {
    setActiveSessionId(id)
  };

  // Toggle tasks in Right Panel
  const handleToggleTask = (taskId: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== activeSessionId) return s
        return {
          ...s,
          completedTasks: s.completedTasks.map((t) =>
            t.id === taskId ? { ...t, done: !t.done } : t
          ),
        }
      })
    )
  };

  // Calculate percentage
  const calculatePercentage = (tasks: TaskItem[]) => {
    if (tasks.length === 0) return 0
    const completed = tasks.filter((t) => t.done).length
    return Math.round((completed / tasks.length) * 100)
  };

  const percentageCompleted = calculatePercentage(activeSession.completedTasks)

  // Send message
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!typedMessage.trim()) return

    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const newUserMessage: Message = {
      id: `m-u-${Date.now()}`,
      sender: "user",
      time: timeStr,
      text: typedMessage.trim(),
    }

    // Append user message
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== activeSessionId) return s
        return {
          ...s,
          messages: [...s.messages, newUserMessage],
        }
      })
    )

    const sentText = typedMessage.trim()
    setTypedMessage("")
    setIsTyping(true)

    // Simulate AI Reply
    setTimeout(() => {
      setIsTyping(false)
      const aiReplyText = sentText.toLowerCase().includes("bottleneck")
        ? "I am checking the traversal recursion depth. Let me parse the loop indexes for any redundant checks."
        : `Understood. Loading the latest context for ${activeSession.title} to analyze "${sentText}".`

      const newAiMessage: Message = {
        id: `m-a-${Date.now()}`,
        sender: "ai",
        time: "JUST NOW",
        text: aiReplyText,
      }

      setSessions((prev) =>
        prev.map((s) => {
          if (s.id !== activeSessionId) return s
          return {
            ...s,
            messages: [...s.messages, newAiMessage],
          }
        })
      )
    }, 1500)
  };

  // Clear all history
  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear your conversation history?")) {
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id !== activeSessionId) return s
          return {
            ...s,
            messages: [],
            completedTasks: s.completedTasks.map((t) => ({ ...t, done: false })),
          }
        })
      )
    }
  };

  // Format message text with blue links and green code snippets
  const renderMessageText = (msg: Message) => {
    let html = msg.text

    // Highlights (styled as links)
    if (msg.highlights) {
      msg.highlights.forEach((h) => {
        html = html.replace(h, `<span class="text-blue-400 hover:underline cursor-pointer font-semibold">${h}</span>`)
      })
    }

    // Code words (green code styling)
    if (msg.codeWords) {
      msg.codeWords.forEach((c) => {
        html = html.replace(c, `<code class="text-emerald-400 bg-slate-900/60 px-1.5 py-0.5 rounded font-mono text-xs border border-white/5">${c}</code>`)
      })
    }

    return <span dangerouslySetInnerHTML={{ __html: html }} />
  };

  return (
    <AppLayout noPadding={true}>
      <div className="flex flex-row flex-1 h-[calc(100vh-4rem)] w-full overflow-hidden select-none bg-[#0B0F19]">
        
        {/* Left Column: Chat History List */}
        <div className="w-64 sm:w-72 border-r border-slate-900/60 bg-[#070b13]/25 flex flex-col shrink-0">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-900/60">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              History
            </span>
            <button className="p-1 rounded text-slate-500 hover:text-slate-300 hover:bg-slate-800/40 cursor-pointer">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Session Links Scroll Area */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
            {sessions.map((session) => {
              const active = session.id === activeSessionId
              return (
                <button
                  key={session.id}
                  onClick={() => handleSelectSession(session.id)}
                  className={cn(
                    "w-full text-left px-3 py-3 rounded-lg transition-all duration-200 cursor-pointer flex flex-col gap-1 relative",
                    active
                      ? "bg-[#131b2e] border border-blue-500/10 shadow-md shadow-blue-500/[0.02]"
                      : "hover:bg-slate-800/20 text-slate-400 hover:text-slate-200"
                  )}
                >
                  {active && (
                    <span className="absolute left-0 top-3 bottom-3 w-1 rounded-r bg-blue-500" />
                  )}
                  <span className={cn(
                    "text-xs font-semibold truncate transition-colors",
                    active ? "text-slate-100" : "text-slate-400"
                  )}>
                    {session.title}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {session.time}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Clear History Button */}
          <div className="p-4 border-t border-slate-900/60">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs font-semibold text-slate-500 hover:text-slate-300 hover:bg-slate-900 border border-slate-950/20 py-2.5 h-9"
              onClick={handleClearHistory}
            >
              Clear all history
            </Button>
          </div>
        </div>

        {/* Center Column: Chat Messaging Panel */}
        <div className="flex-1 flex flex-col bg-transparent relative overflow-hidden min-w-0">
          
          {/* Scrollable messages timeline */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeSession.messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 text-xs">
                No conversation history. Send a message to start.
              </div>
            ) : (
              activeSession.messages.map((msg) => {
                const isAI = msg.sender === "ai"
                return (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex items-start gap-4 max-w-3xl",
                      isAI ? "mr-auto" : "ml-auto flex-row-reverse"
                    )}
                  >
                    {/* Avatar */}
                    {isAI ? (
                      <div className="w-8 h-8 rounded-full bg-blue-600/15 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xs shrink-0 select-none shadow-sm shadow-blue-500/5">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold shrink-0 select-none ring-2 ring-blue-500/30">
                        AX
                      </div>
                    )}

                    {/* Bubble Content */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      {/* Message Text Bubble */}
                      <div
                        className={cn(
                          "rounded-xl px-4 py-3 text-xs sm:text-sm leading-relaxed",
                          isAI
                            ? "bg-[#111625]/85 border border-slate-900/80 text-slate-200"
                            : "bg-blue-600 text-white shadow-lg shadow-blue-600/10 font-medium"
                        )}
                      >
                        {renderMessageText(msg)}

                        {/* Special Optimization Card (AI Only) */}
                        {isAI && msg.optimizationCard && (
                          <div className="mt-4 border border-teal-500/20 bg-teal-500/[0.02] rounded-lg p-4 space-y-3 shadow-inner relative overflow-hidden">
                            {/* Radial Glow */}
                            <div className="absolute top-0 left-0 w-24 h-24 bg-teal-500/5 blur-lg pointer-events-none" />

                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ring-4 ring-emerald-400/20" />
                              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                                {msg.optimizationCard.title}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                              {msg.optimizationCard.description}
                            </p>
                            <div className="flex items-center gap-2.5 pt-1">
                              {msg.optimizationCard.actions.map((act) => (
                                <Button
                                  key={act}
                                  variant={act.includes("Refactor") ? "primary" : "secondary"}
                                  size="sm"
                                  className="h-7 text-xs font-semibold py-1 px-3"
                                  onClick={() => alert(`Running action: ${act}`)}
                                >
                                  {act}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Timestamp & User tag */}
                      <div className={cn(
                        "text-[11px] text-slate-500 font-semibold tracking-wide uppercase select-none",
                        isAI ? "text-left" : "text-right"
                      )}>
                        {isAI ? `AI ASSISTANT • ${msg.time}` : `YOU • ${msg.time}`}
                      </div>
                    </div>
                  </div>
                )
              })
            )}

            {/* AI Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-4 max-w-3xl mr-auto">
                <div className="w-8 h-8 rounded-full bg-blue-600/15 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xs shrink-0 select-none animate-pulse">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="bg-[#111625]/85 border border-slate-900/80 rounded-xl px-4 py-3 text-xs text-slate-400 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Bottom Chat Input Form Area */}
          <div className="p-4 border-t border-slate-900/60 bg-[#070b13]/10 space-y-3">
            <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-center gap-3 bg-[#111625]/80 border border-slate-900/80 rounded-xl px-3 py-1.5 shadow-xl backdrop-blur-sm relative z-10">
              {/* Paperclip upload button */}
              <button
                type="button"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/40 shrink-0 cursor-pointer"
                onClick={() => alert("File attachment clicked...")}
              >
                <Paperclip className="w-4.5 h-4.5" />
              </button>

              {/* TextInput */}
              <input
                type="text"
                placeholder="Ask anything, index a memory, or refine architecture..."
                className="flex-1 bg-transparent border-0 outline-none text-xs sm:text-sm text-slate-100 placeholder-slate-500 py-2"
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
              />

              {/* Send Button */}
              <button
                type="submit"
                className={cn(
                  "p-2 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer",
                  typedMessage.trim()
                    ? "bg-blue-600 text-white hover:bg-blue-500 active:scale-95 shadow-md shadow-blue-500/25"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                )}
                disabled={!typedMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Hallucination Subtext disclaimer */}
            <div className="text-center text-[10px] font-bold text-slate-600 tracking-widest uppercase select-none">
              AI memory can hallucinate. verify critical graph links.
            </div>
          </div>
        </div>

        {/* Right Column: Project Context Panel */}
        <div className="w-72 sm:w-80 border-l border-slate-900/60 bg-[#070b13]/20 flex flex-col shrink-0 overflow-y-auto p-5 space-y-6">
          {/* Section 1: Header */}
          <div className="flex items-center gap-2 text-slate-300 border-b border-slate-950 pb-4 select-none">
            <Globe className="w-4.5 h-4.5 text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Project Context
            </span>
          </div>

          {/* Section 2: Goal */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Goal
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {activeSession.goal}
            </p>
          </div>

          {/* Section 3: Completed Checklist */}
          <div className="space-y-3 select-none">
            <div className="flex items-center justify-between text-xs font-bold tracking-wide">
              <span className="text-slate-500 uppercase">Completed</span>
              <span className="text-emerald-400 font-semibold">{percentageCompleted}%</span>
            </div>

            {/* Custom Checklist items */}
            <div className="space-y-2">
              {activeSession.completedTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg border text-xs font-medium cursor-pointer transition-all duration-200",
                    task.done
                      ? "bg-emerald-500/[0.02] border-emerald-500/20 text-emerald-400"
                      : "bg-[#111625]/20 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                  )}
                >
                  <span className={cn(
                    "w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-all",
                    task.done
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "border-slate-700/60"
                  )}>
                    {task.done && <Check className="w-3 h-3 stroke-[3px]" />}
                  </span>
                  <span className={cn("truncate", task.done && "line-through opacity-85")}>
                    {task.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Next Step Card */}
          {activeSession.nextStep && (
            <Card className="bg-[#121726]/40 border-slate-800/60 shadow-sm relative overflow-hidden select-none">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/[0.02] blur-md pointer-events-none" />
              <CardContent className="p-4 space-y-2.5">
                <div className="flex items-center gap-1.5">
                  <Rocket className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[11px] font-bold text-blue-400 tracking-wider uppercase">
                    Next Step
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-slate-300 font-medium">
                  {activeSession.nextStep}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons Area */}
          <div className="space-y-2.5 pt-4 border-t border-slate-900/60 select-none">
            <Button
              variant="outline"
              className="w-full justify-center gap-2 border-slate-800 hover:bg-slate-900 text-xs font-semibold py-2.5 h-10"
              onClick={() => alert("Synthesizing raw files to memory...")}
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Generate Memory</span>
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="secondary"
                className="justify-center gap-1.5 h-9 text-xs"
                onClick={() => alert("Refreshing local node mappings...")}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </Button>
              <Button
                variant="secondary"
                className="justify-center gap-1.5 h-9 text-xs"
                onClick={() => alert("Resuming graph traversal scheduler...")}
              >
                <Play className="w-3.5 h-3.5 fill-slate-300" />
                <span>Resume</span>
              </Button>
            </div>
          </div>

        </div>

      </div>
    </AppLayout>
  )
}
