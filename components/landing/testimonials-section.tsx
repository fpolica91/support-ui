import { Card, CardContent } from "@/components/ui/card"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "SupportHub has transformed our customer service operations. Our response times have decreased by 60% while customer satisfaction has increased by 35%.",
      author: "Sarah Johnson",
      role: "Customer Service Director",
      company: "TechCorp Inc.",
    },
    {
      quote:
        "The ability to connect our internal systems with AI agents has been a game-changer. Our support team can now focus on complex issues while the AI handles routine inquiries.",
      author: "Michael Chen",
      role: "CTO",
      company: "Innovate Solutions",
    },
    {
      quote:
        "Setting up custom agents was incredibly easy. Within days, we had a fully operational AI support system that understood our products and services.",
      author: "Emily Rodriguez",
      role: "Head of Support",
      company: "Global Retail",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Trusted by Businesses</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">See what our customers have to say about SupportHub</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex-1">
                    <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">{testimonial.author[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
