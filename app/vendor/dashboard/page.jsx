"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Package, DollarSign, Clock, CheckCircle, Truck } from "lucide-react"

export default function VendorDashboard() {
  const [filterStatus, setFilterStatus] = useState("all")

  const [orders] = useState([
    {
      id: 1,
      requestTitle: "Emergency Medical Supplies",
      location: "Port-au-Prince, Haiti",
      items: [
        { name: "First Aid Kits", quantity: 50, unit: "boxes" },
        { name: "Antibiotics", quantity: 200, unit: "bottles" },
      ],
      totalAmount: 2000,
      advancePayment: 1000,
      remainingPayment: 1000,
      status: "pending",
      orderDate: "2025-01-15",
      deliveryDeadline: "2025-01-25",
    },
    {
      id: 2,
      requestTitle: "Food and Water Supply",
      location: "Port-au-Prince, Haiti",
      items: [
        { name: "Bottled Water", quantity: 500, unit: "liters" },
        { name: "Canned Food", quantity: 300, unit: "cans" },
      ],
      totalAmount: 1500,
      advancePayment: 750,
      remainingPayment: 750,
      status: "in-transit",
      orderDate: "2025-01-12",
      deliveryDeadline: "2025-01-22",
      trackingNumber: "TRK123456789",
    },
    {
      id: 3,
      requestTitle: "Winter Clothing",
      location: "Kyiv, Ukraine",
      items: [
        { name: "Winter Jackets", quantity: 100, unit: "pieces" },
        { name: "Thermal Blankets", quantity: 150, unit: "pieces" },
      ],
      totalAmount: 3000,
      advancePayment: 1500,
      remainingPayment: 0,
      status: "delivered",
      orderDate: "2025-01-08",
      deliveryDate: "2025-01-18",
    },
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400"
      case "in-transit":
        return "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
      case "delivered":
        return "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "in-transit":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const filteredOrders = orders.filter((order) => filterStatus === "all" || order.status === filterStatus)

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    totalEarnings: orders.reduce((sum, o) => sum + o.totalAmount, 0),
    pendingPayments: orders.reduce((sum, o) => sum + o.remainingPayment, 0),
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
            <span className="text-sm text-muted-foreground">Vendor Dashboard</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">{stats.pendingOrders} pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalEarnings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.pendingPayments.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Awaiting delivery</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.filter((o) => o.status === "delivered").length}</div>
              <p className="text-xs text-muted-foreground">Successful deliveries</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Orders</h2>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <CardDescription>
                        <div className="flex flex-col gap-1 text-sm">
                          <span className="font-medium">{order.requestTitle}</span>
                          <span>{order.location}</span>
                          <span>Ordered: {order.orderDate}</span>
                        </div>
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Items to Deliver</h4>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          • {item.name} - {item.quantity} {item.unit}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Total Amount</p>
                      <p className="text-lg font-bold">${order.totalAmount.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Advance Paid</p>
                      <p className="text-lg font-semibold text-green-600">${order.advancePayment.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Remaining</p>
                      <p className="text-lg font-semibold text-orange-600">
                        ${order.remainingPayment.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  {order.status === "in-transit" && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tracking: {order.trackingNumber}</span>
                      <span className="text-muted-foreground">Deadline: {order.deliveryDeadline}</span>
                    </div>
                  )}

                  {order.status === "delivered" && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>Delivered on {order.deliveryDate}</span>
                    </div>
                  )}

                  {order.status === "pending" && (
                    <div className="text-sm text-muted-foreground">Delivery deadline: {order.deliveryDeadline}</div>
                  )}

                  <Button asChild className="w-full">
                    <Link href={`/vendor/order/${order.id}`}>View Details & Update Status</Link>
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
