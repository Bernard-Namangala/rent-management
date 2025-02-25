"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TenantFilters() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Property Filter */}
      <div className="space-y-2">
        <Label>Property</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="All properties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All properties</SelectItem>
            <SelectItem value="sunset">Sunset Apartments</SelectItem>
            <SelectItem value="downtown">Downtown Lofts</SelectItem>
            <SelectItem value="parkview">Park View Heights</SelectItem>
            <SelectItem value="river">River Gardens</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lease Status */}
      <div className="space-y-2">
        <Label>Lease Status</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Any status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any status</SelectItem>
            <SelectItem value="current">Current</SelectItem>
            <SelectItem value="expiring">Expiring soon</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="renewal">Up for renewal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Move-in Date Range */}
      <div className="space-y-2">
        <Label>Move-in Date</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Any time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any time</SelectItem>
            <SelectItem value="last-month">Last month</SelectItem>
            <SelectItem value="last-3-months">Last 3 months</SelectItem>
            <SelectItem value="last-6-months">Last 6 months</SelectItem>
            <SelectItem value="last-year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rent Range */}
      <div className="space-y-2">
        <Label>Monthly Rent</Label>
        <div className="flex items-center gap-2">
          <Input type="number" placeholder="Min" className="w-full" />
          <span className="text-muted-foreground">to</span>
          <Input type="number" placeholder="Max" className="w-full" />
        </div>
      </div>

      {/* Payment Status */}
      <div className="space-y-2">
        <Label>Payment Status</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Any status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any status</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
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
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
            <SelectItem value="name-desc">Name: Z to A</SelectItem>
            <SelectItem value="rent-asc">Rent: Low to High</SelectItem>
            <SelectItem value="rent-desc">Rent: High to Low</SelectItem>
            <SelectItem value="move-in-asc">Move-in: Oldest first</SelectItem>
            <SelectItem value="move-in-desc">Move-in: Newest first</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
