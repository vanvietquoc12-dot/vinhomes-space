import Link from "next/link";
import { Container } from "./Container";
import { getAllProjects, siteConfig } from "@/lib/content";

export function Footer() {
  const projects = getAllProjects();

  return (
    <footer className="mt-auto border-t border-border bg-hero-from text-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-hero-from">
                VS
              </span>
              <span className="font-display text-lg font-bold">{siteConfig.name}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Dự án
            </h3>
            <ul className="mt-4 space-y-2">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/du-an/${p.slug}/`}
                    className="text-sm text-white/75 transition hover:text-accent"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Khám phá
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li>
                <Link href="/bai-viet/" className="hover:text-accent">
                  Bài viết
                </Link>
              </li>
              <li>
                <Link href="/tin-tuc/" className="hover:text-accent">
                  Tin tức & cập nhật
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu/" className="hover:text-accent">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/lien-he/" className="hover:text-accent">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Liên hệ
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li>{siteConfig.address}</li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-accent">
                  {siteConfig.email}
                </a>
              </li>
              <li>Hotline tham khảo: {siteConfig.phone}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-5 text-xs leading-relaxed text-white/65">
          <p className="font-semibold text-accent">Tuyên bố miễn trừ trách nhiệm</p>
          <p className="mt-2">{siteConfig.disclaimer}</p>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.domain}
          </p>
          <p>Website thông tin độc lập — không phải cổng chính thức của Vinhomes/VinGroup.</p>
        </div>
      </Container>
    </footer>
  );
}
