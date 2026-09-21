import type { ProjectFact } from "@/lib/content";

export function KeyFacts({ facts }: { facts: ProjectFact[] }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {facts.map((f) => (
        <div
          key={f.label}
          className="rounded-2xl border border-border bg-card p-4 shadow-sm"
        >
          <dt className="text-xs font-semibold uppercase tracking-wider text-accent-dark">
            {f.label}
          </dt>
          <dd className="mt-1 text-base font-semibold text-foreground">
            {f.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
