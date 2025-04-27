import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Plus, Settings, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ApiEndpointsPage() {
  // Mock data for API endpoints
  const apiEndpoints = [
    {
      id: 1,
      name: "Get Customer Details",
      url: "https://api.example.com/customers/{id}",
      method: "GET",
      description: "Retrieves detailed information about a customer",
      category: "Customer Data",
    },
    {
      id: 2,
      name: "Get Order History",
      url: "https://api.example.com/customers/{id}/orders",
      method: "GET",
      description: "Retrieves the order history for a customer",
      category: "Order Data",
    },
    {
      id: 3,
      name: "Create Support Ticket",
      url: "https://api.example.com/support/tickets",
      method: "POST",
      description: "Creates a new support ticket in the system",
      category: "Support",
    },
    {
      id: 4,
      name: "Update Customer Information",
      url: "https://api.example.com/customers/{id}",
      method: "PUT",
      description: "Updates customer information in the system",
      category: "Customer Data",
    },
    {
      id: 5,
      name: "Get Product Information",
      url: "https://api.example.com/products/{id}",
      method: "GET",
      description: "Retrieves detailed information about a product",
      category: "Product Data",
    },
  ]

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-100 text-blue-800"
      case "POST":
        return "bg-green-100 text-green-800"
      case "PUT":
        return "bg-yellow-100 text-yellow-800"
      case "DELETE":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">API Endpoints</h1>
        <Link href="/dashboard/api-endpoints/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            <span>Add Endpoint</span>
          </Button>
        </Link>
      </div>
      <div className="grid gap-6">
        {apiEndpoints.map((endpoint) => (
          <Card key={endpoint.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {endpoint.name}
                      <Badge className={`ml-2 ${getMethodColor(endpoint.method)}`} variant="outline">
                        {endpoint.method}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{endpoint.category}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">URL</p>
                  <p className="font-mono text-sm">{endpoint.url}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                  <p>{endpoint.description}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Configure
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
