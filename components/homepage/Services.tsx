"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  PresentationIcon as PresentationChart,
  Globe,
  Share2,
  Palette,
  Network,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Services() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const services = [
    {
      icon: PresentationChart,
      title: "Pitch Deck Design",
      description:
        "Compelling decks that drive investment and resonate with your target audience",
    },
    {
      icon: Globe,
      title: "Website Development",
      description:
        "Modern, user-friendly designs that create captivating online presence",
    },
    {
      icon: Share2,
      title: "Social Media Marketing",
      description:
        "Strategic brand engagement and audience building across platforms",
    },
    {
      icon: Palette,
      title: "Branding Services",
      description:
        "Complete brand identity solutions that establish strong market presence",
    },
    {
      icon: Users,
      title: "Investor Outreach",
      description:
        "Strategic connections with the right investors for your startup journey",
    },
    {
      icon: Network,
      title: "Ecosystem Enablement",
      description:
        "Access to accelerators, mentors, and industry experts across India",
    },
  ];

  const [servicesPerSlide, setServicesPerSlide] = useState(3);
  const totalSlides = Math.ceil(services.length / servicesPerSlide);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setServicesPerSlide(1); // mobile
      } else if (window.innerWidth < 1024) {
        setServicesPerSlide(2); // tablet
      } else {
        setServicesPerSlide(3); // desktop
      }
    };

    handleResize(); // initial run
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative">
      {/* Services Slider */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="w-full flex-shrink-0">
              <div
                className={`grid gap-6 px-4 ${
                  servicesPerSlide === 1
                    ? "grid-cols-1"
                    : servicesPerSlide === 2
                      ? "md:grid-cols-2"
                      : "lg:grid-cols-3"
                }`}
              >
                {services
                  .slice(
                    slideIndex * servicesPerSlide,
                    (slideIndex + 1) * servicesPerSlide,
                  )
                  .map((service, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-primary-blue-light"
                    >
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-primary-blue-light rounded-lg flex items-center justify-center mb-3 mx-auto transition-transform hover:scale-110">
                          <service.icon className="h-6 w-6 text-primary-blue" />
                        </div>
                        <CardTitle className="text-lg text-foreground">
                          {service.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm text-center">
                          {service.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background rounded-full p-2 shadow-lg hover:bg-primary-blue-light transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-primary-blue" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background rounded-full p-2 shadow-lg hover:bg-primary-blue-light transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-primary-blue" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide
                ? "bg-primary-blue"
                : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
