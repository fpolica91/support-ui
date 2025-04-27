import { Bot, Database, MessageSquare, Shield, Zap } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Multi-Tenant Security",
      description: "Robust data isolation and security for each business tenant",
    },
    {
      icon: Bot,
      title: "AI-Powered Agents",
      description: "Create custom AI agents with access to your business data",
    },
    {
      icon: Database,
      title: "API Integration",
      description: "Connect with your existing systems through secure API endpoints",
    },
    {
      icon: MessageSquare,
      title: "Live Chat Interface",
      description: "Engage with customers in real-time through an intuitive chat interface",
    },
    {
      icon: Zap,
      title: "Real-time Data Access",
      description: "Access and utilize real-time data from your internal systems",
    },
    {
      icon: Shield,
      title: "Enterprise-grade Security",
      description: "Protect your data with robust security measures and compliance",
    },
  ]

  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Powerful Features</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Everything you need to provide exceptional customer support
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 text-center"
            >
              <div className="rounded-full bg-primary/10 p-3">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
