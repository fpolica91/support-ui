// Database schema for the multi-tenant customer service platform

export interface Tenant {
  id: string
  name: string
  domain: string
  createdAt: Date
  updatedAt: Date
  plan: "starter" | "professional" | "enterprise"
  status: "active" | "inactive" | "suspended"
  settings: TenantSettings
}

export interface TenantSettings {
  branding: {
    logo?: string
    primaryColor?: string
    secondaryColor?: string
  }
  features: {
    maxAgents: number
    maxApiEndpoints: number
    maxConversations: number
    allowHumanHandoff: boolean
  }
}

export interface User {
  id: string
  tenantId: string
  email: string
  name: string
  role: "admin" | "agent" | "viewer"
  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date
  status: "active" | "inactive"
}

export interface Agent {
  id: string
  tenantId: string
  name: string
  description?: string
  systemPrompt: string
  greetingMessage?: string
  fallbackMessage?: string
  createdAt: Date
  updatedAt: Date
  createdBy: string // userId
  status: "active" | "inactive"
  category?: string
}

export interface ApiEndpoint {
  id: string
  tenantId: string
  name: string
  url: string
  method: "GET" | "POST" | "PUT" | "DELETE"
  description?: string
  headers?: Record<string, string>
  parameters?: ApiEndpointParameter[]
  createdAt: Date
  updatedAt: Date
  createdBy: string // userId
  status: "active" | "inactive"
  category?: string
  authType?: "none" | "api_key" | "oauth" | "basic"
}

export interface ApiEndpointParameter {
  id: string
  apiEndpointId: string
  name: string
  description?: string
  required: boolean
  type: "string" | "number" | "boolean" | "object" | "array"
  location: "path" | "query" | "header" | "body"
}

export interface AgentApiEndpoint {
  id: string
  agentId: string
  apiEndpointId: string
  createdAt: Date
}

export interface Conversation {
  id: string
  tenantId: string
  customerId?: string
  agentId?: string
  userId?: string // If handled by a human agent
  status: "active" | "closed" | "waiting"
  createdAt: Date
  updatedAt: Date
  closedAt?: Date
  metadata?: Record<string, any>
}

export interface Message {
  id: string
  conversationId: string
  content: string
  role: "user" | "assistant" | "system"
  createdAt: Date
  metadata?: {
    apiCalls?: {
      endpointId: string
      request: any
      response: any
      timestamp: Date
    }[]
  }
}

export interface Customer {
  id: string
  tenantId: string
  email?: string
  name?: string
  createdAt: Date
  updatedAt: Date
  metadata?: Record<string, any>
}

export interface ApiCallLog {
  id: string
  tenantId: string
  apiEndpointId: string
  conversationId?: string
  messageId?: string
  request: any
  response: any
  statusCode: number
  duration: number // in milliseconds
  createdAt: Date
  error?: string
}
