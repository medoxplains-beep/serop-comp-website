import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-white hover:bg-destructive/80",
        outline:
          "text-foreground",
        blue:
          "border-[#315cff]/30 bg-[#315cff]/10 text-[#315cff] dark:bg-[#315cff]/15 dark:text-[#8eb8ff]",
        cyan:
          "border-[#00a7ff]/30 bg-[#00a7ff]/10 text-[#00a7ff] dark:bg-[#00a7ff]/15 dark:text-[#5cd4ff]",
        glass:
          "border-white/20 bg-white/10 text-white backdrop-blur",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof badgeVariants>) {
  return (
    <div
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
