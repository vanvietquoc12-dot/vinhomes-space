import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionHeading } from "@/components/SectionHeading";
import { CTA } from "@/components/CTA";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: `Giới thiệu ${siteConfig.name} — cổng thông tin độc lập về dự án Vinhomes.`,
  alternates: { canonical: "/gioi-thieu/" },
};

export default function AboutPage() {
  return (
    <>
      <Container className="py-12 sm:py-16">
        <Breadcrumb items={[{ label: "Giới thiệu" }]} />
        <SectionHeading
          eyebrow="Về chúng tôi"
          title={siteConfig.name}
          description={siteConfig.tagline}
        />

        <div className="prose-vn mt-10 max-w-3xl">
          <p>
            <strong>Vinhomes Space</strong> ({siteConfig.domain}) là website nội
            dung/marketing thông tin về các dự án mang thương hiệu Vinhomes. Chúng
            tôi tổ chức thông tin theo từng dự án — tổng quan, bài viết phân tích
            và cập nhật ngắn — để độc giả dễ theo dõi.
          </p>
          <p>
            Mục tiêu của trang là cung cấp góc nhìn rõ ràng, ngôn ngữ tiếng Việt
            dễ hiểu, phục vụ người mua ở thực và nhà đầu tư đang tìm hiểu thị
            trường. Nội dung được biên tập mang tính tham khảo công khai, dễ mở
            rộng khi có thêm dự án hoặc bài mới.
          </p>
          <p>
            Chúng tôi <strong>không</strong> phải cổng thông tin chính thức của
            Tập đoàn VingroupGroup hay Công ty Cổ phần Vinhomes, không đại diện bán
            hàng ủy quyền và không thu thập thanh toán thay chủ đầu tư trên trang
            này.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Độc lập",
              body: "Nội dung biên tập riêng, có tuyên bố miễn trừ rõ ràng ở chân trang.",
            },
            {
              title: "Theo dự án",
              body: "Mỗi dự án có trang riêng kèm bài viết và cập nhật liên quan.",
            },
            {
              title: "Dễ mở rộng",
              body: "Nội dung nằm trong thư mục content/ — thêm project hoặc bài mới rất nhanh.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <h3 className="font-display text-xl font-bold text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-accent/30 bg-accent-soft p-6 text-sm leading-relaxed">
          <p className="font-semibold text-accent-dark">Tuyên bố quan trọng</p>
          <p className="mt-2 text-foreground/80">{siteConfig.disclaimer}</p>
        </div>
      </Container>
      <CTA />
    </>
  );
}
