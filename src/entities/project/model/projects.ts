export const SECTORS = [
  "logistics",
  "real-estate",
  "industry",
  "infrastructure",
] as const;
export type Sector = (typeof SECTORS)[number];

export const PROJECTS = [
  {
    slug: "marmara-logistics-hub",
    image: "/images/projects/marmara-logistics-hub.webp",
    sector: "logistics",
    year: 2025,
  },
  {
    slug: "levant-office-campus",
    image: "/images/projects/levant-office-campus.webp",
    sector: "real-estate",
    year: 2024,
  },
  {
    slug: "harbor-terminal-expansion",
    image: "/images/projects/harbor-terminal-expansion.webp",
    sector: "infrastructure",
    year: 2024,
  },
  {
    slug: "city-centre-tower",
    image: "/images/projects/city-centre-tower.webp",
    sector: "real-estate",
    year: 2023,
  },
  {
    slug: "riverside-residences",
    image: "/images/projects/riverside-residences.webp",
    sector: "real-estate",
    year: 2022,
  },
  {
    slug: "steelworks-modernization",
    image: "/images/projects/steelworks-modernization.webp",
    sector: "industry",
    year: 2022,
  },
] as const satisfies ReadonlyArray<{
  slug: string;
  image: string;
  sector: Sector;
  year: number;
}>;

export type Project = (typeof PROJECTS)[number];
export type ProjectSlug = Project["slug"];
