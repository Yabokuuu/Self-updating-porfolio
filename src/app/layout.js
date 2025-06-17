import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Olushola Olateju - Portfolio",
  description: "Computer Science student portfolio showcasing projects and skills",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <video autoPlay loop muted playsInline className="video-bg" src="/pixels.mp4" />
        {children}
      </body>
    </html>
  )
}
