"use client";

import { type ReactElement } from "react";
import { useState } from "react";
import { Wrench } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MaintenanceRequestSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MaintenanceRequestSheet({
  open,
  onOpenChange,
}: MaintenanceRequestSheetProps): ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [preferredDate, setPreferredDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Submitting maintenance request:", {
        title,
        description,
        priority,
        preferredDate,
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting maintenance request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Report Maintenance Issue
          </SheetTitle>
          <SheetDescription>
            Submit a maintenance request for your unit
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Issue Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Leaking Faucet"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please describe the issue in detail..."
              required
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority Level</Label>
            <Select value={priority} onValueChange={setPriority} required>
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Non-urgent</SelectItem>
                <SelectItem value="medium">Medium - Needs attention</SelectItem>
                <SelectItem value="high">High - Urgent</SelectItem>
                <SelectItem value="emergency">
                  Emergency - Immediate action required
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferred-date">Preferred Service Date</Label>
            <Input
              id="preferred-date"
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
