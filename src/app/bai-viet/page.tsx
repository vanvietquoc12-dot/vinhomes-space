import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Bài viết",
  description:
    "Bài viết phân tích và tổng quan về các dự án Vinhomes — góc nhìn độc lập bằng tiếng Việt.",
  alternates: { canonical: "/bai-viet/" },
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumb items={[{ label: "Bài viết" }]} />
      <SectionHeading
        eyebrow="Nội dung"
        title="Bài viết & phân tích"
        description="Tổng hợp bài viết theo từng dự án — dễ mở rộng khi bạn thêm file trong thư mục content."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </Container>
  );
}
