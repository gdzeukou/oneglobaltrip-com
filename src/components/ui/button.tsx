
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-button text-base font-medium ring-offset-background transition-all duration-200 ease-tech focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group hover:-translate-y-0.5 hover:shadow-elevation-3 active:translate-y-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-tech-blue-500 to-tech-blue-600 text-white hover:from-tech-blue-600 hover:to-tech-blue-700 hover:shadow-lg hover:shadow-tech-blue-500/25",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:shadow-red-500/25",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-tech-blue-300 hover:shadow-elevation-2",
        secondary:
          "bg-gradient-to-r from-tech-cyan-500 to-tech-cyan-600 text-white hover:from-tech-cyan-600 hover:to-tech-cyan-700 hover:shadow-lg hover:shadow-tech-cyan-500/25",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-elevation-1",
        link: "text-primary underline-offset-4 hover:underline hover:text-tech-blue-600",
        glass: "glass-effect text-white hover:bg-white/20 hover:shadow-glass backdrop-blur-glass border border-white/20",
        neon: "bg-gradient-to-r from-black to-gray-900 text-neon-accent border border-neon-accent/50 hover:shadow-neon hover:border-neon-accent hover:bg-gradient-to-r hover:from-gray-900 hover:to-black",
      },
      size: {
        default: "h-12 px-6 py-3 min-w-[120px]",
        sm: "h-10 rounded-button px-4 text-sm",
        lg: "h-14 rounded-button px-8 text-lg font-semibold",
        icon: "h-12 w-12 rounded-button",
        pill: "h-12 px-8 rounded-pill",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* Shimmer effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700 pointer-events-none" />
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
