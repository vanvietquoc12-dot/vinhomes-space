import Link from "next/link";
import type { Update } from "@/lib/content";
import { getProjectBySlug } from "@/lib/content";
import { formatDateVI } from "@/lib/utils";

export function UpdateCard({ update }: { update: Update }) {
  const project = getProjectBySlug(update.projectSlug);

  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/25 hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-accent-soft px-2.5 py-1 font-semibold text-accent-dark">
          {update.categoryLabel}
        </span>
        <time className="text-muted" dateTime={update.publishedAt}>
          {formatDateVI(update.publishedAt)}
        </time>
        {project ? (
          <Link
            href={`/du-an/${project.slug}/`}
            className="font-medium text-primary hover:underline"
          >
            {project.shortName}
          </Link>
        ) : null}
      </div>
      <h3 className="mt-3 font-display text-lg font-bold text-foreground">
        {update.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{update.summary}</p>
    </article>
  );
}
