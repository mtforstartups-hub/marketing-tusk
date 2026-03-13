"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Users,
  Building2,
  TrendingUp,
  Menu,
  X,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  MessageCircle,
  Loader2,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    // Founder specific fields
    fundingStage: "",
    teamSize: "",
    industry: "",
    // Investor specific fields
    investmentRange: "",
    investmentStage: "",
    sectorsOfInterest: "",
    // Enabler specific fields
    organizationType: "",
    programType: "",
    supportServices: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole, ...formData }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Message sent successfully!", {
          description: "We'll get back to you within 24 hours.",
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
          fundingStage: "",
          teamSize: "",
          industry: "",
          investmentRange: "",
          investmentStage: "",
          sectorsOfInterest: "",
          organizationType: "",
          programType: "",
          supportServices: "",
        })
        setSelectedRole("")
      } else {
        toast.error(data.error || "Failed to send message")
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderRoleSpecificFields = () => {
    switch (selectedRole) {
      case "founder":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="fundingStage">Current Funding Stage</Label>
              <Select onValueChange={(value) => handleInputChange("fundingStage", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select funding stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                  <SelectItem value="seed">Seed</SelectItem>
                  <SelectItem value="series-a">Series A</SelectItem>
                  <SelectItem value="series-b">Series B</SelectItem>
                  <SelectItem value="series-c">Series C+</SelectItem>
                  <SelectItem value="bootstrapped">Bootstrapped</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="teamSize">Team Size</Label>
              <Select onValueChange={(value) => handleInputChange("teamSize", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1-5 members</SelectItem>
                  <SelectItem value="6-10">6-10 members</SelectItem>
                  <SelectItem value="11-25">11-25 members</SelectItem>
                  <SelectItem value="26-50">26-50 members</SelectItem>
                  <SelectItem value="50+">50+ members</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="industry">Industry/Sector</Label>
              <Select onValueChange={(value) => handleInputChange("industry", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fintech">FinTech</SelectItem>
                  <SelectItem value="healthtech">HealthTech</SelectItem>
                  <SelectItem value="edtech">EdTech</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="agritech">AgriTech</SelectItem>
                  <SelectItem value="cleantech">CleanTech</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case "investor":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="investmentRange">Investment Range</Label>
              <Select onValueChange={(value) => handleInputChange("investmentRange", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select investment range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-1l">Under ₹1 Lakh</SelectItem>
                  <SelectItem value="1l-5l">₹1-5 Lakhs</SelectItem>
                  <SelectItem value="5l-25l">₹5-25 Lakhs</SelectItem>
                  <SelectItem value="25l-1cr">₹25 Lakhs - ₹1 Crore</SelectItem>
                  <SelectItem value="1cr-5cr">₹1-5 Crores</SelectItem>
                  <SelectItem value="5cr+">₹5+ Crores</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="investmentStage">Preferred Investment Stage</Label>
              <Select onValueChange={(value) => handleInputChange("investmentStage", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select investment stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                  <SelectItem value="seed">Seed</SelectItem>
                  <SelectItem value="series-a">Series A</SelectItem>
                  <SelectItem value="series-b">Series B</SelectItem>
                  <SelectItem value="growth">Growth Stage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sectorsOfInterest">Sectors of Interest</Label>
              <Input
                id="sectorsOfInterest"
                placeholder="e.g., FinTech, HealthTech, SaaS"
                value={formData.sectorsOfInterest}
                onChange={(e) => handleInputChange("sectorsOfInterest", e.target.value)}
              />
            </div>
          </div>
        )

      case "enabler":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="organizationType">Organization Type</Label>
              <Select onValueChange={(value) => handleInputChange("organizationType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select organization type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="accelerator">Accelerator</SelectItem>
                  <SelectItem value="incubator">Incubator</SelectItem>
                  <SelectItem value="vc-fund">VC Fund</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="government">Government Body</SelectItem>
                  <SelectItem value="ngo">NGO/Non-Profit</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="programType">Program Type</Label>
              <Select onValueChange={(value) => handleInputChange("programType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select program type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acceleration">Acceleration Program</SelectItem>
                  <SelectItem value="incubation">Incubation Program</SelectItem>
                  <SelectItem value="mentorship">Mentorship Program</SelectItem>
                  <SelectItem value="funding">Funding Program</SelectItem>
                  <SelectItem value="skills">Skills Development</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="supportServices">Support Services Needed</Label>
              <Input
                id="supportServices"
                placeholder="e.g., Marketing, Branding, Outreach"
                value={formData.supportServices}
                onChange={(e) => handleInputChange("supportServices", e.target.value)}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>


      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary-light">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary-blue-light text-primary-blue hover:bg-primary-blue-light">
            Let's Connect
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Ready to <span className="text-primary-blue">Connect</span>?
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Whether you're a founder looking to scale, an investor seeking opportunities, or an enabler wanting to
            expand your reach, we're here to help you succeed.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-primary-blue-light">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Get in Touch</CardTitle>
                  <p className="text-muted-foreground">
                    Tell us about yourself and how we can help accelerate your growth.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    {/* Role Selection */}
                    <div>
                      <Label htmlFor="role">What best describes you? *</Label>
                      <Select onValueChange={setSelectedRole} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="founder">Founder/Entrepreneur</SelectItem>
                          <SelectItem value="investor">Investor/VC</SelectItem>
                          <SelectItem value="enabler">Enabler/Accelerator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Role-specific fields */}
                    {selectedRole && (
                      <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Additional Information</h3>
                        {renderRoleSpecificFields()}
                      </div>
                    )}

                    {/* Message */}
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us about your goals and how we can help..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary-blue hover:bg-primary-blue-dark transform hover:scale-105 transition-all"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Let's Start a Conversation</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We're passionate about helping startups, investors, and enablers succeed in the Indian ecosystem.
                  Reach out to us and let's discuss how we can accelerate your growth together.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="flex items-center space-x-4 p-6">
                    <div className="w-12 h-12 bg-primary-blue-light rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email Us</h3>
                      <p className="text-muted-foreground">pranav@marketingtusk.com</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="flex items-center space-x-4 p-6">
                    <div className="w-12 h-12 bg-primary-blue-light rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Call Us</h3>
                      <p className="text-muted-foreground">+91 70111 70693</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="flex items-center space-x-4 p-6">
                    <div className="w-12 h-12 bg-primary-blue-light rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Location</h3>
                      <p className="text-muted-foreground">Bangalore, India</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="flex items-center space-x-4 p-6">
                    <div className="w-12 h-12 bg-primary-blue-light rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Response Time</h3>
                      <p className="text-muted-foreground">Within 24 hours</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Why Choose Us */}
              <div className="bg-gradient-primary-light p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-4">Why Choose Marketing Tusk?</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-primary-blue" />
                    <span className="text-muted-foreground">500+ Startups Supported</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-5 w-5 text-primary-blue" />
                    <span className="text-muted-foreground">Pan-India Network</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-primary-blue" />
                    <span className="text-muted-foreground">95% Success Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  )
}
