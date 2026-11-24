"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import subscribeNewsletter, {
  NewsletterFormState,
} from "@/app/newsletter-actions";

const initialState: NewsletterFormState = {
  success: false,
  message: "",
  errors: {},
};

type NewsletterFormProps = {
  /** "inline" = horizontal, for the blog index. "stacked" = card layout. */
  variant?: "inline" | "stacked";
  /** Recorded in the sheet so you can tell which page produced the signup. */
  source?: string;
  placeholder?: string;
  buttonLabel?: string;
};

export default function NewsletterForm({
  variant = "inline",
  source = "unknown",
  placeholder = "Enter your email",
  buttonLabel = "Subscribe",
}: NewsletterFormProps) {
  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    initialState,
  );

  const isStacked = variant === "stacked";

  const messageColor = isStacked
    ? state.success
      ? "text-white"
      : "text-red-200"
    : state.success
      ? "text-green-600"
      : "text-red-500";

  return (
    <form action={formAction} className="w-full">
      <input type="hidden" name="source" value={source} />

      {/* Honeypot — hidden from humans, tempting for naive bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div
        className={
          isStacked
            ? "space-y-3"
            : "flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
        }
      >
        <Input
          type="email"
          name="email"
          required
          placeholder={placeholder}
          aria-label="Email address"
          className={
            isStacked
              ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-1 focus-visible:ring-white h-11"
              : "bg-white/95 text-gray-900 border-0 focus-visible:ring-2 focus-visible:ring-white"
          }
        />
        <Button
          type="submit"
          disabled={pending}
          className={
            isStacked
              ? "w-full bg-white text-primary-blue hover:bg-gray-50 h-11 font-semibold"
              : "bg-white text-primary-blue hover:bg-gray-100 font-semibold shadow-lg hover:shadow-xl transition-all shrink-0"
          }
        >
          {pending ? "Subscribing..." : buttonLabel}
        </Button>
      </div>

      {state.message && (
        <p
          role="status"
          className={`text-sm mt-3 ${isStacked ? "" : "text-center"} ${messageColor}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
