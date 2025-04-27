import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Plus, Settings, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TenantsPage() {
  // Mock data for tenants
  const tenants = [
    {
      id: 1,
      name: "Acme Inc",
      domain: "acme.com",
      plan: "Enterprise",
      status: "active",
      users: 24,
      agents: 8,
      createdAt: "2023-01-15",
    },
    {
      id: 2,
      name: "Globex Corporation",
      domain: "globex.com",
      plan: "Professional",
      status: "active",
      users: 12,
      agents: 4,
      createdAt: "2023-03-22",
    },
    {
      id: 3,
      name: "Initech",
      domain: "initech.com",
      plan: "Starter",
      status: "inactive",
      users: 5,
      agents: 1,
      createdAt: "2023-05-10",
    },
    {
      id: 4,
      name: "Umbrella Corporation",
      domain: "umbrella.com",
      plan: "Enterprise",
      status: "active",
      users: 35,
      agents: 12,
      createdAt: "2023-02-05",
    },
    {
      id: 5,
      name: "Stark Industries",
      domain: "stark.com",
      plan: "Professional",
      status: "active",
      users: 18,
      agents: 6,
      createdAt: "2023-04-18",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Enterprise":
        return "bg-purple-100 text-purple-800"
      case "Professional":
        return "bg-blue-100 text-blue-800"
      case "Starter":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tenants</h1>
        <Link href="/admin/tenants/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            <span>Add Tenant</span>
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input placeholder="Search tenants..." />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="starter">Starter</SelectItem>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {tenants.map((tenant) => (
          <Card key={tenant.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{tenant.name}</CardTitle>
                    <CardDescription>{tenant.domain}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPlanColor(tenant.plan)} variant="outline">
                    {tenant.plan}
                  </Badge>
                  <Badge className={getStatusColor(tenant.status)} variant="outline">
                    {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Users</p>
                  <p className="text-2xl font-bold">{tenant.users}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Agents</p>
                  <p className="text-2xl font-bold">{tenant.agents}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Created</p>
                  <p className="text-2xl font-bold">{tenant.createdAt}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/admin/tenants/${tenant.id}`}>
                  <Settings className="mr-2 h-4 w-4" />
                  Manage
                </Link>
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
