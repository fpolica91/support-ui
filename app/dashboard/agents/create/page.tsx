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
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

export default function CreateAgentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [apiEndpoints, setApiEndpoints] = useState([{ id: 1, name: "", url: "", method: "GET", description: "" }])
  const [isLoading, setIsLoading] = useState(false)

  const addApiEndpoint = () => {
    const newId = apiEndpoints.length + 1
    setApiEndpoints([...apiEndpoints, { id: newId, name: "", url: "", method: "GET", description: "" }])
  }

  const removeApiEndpoint = (id: number) => {
    setApiEndpoints(apiEndpoints.filter((endpoint) => endpoint.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Agent created",
        description: "Your new agent has been created successfully.",
      })
      router.push("/dashboard/agents")
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/agents">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create New Agent</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="behavior">Behavior & Prompts</TabsTrigger>
            <TabsTrigger value="api">API Endpoints</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Set up the basic details for your AI agent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="agent-name">Agent Name</Label>
                  <Input id="agent-name" placeholder="e.g., Customer Support Assistant" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-description">Description</Label>
                  <Textarea
                    id="agent-description"
                    placeholder="Describe what this agent does and its purpose"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-category">Category</Label>
                  <Select>
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
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="agent-active" defaultChecked />
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
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="system-prompt">System Prompt</Label>
                  <Textarea
                    id="system-prompt"
                    placeholder="You are a helpful customer support agent for [Company Name]. You help customers with their inquiries about our products and services."
                    rows={6}
                  />
                  <p className="text-sm text-muted-foreground">
                    This prompt defines the agent's personality, knowledge, and behavior.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="greeting-message">Greeting Message</Label>
                  <Textarea
                    id="greeting-message"
                    placeholder="Hello! I'm your [Company Name] support assistant. How can I help you today?"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fallback-message">Fallback Message</Label>
                  <Textarea
                    id="fallback-message"
                    placeholder="I'm sorry, but I don't have enough information to help with that. Would you like me to connect you with a human agent?"
                    rows={3}
                  />
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
                {apiEndpoints.map((endpoint, index) => (
                  <div key={endpoint.id} className="rounded-lg border p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Endpoint #{index + 1}</h3>
                      {apiEndpoints.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          onClick={() => removeApiEndpoint(endpoint.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`endpoint-name-${endpoint.id}`}>Name</Label>
                        <Input id={`endpoint-name-${endpoint.id}`} placeholder="e.g., Get Customer Details" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`endpoint-method-${endpoint.id}`}>Method</Label>
                        <Select defaultValue="GET">
                          <SelectTrigger id={`endpoint-method-${endpoint.id}`}>
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem value="POST">POST</SelectItem>
                            <SelectItem value="PUT">PUT</SelectItem>
                            <SelectItem value="DELETE">DELETE</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`endpoint-url-${endpoint.id}`}>URL</Label>
                      <Input id={`endpoint-url-${endpoint.id}`} placeholder="https://api.example.com/customers/{id}" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`endpoint-description-${endpoint.id}`}>Description</Label>
                      <Textarea
                        id={`endpoint-description-${endpoint.id}`}
                        placeholder="Describe what this endpoint does and what data it returns"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addApiEndpoint} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Another Endpoint
                </Button>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.querySelector('[data-value="behavior"]')?.click()}
                >
                  Back
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Agent"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}
