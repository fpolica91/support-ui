"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AgentSetup() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="agent-name">Agent name</Label>
        <Input id="agent-name" placeholder="Customer Support Assistant" />
        <p className="text-sm text-muted-foreground">This is how your agent will identify itself to customers.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="agent-type">Agent type</Label>
        <Select>
          <SelectTrigger id="agent-type">
            <SelectValue placeholder="Select agent type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="customer-support">Customer Support</SelectItem>
            <SelectItem value="technical-support">Technical Support</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="onboarding">Onboarding</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="system-prompt">System prompt</Label>
        <Textarea
          id="system-prompt"
          placeholder="You are a helpful customer support agent for [Company Name]. You help customers with their inquiries about our products and services."
          rows={6}
        />
        <p className="text-sm text-muted-foreground">
          This prompt defines your agent's personality, knowledge, and behavior.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="greeting-message">Greeting message</Label>
        <Textarea
          id="greeting-message"
          placeholder="Hello! I'm your [Company Name] support assistant. How can I help you today?"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fallback-message">Fallback message</Label>
        <Textarea
          id="fallback-message"
          placeholder="I'm sorry, but I don't have enough information to help with that. Would you like me to connect you with a human agent?"
          rows={3}
        />
      </div>
    </div>
  )
}
