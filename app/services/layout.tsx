import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growth Services & Solutions",
  description:
    "Explore our full suite of ecosystem growth services: pitch deck design, web development, social media marketing, branding, investor outreach, and ecosystem enablement.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Growth Services & Solutions | Marketing Tusk",
    description:
      "Explore our full suite of ecosystem growth services: pitch deck design, web development, social media marketing, branding, investor outreach, and ecosystem enablement.",
    url: "https://www.marketingtusk.com/services",
    siteName: "Marketing Tusk",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Marketing Tusk Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth Services & Solutions | Marketing Tusk",
    description:
      "Explore our full suite of ecosystem growth services: pitch deck design, web development, social media marketing, branding, investor outreach, and ecosystem enablement.",
    site: "@marketingtusk",
    creator: "@marketingtusk",
    images: ["/images/og-image.jpg"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
