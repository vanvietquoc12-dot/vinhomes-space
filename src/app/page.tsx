import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ArticleCard } from "@/components/ArticleCard";
import { UpdateCard } from "@/components/UpdateCard";
import { CTA } from "@/components/CTA";
import {
  getFeaturedProjects,
  getRecentArticles,
  getRecentUpdates,
} from "@/lib/content";

export default function HomePage() {
  const projects = getFeaturedProjects();
  const articles = getRecentArticles(6);
  const updates = getRecentUpdates(4);

  return (
    <>
      <Hero />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Dự án nổi bật"
              title="Đại đô thị Vinhomes đáng theo dõi"
              description="Tổng quan độc lập về vị trí, tiện ích và định vị từng dự án."
            />
            <Link
              href="/du-an/"
              className="shrink-0 text-sm font-semibold text-primary hover:underline"
            >
              Xem tất cả dự án →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-primary-light/40 py-16 sm:py-20">
        <Container>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Bài viết mới"
              title="Phân tích & góc nhìn thị trường"
              description="Nội dung tiếng Việt, dễ đọc — phục vụ người mua ở thực và nhà đầu tư."
            />
            <Link
              href="/bai-viet/"
              className="shrink-0 text-sm font-semibold text-primary hover:underline"
            >
              Tất cả bài viết →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Cập nhật"
              title="Tin ngắn & diễn biến gần đây"
            />
            <Link
              href="/tin-tuc/"
              className="shrink-0 text-sm font-semibold text-primary hover:underline"
            >
              Xem tin tức →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {updates.map((u) => (
              <UpdateCard key={u.slug} update={u} />
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
