import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden before:absolute before:inset-0 before:translate-x-[-100%] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-transform before:duration-500 hover:before:translate-x-[100%]", {
  variants: {
    variant: {
      default: "bg-gradient-to-b from-[hsl(220,15%,60%)] via-[hsl(220,10%,50%)] to-[hsl(220,10%,40%)] text-primary-foreground border-t border-[hsl(220,15%,70%)] shadow-[inset_0_1px_0_0_hsl(220,15%,65%),inset_0_-2px_4px_0_hsl(220,10%,35%),0_4px_8px_-2px_hsl(220,10%,20%/0.4)] hover:from-[hsl(220,15%,65%)] hover:via-[hsl(220,10%,55%)] hover:to-[hsl(220,10%,45%)] active:shadow-[inset_0_2px_4px_0_hsl(220,10%,30%)] active:translate-y-[1px]",
      destructive: "bg-gradient-to-b from-[hsl(0,65%,55%)] via-[hsl(0,70%,50%)] to-[hsl(0,70%,40%)] text-destructive-foreground border-t border-[hsl(0,60%,65%)] shadow-[inset_0_1px_0_0_hsl(0,60%,60%),inset_0_-2px_4px_0_hsl(0,70%,35%),0_4px_8px_-2px_hsl(0,70%,20%/0.4)] hover:from-[hsl(0,65%,60%)] hover:via-[hsl(0,70%,55%)] hover:to-[hsl(0,70%,45%)] active:shadow-[inset_0_2px_4px_0_hsl(0,70%,30%)] active:translate-y-[1px]",
      outline: "border-2 border-[hsl(220,10%,50%)] bg-transparent text-foreground shadow-[0_2px_4px_-1px_hsl(220,10%,20%/0.2)] hover:bg-[hsl(220,10%,50%/0.1)] active:shadow-[inset_0_1px_2px_0_hsl(220,10%,30%/0.3)]",
      secondary: "bg-gradient-to-b from-[hsl(200,70%,85%)] via-[hsl(200,75%,80%)] to-[hsl(200,80%,70%)] text-secondary-foreground border-t border-[hsl(200,70%,90%)] shadow-[inset_0_1px_0_0_hsl(200,70%,88%),inset_0_-2px_4px_0_hsl(200,80%,65%),0_4px_8px_-2px_hsl(200,80%,40%/0.3)] hover:from-[hsl(200,70%,88%)] hover:via-[hsl(200,75%,83%)] hover:to-[hsl(200,80%,73%)] active:shadow-[inset_0_2px_4px_0_hsl(200,80%,60%)] active:translate-y-[1px]",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant,
  size,
  asChild = false,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn("", buttonVariants({
    variant,
    size,
    className
  }))} ref={ref} {...props} />;
});
Button.displayName = "Button";
export { Button, buttonVariants };