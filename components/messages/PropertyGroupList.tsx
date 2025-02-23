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
    name: "Downtown Apartments",
    image: "https://placehold.co/200x200/png?text=Downtown",
    address: "123 Main St, New York",
    lastMessage: "The lobby will be cleaned tomorrow",
    timestamp: "5m ago",
    unread: 3,
    participants: 12,
  },
  {
    id: "2",
    name: "Sunset Residences",
    image: "https://placehold.co/200x200/png?text=Sunset",
    address: "456 Ocean Ave, Miami",
    lastMessage: "Monthly community meeting this Friday",
    timestamp: "2h ago",
    unread: 0,
    participants: 8,
  },
  {
    id: "3",
    name: "Park View Complex",
    image: "https://placehold.co/200x200/png?text=Park",
    address: "789 Park Rd, Los Angeles",
    lastMessage: "New parking regulations starting next week",
    timestamp: "1d ago",
    unread: 1,
    participants: 15,
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
