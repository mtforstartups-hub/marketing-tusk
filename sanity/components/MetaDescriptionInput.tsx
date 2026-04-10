"use client";

import React, { useCallback } from "react";
import { set, unset } from "sanity";
import type { StringInputProps } from "sanity";
import { useFormValue } from "sanity";
import type { PortableTextBlock } from "@portabletext/types";

// ---------------------------------------------------------------------------
// Constants & helpers
// ---------------------------------------------------------------------------

const CTA_KEYWORDS = [
  "learn how",
  "get the guide",
  "read more",
  "discover",
  "find out",
  "explore",
  "start now",
  "see how",
  "check out",
  "get started",
];

const MIN_OK = 120;
const SWEET_SPOT = 155;
const MAX_OK = 170;

type Status = "empty" | "short" | "ok" | "warning" | "error";

function getStatus(len: number): Status {
  if (len === 0) return "empty";
  if (len < MIN_OK) return "short";
  if (len <= SWEET_SPOT) return "ok";
  if (len <= MAX_OK) return "warning";
  return "error";
}

const STATUS_CONFIG: Record<
  Status,
  { bar: string; text: string; emoji: string; message: string }
> = {
  empty: {
    bar: "#e2e8f0",
    text: "#94a3b8",
    emoji: "✏️",
    message: "Start typing your meta description…",
  },
  short: {
    bar: "#f59e0b",
    text: "#b45309",
    emoji: "⚠️",
    message: `Too short — aim for ${MIN_OK}–${MAX_OK} characters.`,
  },
  ok: {
    bar: "#22c55e",
    text: "#15803d",
    emoji: "✅",
    message: `Sweet spot! (${MIN_OK}–${SWEET_SPOT} chars) Google will show the full description.`,
  },
  warning: {
    bar: "#f97316",
    text: "#c2410c",
    emoji: "⚠️",
    message: `Getting long — may be truncated by Google (${MIN_OK + 1}–${MAX_OK} chars).`,
  },
  error: {
    bar: "#ef4444",
    text: "#dc2626",
    emoji: "❌",
    message: `Too long — will very likely be cut off in search results (> ${MAX_OK} chars).`,
  },
};

function hasCta(value: string): boolean {
  const lower = value.toLowerCase();
  return CTA_KEYWORDS.some((kw) => lower.includes(kw));
}

