"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { FolderClosed, Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useWorkspace } from "@/hooks/useWorkspace"
import { RecentWorkspace } from "@/components/dashboard/RecentWorkspace"
import * as LucideIcons from "lucide-react"
import { useRouter } from "next/navigation"

export default function WorkspacesPage() {
  const { workspaces, setCreateModalOpen, deleteWorkspace, setActiveWorkspaceId } = useWorkspace()
  const router = useRouter()

  // Set the document title dynamically on client
  React.useEffect(() => {
    document.title = "Workspaces | AI Memory Graph"
  }, [])

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-900/60 pb-5 select-none">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              Workspaces
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select or manage your virtual knowledge workspaces.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="gap-2 h-9 text-xs hover:scale-[1.01] active:scale-[0.99] transition-transform"
            onClick={() => setCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            <span>Create Workspace</span>
          </Button>
        </div>

        {workspaces.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500 text-sm border border-dashed border-slate-800 rounded-xl bg-[#111625]/20 animate-in fade-in duration-300">
            <FolderClosed className="w-12 h-12 text-slate-700 mb-3 animate-bounce" />
            <p className="font-semibold text-slate-400">No external workspaces added</p>
            <p className="text-xs text-slate-500 mt-1">Click the button above to initialize your first workspace.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-in fade-in duration-300">
            {workspaces.map((ws) => {
              const IconComponent = (LucideIcons as any)[ws.iconName] || LucideIcons.FolderClosed
              return (
                <RecentWorkspace
                  key={ws.id}
                  title={ws.title}
                  description={ws.description}
                  icon={IconComponent}
                  iconColor={ws.iconColor}
                  iconBgColor={ws.iconBgColor}
                  tags={ws.tags}
                  editedAt={ws.editedAt}
                  onClick={() => {
                    setActiveWorkspaceId(ws.id)
                    router.push("/chat")
                  }}
                  onDelete={() => {
                    if (confirm(`Are you sure you want to delete workspace "${ws.title}"?`)) {
                      deleteWorkspace(ws.id)
                    }
                  }}
                />
              )
            })}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
