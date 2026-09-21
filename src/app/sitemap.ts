import type { MetadataRoute } from "next";
import {
  getAllArticles,
  getAllProjects,
  siteConfig,
} from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/du-an/",
    "/bai-viet/",
    "/tin-tuc/",
    "/gioi-thieu/",
    "/lien-he/",
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes = getAllProjects().map((p) => ({
    url: `${base}/du-an/${p.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const articleRoutes = getAllArticles().map((a) => ({
    url: `${base}/bai-viet/${a.slug}/`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes];
}