/** Extract plain text from Portable Text blocks */
function extractBodyText(body: PortableTextBlock[]): string {
  return body
    .filter((b) => b._type === "block" && Array.isArray(b.children))
    .map((b) =>
      (b.children as Array<{ text?: string }>)
        .map((c) => c.text ?? "")
        .join(""),
    )
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function MetaDescriptionInput(props: StringInputProps) {
  const { value = "", onChange, elementProps } = props;

  // Read sibling fields from the document context
  const title = useFormValue(["title"]) as string | undefined;
  const body = useFormValue(["body"]) as PortableTextBlock[] | undefined;

  const len = value.length;
  const status = getStatus(len);
  const cfg = STATUS_CONFIG[status];
  const barPct = Math.min((len / MAX_OK) * 100, 100);
  const ctaPresent = len > 0 && hasCta(value);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const next = e.target.value;
      onChange(next ? set(next) : unset());
    },
    [onChange],
  );

  const handleGenerate = useCallback(() => {
    const titlePart = title?.trim() ?? "";
    const bodyText = body ? extractBodyText(body) : "";

    // Build description: "Title — first sentence/words of body" trimmed to 155
    let draft = titlePart;
    if (bodyText) {
      // Try to grab the first sentence
      const firstSentence = bodyText.split(/[.!?]/)[0]?.trim();
      const payload = firstSentence || bodyText;
      const combined = draft ? `${draft} — ${payload}` : payload;
      draft =
        combined.length <= SWEET_SPOT
          ? combined
          : combined.substring(0, SWEET_SPOT - 1) + "…";
    } else if (draft.length < SWEET_SPOT) {
      draft = draft + " — Read more on Marketing Tusk.";
      if (draft.length > SWEET_SPOT)
        draft = draft.substring(0, SWEET_SPOT - 1) + "…";
    }

    onChange(draft ? set(draft) : unset());
  }, [title, body, onChange]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {/* Textarea + Generate button row */}
      <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
        <textarea
          {...elementProps}
          value={value}
          onChange={handleChange}
          rows={3}
          maxLength={200}
          placeholder="e.g. Learn how to craft a winning go-to-market strategy that attracts customers and drives revenue from day one."
          style={{
            flex: 1,
            padding: "10px 12px",
            fontSize: "14px",
            lineHeight: "1.5",
            borderRadius: "4px",
            border: "1px solid #cbd5e1",
            resize: "vertical",
            fontFamily: "inherit",
            color: "#1e293b",
            background: "#fff",
            outline: "none",
            boxSizing: "border-box",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#3b82f6";
            e.currentTarget.style.boxShadow = "0 0 0 1px #3b82f6";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#cbd5e1";
            e.currentTarget.style.boxShadow = "none";
          }}
        />

        <button
          type="button"
          onClick={handleGenerate}
          disabled={!title && !body}
          title={
            !title && !body
              ? "Fill in the Title (and optionally Body) first"
              : "Auto-generate a meta description from title + body"
          }
          style={{
            padding: "8px 14px",
            fontSize: "12px",
            fontWeight: 600,
            borderRadius: "4px",
            border: "1px solid #e2e8f0",
            background: !title && !body ? "#f1f5f9" : "#0f172a",
            color: !title && !body ? "#94a3b8" : "#f8fafc",
            cursor: !title && !body ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
            lineHeight: "1.4",
            transition: "background 0.15s",
            flexShrink: 0,
            marginTop: "1px",
          }}
          onMouseEnter={(e) => {
            if (title || body)
              (e.currentTarget as HTMLButtonElement).style.background =
                "#1e3a5f";
          }}
          onMouseLeave={(e) => {
            if (title || body)
              (e.currentTarget as HTMLButtonElement).style.background =
                "#0f172a";
          }}
        >
          ✨ Generate
        </button>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: "5px",
          borderRadius: "99px",
          background: "#e2e8f0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${barPct}%`,
            background: cfg.bar,
            borderRadius: "99px",
            transition: "width 0.2s, background 0.2s",
          }}
        />
      </div>

      {/* Counter + status message row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "4px",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            color: cfg.text,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <span>{cfg.emoji}</span>
          <span>{cfg.message}</span>
        </span>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: cfg.text,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {len} / {SWEET_SPOT}
        </span>
      </div>

      {/* CTA nudge — only when text is present and no CTA found */}
      {len >= MIN_OK && !ctaPresent && (
        <div
          style={{
            fontSize: "12px",
            color: "#7c3aed",
            background: "#f5f3ff",
            border: "1px solid #ddd6fe",
            borderRadius: "4px",
            padding: "6px 10px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>💡</span>
          <span>
            <strong>CTA tip:</strong> Consider adding a call-to-action like{" "}
            <em>"Learn how"</em>, <em>"Discover"</em>, or <em>"Read more"</em>{" "}
            to improve click-through rate.
          </span>
        </div>
      )}

      {/* SEO checklist — always visible as subtle guide */}
      <details
        style={{
          fontSize: "12px",
          color: "#64748b",
          borderTop: "1px dashed #e2e8f0",
          paddingTop: "6px",
          marginTop: "2px",
        }}
      >
        <summary
          style={{
            cursor: "pointer",
            fontWeight: 600,
            userSelect: "none",
            listStyle: "none",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          📋 SEO Best Practices
        </summary>
        <ul
          style={{
            marginTop: "6px",
            paddingLeft: "16px",
            lineHeight: "1.8",
            listStyleType: "disc",
          }}
        >
          <li>
            <strong>120–160 chars</strong> — optimal length; 155 is the sweet
            spot
          </li>
          <li>
            <strong>&gt; 170 chars</strong> — likely truncated by Google
          </li>
          <li>
            <strong>Include your target keyword</strong> early in the
            description
          </li>
          <li>
            <strong>Add a CTA</strong> — "Learn how", "Get the guide", "Read
            more"…
          </li>
          <li>
            <strong>Be unique</strong> — every post needs its own distinct
            description
          </li>
        </ul>
      </details>
    </div>
  );
}
