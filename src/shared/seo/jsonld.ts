import { CONTACT, SITE_URL } from "../config";

export function organizationJsonLd(input: { name: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input.name,
    description: input.description,
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    email: CONTACT.email,
    telephone: CONTACT.phone,
  };
}
