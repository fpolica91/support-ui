"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ApiEndpoint {
  id: number
  name: string
  url: string
  method: string
  description: string
}

export function ApiSetup() {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([
    { id: 1, name: "", url: "", method: "GET", description: "" },
  ])

  const addEndpoint = () => {
    const newId = endpoints.length > 0 ? Math.max(...endpoints.map((e) => e.id)) + 1 : 1
    setEndpoints([...endpoints, { id: newId, name: "", url: "", method: "GET", description: "" }])
  }

  const removeEndpoint = (id: number) => {
    if (endpoints.length > 1) {
      setEndpoints(endpoints.filter((endpoint) => endpoint.id !== id))
    }
  }

  const updateEndpoint = (id: number, field: keyof ApiEndpoint, value: string) => {
    setEndpoints(endpoints.map((endpoint) => (endpoint.id === id ? { ...endpoint, [field]: value } : endpoint)))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>API Endpoints</Label>
          <Button type="button" variant="outline" size="sm" onClick={addEndpoint}>
            <Plus className="mr-2 h-4 w-4" />
            Add Endpoint
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Configure the API endpoints your agent can access to retrieve data from your systems.
        </p>
      </div>

      <div className="space-y-4">
        {endpoints.map((endpoint, index) => (
          <Card key={endpoint.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Endpoint #{index + 1}</h4>
                {endpoints.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeEndpoint(endpoint.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`endpoint-name-${endpoint.id}`}>Name</Label>
                  <Input
                    id={`endpoint-name-${endpoint.id}`}
                    placeholder="Get Customer Details"
                    value={endpoint.name}
                    onChange={(e) => updateEndpoint(endpoint.id, "name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endpoint-method-${endpoint.id}`}>Method</Label>
                  <Select
                    value={endpoint.method}
                    onValueChange={(value) => updateEndpoint(endpoint.id, "method", value)}
                  >
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

              <div className="mt-4 space-y-2">
                <Label htmlFor={`endpoint-url-${endpoint.id}`}>URL</Label>
                <Input
                  id={`endpoint-url-${endpoint.id}`}
                  placeholder="https://api.example.com/customers/{id}"
                  value={endpoint.url}
                  onChange={(e) => updateEndpoint(endpoint.id, "url", e.target.value)}
                />
              </div>

              <div className="mt-4 space-y-2">
                <Label htmlFor={`endpoint-description-${endpoint.id}`}>Description</Label>
                <Textarea
                  id={`endpoint-description-${endpoint.id}`}
                  placeholder="Describe what this endpoint does and what data it returns"
                  rows={2}
                  value={endpoint.description}
                  onChange={(e) => updateEndpoint(endpoint.id, "description", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
