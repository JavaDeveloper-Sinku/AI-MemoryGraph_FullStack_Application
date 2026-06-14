"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { useWorkspace } from "@/hooks/useWorkspace"
import {
  Brain,
  LayoutDashboard,
  FolderClosed,
  MessageSquare,
  Cpu,
  BarChart3,
  Settings,
  HelpCircle,
  User,
  LogOut,
  Plus
} from "lucide-react"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { setCreateModalOpen } = useWorkspace()

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Workspaces",
      href: "/workspaces",
      icon: FolderClosed,
    },
    {
      name: "Chat",
      href: "/chat",
      icon: MessageSquare,
    },
    {
      name: "Memory Center",
      href: "/memory",
      icon: Cpu,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      name: "Help",
      href: "/help",
      icon: HelpCircle,
    },
  ]

  const bottomItems = [
    {
      name: "Account",
      href: "/account",
      icon: User,
    },
    {
      name: "Logout",
      href: "/logout",
      icon: LogOut,
    },
  ]

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/"
    }
    return pathname?.startsWith(href)
  }

  return (
    <aside
      className={cn(
        "flex flex-col w-64 bg-[#070b13] border-r border-slate-900/60 text-slate-300 h-screen overflow-y-auto shrink-0 select-none",
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 shadow-lg shadow-blue-500/20">
          <Brain className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <h1 className="font-bold text-slate-100 leading-tight text-sm tracking-wide">
            AI Memory Graph
          </h1>
          <p className="text-[10px] text-slate-500 font-medium">Second Brain v2.0</p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-4 py-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-400 text-xs font-semibold py-2 px-3 h-9"
          onClick={() => setCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span>New Workspace</span>
        </Button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                active
                  ? "bg-blue-600/15 text-blue-400 border border-blue-500/10 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
              )}
            >
              {active && (
                <span className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r bg-blue-500" />
              )}
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors duration-200",
                  active ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                )}
              />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Nav List */}
      <div className="px-3 py-4 border-t border-slate-900/60 space-y-1">
        {bottomItems.map((item) => {
          const active = isActive(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                active
                  ? "bg-slate-800 text-slate-100"
                  : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/20"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
