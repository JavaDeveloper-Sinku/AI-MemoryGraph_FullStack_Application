import { AppLayout } from "@/components/layout/AppLayout"
import { BarChart3 } from "lucide-react"

export const metadata = {
  title: "Analytics | AI Memory Graph",
  description: "Monitor second brain query performance, active clusters, and workspace insights.",
}

export default function AnalyticsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="border-b border-slate-900/60 pb-5 select-none">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
            Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time analytics and insights from your memory graph.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-20 text-slate-500 text-sm border border-dashed border-slate-800 rounded-xl bg-[#111625]/20">
          <BarChart3 className="w-12 h-12 text-slate-700 mb-3" />
          <p className="font-semibold text-slate-400">No data points calculated yet</p>
          <p className="text-xs text-slate-500 mt-1">Analytics will load once query and memory logs accumulate.</p>
        </div>
      </div>
    </AppLayout>
  )
}
