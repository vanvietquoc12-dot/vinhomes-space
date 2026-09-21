import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { UpdateCard } from "@/components/UpdateCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getAllUpdates } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tin tức & cập nhật",
  description:
    "Tin ngắn, cập nhật tiến độ và diễn biến thị trường quanh các dự án Vinhomes.",
  alternates: { canonical: "/tin-tuc/" },
};

export default function NewsPage() {
  const updates = getAllUpdates();

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumb items={[{ label: "Tin tức" }]} />
      <SectionHeading
        eyebrow="Cập nhật"
        title="Tin tức & diễn biến"
        description="Các cập nhật ngắn theo dự án — phù hợp theo dõi nhanh trên điện thoại."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {updates.map((u) => (
          <UpdateCard key={u.slug} update={u} />
        ))}
      </div>
    </Container>
  );
}
