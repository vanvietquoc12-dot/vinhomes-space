import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: `Liên hệ ${siteConfig.name} để gửi câu hỏi về nội dung hoặc dự án bạn đang quan tâm.`,
  alternates: { canonical: "/lien-he/" },
};

export default function ContactPage() {
  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumb items={[{ label: "Liên hệ" }]} />
      <SectionHeading
        eyebrow="Kết nối"
        title="Liên hệ với chúng tôi"
        description="Gửi câu hỏi về nội dung, góp ý hoặc yêu cầu hướng dẫn thông tin dự án. Đây không phải tổng đài bán hàng chính thức của Vinhomes."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-dark">
              Email
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-1 block text-lg font-semibold text-primary hover:underline"
            >
              {siteConfig.email}
            </a>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-dark">
              Điện thoại (tham khảo)
            </p>
            <p className="mt-1 text-lg font-semibold">{siteConfig.phone}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-dark">
              Địa chỉ
            </p>
            <p className="mt-1 text-lg font-semibold">{siteConfig.address}</p>
          </div>
        </div>

        <form
          className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
          action={`mailto:${siteConfig.email}`}
          method="get"
          encType="text/plain"
        >
          <div className="grid gap-4">
            <label className="block text-sm font-medium">
              Họ và tên
              <input
                name="name"
                required
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 focus:ring-2"
                placeholder="Nguyễn Văn A"
              />
            </label>
            <label className="block text-sm font-medium">
              Email
              <input
                type="email"
                name="email"
                required
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 focus:ring-2"
                placeholder="ban@email.com"
              />
            </label>
            <label className="block text-sm font-medium">
              Dự án quan tâm
              <input
                name="project"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 focus:ring-2"
                placeholder="Ví dụ: Vinhomes Sài Gòn Park"
              />
            </label>
            <label className="block text-sm font-medium">
              Nội dung
              <textarea
                name="body"
                required
                rows={5}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 focus:ring-2"
                placeholder="Bạn cần hỗ trợ thông tin gì?"
              />
            </label>
            <button
              type="submit"
              className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
            >
              Gửi liên hệ
            </button>
            <p className="text-xs text-muted">
              Form mở ứng dụng email của bạn. Để tích hợp form backend sau này,
              có thể kết nối Cloudflare Workers hoặc dịch vụ form bên thứ ba.
            </p>
          </div>
        </form>
      </div>
    </Container>
  );
}
