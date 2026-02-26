import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

// COMPONENTES BASE SIN TEMA, SIN TOGGLE Y SIN DARK MODE

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-64 bg-white border-r text-foreground", className)}
    {...props}
  >
    {children}
  </div>
));
Sidebar.displayName = "Sidebar";

export const SidebarHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-4 font-semibold text-lg", className)} {...props} />
);

export const SidebarContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex-1 p-2", className)} {...props} />
);

export const SidebarFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-4 border-t", className)} {...props} />
);

export const SidebarGroup = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-4", className)} {...props} />
);

export const SidebarGroupLabel = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-2 py-1 text-sm font-medium", className)} {...props} />
);

export const SidebarItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors text-sm",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
SidebarItem.displayName = "SidebarItem";