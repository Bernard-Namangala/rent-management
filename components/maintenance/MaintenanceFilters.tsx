"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";
import { useState } from "react";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export function MaintenanceFilters() {
  const [date, setDate] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

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
          </SelectContent>
        </Select>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <Label>Category</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            <SelectItem value="plumbing">Plumbing</SelectItem>
            <SelectItem value="electrical">Electrical</SelectItem>
            <SelectItem value="hvac">HVAC</SelectItem>
            <SelectItem value="appliance">Appliance</SelectItem>
            <SelectItem value="structural">Structural</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Priority Filter */}
      <div className="space-y-2">
        <Label>Priority</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Any priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any priority</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status Filter */}
      <div className="space-y-2">
        <Label>Status</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Any status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Date Range */}
      <div className="space-y-2 md:col-span-2">
        <Label>Date Range</Label>
        <DatePickerWithRange date={date} setDate={setDate} />
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
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="priority-high">Priority: High to Low</SelectItem>
            <SelectItem value="priority-low">Priority: Low to High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
