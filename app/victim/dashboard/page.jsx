"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, Plus, Package, AlertCircle, CheckCircle, Clock } from "lucide-react"

export default function VictimDashboard() {
  const [requests] = useState([
    {
      id: 1,
      title: "Emergency Medical Supplies",
      location: "Port-au-Prince, Haiti",
      disaster: "Earthquake",
      status: "active",
      createdAt: "2025-01-10",
      totalCost: 5000,
      fundedAmount: 3500,
      items: [
        { name: "First Aid Kits", priority: "critical", cost: 500, funded: 500 },
        { name: "Antibiotics", priority: "critical", cost: 1500, funded: 1500 },
        { name: "Bandages", priority: "high", cost: 300, funded: 300 },
        { name: "Pain Relievers", priority: "high", cost: 700, funded: 700 },
        { name: "Medical Gloves", priority: "medium", cost: 2000, funded: 500 },
      ],
    },
    {
      id: 2,
      title: "Food and Water Supply",
      location: "Port-au-Prince, Haiti",
      disaster: "Earthquake",
      status: "active",
      createdAt: "2025-01-12",
      totalCost: 3000,
      fundedAmount: 1200,
      items: [
        { name: "Bottled Water", priority: "critical", cost: 1000, funded: 800 },
        { name: "Canned Food", priority: "high", cost: 1500, funded: 400 },
        { name: "Rice & Grains", priority: "medium", cost: 500, funded: 0 },
      ],
    },
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
      case "funded":
        return "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"
      case "delivered":
        return "bg-gray-100 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400"
      case "high":
        return "bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400"
      case "medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400"
      case "low":
        return "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-600" fill="currentColor" />
            <span className="text-xl font-bold text-foreground">ReliefBridge</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Victim Dashboard</span>
            <Button asChild size="sm">
              <Link href="/victim/request/new">
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Awaiting full funding</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Funded</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,700</div>
              <p className="text-xs text-muted-foreground">Out of $8,000 requested</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Items Received</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Pending delivery</p>
            </CardContent>
          </Card>
        </div>

        {/* Requests List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">My Requests</h2>
          </div>

          {requests.map((request) => (
            <Card key={request.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{request.title}</CardTitle>
                    <CardDescription>
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span>{request.location}</span>
                        <span>•</span>
                        <span>{request.disaster}</span>
                        <span>•</span>
                        <span>Created {request.createdAt}</span>
                      </div>
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Overall Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Overall Funding Progress</span>
                    <span className="text-muted-foreground">
                      ${request.fundedAmount.toLocaleString()} / ${request.totalCost.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={(request.fundedAmount / request.totalCost) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {Math.round((request.fundedAmount / request.totalCost) * 100)}% funded
                  </p>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Requested Items</h4>
                  <div className="space-y-3">
                    {request.items.map((item, index) => (
                      <div key={index} className="border border-border rounded-lg p-4 space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{item.name}</span>
                              <Badge className={getPriorityColor(item.priority)} variant="outline">
                                {item.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              ${item.funded.toLocaleString()} / ${item.cost.toLocaleString()} funded
                            </p>
                          </div>
                          {item.funded >= item.cost ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-orange-600" />
                          )}
                        </div>
                        <Progress value={(item.funded / item.cost) * 100} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
