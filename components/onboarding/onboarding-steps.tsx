import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: number
  name: string
  description: string
}

interface OnboardingStepsProps {
  steps: Step[]
  currentStep: number
}

export function OnboardingSteps({ steps, currentStep }: OnboardingStepsProps) {
  return (
    <div className="hidden md:block">
      <div className="relative">
        <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted"></div>
        <ol className="relative z-10 flex justify-between">
          {steps.map((step) => {
            const isCompleted = step.id < currentStep
            const isCurrent = step.id === currentStep

            return (
              <li key={step.id} className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background",
                    isCompleted ? "border-primary" : isCurrent ? "border-primary" : "border-muted",
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  ) : (
                    <span className={cn("text-sm font-medium", isCurrent ? "text-primary" : "text-muted-foreground")}>
                      {step.id}
                    </span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div className={cn("text-sm font-medium", isCurrent ? "text-foreground" : "text-muted-foreground")}>
                    {step.name}
                  </div>
                  <div className="hidden text-xs text-muted-foreground sm:block">{step.description}</div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
