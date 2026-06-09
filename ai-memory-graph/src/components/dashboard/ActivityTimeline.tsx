import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Activity } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ActivityItem {
  id: string
  time: string
  title: string
  description: string
  dotColor: string
  ringColor: string
}

interface ActivityTimelineProps {
  activities?: ActivityItem[]
  className?: string
}

export function ActivityTimeline({ activities = [], className }: ActivityTimelineProps) {
  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center gap-2 pb-4 border-b border-slate-900/60">
        <Activity className="w-4.5 h-4.5 text-blue-400" />
        <CardTitle className="text-sm font-semibold tracking-wide text-slate-200">
          AI Activity
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 flex-1 relative overflow-y-auto">
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 text-xs">
            No activity logged.
          </div>
        ) : (
          <div className="relative pl-6 space-y-6">
            {/* Vertical timeline line */}
            <span className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-800/80" />

            {activities.map((act) => (
              <div key={act.id} className="relative group">
                {/* Glowing Dot */}
                <span className={cn(
                  "absolute left-[-23px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 transition-all duration-300",
                  act.dotColor,
                  act.ringColor
                )} />

                {/* Content */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                      {act.time}
                    </span>
                  </div>
                  <h5 className="text-xs font-semibold text-slate-300 group-hover:text-slate-200 transition-colors">
                    {act.title}
                  </h5>
                  <p className="text-xs leading-relaxed text-slate-400">
                    {act.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
