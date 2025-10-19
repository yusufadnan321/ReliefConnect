"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Heart, Search, Filter, MapPin, Calendar, TrendingUp } from "lucide-react"

export default function DonorDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDisaster, setFilterDisaster] = useState("all")
  const [filterUrgency, setFilterUrgency] = useState("all")

  const [requests] = useState([
    {
      id: 1,
      title: "Emergency Medical Supplies",
      location: "Port-au-Prince, Haiti",
      disaster: "Earthquake",
      urgency: "critical",
      createdAt: "2025-01-10",
      totalCost: 5000,
      fundedAmount: 3500,
      donorsCount: 12,
      itemsCount: 5,
    },
    {
      id: 2,
      title: "Food and Water Supply",
      location: "Port-au-Prince, Haiti",
      disaster: "Earthquake",
      urgency: "high",
      createdAt: "2025-01-12",
      totalCost: 3000,
      fundedAmount: 1200,
      donorsCount: 8,
      itemsCount: 3,
    },
    {
      id: 3,
      title: "Temporary Shelter Materials",
      location: "Los Angeles, USA",
      disaster: "Wildfire",
      urgency: "high",
      createdAt: "2025-01-14",
      totalCost: 8000,
      fundedAmount: 2400,
      donorsCount: 15,
      itemsCount: 7,
    },
    {
      id: 4,
      title: "Winter Clothing for Families",
      location: "Kyiv, Ukraine",
      disaster: "War",
      urgency: "medium",
      createdAt: "2025-01-15",
      totalCost: 2500,
      fundedAmount: 1800,
      donorsCount: 20,
      itemsCount: 4,
    },
  ])

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
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

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDisaster = filterDisaster === "all" || request.disaster.toLowerCase() === filterDisaster
    const matchesUrgency = filterUrgency === "all" || request.urgency === filterUrgency
    return matchesSearch && matchesDisaster && matchesUrgency
  })

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
            <span className="text-sm text-muted-foreground">Donor Dashboard</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donated</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,450</div>
              <p className="text-xs text-muted-foreground">Across 8 requests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">People Helped</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Individuals impacted</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{requests.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting funding</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterDisaster} onValueChange={setFilterDisaster}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Disaster Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Disasters</SelectItem>
                  <SelectItem value="earthquake">Earthquake</SelectItem>
                  <SelectItem value="flood">Flood</SelectItem>
                  <SelectItem value="wildfire">Wildfire</SelectItem>
                  <SelectItem value="war">War</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterUrgency} onValueChange={setFilterUrgency}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Requests List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Active Requests</h2>
            <p className="text-sm text-muted-foreground">{filteredRequests.length} requests found</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-lg">{request.title}</CardTitle>
                      <CardDescription>
                        <div className="flex flex-col gap-1 text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{request.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Created {request.createdAt}</span>
                          </div>
                        </div>
                      </CardDescription>
                    </div>
                    <Badge className={getUrgencyColor(request.urgency)}>{request.urgency}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline">{request.disaster}</Badge>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{request.itemsCount} items needed</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{request.donorsCount} donors</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Funding Progress</span>
                      <span className="text-muted-foreground">
                        ${request.fundedAmount.toLocaleString()} / ${request.totalCost.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(request.fundedAmount / request.totalCost) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {Math.round((request.fundedAmount / request.totalCost) * 100)}% funded • $
                      {(request.totalCost - request.fundedAmount).toLocaleString()} remaining
                    </p>
                  </div>

                  <Button asChild className="w-full">
                    <Link href={`/donor/request/${request.id}`}>View Details & Donate</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
