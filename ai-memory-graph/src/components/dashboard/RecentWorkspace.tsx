import * as React from "react"
import { Card, CardContent } from "@/components/ui/Card"
import { LucideIcon, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface RecentWorkspaceProps {
  title: string
  description: string
  icon: LucideIcon
  iconColor: string
  iconBgColor: string
  tags: string[]
  editedAt: string
  onClick?: () => void
  onDelete?: () => void
}

export function RecentWorkspace({
  title,
  description,
  icon: Icon,
  iconColor,
  iconBgColor,
  tags,
  editedAt,
  onClick,
  onDelete
}: RecentWorkspaceProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "hover:border-slate-700/80 hover:bg-[#151c2d]/70 transition-all duration-200 cursor-pointer relative group",
        onClick && "active:scale-[0.99]"
      )}
    >
      <CardContent className="p-5 flex flex-col justify-between h-full min-h-[150px]">
        <div>
          {/* Workspace Icon */}
          <div className="flex items-center justify-between mb-4">
            <div className={cn("p-2 rounded-lg border border-white/5 shadow-inner", iconBgColor)}>
              <Icon className={cn("w-4.5 h-4.5", iconColor)} />
            </div>
            {onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
                className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                title="Delete Workspace"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Text Info */}
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors duration-200">
              {title}
            </h4>
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Card Footer tags/edited time */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-900/40 pt-3 text-xs text-slate-500 font-medium">
          {/* Tags */}
          <div className="flex items-center gap-1.5">
            {tags.map((color, idx) => (
              <span
                key={idx}
                className="w-2.5 h-2.5 rounded-full border border-[#0B0F19]"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          {/* Edited text */}
          <span>{editedAt}</span>
        </div>
      </CardContent>
    </Card>
  )
}
