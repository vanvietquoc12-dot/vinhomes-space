import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ArticleCard } from "@/components/ArticleCard";
import {
  getAllArticles,
  getArticleBySlug,
  getArticlesByProject,
  getProjectBySlug,
} from "@/lib/content";
import { formatDateVI } from "@/lib/utils";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      images: [{ url: article.coverImage }],
    },
    alternates: { canonical: `/bai-viet/${article.slug}/` },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const project = getProjectBySlug(article.projectSlug);
  const related = getArticlesByProject(article.projectSlug)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <article>
      <div className="relative h-56 w-full sm:h-72 lg:h-80">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hero-from/55" />
      </div>

      <Container className="relative -mt-16 pb-16 sm:-mt-20">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-10">
          <Breadcrumb
            items={[
              { label: "Bài viết", href: "/bai-viet/" },
              { label: article.title.slice(0, 48) + (article.title.length > 48 ? "…" : "") },
            ]}
          />
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <time dateTime={article.publishedAt}>
              {formatDateVI(article.publishedAt)}
            </time>
            <span>·</span>
            <span>{article.readingMinutes} phút đọc</span>
            {project ? (
              <>
                <span>·</span>
                <Link
                  href={`/du-an/${project.slug}/`}
                  className="font-semibold text-primary hover:underline"
                >
                  {project.name}
                </Link>
              </>
            ) : null}
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-muted">{article.excerpt}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="prose-vn mt-10 border-t border-border pt-8">
            {article.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-accent/25 bg-accent-soft/60 p-5 text-sm text-foreground/80">
            Bài viết thuộc chuyên mục thông tin độc lập trên Vinhomes Space — không
            phải thông cáo chính thức của chủ đầu tư.
          </div>
        </div>

        {related.length > 0 ? (
          <div className="mt-14">
            <h2 className="font-display text-2xl font-bold">Bài viết liên quan</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </article>
  );
}
