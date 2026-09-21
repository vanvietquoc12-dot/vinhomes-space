"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Trang chủ" },
  { href: "/du-an/", label: "Dự án" },
  { href: "/bai-viet/", label: "Bài viết" },
  { href: "/tin-tuc/", label: "Tin tức" },
  { href: "/gioi-thieu/", label: "Giới thiệu" },
  { href: "/lien-he/", label: "Liên hệ" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.replace(/\/$/, ""));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-card/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white shadow-sm ring-2 ring-accent/40">
            VS
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-bold text-primary group-hover:text-primary-dark">
              Vinhomes Space
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-wider text-muted">
              Thông tin độc lập
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium transition",
                isActive(item.href)
                  ? "bg-primary-light text-primary"
                  : "text-muted hover:bg-primary-light/60 hover:text-primary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/lien-he/"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark sm:inline-flex"
          >
            Liên hệ tư vấn
          </Link>
          <button
            type="button"
            aria-label="Mở menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-border bg-card lg:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium",
                  isActive(item.href)
                    ? "bg-primary-light text-primary"
                    : "text-foreground hover:bg-primary-light/50",
                )}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  );
}
