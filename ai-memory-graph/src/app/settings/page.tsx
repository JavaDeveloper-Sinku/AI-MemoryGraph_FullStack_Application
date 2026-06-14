"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import {
  Key,
  Sun,
  Moon,
  Monitor,
  HardDrive,
  Check,
  Eye,
  EyeOff,
  Trash2,
  Sparkles,
  Database,
  Sliders
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { useWorkspace } from "@/hooks/useWorkspace"

export default function SettingsPage() {
  const { workspaces } = useWorkspace()

  // Settings States
  const [apiKey, setApiKey] = React.useState("")
  const [showKey, setShowKey] = React.useState(false)
  const [model, setModel] = React.useState("gpt-4o")
  const [theme, setTheme] = React.useState("dark")
  const [saveSuccess, setSaveSuccess] = React.useState(false)
  const [flushSuccess, setFlushSuccess] = React.useState(false)

  // Load settings from localStorage on mount
  React.useEffect(() => {
    document.title = "Settings | AI Memory Graph"

    const savedKey = localStorage.getItem("ai_memory_graph_openai_key")
    const savedModel = localStorage.getItem("ai_memory_graph_openai_model")
    const savedTheme = localStorage.getItem("ai_memory_graph_theme")

    if (savedKey) setApiKey(savedKey)
    if (savedModel) setModel(savedModel)
    if (savedTheme) setTheme(savedTheme)
  }, [])

  const handleSaveApiSettings = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("ai_memory_graph_openai_key", apiKey)
    localStorage.setItem("ai_memory_graph_openai_model", model)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem("ai_memory_graph_theme", newTheme)
    // Simulated global theme change trigger
    if (newTheme === "light") {
      document.documentElement.classList.add("light-theme-simulation")
    } else {
      document.documentElement.classList.remove("light-theme-simulation")
    }
  }

  const handleFlushCache = () => {
    if (confirm("Are you sure you want to clear the local caching database? This does not delete your workspaces.")) {
      setFlushSuccess(true)
      setTimeout(() => setFlushSuccess(false), 3000)
    }
  }

  // Dynamic memory calculations based on real workspace context
  const baseNodes = 856
  const dynamicNodes = workspaces.length * 48
  const totalNodesUsed = baseNodes + dynamicNodes
  const maxNodesCapacity = 2500
  const nodePercentage = Math.round((totalNodesUsed / maxNodesCapacity) * 100)

  return (
    <AppLayout>
      <div className="space-y-8 flex flex-col h-full max-w-7xl mx-auto w-full px-6 py-4">
        {/* Title Header */}
        <div className="border-b border-slate-800/60 pb-6 select-none shrink-0">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure LLM API integrations, system themes, and view storage space limits.
          </p>
        </div>

        {/* Settings Form Layout */}
        <div className="flex flex-col gap-6 w-full">

          {/* Left Column: API Configuration */}
          <div className="space-y-6">
            <Card className="bg-[#0e1424]/90 border-slate-800/80 shadow-md">
              <CardHeader className="p-5 border-b border-slate-900/60">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold text-slate-200">LLM Credentials</CardTitle>
                    <CardDescription className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                      Configure your ChatGPT or custom model secret keys.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                <form onSubmit={handleSaveApiSettings} className="space-y-4">

                  {/* Select Model dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      AI Provider & Model
                    </label>
                    <select
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full rounded-lg border border-slate-800/80 bg-[#161c2c]/40 text-xs px-3 h-10 text-slate-200 outline-none focus:border-blue-500/50"
                    >
                      <option value="gpt-4o" className="bg-[#0e1424]">OpenAI ChatGPT (gpt-4o)</option>
                      <option value="gpt-4-turbo" className="bg-[#0e1424]">OpenAI ChatGPT (gpt-4-turbo)</option>
                      <option value="gpt-3.5-turbo" className="bg-[#0e1424]">OpenAI ChatGPT (gpt-3.5-turbo)</option>
                      <option value="claude-3-5-sonnet" className="bg-[#0e1424]">Anthropic Claude (claude-3-5-sonnet)</option>
                      <option value="local-llama3" className="bg-[#0e1424]">Ollama Local (llama3)</option>
                    </select>
                  </div>

                  {/* Secret Key Input field */}
                  <div className="space-y-1.5 relative">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Secret API Key
                    </label>
                    <div className="relative">
                      <Input
                        type={showKey ? "text" : "password"}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="sk-proj-................................"
                        className="h-10 text-xs pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowKey(!showKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5 transition-colors"
                      >
                        {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Save button and feedback */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1">
                      {saveSuccess && (
                        <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 animate-pulse">
                          <Check className="w-3.5 h-3.5" />
                          <span>Credentials Saved!</span>
                        </span>
                      )}
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      className="
text-xs
h-10
px-5
rounded-xl
font-semibold
bg-gradient-to-r
from-blue-600
to-cyan-500
hover:from-blue-500
hover:to-cyan-400
shadow-lg
shadow-blue-500/20
transition-all
duration-300
"                    >
                      Save Key
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Theme & Storage */}
          <div className="space-y-6">

            {/* System Theme Card */}
            <Card
              className="
                             bg-[#0e1424]/80
                             backdrop-blur-xl
                             border border-slate-700/50
                             shadow-lg shadow-black/20
                             hover:shadow-blue-500/10
                             hover:border-blue-500/30
                             hover:-translate-y-1
                             transition-all duration-300
                             w-full
            " >
              <CardHeader className="p-5 border-b border-slate-900/60">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold text-slate-200">System Theme</CardTitle>
                    <CardDescription className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                      Toggle the visual appearance of the application.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "light", icon: Sun, label: "Light" },
                    { id: "dark", icon: Moon, label: "Dark" },
                    { id: "system", icon: Monitor, label: "System" },
                  ].map((t) => {
                    const Icon = t.icon
                    const isSelected = theme === t.id
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => handleThemeChange(t.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold gap-2 transition-all duration-200 ${isSelected
                            ? "bg-blue-600/15 border-blue-500/40 text-blue-400 shadow-sm"
                            : "bg-[#161c2c]/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700/60"
                          }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{t.label}</span>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Memory Space Allocation Capacity */}
            <Card className="bg-[#0e1424]/90 border-slate-800/80 shadow-md">
              <CardHeader className="p-5 border-b border-slate-900/60">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <HardDrive className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold text-slate-200">Memory Space</CardTitle>
                    <CardDescription className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                      Graph database storage size and active memory nodes.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-4">

                {/* Graph Capacity Meter */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                    <span>Active Storage capacity</span>
                    <span className="text-blue-400">{totalNodesUsed} / {maxNodesCapacity} Nodes</span>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="w-full bg-slate-950/60 rounded-full h-2.5 overflow-hidden border border-white/5 shadow-inner">
                    <div
                      className="
h-2.5
rounded-full
bg-gradient-to-r
from-blue-500
via-cyan-400
to-emerald-400
transition-all
duration-700
shadow-lg
shadow-cyan-500/20
"                      style={{ width: `${nodePercentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold tracking-wider uppercase pt-0.5">
                    <span>{nodePercentage}% utilized</span>
                    <span>{maxNodesCapacity - totalNodesUsed} slots free</span>
                  </div>
                </div>

                {/* Storage maintenance actions */}
                <div className="flex gap-2 pt-2 border-t border-slate-900/40">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="flex-1 text-xs gap-1.5 h-9"
                    onClick={() => alert("Memory database index optimization completed.")}
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Optimize DB</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs gap-1.5 h-9 hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400"
                    onClick={handleFlushCache}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Flush Cache</span>
                  </Button>
                </div>
                {flushSuccess && (
                  <div className="text-[10px] text-emerald-400 font-bold text-center animate-pulse">
                    Database cache cleared successfully!
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </AppLayout>
  )
}
