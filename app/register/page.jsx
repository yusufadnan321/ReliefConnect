"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Users, Truck, Shield } from "lucide-react"

// ⬇️ NEW: use the helper we created earlier
import { emailSignUp } from "@/lib/auth-actions"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const typeParam = searchParams.get("type")

  const [userType, setUserType] = useState(typeParam || "donor")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    organization: "",
    adminCode: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      // 1) Create Firebase Auth user (auto-signs in on success)
      await emailSignUp(formData.email, formData.password)

      // 2) (Optional) Here is where you'd also save profile fields
      //    (name, phone, address, userType) to Firestore if you wish.

      // 3) Redirect the freshly signed-in user to the selected dashboard
      if (userType === "victim") {
        router.push("/victim/dashboard")
      } else if (userType === "donor") {
        router.push("/donor/dashboard")
      } else if (userType === "vendor") {
        router.push("/vendor/dashboard")
      } else if (userType === "admin") {
        // If you require a specific admin code, validate it here before redirecting.
        router.push("/admin/dashboard")
      } else {
        router.push("/")
      }
    } catch (err) {
      // Keep your UI unchanged—just surface an error line if it happens
      setError(err?.message || "Registration failed")
      console.error("Registration failed:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-600" fill="currentColor" />
              <span className="text-xl font-bold text-foreground">ReliefBridge</span>
            </Link>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>Join ReliefBridge and start making a difference</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="userType">I want to register as</Label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger id="userType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="victim">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Victim / Recipient</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="donor">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      <span>Donor</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="vendor">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      <span>Vendor</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Administrator</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Common Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                />
              </div>

              {/* Conditional Fields */}
              {userType === "victim" && (
                <div className="space-y-2">
                  <Label htmlFor="address">Current Location</Label>
                  <Input
                    id="address"
                    placeholder="City, State, Country"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    required
                  />
                </div>
              )}

              {userType === "vendor" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Business Name</Label>
                    <Input
                      id="organization"
                      placeholder="Your Company Name"
                      value={formData.organization}
                      onChange={(e) => handleChange("organization", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Input
                      id="address"
                      placeholder="Street, City, State, Country"
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              {userType === "admin" && (
                <div className="space-y-2">
                  <Label htmlFor="adminCode">Admin Registration Code</Label>
                  <Input
                    id="adminCode"
                    type="password"
                    placeholder="Enter admin code"
                    value={formData.adminCode}
                    onChange={(e) => handleChange("adminCode", e.target.value)}
                    required
                  />
                </div>
              )}
            </div>

            {/* Error line (appears only if needed) */}
            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-foreground hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
