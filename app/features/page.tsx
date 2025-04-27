import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Database, MessageSquare, Shield, Zap, Users, BarChart, Headphones } from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Agents",
      description:
        "Create custom AI agents with access to your business data to handle customer inquiries automatically.",
    },
    {
      icon: Database,
      title: "API Integration",
      description: "Connect with your existing systems through secure API endpoints to provide real-time data access.",
    },
    {
      icon: MessageSquare,
      title: "Multi-Channel Support",
      description: "Engage with customers across multiple channels including chat, email, and social media.",
    },
    {
      icon: Shield,
      title: "Multi-Tenant Security",
      description: "Robust data isolation and security for each business tenant with role-based access control.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Collaborate with your team members to provide seamless customer support with shared context.",
    },
    {
      icon: Headphones,
      title: "Live Chat Interface",
      description: "Engage with customers in real-time through an intuitive chat interface with AI assistance.",
    },
    {
      icon: BarChart,
      title: "Advanced Analytics",
      description: "Gain insights into customer interactions, agent performance, and support trends.",
    },
    {
      icon: Zap,
      title: "Real-time Data Access",
      description: "Access and utilize real-time data from your internal systems to provide accurate information.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <MainNav />
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Powerful Features</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Everything you need to provide exceptional customer support powered by AI
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <Link href="/signup">
                <Button size="lg">Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-muted py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Ready to transform your customer support?</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-lg">
                Join thousands of businesses that are using SupportHub to provide exceptional customer service.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/signup">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
