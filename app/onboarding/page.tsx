"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { OnboardingSteps } from "@/components/onboarding/onboarding-steps"
import { CompanySetup } from "@/components/onboarding/company-setup"
import { AgentSetup } from "@/components/onboarding/agent-setup"
import { ApiSetup } from "@/components/onboarding/api-setup"
import { FinalSetup } from "@/components/onboarding/final-setup"
import { useToast } from "@/components/ui/use-toast"

export default function OnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const steps = [
    { id: 1, name: "Company", description: "Set up your company profile" },
    { id: 2, name: "Agent", description: "Create your first AI agent" },
    { id: 3, name: "API", description: "Configure API endpoints" },
    { id: 4, name: "Finish", description: "Complete your setup" },
  ]

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsLoading(true)
      // Simulate completion
      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: "Onboarding complete",
          description: "Redirecting to dashboard...",
        })
        router.push("/dashboard")
      }, 1500)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="container max-w-5xl py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to SupportHub</h1>
        <p className="text-muted-foreground">Let's get your account set up in just a few steps.</p>
      </div>

      <OnboardingSteps steps={steps} currentStep={currentStep} />

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].name}</CardTitle>
          <CardDescription>{steps[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && <CompanySetup />}
          {currentStep === 2 && <AgentSetup />}
          {currentStep === 3 && <ApiSetup />}
          {currentStep === 4 && <FinalSetup />}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={isLoading}>
            {currentStep === steps.length ? (isLoading ? "Completing..." : "Complete Setup") : "Next Step"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
