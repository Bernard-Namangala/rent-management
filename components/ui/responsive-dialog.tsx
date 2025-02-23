import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ResponsiveDialogProps
  extends React.ComponentProps<typeof DialogContent> {
  side?: "left" | "right";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ResponsiveDialog({
  children,
  side = "right",
  className,
  open,
  onOpenChange,
  ...props
}: ResponsiveDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "overflow-y-auto",
          isDesktop &&
            "fixed !animate-slide-left-fade !duration-300 !rounded-l-lg !rounded-r-none",
          isDesktop && side === "right" && "!right-0",
          isDesktop && side === "left" && "!left-0",
          isDesktop && "!h-screen !max-h-screen !w-[400px]",
          className
        )}
        {...props}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
