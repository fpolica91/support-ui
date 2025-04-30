"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

export default function CreateApiEndpointPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Mock data for available agents
  const availableAgents = [
    { id: "1", name: "Customer Support Agent", description: "Handles general customer inquiries" },
    { id: "2", name: "Technical Support Agent", description: "Handles technical issues and troubleshooting" },
    { id: "3", name: "Sales Agent", description: "Handles product inquiries and sales" },
  ]

  const [selectedAgents, setSelectedAgents] = useState<string[]>([])

  const toggleAgentSelection = (agentId: string) => {
    if (selectedAgents.includes(agentId)) {
      setSelectedAgents(selectedAgents.filter((id) => id !== agentId))
    } else {
      setSelectedAgents([...selectedAgents, agentId])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "API endpoint created",
        description: "Your new API endpoint has been created successfully.",
      })
      router.push("/dashboard/api-endpoints")
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/api-endpoints">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create API Endpoint</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>API Endpoint Details</CardTitle>
              <CardDescription>Configure the details for your new API endpoint</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="endpoint-name">Name</Label>
                <Input id="endpoint-name" placeholder="e.g., Get Customer Details" required />
                <p className="text-sm text-muted-foreground">
                  A descriptive name that helps identify the purpose of this endpoint.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endpoint-url">URL</Label>
                <Input id="endpoint-url" placeholder="https://api.example.com/customers/{id}" required />
                <p className="text-sm text-muted-foreground">
                  The URL of the API endpoint. Use curly braces for path parameters, e.g., {"{id}"}.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endpoint-method">Method</Label>
                <Select defaultValue="GET">
                  <SelectTrigger id="endpoint-method">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">The HTTP method used to call this endpoint.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endpoint-description">Description</Label>
                <Textarea
                  id="endpoint-description"
                  placeholder="Describe what this endpoint does and what data it returns"
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  A detailed description of what this endpoint does and the data it returns.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endpoint-category">Category</Label>
                <Select>
                  <SelectTrigger id="endpoint-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer-data">Customer Data</SelectItem>
                    <SelectItem value="order-data">Order Data</SelectItem>
                    <SelectItem value="product-data">Product Data</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Categorize this endpoint to make it easier to find and organize.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Authentication</Label>
                <Select defaultValue="api_key">
                  <SelectTrigger>
                    <SelectValue placeholder="Select authentication type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="api_key">API Key</SelectItem>
                    <SelectItem value="oauth">OAuth</SelectItem>
                    <SelectItem value="basic">Basic Auth</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  The authentication method required to access this endpoint.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Associate with Agents</CardTitle>
              <CardDescription>Select which agents can use this API endpoint</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  API endpoints must be associated with at least one agent to be useful in your system.
                </p>
              </div>

              <div className="space-y-4">
                {availableAgents.map((agent) => (
                  <div key={agent.id} className="flex items-start space-x-3 rounded-lg border p-4">
                    <Checkbox
                      id={`agent-${agent.id}`}
                      checked={selectedAgents.includes(agent.id)}
                      onCheckedChange={() => toggleAgentSelection(agent.id)}
                    />
                    <div className="flex-1">
                      <Label htmlFor={`agent-${agent.id}`} className="font-medium cursor-pointer">
                        {agent.name}
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">{agent.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {selectedAgents.length === 0 && (
                <div className="rounded-lg bg-yellow-50 p-4 text-yellow-800 text-sm">
                  <p className="font-medium">No agents selected</p>
                  <p className="mt-1">
                    This endpoint won't be accessible to any agents. Please select at least one agent.
                  </p>
                </div>
              )}

              <div className="flex justify-end">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/agents/create">Create New Agent</Link>
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/dashboard/api-endpoints">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isLoading || selectedAgents.length === 0}>
                {isLoading ? "Creating..." : "Create Endpoint"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}
