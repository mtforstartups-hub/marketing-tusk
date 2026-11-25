/**
 * Normalises a service-account private key that arrived via an environment
 * variable.
 *
 * The same key reaches the app in several shapes depending on how it was
 * stored and transported: real newlines, escaped `\n`, doubly-escaped `\\n`,
 * CRLF, wrapping quotes, trailing whitespace. Every consumer must agree on the
 * result, otherwise one path signs requests while another fails with
 * "DECODER routines::unsupported".
 */
export function normalizePrivateKey(raw: string): string {
  let key = raw.trim();

  // Peel off any layers of wrapping quotes (a key pasted from a JSON file or
  // copied with the surrounding quotes intact).
  while (
    key.length >= 2 &&
    ((key.startsWith('"') && key.endsWith('"')) ||
      (key.startsWith("'") && key.endsWith("'")))
  ) {
    key = key.slice(1, -1).trim();
  }

  // Escaped line breaks, however many backslashes survived the round-trip.
  key = key
    .replace(/\\+r\\+n/g, "\n")
    .replace(/\\+n/g, "\n")
    .replace(/\\+r/g, "\n");

  // Real CRLF / CR -> LF.
  key = key.replace(/\r\n?/g, "\n");

  // Trailing spaces on a line break the base64 body just as badly as a wrong
  // character, and they are a common copy-paste artefact.
  key = key
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");

  if (!key.endsWith("\n")) key += "\n";

  return key;
}
