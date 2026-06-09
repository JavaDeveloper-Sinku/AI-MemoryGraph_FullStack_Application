import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link"
  size?: "sm" | "md" | "lg"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
          {
            "bg-blue-600 text-white hover:bg-blue-500 active:scale-98 shadow-lg shadow-blue-500/10":
              variant === "primary",
            "bg-slate-800/80 text-slate-200 hover:bg-slate-700/80 active:scale-98 border border-slate-700/50":
              variant === "secondary",
            "border border-blue-500/30 bg-blue-500/5 text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/60 active:scale-98":
              variant === "outline",
            "text-slate-400 hover:bg-slate-800/40 hover:text-slate-100":
              variant === "ghost",
            "text-blue-400 hover:underline underline-offset-4":
              variant === "link",
          },
          {
            "h-8 px-3 text-xs": size === "sm",
            "h-10 px-4 text-sm": size === "md",
            "h-12 px-6 text-base": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
