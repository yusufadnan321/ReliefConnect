"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Plus, Trash2, ArrowLeft } from "lucide-react"

export default function NewRequestPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    disaster: "",
    urgency: "high",
  })

  const [items, setItems] = useState([
    { name: "", category: "", quantity: "", unit: "", estimatedCost: "", priority: "medium" },
  ])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleItemChange = (index, field, value) => {
    const newItems = [...items]
    newItems[index][field] = value
    setItems(newItems)
  }

  const addItem = () => {
    setItems([...items, { name: "", category: "", quantity: "", unit: "", estimatedCost: "", priority: "medium" }])
  }

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("[v0] Request submitted:", { ...formData, items })
    router.push("/victim/dashboard")
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
            <Link href="/victim/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Create New Request</h1>
            <p className="text-muted-foreground mt-2">Provide details about your situation and the supplies you need</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Tell us about your situation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Request Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Emergency Medical Supplies Needed"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your situation and why you need these supplies..."
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, State, Country"
                      value={formData.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="disaster">Disaster Type</Label>
                    <Select value={formData.disaster} onValueChange={(value) => handleChange("disaster", value)}>
                      <SelectTrigger id="disaster">
                        <SelectValue placeholder="Select disaster type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="earthquake">Earthquake</SelectItem>
                        <SelectItem value="flood">Flood</SelectItem>
                        <SelectItem value="hurricane">Hurricane</SelectItem>
                        <SelectItem value="wildfire">Wildfire</SelectItem>
                        <SelectItem value="war">War / Conflict</SelectItem>
                        <SelectItem value="drought">Drought</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select value={formData.urgency} onValueChange={(value) => handleChange("urgency", value)}>
                    <SelectTrigger id="urgency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical - Life threatening</SelectItem>
                      <SelectItem value="high">High - Urgent need</SelectItem>
                      <SelectItem value="medium">Medium - Important</SelectItem>
                      <SelectItem value="low">Low - Can wait</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Items Needed */}
            <Card>
              <CardHeader>
                <CardTitle>Items Needed</CardTitle>
                <CardDescription>List all supplies you need with priorities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Item {index + 1}</h4>
                      {items.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`item-name-${index}`}>Item Name</Label>
                        <Input
                          id={`item-name-${index}`}
                          placeholder="e.g., First Aid Kits"
                          value={item.name}
                          onChange={(e) => handleItemChange(index, "name", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`item-category-${index}`}>Category</Label>
                        <Select
                          value={item.category}
                          onValueChange={(value) => handleItemChange(index, "category", value)}
                        >
                          <SelectTrigger id={`item-category-${index}`}>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="medicine">Medicine</SelectItem>
                            <SelectItem value="food">Food</SelectItem>
                            <SelectItem value="water">Water</SelectItem>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="shelter">Shelter</SelectItem>
                            <SelectItem value="medical-equipment">Medical Equipment</SelectItem>
                            <SelectItem value="hygiene">Hygiene Products</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`item-quantity-${index}`}>Quantity</Label>
                        <Input
                          id={`item-quantity-${index}`}
                          type="number"
                          placeholder="100"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`item-unit-${index}`}>Unit</Label>
                        <Input
                          id={`item-unit-${index}`}
                          placeholder="e.g., boxes, liters, kg"
                          value={item.unit}
                          onChange={(e) => handleItemChange(index, "unit", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`item-cost-${index}`}>Estimated Cost (USD)</Label>
                        <Input
                          id={`item-cost-${index}`}
                          type="number"
                          placeholder="500"
                          value={item.estimatedCost}
                          onChange={(e) => handleItemChange(index, "estimatedCost", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`item-priority-${index}`}>Priority</Label>
                        <Select
                          value={item.priority}
                          onValueChange={(value) => handleItemChange(index, "priority", value)}
                        >
                          <SelectTrigger id={`item-priority-${index}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="critical">Critical</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={addItem} className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Item
                </Button>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Submit Request
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
