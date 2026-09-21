import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Danh sách dự án Vinhomes",
  description:
    "Tổng hợp các dự án Vinhomes: Sài Gòn Park, Green Paradise, Grand Park, Ocean Park, Smart City, Central Park.",
  alternates: { canonical: "/du-an/" },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumb items={[{ label: "Dự án" }]} />
      <SectionHeading
        eyebrow="Dự án"
        title="Tất cả dự án đang theo dõi"
        description="Chọn dự án để xem tổng quan, thông số nổi bật, bài viết và cập nhật."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </Container>
  );
}
