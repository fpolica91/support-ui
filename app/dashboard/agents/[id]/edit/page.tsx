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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export default function EditAgentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Mock data for the agent
  const agent = {
    id: params.id,
    name: "Customer Support Agent",
    description: "Handles general customer inquiries and support requests",
    category: "customer-support",
    status: "active",
    systemPrompt:
      "You are a helpful customer support agent for our company. You help customers with their inquiries about our products and services.",
    greetingMessage: "Hello! I'm your support assistant. How can I help you today?",
    fallbackMessage:
      "I'm sorry, but I don't have enough information to help with that. Would you like me to connect you with a human agent?",
  }

  // Mock data for available API endpoints
  const availableApiEndpoints = [
    {
      id: "1",
      name: "Get Customer Details",
      url: "https://api.example.com/customers/{id}",
      method: "GET",
      description: "Retrieves detailed information about a customer",
      selected: true,
    },
    {
      id: "2",
      name: "Get Order History",
      url: "https://api.example.com/customers/{id}/orders",
      method: "GET",
      description: "Retrieves the order history for a customer",
      selected: true,
    },
    {
      id: "3",
      name: "Create Support Ticket",
      url: "https://api.example.com/support/tickets",
      method: "POST",
      description: "Creates a new support ticket in the system",
      selected: false,
    },
    {
      id: "4",
      name: "Update Customer Information",
      url: "https://api.example.com/customers/{id}",
      method: "PUT",
      description: "Updates customer information in the system",
      selected: false,
    },
    {
      id: "5",
      name: "Get Product Information",
      url: "https://api.example.com/products/{id}",
      method: "GET",
      description: "Retrieves detailed information about a product",
      selected: true,
    },
  ]

  const [apiEndpoints, setApiEndpoints] = useState(availableApiEndpoints)

  const toggleEndpointSelection = (id: string) => {
    setApiEndpoints(
      apiEndpoints.map((endpoint) => (endpoint.id === id ? { ...endpoint, selected: !endpoint.selected } : endpoint)),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Agent updated",
        description: "Your agent has been updated successfully.",
      })
      router.push("/dashboard/agents")
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/agents">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Edit Agent</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800" variant="outline">
            {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
          </Badge>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="behavior">Behavior & Prompts</TabsTrigger>
            <TabsTrigger value="api">API Endpoints</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Configure the basic details for your AI agent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="agent-name">Agent Name</Label>
                  <Input id="agent-name" defaultValue={agent.name} required />
                  <p className="text-sm text-muted-foreground">
                    This is how your agent will identify itself to customers.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agent-description">Description</Label>
                  <Textarea id="agent-description" defaultValue={agent.description} rows={4} />
                  <p className="text-sm text-muted-foreground">
                    A brief description of what this agent does and its purpose.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agent-category">Category</Label>
                  <Select defaultValue={agent.category}>
                    <SelectTrigger id="agent-category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer-support">Customer Support</SelectItem>
                      <SelectItem value="technical-support">Technical Support</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="onboarding">Onboarding</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Categorize this agent to make it easier to find and organize.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="agent-active" defaultChecked={agent.status === "active"} />
                  <Label htmlFor="agent-active">Active</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="button" onClick={() => document.querySelector('[data-value="behavior"]')?.click()}>
                  Next Step
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="behavior">
            <Card>
              <CardHeader>
                <CardTitle>Behavior & Prompts</CardTitle>
                <CardDescription>Define how your agent behaves and responds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="system-prompt">System Prompt</Label>
                  <Textarea id="system-prompt" defaultValue={agent.systemPrompt} rows={6} />
                  <p className="text-sm text-muted-foreground">
                    This prompt defines the agent's personality, knowledge, and behavior.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="greeting-message">Greeting Message</Label>
                  <Textarea id="greeting-message" defaultValue={agent.greetingMessage} rows={3} />
                  <p className="text-sm text-muted-foreground">
                    This message is sent when a customer starts a new conversation.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fallback-message">Fallback Message</Label>
                  <Textarea id="fallback-message" defaultValue={agent.fallbackMessage} rows={3} />
                  <p className="text-sm text-muted-foreground">
                    This message is used when the agent cannot understand or handle a customer's request.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.querySelector('[data-value="basic"]')?.click()}
                >
                  Back
                </Button>
                <Button type="button" onClick={() => document.querySelector('[data-value="api"]')?.click()}>
                  Next Step
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Endpoints</CardTitle>
                <CardDescription>Configure the API endpoints this agent can access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Select which API endpoints this agent can access to retrieve data and perform actions.
                  </p>
                </div>

                <div className="space-y-4">
                  {apiEndpoints.map((endpoint) => (
                    <div key={endpoint.id} className="flex items-start space-x-3 rounded-lg border p-4">
                      <Checkbox
                        id={`endpoint-${endpoint.id}`}
                        checked={endpoint.selected}
                        onCheckedChange={() => toggleEndpointSelection(endpoint.id)}
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={`endpoint-${endpoint.id}`}
                          className="flex items-center gap-2 font-medium cursor-pointer"
                        >
                          {endpoint.name}
                          <Badge
                            className={`ml-2 ${
                              endpoint.method === "GET"
                                ? "bg-blue-100 text-blue-800"
                                : endpoint.method === "POST"
                                  ? "bg-green-100 text-green-800"
                                  : endpoint.method === "PUT"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                            variant="outline"
                          >
                            {endpoint.method}
                          </Badge>
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">{endpoint.description}</p>
                        <p className="text-xs font-mono text-muted-foreground mt-1">{endpoint.url}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/api-endpoints/create">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Endpoint
                    </Link>
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.querySelector('[data-value="behavior"]')?.click()}
                >
                  Back
                </Button>
                <Button type="button" onClick={() => document.querySelector('[data-value="testing"]')?.click()}>
                  Next Step
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="testing">
            <Card>
              <CardHeader>
                <CardTitle>Test Agent</CardTitle>
                <CardDescription>Test your agent with sample conversations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <div className="rounded-lg bg-muted p-3 text-sm">{agent.greetingMessage}</div>
                    </div>

                    <div className="flex items-start gap-3 self-end">
                      <div className="rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                        I need help with my recent order.
                      </div>
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                        U
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <div className="rounded-lg bg-muted p-3 text-sm">
                        I'd be happy to help you with your recent order. Could you please provide your order number or
                        the email address associated with your account so I can look up the details?
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Input placeholder="Type a test message..." />
                    <Button type="button">Send</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.querySelector('[data-value="api"]')?.click()}
                >
                  Back
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}
