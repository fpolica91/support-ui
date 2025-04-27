import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, FileText, Video, MessageCircleQuestion, Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  // FAQ data
  const faqs = [
    {
      question: "How do I create a new AI agent?",
      answer:
        "To create a new AI agent, navigate to the Agents page from the sidebar, then click the 'Create Agent' button. Follow the step-by-step wizard to configure your agent's name, behavior, and API access.",
    },
    {
      question: "How do I connect my existing API endpoints?",
      answer:
        "Go to the API Endpoints section, click 'Add Endpoint', and enter your API details including URL, method, and authentication. Once added, you can assign these endpoints to specific AI agents.",
    },
    {
      question: "Can I customize the chat widget for my website?",
      answer:
        "Yes! In the Settings page, navigate to the 'Chat Widget' tab where you can customize colors, branding, and behavior. You can also access the embed code to add the widget to your website.",
    },
    {
      question: "How do I invite team members to my account?",
      answer:
        "In the Settings page, go to the 'User Management' tab. Click 'Invite User', enter their email address and select their role. They'll receive an invitation email to join your organization.",
    },
    {
      question: "How are conversations billed?",
      answer:
        "Conversations are counted when a customer initiates a chat with your AI agent. Each plan includes a specific number of conversations per month. Additional conversations are billed according to your plan's overage rates.",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-10" placeholder="Search for help articles, tutorials, and more..." />
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq">
            <MessageCircleQuestion className="mr-2 h-4 w-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="documentation">
            <FileText className="mr-2 h-4 w-4" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="tutorials">
            <Video className="mr-2 h-4 w-4" />
            Video Tutorials
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Mail className="mr-2 h-4 w-4" />
            Contact Support
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions about using SupportHub</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation">
          <Card>
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Comprehensive guides and reference materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Getting Started</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="text-primary hover:underline">
                        <Link href="#">Platform Overview</Link>
                      </li>
                      <li className="text-primary hover:underline">
                        <Link href="#">Account Setup</Link>
                      </li>
                      <li className="text-primary hover:underline">
                        <Link href="#">Creating Your First Agent</Link>
                      </li>
                      <li className="text-primary hover:underline">
                        <Link href="#">Integrating with Your Website</Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">AI Agents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="text-primary hover:underline">
                        <Link href="#">Agent Configuration</Link>
                      </li>
                      <li className="text-primary hover:underline">
                        <Link href="#">System Prompts Guide</Link>
                      </li>
                      <li className="text-primary hover:underline">
                        <Link href="#">API Access & Permissions</Link>
                      </li>
                      <li className="text-primary hover:underline">
                        <Link href="#">Testing & Optimization</Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">API Integration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="text-primary hover:underline">
                        <Link href="#">API Endpoints Setup</Link>
                      </li>
                      <li className="text-primary hover:underline">
                        <Link href="#">Authentication Methods</Link>
                      </li>
                      <li className="text-primary hover:underline">
                        <Link href="#">Parameter Configuration</Link>
                      </li>
                      <li className="text-primary hover:underline">
                        <Link href="#">Troubleshooting</Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutorials">
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>Step-by-step video guides to help you get the most out of SupportHub</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="overflow-hidden rounded-lg border">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <Video className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">
                        {i === 1
                          ? "Getting Started with SupportHub"
                          : i === 2
                            ? "Creating and Configuring AI Agents"
                            : i === 3
                              ? "Setting Up API Integrations"
                              : "Advanced Analytics and Reporting"}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {i === 1
                          ? "Learn the basics of setting up your account and navigating the platform."
                          : i === 2
                            ? "A comprehensive guide to creating effective AI agents for customer support."
                            : i === 3
                              ? "Connect your business systems to provide real-time data to your agents."
                              : "Get insights from your customer interactions with advanced analytics."}
                      </p>
                      <Button variant="link" className="mt-2 px-0">
                        Watch Video
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get help from our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Mail className="h-5 w-5" /> Email Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Send us an email and we'll get back to you within 24 hours.
                    </p>
                    <Button className="w-full">
                      <Mail className="mr-2 h-4 w-4" /> Email Support
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Phone className="h-5 w-5" /> Phone Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Available for Enterprise customers Monday-Friday, 9am-5pm ET.
                    </p>
                    <Button className="w-full">
                      <Phone className="mr-2 h-4 w-4" /> Call Support
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
