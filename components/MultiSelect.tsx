"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  name: string;
  options: Option[];
  placeholder?: string;
  error?: string;
}

/**
 * Renders a multi-select dropdown that lets users select or deselect multiple options and emits hidden inputs for form submission.
 *
 * The toggle button shows either the placeholder or the labels of selected options and a listbox is shown when open. Clicking outside closes the list; each selected value is output as a hidden input with the provided `name`.
 *
 * @param name - The name attribute used for each generated hidden input so selections are included in form submissions
 * @param options - Array of selectable options, each with a `value` and `label`
 * @param placeholder - Text shown in the button when no options are selected (defaults to `"Select options"`)
 * @param error - Optional error message rendered beneath the control
 * @returns The MultiSelect React element
 */
export function MultiSelect({
  name,
  options,
  placeholder = "Select options",
  error,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const displayText =
    selected.length === 0
      ? placeholder
      : options
          .filter((o) => selected.includes(o.value))
          .map((o) => o.label)
          .join(", ");

  return (
    <div ref={ref} className="relative">
      {selected.map((v) => (
        <input key={v} type="hidden" name={name} value={v} />
      ))}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring"
      >
        <span className={selected.length === 0 ? "text-muted-foreground" : ""}>
          {displayText}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50 shrink-0 ml-2" />
      </button>

      {open && (
        <div role="listbox" className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md">
          {options.map((option) => (
            <div
              key={option.value}
              role="option"
              aria-selected={selected.includes(option.value)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(option.value);
                }
              }}
              onClick={() => toggle(option.value)}
              className="flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
            >
              {option.label}
              {selected.includes(option.value) && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
