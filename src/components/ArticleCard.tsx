import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/content";
import { getProjectBySlug } from "@/lib/content";
import { formatDateVI } from "@/lib/utils";

export function ArticleCard({
  article,
  compact = false,
}: {
  article: Article;
  compact?: boolean;
}) {
  const project = getProjectBySlug(article.projectSlug);

  if (compact) {
    return (
      <Link
        href={`/bai-viet/${article.slug}/`}
        className="group flex gap-4 rounded-xl border border-border bg-card p-3 transition hover:border-primary/30 hover:shadow-md"
      >
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={article.coverImage}
            alt=""
            fill
            className="object-cover"
            sizes="112px"
          />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted">
            {formatDateVI(article.publishedAt)}
            {project ? ` · ${project.shortName}` : ""}
          </p>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-foreground group-hover:text-primary">
            {article.title}
          </h3>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/bai-viet/${article.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <time dateTime={article.publishedAt}>
            {formatDateVI(article.publishedAt)}
          </time>
          <span>·</span>
          <span>{article.readingMinutes} phút đọc</span>
          {project ? (
            <>
              <span>·</span>
              <span className="font-medium text-primary">{project.shortName}</span>
            </>
          ) : null}
        </div>
        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-foreground group-hover:text-primary">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
          {article.excerpt}
        </p>
        <p className="mt-4 text-sm font-semibold text-primary">Đọc bài viết →</p>
      </div>
    </Link>
  );
}
