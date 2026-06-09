import { AppLayout } from "@/components/layout/AppLayout"
import { Cpu, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/Button"

export const metadata = {
  title: "Memory Center | AI Memory Graph",
  description: "View synchronized memory blocks and graph configurations.",
}

export default function MemoryPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-900/60 pb-5 select-none">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              Memory Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Analyze, delete, or optimize synthesized memory nodes.
            </p>
          </div>
          <Button variant="outline" className="gap-2 h-9 text-xs">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Re-index Graph</span>
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center py-20 text-slate-500 text-sm border border-dashed border-slate-800 rounded-xl bg-[#111625]/20">
          <Cpu className="w-12 h-12 text-slate-700 mb-3" />
          <p className="font-semibold text-slate-400">Memory Graph is Synchronized</p>
          <p className="text-xs text-slate-500 mt-1">Total of 856 nodes are active across all projects.</p>
        </div>
      </div>
    </AppLayout>
  )
}
