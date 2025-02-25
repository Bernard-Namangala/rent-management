"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface PropertyFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property?: Property; // If provided, we're editing; if not, we're adding
}

interface Property {
  id?: string;
  name: string;
  address: string;
  type: string;
  status: "occupied" | "vacant" | "maintenance";
  image?: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
  tenants?: number;
}

const propertyTypes = [
  { value: "apartments", label: "Apartments" },
  { value: "houses", label: "Houses" },
  { value: "commercial", label: "Commercial" },
];

const propertyStatus = [
  { value: "vacant", label: "Vacant" },
  { value: "occupied", label: "Occupied" },
  { value: "maintenance", label: "Under Maintenance" },
];

export function PropertyFormDialog({
  open,
  onOpenChange,
  property,
}: PropertyFormDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [propertyImage, setPropertyImage] = useState<string | null>(
    property?.image || null
  );
  const [formData, setFormData] = useState<Partial<Property>>(
    property || {
      type: "apartments",
      status: "vacant",
    }
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPropertyImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Implement property creation/update logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving property:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof Property, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-[600px] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>
              {property ? "Edit Property" : "Add New Property"}
            </SheetTitle>
            <SheetDescription>
              {property
                ? "Update the property details below"
                : "Fill in the property details below"}
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label>Property Image</Label>
              <div
                {...getRootProps()}
                className={cn(
                  "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center transition-colors",
                  isDragActive
                    ? "border-primary bg-muted/50"
                    : "border-muted-foreground/25 hover:bg-muted/50"
                )}
              >
                <input {...getInputProps()} />
                {propertyImage ? (
                  <div className="relative h-full w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={propertyImage}
                      alt="Property"
                      className="h-full w-full rounded-lg object-cover"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/50 hover:bg-background/80"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPropertyImage(null);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag & drop an image here, or click to select
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Property Name</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter property name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Property Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter property address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Monthly Rent</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price || ""}
                  onChange={(e) =>
                    handleInputChange("price", parseFloat(e.target.value))
                  }
                  placeholder="Enter monthly rent"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: Property["status"]) =>
                    handleInputChange("status", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyStatus.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms || ""}
                  onChange={(e) =>
                    handleInputChange("bedrooms", parseInt(e.target.value))
                  }
                  placeholder="Number of bedrooms"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={formData.bathrooms || ""}
                  onChange={(e) =>
                    handleInputChange("bathrooms", parseInt(e.target.value))
                  }
                  placeholder="Number of bathrooms"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Size (sq ft)</Label>
                <Input
                  id="size"
                  type="number"
                  value={formData.size || ""}
                  onChange={(e) =>
                    handleInputChange("size", parseInt(e.target.value))
                  }
                  placeholder="Property size"
                  required
                />
              </div>

              {formData.status === "occupied" && (
                <div className="space-y-2">
                  <Label htmlFor="tenants">Number of Tenants</Label>
                  <Input
                    id="tenants"
                    type="number"
                    value={formData.tenants || ""}
                    onChange={(e) =>
                      handleInputChange("tenants", parseInt(e.target.value))
                    }
                    placeholder="Number of tenants"
                  />
                </div>
              )}
            </div>
          </div>

          <SheetFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? property
                  ? "Updating..."
                  : "Creating..."
                : property
                ? "Update Property"
                : "Create Property"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
