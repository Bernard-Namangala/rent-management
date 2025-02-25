"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PropertyFilters() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Price Range */}
      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="flex items-center gap-2">
          <Input type="number" placeholder="Min" className="w-full" />
          <span className="text-muted-foreground">to</span>
          <Input type="number" placeholder="Max" className="w-full" />
        </div>
      </div>

      {/* Bedrooms */}
      <div className="space-y-2">
        <Label>Bedrooms</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bathrooms */}
      <div className="space-y-2">
        <Label>Bathrooms</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Property Status */}
      <div className="space-y-2">
        <Label>Status</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="occupied">Occupied</SelectItem>
            <SelectItem value="vacant">Vacant</SelectItem>
            <SelectItem value="maintenance">Under Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Additional Filters */}
      <div className="space-y-2">
        <Label>Property Size (sq ft)</Label>
        <div className="flex items-center gap-2">
          <Input type="number" placeholder="Min" className="w-full" />
          <span className="text-muted-foreground">to</span>
          <Input type="number" placeholder="Max" className="w-full" />
        </div>
      </div>

      {/* Year Built */}
      <div className="space-y-2">
        <Label>Year Built</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="2020">2020+</SelectItem>
            <SelectItem value="2015">2015-2019</SelectItem>
            <SelectItem value="2010">2010-2014</SelectItem>
            <SelectItem value="2000">2000-2009</SelectItem>
            <SelectItem value="older">Before 2000</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Amenities */}
      <div className="space-y-2">
        <Label>Amenities</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select amenities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="parking">Parking</SelectItem>
            <SelectItem value="pool">Swimming Pool</SelectItem>
            <SelectItem value="gym">Gym</SelectItem>
            <SelectItem value="security">24/7 Security</SelectItem>
            <SelectItem value="elevator">Elevator</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <Label>Sort By</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Most Recent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="size-asc">Size: Small to Large</SelectItem>
            <SelectItem value="size-desc">Size: Large to Small</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
