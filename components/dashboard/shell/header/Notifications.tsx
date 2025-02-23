"use client";

import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NotificationsProps {
  userType: "landlord" | "tenant" | "admin";
}

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead?: boolean;
}

const getNotifications = (userType: string): Notification[] => {
  switch (userType) {
    case "landlord":
      return [
        {
          id: "1",
          title: "New Maintenance Request",
          description: "Unit 101 reported a leaking faucet",
          time: "5 minutes ago",
          isRead: false,
        },
        {
          id: "2",
          title: "Rent Payment Received",
          description: "Tenant John Doe paid rent for Unit 203",
          time: "1 hour ago",
          isRead: false,
        },
        {
          id: "3",
          title: "Lease Expiring Soon",
          description: "Unit 305's lease expires in 30 days",
          time: "2 hours ago",
          isRead: true,
        },
      ];
    case "tenant":
      return [
        {
          id: "1",
          title: "Maintenance Update",
          description: "Your maintenance request has been scheduled",
          time: "10 minutes ago",
          isRead: false,
        },
        {
          id: "2",
          title: "Rent Payment Confirmation",
          description: "Your rent payment was processed successfully",
          time: "1 day ago",
          isRead: true,
        },
        {
          id: "3",
          title: "Lease Reminder",
          description: "Your lease is due for renewal next month",
          time: "2 days ago",
          isRead: true,
        },
      ];
    case "admin":
      return [
        {
          id: "1",
          title: "New User Registration",
          description: "A new landlord account was created",
          time: "30 minutes ago",
          isRead: false,
        },
        {
          id: "2",
          title: "System Update",
          description: "Platform maintenance scheduled for tonight",
          time: "2 hours ago",
          isRead: false,
        },
        {
          id: "3",
          title: "Support Ticket",
          description: "New high-priority support request",
          time: "3 hours ago",
          isRead: true,
        },
      ];
    default:
      return [];
  }
};

export function Notifications({ userType }: NotificationsProps) {
  const notifications = getNotifications(userType);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-primary/5"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 mt-2"
        align="end"
        sideOffset={5}
        alignOffset={-5}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Notifications</p>
            <p className="text-xs text-muted-foreground">
              You have {unreadCount} unread notifications
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={cn(
                "flex flex-col gap-1 p-3 cursor-pointer transition-colors",
                "hover:bg-primary/5 focus:bg-primary/5",
                !notification.isRead && "bg-primary/5"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <p
                  className={cn(
                    "text-sm font-medium leading-none",
                    !notification.isRead && "text-primary"
                  )}
                >
                  {notification.title}
                </p>
                {!notification.isRead && (
                  <span className="h-2 w-2 rounded-full bg-primary" />
                )}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {notification.description}
              </p>
              <p className="text-xs text-muted-foreground">
                {notification.time}
              </p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-3 text-center cursor-pointer hover:bg-primary/5 focus:bg-primary/5">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
