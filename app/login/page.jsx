"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Users, Truck, Shield } from "lucide-react"
import { emailSignIn /* emailSignUp, googleSignIn */ } from "@/lib/auth-actions"

export default function LoginPage() {
  const router = useRouter()
  const [userType, setUserType] = useState("donor")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Firebase email/password sign-in
      await emailSignIn(formData.email, formData.password)

      // Redirect to the selected dashboard (keeps your existing flow/design)
      if (userType === "victim") {
        router.push("/victim/dashboard")
      } else if (userType === "donor") {
        router.push("/donor/dashboard")
      } else if (userType === "vendor") {
        router.push("/vendor/dashboard")
      } else if (userType === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/")
      }
    } catch (err) {
      // Keep design unchanged—just log for now (you can wire a toast if you already use one)
      console.error("Sign-in failed:", err?.message || err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-600" fill="currentColor" />
              <span className="text-xl font-bold text-foreground">ReliefBridge</span>
            </Link>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your ReliefBridge account</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="userType">Sign in as</Label>
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

            <div className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              {"Don't have an account? "}
              <Link href="/register" className="text-foreground hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
