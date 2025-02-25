"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Users, Building2 } from "lucide-react";
import { ChatList } from "@/components/messages/ChatList";
import { ChatView } from "@/components/messages/ChatView";
import { PropertyGroupList } from "@/components/messages/PropertyGroupList";

export default function TenantMessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [selectedPropertyGroup, setSelectedPropertyGroup] = useState<
    string | null
  >(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Messages</h1>
        <p className="text-sm text-muted-foreground">
          Communicate with your landlord and property management
        </p>
      </div>

      {/* Chat Interface */}
      <Card className="h-[calc(100vh-12rem)]">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-80 border-r">
            <div className="p-4 border-b">
              <Tabs defaultValue="direct" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="direct" className="flex-1">
                    <Users className="h-4 w-4 mr-2" />
                    Direct
                  </TabsTrigger>
                  <TabsTrigger value="property" className="flex-1">
                    <Building2 className="h-4 w-4 mr-2" />
                    Property
                  </TabsTrigger>
                </TabsList>

                <div className="mt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search messages..." className="pl-9" />
                  </div>
                </div>

                <TabsContent value="direct" className="mt-4">
                  <ChatList
                    selectedChat={selectedChat}
                    onSelectChat={setSelectedChat}
                  />
                </TabsContent>

                <TabsContent value="property" className="mt-4">
                  <PropertyGroupList
                    selectedGroup={selectedPropertyGroup}
                    onSelectGroup={setSelectedPropertyGroup}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Chat View */}
          <div className="flex-1">
            <ChatView chatId={selectedChat} groupId={selectedPropertyGroup} />
          </div>
        </div>
      </Card>
    </div>
  );
}
