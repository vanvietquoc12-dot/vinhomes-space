export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDateVI(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function absoluteUrl(path = ""): string {
  const base = "https://vinhomes.space";
  if (!path) return base;
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}
