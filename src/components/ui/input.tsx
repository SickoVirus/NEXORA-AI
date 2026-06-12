import * as React from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-lg border border-glass-border bg-surface/50 text-sm text-foreground placeholder:text-foreground/40",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-all duration-200",
            icon ? "pl-10 pr-3 py-2" : "px-3 py-2",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
