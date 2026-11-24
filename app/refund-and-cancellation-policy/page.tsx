import LegalPageLayout from "@/components/LegalPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Marketing Tusk",
  description: "Refund and Cancellation Policy for Marketing Tusk.",
  alternates: {
    canonical: "/refund-and-cancellation-policy",
  },
  openGraph: {
    title: "Refund & Cancellation Policy | Marketing Tusk",
    description: "Refund and Cancellation Policy for Marketing Tusk.",
    url: "https://www.marketingtusk.com/refund-and-cancellation-policy",
    siteName: "Marketing Tusk",
    locale: "en_IN",
    type: "website",
  },
};

export default function RefundCancellationPolicyPage() {
  return <LegalPageLayout filename="refund-and-cancellation-policy.md" />;
}
