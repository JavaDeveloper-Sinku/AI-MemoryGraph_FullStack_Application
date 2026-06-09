import { AppLayout } from "@/components/layout/AppLayout"
import { Settings } from "lucide-react"

export const metadata = {
  title: "Settings | AI Memory Graph",
  description: "Configure your API integrations, database backups, and custom triggers.",
}

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="border-b border-slate-900/60 pb-5 select-none">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
            Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure integrations, memory rules, and connection credentials.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-20 text-slate-500 text-sm border border-dashed border-slate-800 rounded-xl bg-[#111625]/20">
          <Settings className="w-12 h-12 text-slate-700 mb-3" />
          <p className="font-semibold text-slate-400">Settings Configured to Default</p>
          <p className="text-xs text-slate-500 mt-1">Local database and backup rules are currently active.</p>
        </div>
      </div>
    </AppLayout>
  )
}
