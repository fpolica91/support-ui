"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Download, ArrowRight } from "lucide-react"
import Link from "next/link"

export function BillingSettings() {
  const [isLoading, setIsLoading] = useState(false)

  // Mock billing data
  const billingData = {
    plan: "Professional",
    status: "active",
    nextBillingDate: "May 15, 2023",
    paymentMethod: {
      type: "card",
      last4: "4242",
      expiry: "04/24",
      brand: "Visa",
    },
    usage: {
      conversations: {
        used: 3240,
        limit: 5000,
        percentage: 65,
      },
      agents: {
        used: 3,
        limit: 5,
        percentage: 60,
      },
      apiEndpoints: {
        used: 12,
        limit: 20,
        percentage: 60,
      },
    },
    invoices: [
      {
        id: "INV-001",
        date: "Apr 1, 2023",
        amount: "$149.00",
        status: "paid",
      },
      {
        id: "INV-002",
        date: "Mar 1, 2023",
        amount: "$149.00",
        status: "paid",
      },
      {
        id: "INV-003",
        date: "Feb 1, 2023",
        amount: "$149.00",
        status: "paid",
      },
    ],
  }

  const handleUpdatePayment = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your current subscription plan and usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{billingData.plan}</h3>
                <p className="text-sm text-muted-foreground">Next billing date: {billingData.nextBillingDate}</p>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                Active
              </Badge>
            </div>

            <div className="space-y-4 mt-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Conversations</span>
                  <span className="text-sm text-muted-foreground">
                    {billingData.usage.conversations.used} / {billingData.usage.conversations.limit}
                  </span>
                </div>
                <Progress value={billingData.usage.conversations.percentage} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">AI Agents</span>
                  <span className="text-sm text-muted-foreground">
                    {billingData.usage.agents.used} / {billingData.usage.agents.limit}
                  </span>
                </div>
                <Progress value={billingData.usage.agents.percentage} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">API Endpoints</span>
                  <span className="text-sm text-muted-foreground">
                    {billingData.usage.apiEndpoints.used} / {billingData.usage.apiEndpoints.limit}
                  </span>
                </div>
                <Progress value={billingData.usage.apiEndpoints.percentage} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/pricing" className="w-full">
              <Button variant="outline" className="w-full">
                View Plans
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your payment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="rounded-full bg-primary/10 p-2">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">
                  {billingData.paymentMethod.brand} ending in {billingData.paymentMethod.last4}
                </p>
                <p className="text-sm text-muted-foreground">Expires {billingData.paymentMethod.expiry}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={handleUpdatePayment} disabled={isLoading}>
              {isLoading ? "Processing..." : "Update Payment Method"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View and download your past invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-4 p-4 font-medium border-b">
              <div>Invoice</div>
              <div>Date</div>
              <div>Amount</div>
              <div>Status</div>
            </div>
            {billingData.invoices.map((invoice) => (
              <div key={invoice.id} className="grid grid-cols-4 p-4 items-center">
                <div>{invoice.id}</div>
                <div>{invoice.date}</div>
                <div>{invoice.amount}</div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    {invoice.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
