export const PEOPLE = [
  { id: "leyla-karimi", tone: "bg-primary text-primary-foreground" },
  { id: "omar-haddad", tone: "bg-teal text-background" },
  { id: "selin-aydin", tone: "bg-copper text-copper-foreground" },
  { id: "daniel-reza", tone: "bg-sand text-foreground" },
  { id: "nour-almasri", tone: "bg-primary text-primary-foreground" },
  { id: "kaveh-rahimi", tone: "bg-teal text-background" },
] as const;

export type Person = (typeof PEOPLE)[number];
