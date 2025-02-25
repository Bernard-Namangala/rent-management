"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Wallet,
  Wrench,
  MessageSquare,
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Building2,
  Phone,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function TenantOverviewPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome back, John!</h1>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          March 2024
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Next Rent Due</p>
              <p className="mt-1 text-2xl font-semibold">$1,200</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Due in 5 days
              </p>
            </div>
            <Badge variant="destructive" className="gap-1">
              <Clock className="h-3 w-3" />
              Upcoming
            </Badge>
          </div>
          <Progress value={70} className="mt-4" />
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Lease Status</p>
              <p className="mt-1 text-2xl font-semibold">Active</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Expires in 8 months
              </p>
            </div>
            <Badge variant="default" className="gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Good Standing
            </Badge>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Open Requests</p>
              <p className="mt-1 text-2xl font-semibold">2</p>
              <p className="mt-2 text-sm text-muted-foreground">
                1 maintenance, 1 other
              </p>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Wrench className="h-3 w-3" />
              In Progress
            </Badge>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Messages</p>
              <p className="mt-1 text-2xl font-semibold">3</p>
              <p className="mt-2 text-sm text-muted-foreground">
                2 unread messages
              </p>
            </div>
            <Badge variant="secondary" className="gap-1">
              <MessageSquare className="h-3 w-3" />
              New
            </Badge>
          </div>
        </Card>
      </div>

      {/* Property Information and Quick Actions */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="col-span-2 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Building2 className="h-5 w-5" />
            Your Unit Information
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium">Address</p>
              <p className="text-sm text-muted-foreground">
                123 Main Street, Apt 4B
                <br />
                New York, NY 10001
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Property Manager</p>
              <p className="text-sm text-muted-foreground">Sarah Johnson</p>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-3 w-3" />
                (555) 123-4567
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Emergency Contact</p>
              <p className="text-sm text-muted-foreground">
                24/7 Maintenance Hotline
              </p>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-3 w-3" />
                (555) 999-8888
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Building Access</p>
              <p className="text-sm text-muted-foreground">
                Main Door Code: #1234
                <br />
                Package Room: B1
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="mt-4 flex flex-col gap-2">
            <Button className="justify-start gap-2">
              <Wallet className="h-4 w-4" />
              Pay Rent
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Wrench className="h-4 w-4" />
              Submit Maintenance Request
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <MessageSquare className="h-4 w-4" />
              Message Property Manager
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <FileText className="h-4 w-4" />
              View Documents
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Wallet className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Rent Payment Processed</p>
              <p className="text-sm text-muted-foreground">
                February 2024 rent payment - $1,200
              </p>
            </div>
            <p className="text-sm text-muted-foreground">2 days ago</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10">
              <Wrench className="h-4 w-4 text-orange-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Maintenance Request Updated</p>
              <p className="text-sm text-muted-foreground">
                Bathroom sink repair - In Progress
              </p>
            </div>
            <p className="text-sm text-muted-foreground">3 days ago</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
              <MessageSquare className="h-4 w-4 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">New Message</p>
              <p className="text-sm text-muted-foreground">
                From Property Manager regarding upcoming inspection
              </p>
            </div>
            <p className="text-sm text-muted-foreground">5 days ago</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Building Notice</p>
              <p className="text-sm text-muted-foreground">
                Water maintenance scheduled for next week
              </p>
            </div>
            <p className="text-sm text-muted-foreground">1 week ago</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
