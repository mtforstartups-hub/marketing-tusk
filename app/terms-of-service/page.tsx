import LegalPageLayout from "@/components/LegalPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Marketing Tusk",
  description: "Terms of Service for Marketing Tusk.",
  alternates: {
    canonical: "/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | Marketing Tusk",
    description: "Terms of Service for Marketing Tusk.",
    url: "https://www.marketingtusk.com/terms-of-service",
    siteName: "Marketing Tusk",
    locale: "en_IN",
    type: "website",
  },
};

export default function TermsOfServicePage() {
  return <LegalPageLayout filename="terms-of-service.md" />;
}
