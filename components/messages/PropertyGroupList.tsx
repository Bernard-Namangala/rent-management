"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Building2 } from "lucide-react";

interface PropertyGroup {
  id: string;
  name: string;
  image: string;
  address: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  participants: number;
}

interface PropertyGroupListProps {
  selectedGroup: string | null;
  onSelectGroup: (groupId: string) => void;
}

// Mock data - replace with real data from API
const mockGroups: PropertyGroup[] = [
  {
    id: "1",
    name: "Sunset Apartments - Building A",
    image: "https://placehold.co/200x200/png?text=Building+A",
    address: "123 Main St, Apt 4B",
    lastMessage: "Building maintenance scheduled for next week",
    timestamp: "5m ago",
    unread: 2,
    participants: 45,
  },
  {
    id: "2",
    name: "Resident Community",
    image: "https://placehold.co/200x200/png?text=Community",
    address: "Sunset Apartments",
    lastMessage: "Join us for the monthly resident meetup!",
    timestamp: "2h ago",
    unread: 1,
    participants: 120,
  },
  {
    id: "3",
    name: "Floor 4 Group",
    image: "https://placehold.co/200x200/png?text=Floor+4",
    address: "4th Floor, Building A",
    lastMessage: "Lost keys found in the hallway",
    timestamp: "1d ago",
    unread: 0,
    participants: 12,
  },
];

export function PropertyGroupList({
  selectedGroup,
  onSelectGroup,
}: PropertyGroupListProps) {
  return (
    <div className="space-y-2">
      {mockGroups.map((group) => (
        <button
          key={group.id}
          className={cn(
            "w-full p-3 flex items-start gap-3 rounded-lg transition-colors",
            "hover:bg-muted/50",
            selectedGroup === group.id && "bg-muted"
          )}
          onClick={() => onSelectGroup(group.id)}
        >
          <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-muted">
            <Image
              src={group.image}
              alt={group.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="font-medium truncate">{group.name}</p>
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {group.timestamp}
              </span>
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {group.address}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {group.lastMessage}
            </p>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <Building2 className="h-3 w-3" />
              <span>{group.participants} participants</span>
            </div>
          </div>
          {group.unread > 0 && (
            <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {group.unread}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
