"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building, Upload } from "lucide-react"

export function CompanyProfileSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [companyData, setCompanyData] = useState({
    name: "Acme Inc",
    website: "https://acme.com",
    industry: "technology",
    size: "11-50",
    description: "We provide innovative solutions for businesses of all sizes.",
    logo: "",
    primaryColor: "#4f46e5",
    supportEmail: "support@acme.com",
  })

  const handleChange = (field: string, value: string) => {
    setCompanyData({
      ...companyData,
      [field]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Company profile updated",
        description: "Your company profile has been updated successfully.",
      })
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-2/3 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input
              id="company-name"
              value={companyData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-website">Website</Label>
            <Input
              id="company-website"
              type="url"
              value={companyData.website}
              onChange={(e) => handleChange("website", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company-industry">Industry</Label>
              <Select value={companyData.industry} onValueChange={(value) => handleChange("industry", value)}>
                <SelectTrigger id="company-industry">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-size">Company Size</Label>
              <Select value={companyData.size} onValueChange={(value) => handleChange("size", value)}>
                <SelectTrigger id="company-size">
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="501-1000">501-1000 employees</SelectItem>
                  <SelectItem value="1001+">1001+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-description">Company Description</Label>
            <Textarea
              id="company-description"
              rows={4}
              value={companyData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="support-email">Support Email</Label>
            <Input
              id="support-email"
              type="email"
              value={companyData.supportEmail}
              onChange={(e) => handleChange("supportEmail", e.target.value)}
            />
            <p className="text-sm text-muted-foreground">This email will be used for customer support inquiries.</p>
          </div>
        </div>

        <div className="md:w-1/3 space-y-6">
          <div className="space-y-2">
            <Label>Company Logo</Label>
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                {companyData.logo ? (
                  <AvatarImage src={companyData.logo || "/placeholder.svg"} alt="Company logo" />
                ) : (
                  <AvatarFallback className="text-2xl">
                    <Building className="h-12 w-12" />
                  </AvatarFallback>
                )}
              </Avatar>
              <Button type="button" variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload Logo
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Recommended size: 512x512px. Max file size: 2MB. Supported formats: PNG, JPG, SVG
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="primary-color">Brand Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                id="primary-color"
                value={companyData.primaryColor}
                onChange={(e) => handleChange("primaryColor", e.target.value)}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={companyData.primaryColor}
                onChange={(e) => handleChange("primaryColor", e.target.value)}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              This color will be used for branding in the customer-facing chat interface.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}
