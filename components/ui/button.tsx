// ============================================================================
// REUSABLE BUTTON COMPONENT - Styled button with multiple variants
// ============================================================================
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"           // Allows button to render as different elements
import { cva, type VariantProps } from "class-variance-authority" // Utility for variant-based styling

import { cn } from "@/lib/utils"                     // Utility for merging Tailwind classes

// ============================================================================
// BUTTON VARIANTS CONFIGURATION - Defines all button styles and sizes
// ============================================================================
const buttonVariants = cva(
  // Base styles applied to all button variants
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      // Visual style variants
      variant: {
        default:      // Primary button style
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:  // Danger/delete button style
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:      // Outlined button style
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:    // Secondary button style
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:        // Minimal button style
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link:         // Link-styled button
          "text-primary underline-offset-4 hover:underline",
      },
      // Size variants
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",      // Standard size
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5", // Small size
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",     // Large size
        icon: "size-9",                                 // Square icon button
      },
    },
    // Default variant and size when none specified
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// ============================================================================
// BUTTON COMPONENT - Main button component with variant support
// ============================================================================
function Button({
  className,      // Additional CSS classes
  variant,        // Button style variant
  size,          // Button size variant
  asChild = false, // Render as child element instead of button
  ...props       // All other button props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  // Use Slot if asChild is true, otherwise render as button element
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"  // Data attribute for styling/testing
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

// Export button component and variants for external use
export { Button, buttonVariants }
