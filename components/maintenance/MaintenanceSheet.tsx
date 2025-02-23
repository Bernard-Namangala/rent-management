"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface MaintenanceSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (request: any) => void;
}

export function MaintenanceSheet({
  open,
  onOpenChange,
  onSubmit,
}: MaintenanceSheetProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    property: "",
    category: "",
    priority: "",
    images: [] as File[],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
      onOpenChange(false);
      setFormData({
        title: "",
        description: "",
        property: "",
        category: "",
        priority: "",
        images: [],
      });
    } catch (error) {
      console.error("Error submitting request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>New Maintenance Request</SheetTitle>
          <SheetDescription>
            Create a new maintenance request. Fill in all the required details
            below.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Brief description of the issue"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Detailed description of the maintenance issue"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              required
              className="min-h-[100px]"
            />
          </div>

          {/* Property */}
          <div className="space-y-2">
            <Label htmlFor="property">Property</Label>
            <Select
              value={formData.property}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, property: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="property1">
                  Sunset Apartments #204
                </SelectItem>
                <SelectItem value="property2">Downtown Lofts #102</SelectItem>
                <SelectItem value="property3">
                  Park View Heights #305
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="hvac">HVAC</SelectItem>
                <SelectItem value="appliance">Appliance</SelectItem>
                <SelectItem value="structural">Structural</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, priority: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="images">Images</Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setFormData((prev) => ({ ...prev, images: files }));
              }}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground">
              Upload images of the issue (optional)
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Request
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
