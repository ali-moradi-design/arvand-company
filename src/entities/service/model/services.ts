export const SERVICES = [
  { slug: "project-management", image: "/images/services/project-management.webp" },
  { slug: "engineering-review", image: "/images/services/engineering.webp" },
  { slug: "feasibility-advisory", image: "/images/services/advisory.webp" },
  { slug: "logistics-planning", image: "/images/services/logistics.webp" },
] as const;

export type ServiceSlug = (typeof SERVICES)[number]["slug"];
export type Service = (typeof SERVICES)[number];
