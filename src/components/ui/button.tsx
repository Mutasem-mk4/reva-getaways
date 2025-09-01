"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Button as AriaButton,
  composeRenderProps,
  type ButtonProps as ReactAriaButtonProps,
} from "react-aria-components"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors",
    /* Disabled */
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    /* Focus Visible */
    "data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring data-[focus-visible]:ring-offset-2",
    /* Legacy focus-visible for non-aria components */
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 data-[hovered]:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 data-[hovered]:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground data-[hovered]:bg-accent data-[hovered]:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 data-[hovered]:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground data-[hovered]:bg-accent data-[hovered]:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline data-[hovered]:underline",
        hero: "bg-gradient-hero text-primary-foreground hover:shadow-emerald border border-emerald-light/20 data-[hovered]:shadow-emerald",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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

export interface AriaButtonProps
  extends ReactAriaButtonProps,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// Separate Aria Button for react-aria-components usage
const AriaButtonComponent = React.forwardRef<HTMLButtonElement, AriaButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <AriaButton
        className={composeRenderProps(className, (className) =>
          cn(buttonVariants({ variant, size, className }))
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
AriaButtonComponent.displayName = "AriaButton"

export { Button, AriaButtonComponent as AriaButton, buttonVariants }
