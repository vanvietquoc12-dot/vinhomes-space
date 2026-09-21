import Link from "next/link";
import { Container } from "./Container";

export function CTA({
  title = "Bạn đang quan tâm dự án Vinhomes nào?",
  description = "Khám phá bài viết độc lập, cập nhật thị trường và tổng quan từng dự án — hoặc gửi yêu cầu để chúng tôi hỗ trợ định hướng thông tin.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl gradient-hero px-6 py-12 text-center shadow-xl sm:px-12">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
          <div className="absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
          <h2 className="relative font-display text-3xl font-bold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
            {description}
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/du-an/"
              className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-hero-from transition hover:bg-accent-dark hover:text-white"
            >
              Xem tất cả dự án
            </Link>
            <Link
              href="/lien-he/"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
