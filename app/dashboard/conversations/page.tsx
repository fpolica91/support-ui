import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { MessageSquare, Search, Filter, ArrowUpRight } from "lucide-react"

export default function ConversationsPage() {
  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      customer: "John Doe",
      email: "john.doe@example.com",
      topic: "Billing inquiry",
      agent: "Customer Support Agent",
      status: "Resolved",
      time: "2 hours ago",
    },
    {
      id: 2,
      customer: "Jane Smith",
      email: "jane.smith@example.com",
      topic: "Technical issue",
      agent: "Technical Support Agent",
      status: "In Progress",
      time: "30 minutes ago",
    },
    {
      id: 3,
      customer: "Bob Johnson",
      email: "bob.johnson@example.com",
      topic: "Product information",
      agent: "Sales Assistant",
      status: "Waiting",
      time: "5 minutes ago",
    },
    {
      id: 4,
      customer: "Alice Brown",
      email: "alice.brown@example.com",
      topic: "Return request",
      agent: "Customer Support Agent",
      status: "Resolved",
      time: "1 day ago",
    },
    {
      id: 5,
      customer: "Charlie Wilson",
      email: "charlie.wilson@example.com",
      topic: "Account access",
      agent: "Technical Support Agent",
      status: "In Progress",
      time: "15 minutes ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Waiting":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Conversations</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search conversations..." className="w-[250px] pl-8" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="waiting">Waiting</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Conversations</CardTitle>
              <CardDescription>View and manage all customer conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversations.map((conversation) => (
                  <div key={conversation.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{conversation.customer}</div>
                        <div className="text-sm text-muted-foreground">{conversation.email}</div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="font-medium">{conversation.topic}</div>
                      <div className="text-sm text-muted-foreground">{conversation.agent}</div>
                    </div>
                    <div className="hidden md:block">
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                          conversation.status,
                        )}`}
                      >
                        {conversation.status}
                      </div>
                      <div className="text-sm text-muted-foreground">{conversation.time}</div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ArrowUpRight className="h-4 w-4" />
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
              <CardTitle>Active Conversations</CardTitle>
              <CardDescription>View and manage active customer conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversations
                  .filter((c) => c.status === "In Progress")
                  .map((conversation) => (
                    <div key={conversation.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{conversation.customer}</div>
                          <div className="text-sm text-muted-foreground">{conversation.email}</div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="font-medium">{conversation.topic}</div>
                        <div className="text-sm text-muted-foreground">{conversation.agent}</div>
                      </div>
                      <div className="hidden md:block">
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                            conversation.status,
                          )}`}
                        >
                          {conversation.status}
                        </div>
                        <div className="text-sm text-muted-foreground">{conversation.time}</div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ArrowUpRight className="h-4 w-4" />
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
