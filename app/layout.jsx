import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"   // ← ADD

export const metadata = {
  title: "ReliefConnect – A Charity Management Platform",
  description: "Connecting disaster victims with donors and vendors for rapid relief delivery",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>                                  {/* ← WRAP */}
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
