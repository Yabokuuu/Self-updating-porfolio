import type React from "react"
import { ThemeProvider } from "./components/theme-provider"
import { cn } from "./lib/utils"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Olushola Olateju - Portfolio",
  description: "Computer Science student portfolio showcasing projects and skills",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-transparent font-sans antialiased", inter.className)}>
        <video autoPlay loop muted playsInline className="video-bg" src="/pixels.mp4" />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
