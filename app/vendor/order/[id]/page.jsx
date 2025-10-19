"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Heart, ArrowLeft, Package, DollarSign, MapPin, Truck } from "lucide-react"

export default function OrderDetailPage({ params }) {
  const router = useRouter()
  const [status, setStatus] = useState("pending")
  const [trackingNumber, setTrackingNumber] = useState("")
  const [notes, setNotes] = useState("")

  const order = {
    id: params.id,
    requestTitle: "Emergency Medical Supplies",
    requestDescription: "Urgent medical supplies needed for earthquake victims. Local hospitals are overwhelmed.",
    location: "Port-au-Prince, Haiti",
    deliveryAddress: "123 Relief Center St, Port-au-Prince, Haiti",
    contactPerson: "Dr. Marie Johnson",
    contactPhone: "+509 1234 5678",
    items: [
      {
        name: "First Aid Kits",
        category: "Medical Equipment",
        quantity: 50,
        unit: "boxes",
        specifications: "Complete first aid kits with bandages, antiseptics, and basic medical tools",
      },
      {
        name: "Antibiotics",
        category: "Medicine",
        quantity: 200,
        unit: "bottles",
        specifications: "Essential antibiotics to prevent infections",
      },
      {
        name: "Bandages & Gauze",
        category: "Medical Equipment",
        quantity: 500,
        unit: "rolls",
        specifications: "Sterile bandages and gauze for wound care",
      },
    ],
    totalAmount: 2000,
    advancePayment: 1000,
    remainingPayment: 1000,
    status: "pending",
    orderDate: "2025-01-15",
    deliveryDeadline: "2025-01-25",
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400"
      case "in-transit":
        return "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
      case "delivered":
        return "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400"
    }
  }

  const handleUpdateStatus = (e) => {
    e.preventDefault()
    console.log("[v0] Order status updated:", { orderId: order.id, status, trackingNumber, notes })
    router.push("/vendor/dashboard")
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
          <Button asChild variant="ghost" size="sm">
            <Link href="/vendor/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">Order #{order.id}</CardTitle>
                    <CardDescription>
                      <div className="flex flex-col gap-1 text-sm">
                        <span className="font-medium">{order.requestTitle}</span>
                        <span>Ordered: {order.orderDate}</span>
                        <span>Deadline: {order.deliveryDeadline}</span>
                      </div>
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Request Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{order.requestDescription}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <MapPin className="h-4 w-4" />
                      <span>Delivery Address</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Package className="h-4 w-4" />
                      <span>Contact Person</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.contactPerson}
                      <br />
                      {order.contactPhone}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items to Deliver */}
            <Card>
              <CardHeader>
                <CardTitle>Items to Deliver</CardTitle>
                <CardDescription>Complete list of supplies for this order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {item.quantity} {item.unit}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.specifications}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Update Status */}
            <Card>
              <CardHeader>
                <CardTitle>Update Order Status</CardTitle>
                <CardDescription>Update delivery status and add tracking information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateStatus} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Order Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending - Preparing Order</SelectItem>
                        <SelectItem value="in-transit">In Transit - Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered - Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(status === "in-transit" || status === "delivered") && (
                    <div className="space-y-2">
                      <Label htmlFor="tracking">Tracking Number</Label>
                      <Input
                        id="tracking"
                        placeholder="TRK123456789"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any additional information about the delivery..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Update Status
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>Order payment breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Order Value</span>
                    <span className="text-lg font-bold">${order.totalAmount.toLocaleString()}</span>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                      <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-green-700 dark:text-green-400">Advance Payment</p>
                        <p className="text-xs text-green-600 dark:text-green-500 mt-1">Received</p>
                        <p className="text-xl font-bold text-green-700 dark:text-green-400 mt-2">
                          ${order.advancePayment.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                      <Truck className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-orange-700 dark:text-orange-400">Remaining Payment</p>
                        <p className="text-xs text-orange-600 dark:text-orange-500 mt-1">After delivery</p>
                        <p className="text-xl font-bold text-orange-700 dark:text-orange-400 mt-2">
                          ${order.remainingPayment.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground space-y-2">
                    <p className="font-semibold">Payment Terms:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>50% advance payment received</li>
                      <li>50% upon confirmed delivery</li>
                      <li>Payment released within 24 hours</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
