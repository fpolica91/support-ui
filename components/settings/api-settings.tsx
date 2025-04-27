"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Copy, RefreshCw, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ApiSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  // Mock API key
  const [apiKey, setApiKey] = useState("sk_live_51NxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    toast({
      title: "API key copied",
      description: "The API key has been copied to your clipboard.",
    })
  }

  const handleRegenerateApiKey = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Generate a mock new API key
      const newApiKey =
        "sk_live_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      setApiKey(newApiKey)

      toast({
        title: "API key regenerated",
        description: "Your new API key has been generated. Make sure to update your applications.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">API Keys</h3>
        <p className="text-sm text-muted-foreground">Manage your API keys for integrating with our platform.</p>
      </div>

      <Alert>
        <AlertDescription>
          Your API keys grant access to your account and should be kept secure. Do not share your API keys in public
          repositories or client-side code.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">Live API Key</Label>
          <div className="flex">
            <div className="relative flex-1">
              <Input id="api-key" value={showApiKey ? apiKey : "•".repeat(apiKey.length)} readOnly className="pr-10" />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <Button type="button" variant="outline" onClick={handleCopyApiKey} className="ml-2">
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleRegenerateApiKey}
              disabled={isLoading}
              className="ml-2"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Use this key for production environments.</p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">API Documentation</h4>
        <p className="text-sm text-muted-foreground">
          Learn how to integrate with our API by reading our comprehensive documentation.
        </p>
        <Button variant="outline" asChild>
          <a href="/docs/api" target="_blank" rel="noopener noreferrer">
            View API Documentation
          </a>
        </Button>
      </div>
    </div>
  )
}
