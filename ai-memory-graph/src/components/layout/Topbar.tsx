"use client"

import * as React from "react"
import { Search, Bell, History, Moon, Sun, Menu } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"

interface TopbarProps {
  onMenuClick?: () => void
  searchVal?: string
  onSearchChange?: (val: string) => void
}

export function Topbar({ onMenuClick, searchVal = "", onSearchChange }: TopbarProps) {
  const [activeTab, setActiveTab] = React.useState<"recent" | "pinned" | "shared">("recent")
  const [isDark, setIsDark] = React.useState(true)

  const tabs = [
    { id: "recent" as const, label: "Recent" },
    { id: "pinned" as const, label: "Pinned" },
    { id: "shared" as const, label: "Shared" },
  ]

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-[#0B0F19] border-b border-slate-900/60 sticky top-0 z-40 select-none">
      {/* Mobile Menu Button & Title */}
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 cursor-pointer"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <h2 className="text-base font-semibold text-slate-100 hidden sm:block">
          Workspace Explorer
        </h2>
      </div>

      {/* Center Search Bar */}
      <div className="flex-1 max-w-md mx-4 sm:mx-8">
        <Input
          type="text"
          placeholder="Search memories..."
          icon={<Search className="w-4 h-4 text-slate-400" />}
          className="bg-[#121824]/85 border-slate-800/80 focus:border-blue-500/40 text-slate-100 placeholder-slate-500 text-xs sm:text-sm"
          value={searchVal}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>

      {/* Right Actions Container */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 bg-[#101622]/60 p-1 rounded-lg border border-slate-800/50 text-xs hidden md:flex">
          {tabs.map((tab) => {
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-3 py-1 rounded-md font-medium transition-all duration-200 cursor-pointer",
                  active
                    ? "bg-[#1d273a] text-blue-400 border border-slate-700/30"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Icons Area */}
        <div className="flex items-center gap-2 sm:gap-3 text-slate-400">
          <button
            className="p-1.5 rounded-lg hover:text-slate-200 hover:bg-slate-800/40 relative cursor-pointer transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-[#0B0F19]" />
          </button>

          <button
            className="p-1.5 rounded-lg hover:text-slate-200 hover:bg-slate-800/40 cursor-pointer transition-colors"
            aria-label="History"
          >
            <History className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-1.5 rounded-lg hover:text-slate-200 hover:bg-slate-800/40 cursor-pointer transition-colors"
            aria-label="Theme toggle"
          >
            {isDark ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
          </button>
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 border-l border-slate-800/80 pl-4 sm:pl-5">
          <div className="relative group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold select-none ring-2 ring-blue-500/30 group-hover:ring-blue-500/60 transition-all duration-200">
              AX
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0B0F19]" />
          </div>
          <span className="text-xs font-medium text-slate-300 hidden lg:block select-none">
            Alex
          </span>
        </div>
      </div>
    </header>
  )
}
