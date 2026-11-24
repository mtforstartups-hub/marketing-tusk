import LegalPageLayout from "@/components/LegalPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Marketing Tusk",
  description: "Privacy Policy for Marketing Tusk.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Marketing Tusk",
    description: "Privacy Policy for Marketing Tusk.",
    url: "https://www.marketingtusk.com/privacy-policy",
    siteName: "Marketing Tusk",
    locale: "en_IN",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return <LegalPageLayout filename="privacy-policy.md" />;
}
