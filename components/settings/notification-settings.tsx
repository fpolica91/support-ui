"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"

export function NotificationSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Mock notification settings
  const [notifications, setNotifications] = useState({
    email: {
      newConversation: true,
      agentAssignment: true,
      customerFeedback: true,
      weeklyReports: true,
      systemUpdates: false,
    },
    inApp: {
      newConversation: true,
      agentAssignment: true,
      customerFeedback: true,
      systemUpdates: true,
    },
  })

  const handleToggle = (category: "email" | "inApp", setting: string) => {
    setNotifications({
      ...notifications,
      [category]: {
        ...notifications[category],
        [setting]: !notifications[category][setting as keyof (typeof notifications)[typeof category]],
      },
    })
  }

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notification Preferences</h3>
        <p className="text-sm text-muted-foreground">Configure how and when you receive notifications.</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h4 className="text-base font-medium mb-4">Email Notifications</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-new-conversation" className="text-base">
                    New conversations
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive an email when a new customer conversation starts.
                  </p>
                </div>
                <Switch
                  id="email-new-conversation"
                  checked={notifications.email.newConversation}
                  onCheckedChange={() => handleToggle("email", "newConversation")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-agent-assignment" className="text-base">
                    Agent assignments
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive an email when a conversation is assigned to you.
                  </p>
                </div>
                <Switch
                  id="email-agent-assignment"
                  checked={notifications.email.agentAssignment}
                  onCheckedChange={() => handleToggle("email", "agentAssignment")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-customer-feedback" className="text-base">
                    Customer feedback
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive an email when a customer leaves feedback.</p>
                </div>
                <Switch
                  id="email-customer-feedback"
                  checked={notifications.email.customerFeedback}
                  onCheckedChange={() => handleToggle("email", "customerFeedback")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-weekly-reports" className="text-base">
                    Weekly reports
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive weekly performance and analytics reports.</p>
                </div>
                <Switch
                  id="email-weekly-reports"
                  checked={notifications.email.weeklyReports}
                  onCheckedChange={() => handleToggle("email", "weeklyReports")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-system-updates" className="text-base">
                    System updates
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive emails about system updates and new features.</p>
                </div>
                <Switch
                  id="email-system-updates"
                  checked={notifications.email.systemUpdates}
                  onCheckedChange={() => handleToggle("email", "systemUpdates")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h4 className="text-base font-medium mb-4">In-App Notifications</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="inapp-new-conversation" className="text-base">
                    New conversations
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive in-app notifications for new conversations.</p>
                </div>
                <Switch
                  id="inapp-new-conversation"
                  checked={notifications.inApp.newConversation}
                  onCheckedChange={() => handleToggle("inApp", "newConversation")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="inapp-agent-assignment" className="text-base">
                    Agent assignments
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive in-app notifications when conversations are assigned to you.
                  </p>
                </div>
                <Switch
                  id="inapp-agent-assignment"
                  checked={notifications.inApp.agentAssignment}
                  onCheckedChange={() => handleToggle("inApp", "agentAssignment")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="inapp-customer-feedback" className="text-base">
                    Customer feedback
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive in-app notifications for customer feedback.</p>
                </div>
                <Switch
                  id="inapp-customer-feedback"
                  checked={notifications.inApp.customerFeedback}
                  onCheckedChange={() => handleToggle("inApp", "customerFeedback")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="inapp-system-updates" className="text-base">
                    System updates
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive in-app notifications about system updates and new features.
                  </p>
                </div>
                <Switch
                  id="inapp-system-updates"
                  checked={notifications.inApp.systemUpdates}
                  onCheckedChange={() => handleToggle("inApp", "systemUpdates")}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
