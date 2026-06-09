import { AppLayout } from "@/components/layout/AppLayout"
import { FolderClosed, Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"

export const metadata = {
  title: "Workspaces | AI Memory Graph",
  description: "Manage and view your AI-powered knowledge workspaces.",
}

export default function WorkspacesPage() {
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
          <Button variant="outline" className="gap-2 h-9 text-xs">
            <Plus className="w-4 h-4" />
            <span>Create Workspace</span>
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center py-20 text-slate-500 text-sm border border-dashed border-slate-800 rounded-xl bg-[#111625]/20">
          <FolderClosed className="w-12 h-12 text-slate-700 mb-3" />
          <p className="font-semibold text-slate-400">No external workspaces added</p>
          <p className="text-xs text-slate-500 mt-1">Click the button above to initialize your first workspace.</p>
        </div>
      </div>
    </AppLayout>
  )
}
