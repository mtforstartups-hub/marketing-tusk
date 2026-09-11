import LegalPageLayout from "@/components/LegalPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Marketing Tusk",
  description: "Refund and Cancellation Policy for Marketing Tusk.",
};

export default function RefundCancellationPolicyPage() {
  return <LegalPageLayout filename="refund-and-cancellation-policy.md" />;
}
