import Link from "next/link";

export function Breadcrumb({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-primary">
            Trang chủ
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <span aria-hidden>/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
