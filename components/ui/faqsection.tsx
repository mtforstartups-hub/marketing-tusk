"use client";

import { useState } from "react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What services does Marketing Tusk offer?",
      answer:
        "We provide pitch deck design, website development, branding, social media marketing, and investor outreach services.",
    },
    {
      question: "How long does a project take?",
      answer:
        "Timelines depend on the service. Pitch decks take 5–7 days, while websites take 2–3 weeks.",
    },
    {
      question: "Do you work with early-stage startups?",
      answer:
        "Yes, we specialize in helping early-stage startups, SMEs, and ecosystem enablers grow faster.",
    },
    {
      question: "How can I get started?",
      answer:
        "Simply click on 'Free Consultation' or contact us through the contact page.",
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