"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Info,
  MessageSquare,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  isOwn: boolean;
}

interface ChatViewProps {
  chatId: string | null;
  groupId: string | null;
}

// Mock data - replace with real data from API
const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hi, I have a question about the maintenance request I submitted",
    timestamp: "10:30 AM",
    sender: {
      id: "1",
      name: "John Doe",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    isOwn: false,
  },
  {
    id: "2",
    content: "Of course! What would you like to know?",
    timestamp: "10:31 AM",
    sender: {
      id: "2",
      name: "You",
      avatar: "https://i.pravatar.cc/40?img=4",
    },
    isOwn: true,
  },
  {
    id: "3",
    content: "When will the plumber arrive to fix the leak?",
    timestamp: "10:32 AM",
    sender: {
      id: "1",
      name: "John Doe",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    isOwn: false,
  },
  {
    id: "4",
    content:
      "The plumber is scheduled for tomorrow between 9 AM and 11 AM. I'll make sure to notify you when they're on their way.",
    timestamp: "10:33 AM",
    sender: {
      id: "2",
      name: "You",
      avatar: "https://i.pravatar.cc/40?img=4",
    },
    isOwn: true,
  },
];

export function ChatView({ chatId, groupId }: ChatViewProps) {
  const [newMessage, setNewMessage] = useState("");

  if (!chatId && !groupId) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <MessageSquare className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">Welcome to Messages</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Connect with your property management team, landlord, and fellow
          residents. Select a conversation to start messaging.
        </p>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // TODO: Implement send message logic
    setNewMessage("");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image
              src="https://i.pravatar.cc/40?img=1"
              alt="Chat Avatar"
              fill
              className="rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
          </div>
          <div>
            <h2 className="font-semibold">John Doe</h2>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Info className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {mockMessages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.isOwn ? "flex-row-reverse" : ""
              }`}
            >
              <div className="relative h-8 w-8 flex-shrink-0">
                <Image
                  src={message.sender.avatar}
                  alt={message.sender.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div
                className={`group relative rounded-lg p-3 ${
                  message.isOwn
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="absolute bottom-0 translate-y-full pt-1 text-[10px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button variant="ghost" size="icon">
            <Smile className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            disabled={!newMessage.trim()}
            onClick={handleSendMessage}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
