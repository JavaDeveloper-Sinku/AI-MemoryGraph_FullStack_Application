import * as React from "react"
import { Card, CardContent } from "@/components/ui/Card"
import { TrendingUp, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: LucideIcon
  iconColor: string
  iconBgColor: string
  trendType?: "positive" | "neutral" | "negative"
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  iconBgColor,
  trendType = "neutral"
}: StatsCardProps) {
  return (
    <Card className="hover:translate-y-[-2px] hover:border-slate-700/60 duration-200 cursor-default select-none relative overflow-hidden group">
      {/* Background radial gradient glow for cards */}
      <div className={cn(
        "absolute top-[-30px] right-[-30px] w-24 h-24 rounded-full blur-xl group-hover:opacity-100 transition-opacity duration-300 opacity-60 pointer-events-none",
        iconBgColor
      )} />
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
              {title}
            </span>
            <div className="text-3xl font-bold text-slate-100 tracking-tight">
              {value}
            </div>
          </div>
          <div className={cn("p-2 rounded-xl border border-white/5 shadow-inner", iconBgColor)}>
            <Icon className={cn("w-5 h-5", iconColor)} />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-[11px] sm:text-xs">
          {trendType === "positive" ? (
            <span className="flex items-center gap-0.5 font-semibold text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{subtitle}</span>
            </span>
          ) : (
            <span className="text-slate-400 font-medium">
              {subtitle}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
