import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StatusBadge } from "@/components/StatusBadge";
import { KeyFacts } from "@/components/KeyFacts";
import { ArticleCard } from "@/components/ArticleCard";
import { UpdateCard } from "@/components/UpdateCard";
import { SectionHeading } from "@/components/SectionHeading";
import { CTA } from "@/components/CTA";
import {
  getAllProjects,
  getProjectBySlug,
  getArticlesByProject,
  getUpdatesByProject,
} from "@/lib/content";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline + " — " + project.overview.slice(0, 140) + "…",
    openGraph: {
      title: project.name,
      description: project.tagline,
      images: [{ url: project.coverImage }],
    },
    alternates: { canonical: `/du-an/${project.slug}/` },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const articles = getArticlesByProject(project.slug);
  const updates = getUpdatesByProject(project.slug);
  const paragraphs = project.overview.trim().split(/\n\n+/);

  return (
    <>
      <div className="relative h-64 w-full sm:h-80 lg:h-96">
        <Image
          src={project.coverImage}
          alt={project.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hero-from/90 via-hero-from/40 to-transparent" />
        <Container className="absolute inset-x-0 bottom-0 pb-8">
          <StatusBadge status={project.status} label={project.statusLabel} />
          <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-2 max-w-2xl text-white/80">{project.tagline}</p>
          <p className="mt-1 text-sm text-accent">{project.location}</p>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <Breadcrumb
          items={[
            { label: "Dự án", href: "/du-an/" },
            { label: project.shortName },
          ]}
        />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <SectionHeading eyebrow="Tổng quan" title={`Giới thiệu ${project.shortName}`} />
            <div className="prose-vn mt-6">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <h3 className="mt-10 font-display text-2xl font-bold">Điểm nổi bật</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    ✓
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6">
            <div>
              <h3 className="mb-4 font-display text-xl font-bold">Thông tin nhanh</h3>
              <KeyFacts facts={project.facts} />
            </div>
            <div className="rounded-2xl border border-accent/30 bg-accent-soft p-5 text-sm leading-relaxed text-foreground/80">
              <p className="font-semibold text-accent-dark">Lưu ý</p>
              <p className="mt-2">
                Thông tin mang tính tổng hợp độc lập, không phải công bố chính thức
                của Vinhomes/VinGroup. Hãy xác minh trước khi giao dịch.
              </p>
            </div>
          </aside>
        </div>

        {project.gallery.length > 0 ? (
          <div className="mt-16">
            <SectionHeading eyebrow="Hình ảnh" title="Không gian & cảm hứng" />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {project.gallery.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={src}
                    alt={`${project.name} — ảnh ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {articles.length > 0 ? (
          <div className="mt-16">
            <div className="mb-8 flex items-end justify-between gap-4">
              <SectionHeading eyebrow="Bài viết" title={`Bài viết về ${project.shortName}`} />
              <Link href="/bai-viet/" className="text-sm font-semibold text-primary hover:underline">
                Tất cả →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        ) : null}

        {updates.length > 0 ? (
          <div className="mt-16">
            <SectionHeading eyebrow="Cập nhật" title="Tin & diễn biến gần đây" />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {updates.map((u) => (
                <UpdateCard key={u.slug} update={u} />
              ))}
            </div>
          </div>
        ) : null}
      </Container>

      <CTA
        title={`Quan tâm ${project.shortName}?`}
        description="Đọc thêm bài viết liên quan hoặc gửi liên hệ để nhận hướng dẫn thông tin độc lập."
      />
    </>
  );
}
