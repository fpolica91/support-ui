"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MessageSquare, Users, Bot, Database, BarChart, Settings, HelpCircle, Headphones } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Conversations",
    href: "/dashboard/conversations",
    icon: MessageSquare,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Agents",
    href: "/dashboard/agents",
    icon: Bot,
  },
  {
    title: "API Endpoints",
    href: "/dashboard/api-endpoints",
    icon: Database,
  },
  {
    title: "Live Chat",
    href: "/dashboard/live-chat",
    icon: Headphones,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Help",
    href: "/dashboard/help",
    icon: HelpCircle,
  },
]

export function DashboardNav() {
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
