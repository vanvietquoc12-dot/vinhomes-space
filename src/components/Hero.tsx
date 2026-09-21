import Link from "next/link";
import { Container } from "./Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-hero text-white">
      <div className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      <Container className="relative grid gap-10 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            vinhomes.space · Thông tin độc lập
          </p>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Khám phá dự án{" "}
            <span className="text-accent">Vinhomes</span>
            <br className="hidden sm:block" /> theo góc nhìn rõ ràng
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Tổng hợp bài viết, cập nhật và tổng quan các đại đô thị Vinhomes —
            từ Sài Gòn Park, Green Paradise đến Grand Park, Ocean Park, Smart
            City và Central Park.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/du-an/"
              className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-hero-from shadow-lg transition hover:bg-accent-dark hover:text-white"
            >
              Khám phá dự án
            </Link>
            <Link
              href="/bai-viet/"
              className="rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              Đọc bài viết mới
            </Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {[
            { label: "Dự án theo dõi", value: "6+" },
            { label: "Bài viết & phân tích", value: "12+" },
            { label: "Cập nhật thị trường", value: "Thường xuyên" },
            { label: "Ngôn ngữ", value: "Tiếng Việt" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <p className="text-2xl font-bold text-accent">{item.value}</p>
              <p className="mt-1 text-sm text-white/70">{item.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
