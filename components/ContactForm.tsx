"use client";

import React, { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import submitContactForm, { ContactFormState } from "@/app/actions";
import { MultiSelect } from "./MultiSelect";

const initialState: ContactFormState = {
  success: false,
  message: "",
  errors: {},
};

const FUNDING_STAGES = [
  { value: "pre-seed", label: "Pre-Seed" },
  { value: "seed", label: "Seed" },
  { value: "series-a", label: "Series A" },
  { value: "series-b", label: "Series B" },
  { value: "series-c", label: "Series C+" },
  { value: "bootstrapped", label: "Bootstrapped" },
];

const INVESTMENT_STAGES = [
  { value: "pre-seed", label: "Pre-Seed" },
  { value: "seed", label: "Seed" },
  { value: "series-a", label: "Series A" },
  { value: "series-b", label: "Series B" },
  { value: "growth", label: "Growth Stage" },
];

export default function ContactForm() {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );

  const renderRoleSpecificFields = () => {
    switch (selectedRole) {
      case "founder":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="fundingStage">
                Current Funding Stage (Choose Multiple) *
              </Label>
              {/* <Select name="fundingStage">
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
              </Select> */}
              <MultiSelect
                name="fundingStage"
                options={FUNDING_STAGES}
                placeholder="Select funding stage"
                error={state.errors?.fundingStage?.[0]}
              />
            </div>
            <div>
              <Label htmlFor="teamSize">Team Size *</Label>
              <Select name="teamSize">
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
              {state.errors?.teamSize && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.teamSize[0]}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="industry">Industry/Sector *</Label>
              <Select name="sector">
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
              {state.errors?.sector && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.sector[0]}
                </p>
              )}
            </div>
          </div>
        );

      case "investor":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="investmentRange">Investment Range *</Label>
              <Select name="investmentRange">
                <SelectTrigger>
                  <SelectValue placeholder="Select investment range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-1lakh">Under ₹1 Lakh</SelectItem>
                  <SelectItem value="1-5lakh">₹1-5 Lakhs</SelectItem>
                  <SelectItem value="5-25lakh">₹5-25 Lakhs</SelectItem>
                  <SelectItem value="25lakh-1cr">
                    ₹25 Lakhs - ₹1 Crore
                  </SelectItem>
                  <SelectItem value="1cr-5cr">₹1-5 Crores</SelectItem>
                  <SelectItem value="5cr+">₹5+ Crores</SelectItem>
                </SelectContent>
              </Select>
              {state.errors?.investmentRange && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.investmentRange[0]}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="investmentStage">
                Preferred Investment Stage *
              </Label>
              {/* <Select name="investmentStage">
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
              {state.errors?.investmentStage && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.investmentStage[0]}
                </p>
              )} */}
              <MultiSelect
                name="investmentStage"
                options={INVESTMENT_STAGES}
                placeholder="Select investment stage"
                error={state.errors?.investmentStage?.[0]}
              />
            </div>
            <div>
              <Label htmlFor="sectorsOfInterest">Sectors of Interest *</Label>
              <Input
                id="sectorsOfInterest"
                placeholder="e.g., FinTech, HealthTech, SaaS"
                name="sectorsOfInterest"
              />
              {state.errors?.sectorsOfInterest && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.sectorsOfInterest[0]}
                </p>
              )}
            </div>
          </div>
        );

      case "enabler":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="organizationType">Organization Type *</Label>
              <Select name="organizationType">
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
              {state.errors?.organizationType && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.organizationType[0]}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="programType">Program Type *</Label>
              <Select name="programType">
                <SelectTrigger>
                  <SelectValue placeholder="Select program type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acceleration">
                    Acceleration Program
                  </SelectItem>
                  <SelectItem value="incubation">Incubation Program</SelectItem>
                  <SelectItem value="mentorship">Mentorship Program</SelectItem>
                  <SelectItem value="funding">Funding Program</SelectItem>
                  <SelectItem value="skills">Skills Development</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {state.errors?.programType && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.programType[0]}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="supportServices">Support Services Needed *</Label>
              <Input
                id="supportServices"
                placeholder="e.g., Marketing, Branding, Outreach"
                name="supportServices"
              />
              {state.errors?.supportServices && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.supportServices[0]}
                </p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form action={formAction} className="space-y-6">
      {/* Basic Information */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" name="name" placeholder="Your full name" />
          {state.errors?.name && (
            <p className="text-sm text-red-500 mt-1">{state.errors.name[0]}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
          />
          {state.errors?.email && (
            <p className="text-sm text-red-500 mt-1">{state.errors.email[0]}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" placeholder="+91 98765 43210" />
          {state.errors?.phone && (
            <p className="text-sm text-red-500 mt-1">{state.errors.phone[0]}</p>
          )}
        </div>
        <div>
          <Label htmlFor="company">Company/Organization *</Label>
          <Input id="company" name="company" placeholder="Your company name" />
          {state.errors?.company && (
            <p className="text-sm text-red-500 mt-1">
              {state.errors.company[0]}
            </p>
          )}
        </div>
      </div>

      {/* Role Selection */}
      <div>
        <Label htmlFor="role">What best describes you? *</Label>
        <Select onValueChange={setSelectedRole} name="role">
          <SelectTrigger>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="founder">Founder/Entrepreneur</SelectItem>
            <SelectItem value="investor">Investor/VC</SelectItem>
            <SelectItem value="enabler">Enabler/Accelerator</SelectItem>
          </SelectContent>
        </Select>
        {state.errors?.role && (
          <p className="text-sm text-red-500 mt-1">{state.errors.role[0]}</p>
        )}
      </div>

      {/* Role-specific fields */}
      {selectedRole && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Additional Information
          </h3>
          {renderRoleSpecificFields()}
        </div>
      )}

      {/* Message */}
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your goals and how we can help..."
        />
        {state.errors?.message && (
          <p className="text-sm text-red-500 mt-1">{state.errors.message[0]}</p>
        )}
      </div>

      {/* Top Level Form Message (Success/Failure) */}
      {state.message && (
        <div
          className={`p-3 rounded-md ${
            state.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {state.message}
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-primary-blue hover:bg-primary-blue-dark transform hover:scale-105 transition-all"
        size="lg"
        disabled={pending}
      >
        {pending ? (
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
  );
}
