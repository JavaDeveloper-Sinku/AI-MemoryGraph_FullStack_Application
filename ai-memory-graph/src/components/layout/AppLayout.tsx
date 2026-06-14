"use client"

import * as React from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { Topbar } from "@/components/layout/Topbar"
import { cn } from "@/lib/utils"
import { useWorkspace } from "@/hooks/useWorkspace"
import { CreateWorkspaceModal } from "@/components/dashboard/CreateWorkspaceModal"

export interface AppLayoutProps {
  children: React.ReactNode
  searchVal?: string
  onSearchChange?: (val: string) => void
  noPadding?: boolean
}

export function AppLayout({ children, searchVal, onSearchChange, noPadding }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const { isCreateModalOpen, setCreateModalOpen, addWorkspace } = useWorkspace()

  return (
    <div className="flex h-screen w-full bg-[#0B0F19] text-slate-100 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden md:flex" />

      {/* Mobile Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar drawer */}
      <div
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 md:hidden transition-transform duration-300 transform shadow-2xl",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar className="h-full border-r-0" />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full min-w-0">
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
          searchVal={searchVal}
          onSearchChange={onSearchChange}
        />
        <main className={cn("flex-1 overflow-y-auto bg-[#0B0F19] relative flex flex-col min-h-0", noPadding ? "p-0" : "p-4 sm:p-6 md:p-8")}>
          {/* Subtle background glow */}
          <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />
          
          <div className={cn("relative z-10 w-full h-full flex flex-col min-h-0 flex-1", noPadding ? "max-w-none" : "max-w-7xl mx-auto")}>
            {children}
          </div>
        </main>
      </div>
      <CreateWorkspaceModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={addWorkspace}
      />
    </div>
  )
}
