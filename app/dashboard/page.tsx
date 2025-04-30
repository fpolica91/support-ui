import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Users, Bot, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"

export default function DashboardPage() {
  // Sample data for charts
  const conversationData = [
    { name: "Mon", value: 40 },
    { name: "Tue", value: 30 },
    { name: "Wed", value: 45 },
    { name: "Thu", value: 50 },
    { name: "Fri", value: 60 },
    { name: "Sat", value: 30 },
    { name: "Sun", value: 25 },
  ]

  const responseTimeData = [
    { name: "Mon", value: 1.5 },
    { name: "Tue", value: 1.2 },
    { name: "Wed", value: 1.3 },
    { name: "Thu", value: 1.0 },
    { name: "Fri", value: 0.9 },
    { name: "Sat", value: 1.1 },
    { name: "Sun", value: 1.4 },
  ]

  const satisfactionData = [
    { name: "Very Satisfied", value: 65 },
    { name: "Satisfied", value: 25 },
    { name: "Neutral", value: 7 },
    { name: "Unsatisfied", value: 3 },
  ]

  const agentPerformanceData = [
    { name: "Customer Support", value: 92 },
    { name: "Technical Support", value: 88 },
    { name: "Sales Support", value: 76 },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export</Button>
          <Link href="/dashboard/agents/create">
            <Button>
              <span>New Agent</span>
            </Button>
          </Link>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Conversations</CardTitle>
                <CardDescription>Your most recent customer conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-muted"></div>
                        <div>
                          <p className="font-medium">Customer #{i}</p>
                          <p className="text-sm text-muted-foreground">
                            {i % 2 === 0 ? "Billing inquiry" : "Technical support"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-muted-foreground">{i * 10} min ago</div>
                        <Button variant="ghost" size="icon">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Agent Performance</CardTitle>
                <CardDescription>How your agents are performing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bot className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Agent #{i}</p>
                          <p className="text-sm text-muted-foreground">
                            {i === 1 ? "Customer Support" : i === 2 ? "Technical Support" : "Sales Support"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{90 + i}%</p>
                        <p className="text-sm text-muted-foreground">Satisfaction</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Conversation Volume</CardTitle>
                <CardDescription>Daily conversation count over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <BarChart
                  data={conversationData}
                  index="name"
                  categories={["value"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `${value} conversations`}
                  yAxisWidth={40}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Response Time</CardTitle>
                <CardDescription>Average response time in minutes</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <LineChart
                  data={responseTimeData}
                  index="name"
                  categories={["value"]}
                  colors={["green"]}
                  valueFormatter={(value) => `${value} min`}
                  yAxisWidth={40}
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction</CardTitle>
                <CardDescription>Distribution of customer satisfaction ratings</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <PieChart
                  data={satisfactionData}
                  index="name"
                  categories={["value"]}
                  colors={["emerald", "blue", "amber", "rose"]}
                  valueFormatter={(value) => `${value}%`}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Agent Performance</CardTitle>
                <CardDescription>Satisfaction score by agent type</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <BarChart
                  data={agentPerformanceData}
                  index="name"
                  categories={["value"]}
                  colors={["violet"]}
                  valueFormatter={(value) => `${value}%`}
                  yAxisWidth={40}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Summary</CardTitle>
                <CardDescription>Performance overview for April 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Conversations</p>
                      <p className="text-2xl font-bold">1,248</p>
                      <p className="text-xs text-green-600">+12% from last month</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg. Response Time</p>
                      <p className="text-2xl font-bold">1.2m</p>
                      <p className="text-xs text-green-600">-30s from last month</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Resolution Rate</p>
                      <p className="text-2xl font-bold">92%</p>
                      <p className="text-xs text-green-600">+3% from last month</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Customer Satisfaction</p>
                      <p className="text-2xl font-bold">4.8/5</p>
                      <p className="text-xs text-green-600">+0.2 from last month</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    Download Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Top Performing Agents</CardTitle>
                <CardDescription>Agents with highest satisfaction scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Bot className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Agent #{i}</p>
                          <p className="text-sm text-muted-foreground">
                            {i === 1
                              ? "Customer Support"
                              : i === 2
                                ? "Technical Support"
                                : i === 3
                                  ? "Sales Support"
                                  : "Onboarding Support"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{98 - i * 2}%</p>
                        <p className="text-sm text-muted-foreground">Satisfaction</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Conversation Topics</CardTitle>
              <CardDescription>Most common conversation topics this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { topic: "Technical Issues", count: 324, change: "+15%" },
                  { topic: "Billing Questions", count: 256, change: "+8%" },
                  { topic: "Product Information", count: 198, change: "+12%" },
                  { topic: "Account Management", count: 167, change: "+5%" },
                ].map((item, i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">{item.topic}</p>
                        <p className="text-2xl font-bold mt-2">{item.count}</p>
                        <p className="text-xs text-green-600 mt-1">{item.change} from last month</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  View Detailed Topic Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
