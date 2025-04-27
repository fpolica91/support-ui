import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { CheckCircle } from "lucide-react"

export default function PricingPage() {
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
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Choose the plan that's right for your business. All plans include a 14-day free trial.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {/* Starter Plan */}
              <div className="flex flex-col rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-5">
                  <h3 className="text-lg font-bold">Starter</h3>
                  <p className="text-sm text-muted-foreground">For small businesses just getting started</p>
                </div>
                <div className="mb-5">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="mb-8 space-y-3 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>1 AI agent</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Up to 5 API endpoints</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>1,000 conversations/month</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Link href="/signup?plan=starter" className="mt-auto">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>

              {/* Professional Plan */}
              <div className="flex flex-col rounded-lg border bg-card p-6 shadow-sm relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
                <div className="mb-5">
                  <h3 className="text-lg font-bold">Professional</h3>
                  <p className="text-sm text-muted-foreground">For growing businesses with more complex needs</p>
                </div>
                <div className="mb-5">
                  <span className="text-4xl font-bold">$149</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="mb-8 space-y-3 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>5 AI agents</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Up to 20 API endpoints</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>5,000 conversations/month</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Priority email support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Human handoff capability</span>
                  </li>
                </ul>
                <Link href="/signup?plan=professional" className="mt-auto">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>

              {/* Enterprise Plan */}
              <div className="flex flex-col rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-5">
                  <h3 className="text-lg font-bold">Enterprise</h3>
                  <p className="text-sm text-muted-foreground">For large organizations with custom requirements</p>
                </div>
                <div className="mb-5">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <ul className="mb-8 space-y-3 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Unlimited AI agents</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Unlimited API endpoints</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Custom conversation limits</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Custom analytics & reporting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>24/7 dedicated support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>SLA guarantees</span>
                  </li>
                </ul>
                <Link href="/contact-sales" className="mt-auto">
                  <Button className="w-full" variant="outline">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-16">
              <div className="rounded-lg border bg-card p-8">
                <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">Can I switch plans later?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next
                      billing cycle.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">What happens if I exceed my conversation limit?</h4>
                    <p className="text-sm text-muted-foreground">
                      You'll be notified when you reach 80% of your limit. If you exceed it, you can purchase additional
                      conversations or upgrade your plan.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Do you offer a free trial?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, all plans include a 14-day free trial with no credit card required.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">How does billing work?</h4>
                    <p className="text-sm text-muted-foreground">
                      We bill monthly or annually, with a discount for annual billing. You can cancel at any time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
