import { PROJECTS, ProjectCard } from "@/entities/project";

export function ProjectsPreview({ limit = 3 }: { limit?: number }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {PROJECTS.slice(0, limit).map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
