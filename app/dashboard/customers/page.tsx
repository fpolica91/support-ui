import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Users, Search, Filter, ArrowUpRight, Plus } from "lucide-react"
import Link from "next/link"

export default function CustomersPage() {
  // Mock data for customers
  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      company: "Acme Inc",
      status: "Active",
      conversations: 12,
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      company: "Globex Corp",
      status: "Active",
      conversations: 8,
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      company: "Initech",
      status: "Inactive",
      conversations: 3,
      lastActive: "1 week ago",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice.brown@example.com",
      company: "Umbrella Corp",
      status: "Active",
      conversations: 15,
      lastActive: "3 hours ago",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie.wilson@example.com",
      company: "Stark Industries",
      status: "Active",
      conversations: 7,
      lastActive: "5 hours ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search customers..." className="w-[250px] pl-8" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Customers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Customers</CardTitle>
              <CardDescription>View and manage all your customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customers.map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.email}</div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="font-medium">{customer.company}</div>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                          customer.status,
                        )}`}
                      >
                        {customer.status}
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="font-medium">{customer.conversations} conversations</div>
                      <div className="text-sm text-muted-foreground">Last active: {customer.lastActive}</div>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/customers/${customer.id}`}>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Customers</CardTitle>
              <CardDescription>View and manage active customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customers
                  .filter((c) => c.status === "Active")
                  .map((customer) => (
                    <div key={customer.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">{customer.email}</div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="font-medium">{customer.company}</div>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                            customer.status,
                          )}`}
                        >
                          {customer.status}
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="font-medium">{customer.conversations} conversations</div>
                        <div className="text-sm text-muted-foreground">Last active: {customer.lastActive}</div>
                      </div>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/customers/${customer.id}`}>
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
