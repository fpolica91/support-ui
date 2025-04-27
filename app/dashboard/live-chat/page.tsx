import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Filter, Headphones } from "lucide-react"
import Link from "next/link"

export default function LiveChatPage() {
  // Mock data for live chats
  const liveChats = [
    {
      id: 1,
      customer: "John Doe",
      email: "john.doe@example.com",
      topic: "Product inquiry",
      status: "Active",
      waitTime: "0 min",
      agent: "Unassigned",
    },
    {
      id: 2,
      customer: "Jane Smith",
      email: "jane.smith@example.com",
      topic: "Technical issue",
      status: "Active",
      waitTime: "2 min",
      agent: "Unassigned",
    },
    {
      id: 3,
      customer: "Bob Johnson",
      email: "bob.johnson@example.com",
      topic: "Billing question",
      status: "Assigned",
      waitTime: "5 min",
      agent: "AI Agent #1",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Assigned":
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
        <h1 className="text-3xl font-bold tracking-tight">Live Chat</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search chats..." className="w-[250px] pl-8" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Chats</TabsTrigger>
          <TabsTrigger value="assigned">Assigned</TabsTrigger>
          <TabsTrigger value="all">All Chats</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Chats</CardTitle>
              <CardDescription>Customers waiting for assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liveChats
                  .filter((chat) => chat.status === "Active")
                  .map((chat) => (
                    <div key={chat.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Headphones className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{chat.customer}</div>
                          <div className="text-sm text-muted-foreground">{chat.email}</div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="font-medium">{chat.topic}</div>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                            chat.status,
                          )}`}
                        >
                          {chat.status}
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="font-medium">Wait time: {chat.waitTime}</div>
                        <div className="text-sm text-muted-foreground">Agent: {chat.agent}</div>
                      </div>
                      <Button variant="default" size="sm" asChild>
                        <Link href={`/chat/${chat.id}`}>Join Chat</Link>
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
