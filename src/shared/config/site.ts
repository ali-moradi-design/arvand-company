// The address the site is served from, without a trailing slash. It resolves
// the canonical link, the language alternates and the social sharing image.
// NEXT_PUBLIC_* values are inlined at build time, so a change needs a rebuild.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3030"
).replace(/\/+$/, "");

// Where the contact form posts. Empty means the form falls back to `mailto:`.
// The request and response format is described in docs/form-endpoint.md.
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";

// How long the form waits for the endpoint before it reports a timeout.
export const FORM_TIMEOUT_MS = Number(process.env.NEXT_PUBLIC_FORM_TIMEOUT_MS) || 10_000;

export const CONTACT = {
  email: "hello@arvand-partners.example",
  phone: "+90 212 000 00 00",
} as const;
