import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";
import { StatusBadge } from "./StatusBadge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/du-an/${project.slug}/`}
      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
          <StatusBadge status={project.status} label={project.statusLabel} />
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-accent-dark">
          {project.city}
        </p>
        <h3 className="mt-1 font-display text-xl font-bold text-foreground group-hover:text-primary">
          {project.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {project.tagline}
        </p>
        <p className="mt-4 text-sm font-semibold text-primary">
          Xem dự án →
        </p>
      </div>
    </Link>
  );
}
