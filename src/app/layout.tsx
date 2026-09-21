import type { Metadata } from "next";
import { Be_Vietnam_Pro, Cormorant_Garamond } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/content";
import "./globals.css";

const sans = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Thông tin dự án Vinhomes`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Vinhomes",
    "Vinhomes Sài Gòn Park",
    "Vinhomes Green Paradise",
    "Vinhomes Grand Park",
    "Vinhomes Ocean Park",
    "Vinhomes Smart City",
    "Vinhomes Central Park",
    "bất động sản",
    "vinhomes.space",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${sans.variable} ${display.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
