"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

interface ChatListProps {
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
}

// Mock data - replace with real data from API
const mockChats: Chat[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/40?img=1",
    lastMessage: "When will the maintenance be done?",
    timestamp: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/40?img=2",
    lastMessage: "I've sent the rent payment",
    timestamp: "1h ago",
    unread: 0,
    online: false,
  },
  {
    id: "3",
    name: "Mike Johnson",
    avatar: "https://i.pravatar.cc/40?img=3",
    lastMessage: "Thanks for fixing the issue",
    timestamp: "2h ago",
    unread: 1,
    online: true,
  },
];

export function ChatList({ selectedChat, onSelectChat }: ChatListProps) {
  return (
    <div className="space-y-2">
      {mockChats.map((chat) => (
        <button
          key={chat.id}
          className={cn(
            "w-full p-3 flex items-start gap-3 rounded-lg transition-colors",
            "hover:bg-muted/50",
            selectedChat === chat.id && "bg-muted"
          )}
          onClick={() => onSelectChat(chat.id)}
        >
          <div className="relative">
            <div className="relative h-10 w-10">
              <Image
                src={chat.avatar}
                alt={chat.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            {chat.online && (
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="font-medium truncate">{chat.name}</p>
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {chat.timestamp}
              </span>
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {chat.lastMessage}
            </p>
          </div>
          {chat.unread > 0 && (
            <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {chat.unread}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
