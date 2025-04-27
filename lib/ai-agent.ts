import { generateText, streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface AgentConfig {
  id: string
  name: string
  systemPrompt: string
  apiEndpoints: ApiEndpoint[]
}

export interface ApiEndpoint {
  id: string
  name: string
  url: string
  method: string
  description: string
}

export async function callAgent({
  agentConfig,
  message,
  conversationHistory = [],
}: {
  agentConfig: AgentConfig
  message: string
  conversationHistory?: { role: "user" | "assistant"; content: string }[]
}) {
  // Construct the prompt with conversation history
  const historyPrompt = conversationHistory
    .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
    .join("\n")

  // Add API endpoint information to the system prompt
  const apiEndpointsInfo = agentConfig.apiEndpoints
    .map((endpoint) => `- ${endpoint.name}: ${endpoint.method} ${endpoint.url}\n  Description: ${endpoint.description}`)
    .join("\n")

  const enhancedSystemPrompt = `${agentConfig.systemPrompt}

Available API Endpoints:
${apiEndpointsInfo}

When you need to access data from these endpoints, indicate which endpoint you would use and what parameters you would need.`

  // Generate the response
  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: enhancedSystemPrompt,
    prompt: historyPrompt ? `${historyPrompt}\nUser: ${message}` : message,
  })

  return text
}

export function streamAgentResponse({
  agentConfig,
  message,
  conversationHistory = [],
  onChunk,
}: {
  agentConfig: AgentConfig
  message: string
  conversationHistory?: { role: "user" | "assistant"; content: string }[]
  onChunk: (chunk: string) => void
}) {
  // Construct the prompt with conversation history
  const historyPrompt = conversationHistory
    .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
    .join("\n")

  // Add API endpoint information to the system prompt
  const apiEndpointsInfo = agentConfig.apiEndpoints
    .map((endpoint) => `- ${endpoint.name}: ${endpoint.method} ${endpoint.url}\n  Description: ${endpoint.description}`)
    .join("\n")

  const enhancedSystemPrompt = `${agentConfig.systemPrompt}

Available API Endpoints:
${apiEndpointsInfo}

When you need to access data from these endpoints, indicate which endpoint you would use and what parameters you would need.`

  // Stream the response
  return streamText({
    model: openai("gpt-4o"),
    system: enhancedSystemPrompt,
    prompt: historyPrompt ? `${historyPrompt}\nUser: ${message}` : message,
    onChunk: ({ chunk }) => {
      if (chunk.type === "text-delta") {
        onChunk(chunk.text)
      }
    },
  })
}
