import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SocialBar from "@/components/SocialBar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Marketing Tusk - Launch. Market. Grow.",
  description: "Your go-to ecosystem growth partner for startups, SMEs, enablers, and investors across India.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background">
            <Header />
            {children}
            <Footer />
            <SocialBar />
          </div>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}

