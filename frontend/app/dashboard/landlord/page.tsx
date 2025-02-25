"use client";

import { Card } from "@/components/ui/card";
import {
  ArrowUpRight,
  Building2,
  Users,
  Wallet,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Home,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LandlordOverview() {
  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Properties",
            value: "12",
            change: "+2",
            trend: "up",
            icon: Building2,
          },
          {
            title: "Total Tenants",
            value: "48",
            change: "+5",
            trend: "up",
            icon: Users,
          },
          {
            title: "Monthly Revenue",
            value: "$52,450",
            change: "+12%",
            trend: "up",
            icon: Wallet,
          },
          {
            title: "Occupancy Rate",
            value: "94%",
            change: "-2%",
            trend: "down",
            icon: Home,
          },
        ].map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-bold">{stat.value}</p>
                <span
                  className={`ml-2 flex items-center text-sm ${
                    stat.trend === "up"
                      ? "text-emerald-600"
                      : "text-destructive"
                  }`}
                >
                  {stat.change}
                  {stat.trend === "up" ? (
                    <ArrowUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity and Properties */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Properties */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Recent Properties</h3>
              <Button variant="ghost" className="gap-2" asChild>
                <Link href="/landlord/properties">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-4 space-y-4">
              {[
                {
                  image:
                    "https://placehold.co/400x300/png?text=Modern+Apartment",
                  title: "Modern Downtown Apartment",
                  address: "123 Main St, New York",
                  status: "Occupied",
                  revenue: "$2,500/mo",
                },
                {
                  image: "https://placehold.co/400x300/png?text=Luxury+Condo",
                  title: "Luxury Waterfront Condo",
                  address: "456 Ocean Ave, Miami",
                  status: "Available",
                  revenue: "$3,200/mo",
                },
                {
                  image: "https://placehold.co/400x300/png?text=Family+Home",
                  title: "Spacious Family Home",
                  address: "789 Oak Rd, Los Angeles",
                  status: "Maintenance",
                  revenue: "$4,100/mo",
                },
              ].map((property, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 rounded-lg border p-3 transition-all hover:bg-muted/50"
                >
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{property.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {property.address}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        property.status === "Occupied"
                          ? "bg-emerald-100 text-emerald-700"
                          : property.status === "Available"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {property.status}
                    </p>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">
                      {property.revenue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Recent Activity</h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="mt-4 space-y-4">
              {[
                {
                  icon: CheckCircle2,
                  title: "Rent Payment Received",
                  description: "Unit 303 - $2,500",
                  time: "2 hours ago",
                  iconColor: "text-emerald-500",
                },
                {
                  icon: AlertCircle,
                  title: "Maintenance Request",
                  description: "Unit 205 - Plumbing Issue",
                  time: "5 hours ago",
                  iconColor: "text-orange-500",
                },
                {
                  icon: Clock,
                  title: "Lease Renewal Due",
                  description: "Unit 401 - Due in 30 days",
                  time: "1 day ago",
                  iconColor: "text-blue-500",
                },
                {
                  icon: Users,
                  title: "New Tenant Application",
                  description: "Unit 102 - John Doe",
                  time: "2 days ago",
                  iconColor: "text-purple-500",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-lg border p-3 transition-all hover:bg-muted/50"
                >
                  <div
                    className={`rounded-full bg-white p-2 shadow-sm ${activity.iconColor}`}
                  >
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-medium">Quick Actions</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              {
                title: "Add Property",
                description: "List a new property",
                icon: Building2,
                href: "/landlord/properties/new",
              },
              {
                title: "Add Tenant",
                description: "Register new tenant",
                icon: Users,
                href: "/landlord/tenants/new",
              },
              {
                title: "Record Payment",
                description: "Add payment record",
                icon: DollarSign,
                href: "/landlord/finances",
              },
              {
                title: "Maintenance",
                description: "View requests",
                icon: Wallet,
                href: "/landlord/maintenance",
              },
            ].map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="group rounded-lg border p-4 transition-all hover:border-primary hover:bg-primary/5"
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <action.icon className="h-5 w-5" />
                </div>
                <h4 className="font-medium">{action.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
