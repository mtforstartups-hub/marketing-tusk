import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ServicesCTAProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export default function ServicesCTA({
  title = "Ready to Accelerate Your Growth?",
  description = "Join hundreds of successful startups, SMEs, and ecosystem leaders who have transformed their journey with our comprehensive marketing, design, and tech services.",
  primaryButtonText = "Start Your Project Today",
  primaryButtonLink = "/contact",
  secondaryButtonText = "Schedule a Consultation",
  secondaryButtonLink = "/contact",
}: ServicesCTAProps) {
  return (
    <section className="py-20 bg-gradient-primary text-white relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {title}
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryButtonLink}>
            <Button
              size="lg"
              className="bg-white text-primary-blue hover:bg-gray-100 text-lg px-8 py-3 transform hover:scale-105 transition-all font-semibold"
            >
              {primaryButtonText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href={secondaryButtonLink}>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary-blue text-lg px-8 py-3 transform hover:scale-105 transition-all bg-transparent font-semibold"
            >
              {secondaryButtonText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
