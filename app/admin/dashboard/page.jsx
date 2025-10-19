"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Heart, Truck, DollarSign, AlertCircle, LogOut } from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for charts
  const requestsData = [
    { month: "Jan", pending: 45, fulfilled: 120, partial: 30 },
    { month: "Feb", pending: 52, fulfilled: 135, partial: 28 },
    { month: "Mar", pending: 38, fulfilled: 150, partial: 35 },
    { month: "Apr", pending: 61, fulfilled: 165, partial: 42 },
    { month: "May", pending: 55, fulfilled: 180, partial: 38 },
    { month: "Jun", pending: 48, fulfilled: 195, partial: 45 },
  ]

  const donationData = [
    { name: "Medicine", value: 35, color: "#ef4444" },
    { name: "Food", value: 25, color: "#f97316" },
    { name: "Shelter", value: 20, color: "#eab308" },
    { name: "Clothing", value: 15, color: "#22c55e" },
    { name: "Other", value: 5, color: "#3b82f6" },
  ]

  const recentRequests = [
    { id: 1, victim: "Ahmed Hassan", location: "Gaza", items: 5, status: "pending", priority: "high" },
    { id: 2, victim: "Fatima Al-Rashid", location: "Syria", items: 3, status: "fulfilled", priority: "medium" },
    { id: 3, victim: "Omar Khan", location: "Turkey", items: 7, status: "partial", priority: "high" },
    { id: 4, victim: "Layla Ibrahim", location: "Lebanon", items: 4, status: "pending", priority: "critical" },
    { id: 5, victim: "Hassan Ali", location: "Yemen", items: 6, status: "fulfilled", priority: "high" },
  ]

  const topDonors = [
    { id: 1, name: "Global Relief Fund", amount: 125000, donations: 45 },
    { id: 2, name: "Red Crescent Society", amount: 98500, donations: 32 },
    { id: 3, name: "World Vision", amount: 87300, donations: 28 },
    { id: 4, name: "Doctors Without Borders", amount: 76200, donations: 24 },
    { id: 5, name: "Individual Donors", amount: 54100, donations: 156 },
  ]

  const topVendors = [
    { id: 1, name: "Medical Supplies Co.", orders: 45, revenue: 52000, rating: 4.8 },
    { id: 2, name: "Food Distribution Ltd.", orders: 38, revenue: 41200, rating: 4.6 },
    { id: 3, name: "Shelter Solutions", orders: 32, revenue: 38500, rating: 4.7 },
    { id: 4, name: "Clothing & Textiles", orders: 28, revenue: 31800, rating: 4.5 },
    { id: 5, name: "Emergency Supplies", orders: 25, revenue: 28900, rating: 4.9 },
  ]

  const stats = [
    {
      title: "Total Requests",
      value: "1,248",
      description: "Active and completed",
      icon: AlertCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "Total Donations",
      value: "$441,100",
      description: "Funds distributed",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/30",
    },
    {
      title: "Active Donors",
      value: "3,456",
      description: "Contributing members",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/30",
    },
    {
      title: "Verified Vendors",
      value: "287",
      description: "Fulfilling orders",
      icon: Truck,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-600" fill="currentColor" />
            <span className="text-xl font-bold text-foreground">ReliefBridge Admin</span>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <div className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="donors">Donors</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Requests Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Requests Trend</CardTitle>
                  <CardDescription>Monthly request status distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={requestsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="pending" stackId="a" fill="#ef4444" />
                      <Bar dataKey="fulfilled" stackId="a" fill="#22c55e" />
                      <Bar dataKey="partial" stackId="a" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Donation Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Donation Distribution</CardTitle>
                  <CardDescription>By item category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={donationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label
                        outerRadius={80}
                        dataKey="value"
                      >
                        {donationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Requests</CardTitle>
                <CardDescription>Latest disaster relief requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">{request.victim}</p>
                        <p className="text-sm text-muted-foreground">{request.location}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{request.items} items</p>
                          <p
                            className={`text-xs font-medium ${request.priority === "critical" ? "text-red-600" : request.priority === "high" ? "text-orange-600" : "text-yellow-600"}`}
                          >
                            {request.priority.toUpperCase()}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium ${request.status === "fulfilled" ? "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400" : request.status === "partial" ? "bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400"}`}
                        >
                          {request.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Requests</CardTitle>
                <CardDescription>Manage and monitor all disaster relief requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-1 flex-1">
                        <p className="font-medium text-foreground">{request.victim}</p>
                        <p className="text-sm text-muted-foreground">
                          {request.location} • {request.items} items requested
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${request.priority === "critical" ? "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400" : request.priority === "high" ? "bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400"}`}
                        >
                          {request.priority}
                        </span>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donors Tab */}
          <TabsContent value="donors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Donors</CardTitle>
                <CardDescription>Largest contributors to the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topDonors.map((donor) => (
                    <div
                      key={donor.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="space-y-1 flex-1">
                        <p className="font-medium text-foreground">{donor.name}</p>
                        <p className="text-sm text-muted-foreground">{donor.donations} donations</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">${donor.amount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Total contributed</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vendors Tab */}
          <TabsContent value="vendors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Vendors</CardTitle>
                <CardDescription>Most active supply partners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topVendors.map((vendor) => (
                    <div
                      key={vendor.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="space-y-1 flex-1">
                        <p className="font-medium text-foreground">{vendor.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {vendor.orders} orders completed • Rating: {vendor.rating}/5
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">${vendor.revenue.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Revenue earned</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
