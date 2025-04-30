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
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export default function ApiEndpointConfigPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [parameters, setParameters] = useState([
    { id: 1, name: "id", description: "Customer ID", required: true, type: "string", location: "path" },
  ])

  // Mock data for the endpoint
  const endpoint = {
    id: params.id,
    name: "Get Customer Details",
    url: "https://api.example.com/customers/{id}",
    method: "GET",
    description: "Retrieves detailed information about a customer",
    category: "Customer Data",
    authType: "api_key",
    status: "active",
  }

  // Mock data for available agents
  const availableAgents = [
    {
      id: "1",
      name: "Customer Support Agent",
      description: "Handles general customer inquiries",
      associated: true,
    },
    {
      id: "2",
      name: "Technical Support Agent",
      description: "Handles technical issues and troubleshooting",
      associated: false,
    },
    {
      id: "3",
      name: "Sales Agent",
      description: "Handles product inquiries and sales",
      associated: true,
    },
  ]

  const [associatedAgents, setAssociatedAgents] = useState(
    availableAgents.filter((agent) => agent.associated).map((agent) => agent.id),
  )

  const toggleAgentAssociation = (agentId: string) => {
    if (associatedAgents.includes(agentId)) {
      setAssociatedAgents(associatedAgents.filter((id) => id !== agentId))
    } else {
      setAssociatedAgents([...associatedAgents, agentId])
    }
  }

  const addParameter = () => {
    const newId = parameters.length + 1
    setParameters([
      ...parameters,
      { id: newId, name: "", description: "", required: false, type: "string", location: "query" },
    ])
  }

  const removeParameter = (id: number) => {
    setParameters(parameters.filter((param) => param.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "API endpoint updated",
        description: "Your API endpoint has been updated successfully.",
      })
      router.push("/dashboard/api-endpoints")
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/api-endpoints">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Configure API Endpoint</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800" variant="outline">
            {endpoint.status.charAt(0).toUpperCase() + endpoint.status.slice(1)}
          </Badge>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="agents">Associated Agents</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Configure the basic details for your API endpoint</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="endpoint-name">Name</Label>
                  <Input id="endpoint-name" defaultValue={endpoint.name} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endpoint-url">URL</Label>
                  <Input id="endpoint-url" defaultValue={endpoint.url} required />
                  <p className="text-sm text-muted-foreground">Use curly braces for path parameters, e.g., {"{id}"}.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endpoint-method">Method</Label>
                  <Select defaultValue={endpoint.method}>
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endpoint-description">Description</Label>
                  <Textarea id="endpoint-description" defaultValue={endpoint.description} rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endpoint-category">Category</Label>
                  <Select defaultValue={endpoint.category}>
                    <SelectTrigger id="endpoint-category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Customer Data">Customer Data</SelectItem>
                      <SelectItem value="Order Data">Order Data</SelectItem>
                      <SelectItem value="Product Data">Product Data</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Authentication</Label>
                  <Select defaultValue={endpoint.authType}>
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
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="endpoint-active" defaultChecked={endpoint.status === "active"} />
                  <Label htmlFor="endpoint-active">Active</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="button" onClick={() => document.querySelector('[data-value="parameters"]')?.click()}>
                  Next Step
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="parameters">
            <Card>
              <CardHeader>
                <CardTitle>Parameters</CardTitle>
                <CardDescription>Configure the parameters for this API endpoint</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {parameters.map((param, index) => (
                  <div key={param.id} className="rounded-lg border p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Parameter #{index + 1}</h3>
                      <Button variant="ghost" size="icon" type="button" onClick={() => removeParameter(param.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`param-name-${param.id}`}>Name</Label>
                        <Input id={`param-name-${param.id}`} defaultValue={param.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`param-location-${param.id}`}>Location</Label>
                        <Select defaultValue={param.location}>
                          <SelectTrigger id={`param-location-${param.id}`}>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="path">Path</SelectItem>
                            <SelectItem value="query">Query</SelectItem>
                            <SelectItem value="header">Header</SelectItem>
                            <SelectItem value="body">Body</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`param-type-${param.id}`}>Type</Label>
                        <Select defaultValue={param.type}>
                          <SelectTrigger id={`param-type-${param.id}`}>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="string">String</SelectItem>
                            <SelectItem value="number">Number</SelectItem>
                            <SelectItem value="boolean">Boolean</SelectItem>
                            <SelectItem value="object">Object</SelectItem>
                            <SelectItem value="array">Array</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`param-required-${param.id}`}>Required</Label>
                        <div className="flex items-center space-x-2 pt-2">
                          <Switch id={`param-required-${param.id}`} defaultChecked={param.required} />
                          <Label htmlFor={`param-required-${param.id}`}>
                            {param.required ? "Required" : "Optional"}
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`param-description-${param.id}`}>Description</Label>
                      <Textarea
                        id={`param-description-${param.id}`}
                        defaultValue={param.description}
                        placeholder="Describe this parameter"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addParameter} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Parameter
                </Button>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.querySelector('[data-value="basic"]')?.click()}
                >
                  Back
                </Button>
                <Button type="button" onClick={() => document.querySelector('[data-value="agents"]')?.click()}>
                  Next Step
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="agents">
            <Card>
              <CardHeader>
                <CardTitle>Associated Agents</CardTitle>
                <CardDescription>Manage which agents can use this API endpoint</CardDescription>
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
                        checked={associatedAgents.includes(agent.id)}
                        onCheckedChange={() => toggleAgentAssociation(agent.id)}
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

                {associatedAgents.length === 0 && (
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
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.querySelector('[data-value="parameters"]')?.click()}
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
                <CardTitle>Test Endpoint</CardTitle>
                <CardDescription>Test your API endpoint with sample data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-4">Request</h3>
                  <div className="space-y-4">
                    {parameters.map((param) => (
                      <div key={param.id} className="space-y-2">
                        <Label htmlFor={`test-param-${param.id}`}>{param.name}</Label>
                        <Input
                          id={`test-param-${param.id}`}
                          placeholder={`Enter ${param.name}`}
                          required={param.required}
                        />
                      </div>
                    ))}
                    <Button type="button" className="w-full">
                      Send Request
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-4">Response</h3>
                  <div className="bg-muted rounded-md p-4 font-mono text-sm overflow-auto max-h-60">
                    <pre>{JSON.stringify({ id: "123", name: "John Doe", email: "john@example.com" }, null, 2)}</pre>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.querySelector('[data-value="agents"]')?.click()}
                >
                  Back
                </Button>
                <Button type="submit" disabled={isLoading || associatedAgents.length === 0}>
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
