"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, ArrowLeft, MapPin, Calendar, AlertCircle, CheckCircle } from "lucide-react"

export default function RequestDetailPage({ params }) {
  const router = useRouter()
  const [selectedItems, setSelectedItems] = useState({})
  const [customAmounts, setCustomAmounts] = useState({})

  const request = {
    id: params.id,
    title: "Emergency Medical Supplies",
    description:
      "Our community was severely affected by the recent earthquake. We urgently need medical supplies to treat injured people. Many have fractures, cuts, and other injuries that require immediate attention. Local hospitals are overwhelmed and running out of supplies.",
    location: "Port-au-Prince, Haiti",
    disaster: "Earthquake",
    urgency: "critical",
    createdAt: "2025-01-10",
    totalCost: 5000,
    fundedAmount: 3500,
    donorsCount: 12,
    items: [
      {
        id: 1,
        name: "First Aid Kits",
        category: "Medical Equipment",
        quantity: 50,
        unit: "boxes",
        priority: "critical",
        cost: 500,
        funded: 500,
        description: "Complete first aid kits with bandages, antiseptics, and basic medical tools",
      },
      {
        id: 2,
        name: "Antibiotics",
        category: "Medicine",
        quantity: 200,
        unit: "bottles",
        priority: "critical",
        cost: 1500,
        funded: 1500,
        description: "Essential antibiotics to prevent infections",
      },
      {
        id: 3,
        name: "Bandages & Gauze",
        category: "Medical Equipment",
        quantity: 500,
        unit: "rolls",
        priority: "high",
        cost: 300,
        funded: 300,
        description: "Sterile bandages and gauze for wound care",
      },
      {
        id: 4,
        name: "Pain Relievers",
        category: "Medicine",
        quantity: 300,
        unit: "bottles",
        priority: "high",
        cost: 700,
        funded: 700,
        description: "Over-the-counter pain medication",
      },
      {
        id: 5,
        name: "Medical Gloves",
        category: "Medical Equipment",
        quantity: 1000,
        unit: "pairs",
        priority: "medium",
        cost: 2000,
        funded: 500,
        description: "Disposable medical gloves for healthcare workers",
      },
    ],
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

  const handleItemToggle = (itemId, checked) => {
    setSelectedItems((prev) => ({ ...prev, [itemId]: checked }))
    if (!checked) {
      setCustomAmounts((prev) => {
        const newAmounts = { ...prev }
        delete newAmounts[itemId]
        return newAmounts
      })
    }
  }

  const handleAmountChange = (itemId, amount) => {
    setCustomAmounts((prev) => ({ ...prev, [itemId]: amount }))
  }

  const calculateTotal = () => {
    return Object.entries(selectedItems).reduce((total, [itemId, isSelected]) => {
      if (!isSelected) return total
      const item = request.items.find((i) => i.id === Number.parseInt(itemId))
      const remaining = item.cost - item.funded
      const customAmount = Number.parseFloat(customAmounts[itemId]) || 0
      return total + (customAmount > 0 ? Math.min(customAmount, remaining) : remaining)
    }, 0)
  }

  const handleCheckout = () => {
    const selectedItemsData = Object.entries(selectedItems)
      .filter(([_, isSelected]) => isSelected)
      .map(([itemId]) => {
        const item = request.items.find((i) => i.id === Number.parseInt(itemId))
        const remaining = item.cost - item.funded
        const customAmount = Number.parseFloat(customAmounts[itemId]) || 0
        return {
          itemId,
          itemName: item.name,
          amount: customAmount > 0 ? Math.min(customAmount, remaining) : remaining,
        }
      })

    console.log("[v0] Proceeding to checkout:", selectedItemsData)
    router.push(`/donor/checkout?requestId=${request.id}&items=${JSON.stringify(selectedItemsData)}`)
  }

  const totalDonation = calculateTotal()
  const hasSelection = Object.values(selectedItems).some((v) => v)

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
            <Link href="/donor/dashboard">
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
            {/* Request Details */}
            <Card>
              <CardHeader>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-2xl">{request.title}</CardTitle>
                    <Badge className={getPriorityColor(request.urgency)}>{request.urgency}</Badge>
                  </div>
                  <CardDescription>
                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{request.location}</span>
                        <span>•</span>
                        <Badge variant="outline">{request.disaster}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Created {request.createdAt}</span>
                        <span>•</span>
                        <span>{request.donorsCount} donors</span>
                      </div>
                    </div>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{request.description}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Overall Funding Progress</span>
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
              </CardContent>
            </Card>

            {/* Items List */}
            <Card>
              <CardHeader>
                <CardTitle>Select Items to Fund</CardTitle>
                <CardDescription>Choose which items you want to contribute to</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {request.items.map((item) => {
                  const remaining = item.cost - item.funded
                  const isFullyFunded = remaining <= 0

                  return (
                    <div
                      key={item.id}
                      className={`border border-border rounded-lg p-4 space-y-3 ${isFullyFunded ? "opacity-60" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={`item-${item.id}`}
                          checked={selectedItems[item.id] || false}
                          onCheckedChange={(checked) => handleItemToggle(item.id, checked)}
                          disabled={isFullyFunded}
                          className="mt-1"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <Label htmlFor={`item-${item.id}`} className="text-base font-semibold cursor-pointer">
                                {item.name}
                              </Label>
                              <div className="flex items-center gap-2">
                                <Badge className={getPriorityColor(item.priority)} variant="outline">
                                  {item.priority}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {item.quantity} {item.unit}
                                </span>
                              </div>
                            </div>
                            {isFullyFunded ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-orange-600" />
                            )}
                          </div>

                          <p className="text-sm text-muted-foreground">{item.description}</p>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                ${item.funded.toLocaleString()} / ${item.cost.toLocaleString()} funded
                              </span>
                              {!isFullyFunded && (
                                <span className="font-medium">${remaining.toLocaleString()} needed</span>
                              )}
                            </div>
                            <Progress value={(item.funded / item.cost) * 100} className="h-1.5" />
                          </div>

                          {selectedItems[item.id] && !isFullyFunded && (
                            <div className="space-y-2 pt-2">
                              <Label htmlFor={`amount-${item.id}`} className="text-sm">
                                Donation Amount (USD)
                              </Label>
                              <div className="flex gap-2">
                                <Input
                                  id={`amount-${item.id}`}
                                  type="number"
                                  placeholder={`Max: $${remaining}`}
                                  value={customAmounts[item.id] || ""}
                                  onChange={(e) => handleAmountChange(item.id, e.target.value)}
                                  max={remaining}
                                  min={1}
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => handleAmountChange(item.id, remaining.toString())}
                                >
                                  Full Amount
                                </Button>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Leave empty to fund the full remaining amount
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Donation Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Donation Summary</CardTitle>
                <CardDescription>Review your contribution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {hasSelection ? (
                  <>
                    <div className="space-y-2">
                      {Object.entries(selectedItems)
                        .filter(([_, isSelected]) => isSelected)
                        .map(([itemId]) => {
                          const item = request.items.find((i) => i.id === Number.parseInt(itemId))
                          const remaining = item.cost - item.funded
                          const customAmount = Number.parseFloat(customAmounts[itemId]) || 0
                          const amount = customAmount > 0 ? Math.min(customAmount, remaining) : remaining

                          return (
                            <div key={itemId} className="flex items-start justify-between text-sm">
                              <span className="text-muted-foreground flex-1">{item.name}</span>
                              <span className="font-medium">${amount.toLocaleString()}</span>
                            </div>
                          )
                        })}
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Total Donation</span>
                        <span className="text-2xl font-bold">${totalDonation.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button onClick={handleCheckout} className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Heart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Select items to see your donation summary</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
