import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border text-sm font-medium whitespace-nowrap select-none outline-none transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-sm shadow-primary/15 hover:-translate-y-[1px] hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20 active:translate-y-0 active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-primary/20",

        outline:
          "border-border/80 bg-background text-foreground hover:-translate-y-[1px] hover:border-primary/40 hover:bg-primary/[0.04] hover:text-primary hover:shadow-sm active:translate-y-0 active:scale-[0.98]",

        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-sm active:scale-[0.98]",

        ghost:
          "border-transparent bg-transparent text-foreground hover:bg-muted/70 hover:text-primary active:scale-[0.97]",

        destructive:
          "border-destructive/10 bg-destructive/10 text-destructive hover:bg-destructive/15 hover:shadow-sm active:scale-[0.98]",

        link:
          "border-transparent bg-transparent text-primary shadow-none hover:text-primary/80 hover:underline hover:underline-offset-4",
      },

      size: {
        default:
          "h-10 gap-2 px-5",

        xs:
          "h-7 gap-1.5 px-3 text-xs",

        sm:
          "h-8 gap-1.5 px-4 text-[0.8rem]",

        lg:
          "h-12 gap-2.5 px-7 text-sm font-semibold",

        icon:
          "size-10",

        "icon-xs":
          "size-7",

        "icon-sm":
          "size-8",

        "icon-lg":
          "size-12",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
