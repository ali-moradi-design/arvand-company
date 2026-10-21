export type ContactMessage = {
  name: string;
  email: string;
  company?: string;
  topic: string;
  message: string;
};

// Fallback used while no form endpoint is configured.
export function buildMailto(to: string, data: ContactMessage): string {
  const subject = `${data.topic} — ${data.name}`;
  const body = [
    data.message,
    "",
    `${data.name}${data.company ? `, ${data.company}` : ""}`,
    data.email,
  ].join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
