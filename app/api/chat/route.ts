import { NextResponse } from "next/server"
import { streamAgentResponse } from "@/lib/ai-agent"
import { AssistantResponse } from "ai"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { agentId, message, conversationId } = await request.json()

    // In a real implementation, you would:
    // 1. Authenticate the request
    // 2. Get the tenant ID from the authenticated user
    // 3. Verify the agent belongs to the tenant
    // 4. Retrieve the agent configuration from the database
    // 5. Retrieve the conversation history from the database

    // Mock agent configuration
    const agentConfig = {
      id: agentId || "1",
      name: "Customer Support Agent",
      systemPrompt:
        "You are a helpful customer support agent for our company. You help customers with their inquiries about our products and services.",
      apiEndpoints: [
        {
          id: "1",
          name: "Get Customer Details",
          url: "https://api.example.com/customers/{id}",
          method: "GET",
          description: "Retrieves detailed information about a customer",
        },
        {
          id: "2",
          name: "Get Order History",
          url: "https://api.example.com/customers/{id}/orders",
          method: "GET",
          description: "Retrieves the order history for a customer",
        },
      ],
    }

    // Mock conversation history
    const conversationHistory = []

    // Stream the response
    return AssistantResponse({ agentId, conversationId }, async ({ forwardStream }) => {
      const stream = streamAgentResponse({
        agentConfig,
        message,
        conversationHistory,
        onChunk: () => {},
      })

      await forwardStream(stream)
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 })
  }
}
