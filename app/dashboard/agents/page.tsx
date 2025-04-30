import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Plus, Settings, Trash2 } from "lucide-react"

export default function AgentsPage() {
  // Mock data for agents
  const agents = [
    {
      id: 1,
      name: "Customer Support Agent",
      description: "Handles general customer inquiries and support requests",
      apiEndpoints: 5,
      conversations: 324,
    },
    {
      id: 2,
      name: "Technical Support Agent",
      description: "Provides technical troubleshooting and product support",
      apiEndpoints: 8,
      conversations: 156,
    },
    {
      id: 3,
      name: "Sales Assistant",
      description: "Helps with product information and purchase guidance",
      apiEndpoints: 3,
      conversations: 89,
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">AI Agents</h1>
        <Link href="/dashboard/agents/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            <span>Create Agent</span>
          </Button>
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{agent.name}</CardTitle>
                </div>
              </div>
              <CardDescription>{agent.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">API Endpoints</p>
                  <p className="text-2xl font-bold">{agent.apiEndpoints}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Conversations</p>
                  <p className="text-2xl font-bold">{agent.conversations}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/dashboard/agents/${agent.id}/edit`}>
                  <Settings className="mr-2 h-4 w-4" />
                  Configure
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
