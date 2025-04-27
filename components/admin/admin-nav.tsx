"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building, Users, CreditCard, Settings, BarChart, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Overview",
    href: "/admin",
    icon: BarChart,
  },
  {
    title: "Tenants",
    href: "/admin/tenants",
    icon: Building,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Billing",
    href: "/admin/billing",
    icon: CreditCard,
  },
  {
    title: "Security",
    href: "/admin/security",
    icon: Shield,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-2 p-4">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "secondary" : "ghost"}
          className={cn("justify-start gap-2", pathname === item.href ? "bg-secondary" : "hover:bg-secondary/50")}
          asChild
        >
          <Link href={item.href}>
            <item.icon className="h-5 w-5" />
            {item.title}
          </Link>
        </Button>
      ))}
    </div>
  )
}
