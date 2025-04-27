"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function FinalSetup() {
  const [preferences, setPreferences] = useState({
    notifications: true,
    analytics: true,
    newsletter: false,
  })

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences({
      ...preferences,
      [key]: !preferences[key],
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Setup Complete!</h3>
        <p className="text-muted-foreground">
          You've successfully set up your SupportHub account. Here's a summary of what you've configured:
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Company Profile</h4>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Your company profile has been created and is ready to use.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <h4 className="font-medium">AI Agent</h4>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Your first AI agent has been configured and is ready to assist your customers.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <h4 className="font-medium">API Endpoints</h4>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Your API endpoints have been configured and are ready to be used by your agent.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications" className="text-base">
                Email notifications
              </Label>
              <p className="text-sm text-muted-foreground">Receive notifications about important updates and events.</p>
            </div>
            <Switch
              id="notifications"
              checked={preferences.notifications}
              onCheckedChange={() => togglePreference("notifications")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="analytics" className="text-base">
                Usage analytics
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow us to collect anonymous usage data to improve our service.
              </p>
            </div>
            <Switch
              id="analytics"
              checked={preferences.analytics}
              onCheckedChange={() => togglePreference("analytics")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="newsletter" className="text-base">
                Newsletter
              </Label>
              <p className="text-sm text-muted-foreground">Receive our newsletter with product updates and tips.</p>
            </div>
            <Switch
              id="newsletter"
              checked={preferences.newsletter}
              onCheckedChange={() => togglePreference("newsletter")}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
