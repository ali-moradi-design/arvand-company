import { SERVICES, ServiceCard } from "@/entities/service";

export function ServicesGrid() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {SERVICES.map((service) => (
        <li key={service.slug} className="flex">
          <ServiceCard service={service} />
        </li>
      ))}
    </ul>
  );
}
