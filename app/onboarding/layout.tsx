import type React from "react"
import Link from "next/link"
import { Shield } from "lucide-react"

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6" />
            <span>SupportHub</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  )
}
