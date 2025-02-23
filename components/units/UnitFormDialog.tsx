"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface Unit {
  id: string;
  number: string;
  type: string;
  floor: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  rent: number;
  status: "occupied" | "vacant" | "maintenance";
  tenant?: string;
  leaseEnd?: string;
  amenities: string[];
  images: string[];
}

interface UnitFormDialogProps {
  open: boolean;
  onClose: () => void;
  unit?: Unit;
}

export function UnitFormDialog({ open, onClose, unit }: UnitFormDialogProps) {
  const isEditing = !!unit;
  const [formData, setFormData] = useState<Partial<Unit>>(
    unit || {
      number: "",
      type: "",
      floor: 1,
      size: 0,
      bedrooms: 1,
      bathrooms: 1,
      rent: 0,
      status: "vacant",
      amenities: [],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{isEditing ? "Edit Unit" : "Add New Unit"}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Unit Number */}
            <div className="space-y-2">
              <Label htmlFor="number">Unit Number</Label>
              <Input
                id="number"
                value={formData.number}
                onChange={(e) =>
                  setFormData({ ...formData, number: e.target.value })
                }
                required
              />
            </div>

            {/* Unit Type */}
            <div className="space-y-2">
              <Label>Unit Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="1bed">1 Bedroom</SelectItem>
                  <SelectItem value="2bed">2 Bedrooms</SelectItem>
                  <SelectItem value="3bed">3 Bedrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Floor */}
            <div className="space-y-2">
              <Label htmlFor="floor">Floor</Label>
              <Input
                id="floor"
                type="number"
                min={1}
                value={formData.floor}
                onChange={(e) =>
                  setFormData({ ...formData, floor: parseInt(e.target.value) })
                }
                required
              />
            </div>

            {/* Size */}
            <div className="space-y-2">
              <Label htmlFor="size">Size (sq ft)</Label>
              <Input
                id="size"
                type="number"
                min={0}
                value={formData.size}
                onChange={(e) =>
                  setFormData({ ...formData, size: parseInt(e.target.value) })
                }
                required
              />
            </div>

            {/* Bedrooms */}
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                min={0}
                value={formData.bedrooms}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bedrooms: parseInt(e.target.value),
                  })
                }
                required
              />
            </div>

            {/* Bathrooms */}
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                min={0}
                step={0.5}
                value={formData.bathrooms}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bathrooms: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>

            {/* Rent */}
            <div className="space-y-2">
              <Label htmlFor="rent">Monthly Rent ($)</Label>
              <Input
                id="rent"
                type="number"
                min={0}
                value={formData.rent}
                onChange={(e) =>
                  setFormData({ ...formData, rent: parseInt(e.target.value) })
                }
                required
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Unit["status"]) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vacant">Vacant</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="balcony" className="cursor-pointer">
                  Balcony
                </Label>
                <Switch
                  id="balcony"
                  checked={formData.amenities?.includes("Balcony")}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      amenities: checked
                        ? [...(formData.amenities || []), "Balcony"]
                        : formData.amenities?.filter((a) => a !== "Balcony"),
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="dishwasher" className="cursor-pointer">
                  Dishwasher
                </Label>
                <Switch
                  id="dishwasher"
                  checked={formData.amenities?.includes("Dishwasher")}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      amenities: checked
                        ? [...(formData.amenities || []), "Dishwasher"]
                        : formData.amenities?.filter((a) => a !== "Dishwasher"),
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="central-ac" className="cursor-pointer">
                  Central AC
                </Label>
                <Switch
                  id="central-ac"
                  checked={formData.amenities?.includes("Central AC")}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      amenities: checked
                        ? [...(formData.amenities || []), "Central AC"]
                        : formData.amenities?.filter((a) => a !== "Central AC"),
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="walk-in-closet" className="cursor-pointer">
                  Walk-in Closet
                </Label>
                <Switch
                  id="walk-in-closet"
                  checked={formData.amenities?.includes("Walk-in Closet")}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      amenities: checked
                        ? [...(formData.amenities || []), "Walk-in Closet"]
                        : formData.amenities?.filter(
                            (a) => a !== "Walk-in Closet"
                          ),
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Save Changes" : "Add Unit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
