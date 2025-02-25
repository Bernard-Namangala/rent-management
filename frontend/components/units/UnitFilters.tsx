"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface UnitFiltersProps {
  open: boolean;
  onClose: () => void;
}

export function UnitFilters({ open, onClose }: UnitFiltersProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>Filter Units</SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>
        <div className="mt-8 space-y-6">
          {/* Price Range */}
          <div className="space-y-4">
            <Label>Price Range</Label>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">$500</span>
              <span className="text-sm text-muted-foreground">$5000</span>
            </div>
            <Slider
              defaultValue={[500, 5000]}
              max={5000}
              min={500}
              step={100}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            />
          </div>

          {/* Unit Type */}
          <div className="space-y-4">
            <Label>Unit Type</Label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select unit type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="1bed">1 Bedroom</SelectItem>
                <SelectItem value="2bed">2 Bedrooms</SelectItem>
                <SelectItem value="3bed">3 Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Floor */}
          <div className="space-y-4">
            <Label>Floor</Label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select floor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Floors</SelectItem>
                <SelectItem value="1">1st Floor</SelectItem>
                <SelectItem value="2">2nd Floor</SelectItem>
                <SelectItem value="3">3rd Floor</SelectItem>
                <SelectItem value="4">4th Floor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Size Range */}
          <div className="space-y-4">
            <Label>Size Range (sq ft)</Label>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">300</span>
              <span className="text-sm text-muted-foreground">2000</span>
            </div>
            <Slider
              defaultValue={[300, 2000]}
              max={2000}
              min={300}
              step={50}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            />
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <Label>Amenities</Label>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="balcony" className="cursor-pointer">
                  Balcony
                </Label>
                <Switch id="balcony" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="dishwasher" className="cursor-pointer">
                  Dishwasher
                </Label>
                <Switch id="dishwasher" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="central-ac" className="cursor-pointer">
                  Central AC
                </Label>
                <Switch id="central-ac" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="walk-in-closet" className="cursor-pointer">
                  Walk-in Closet
                </Label>
                <Switch id="walk-in-closet" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose}>Apply Filters</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
