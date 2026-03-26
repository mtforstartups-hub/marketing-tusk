"use client";

import { useState } from "react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: " What makes your startup marketing agency different?",
      answer:
        "We focus specifically on startups and SMEs, offering growth-driven strategies, branding, and performance marketing under one roof.",
    },
    {
      question: " Do you provide marketing strategy consulting services?",
      answer:
        "Yes, we offer data-driven marketing strategy consulting to help businesses scale efficiently and improve ROI.",
    },
    {
      question: " How experienced is your team?",
      answer:
        "Our team consists of experienced marketers, strategists, designers, and content experts who specialize in startup growth.",
    },
    {
      question: " Do you work with international clients?",
      answer:
        "Yes, we work with both Indian and global clients across multiple industries including SaaS, ecommerce, and B2B.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about our services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-foreground">
                  {faq.question}
                </h3>
                <span className="text-xl font-bold">
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40 mt-3" : "max-h-0"
                }`}
              >
                <p className="text-muted-foreground text-sm">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}