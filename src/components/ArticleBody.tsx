import Image from "next/image";
import type { ContentBlock } from "@/lib/content";

function renderInline(text: string) {
  // Lightweight **bold** support for markdown leftovers
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function ArticleBody({ content }: { content: ContentBlock[] }) {
  return (
    <div className="prose-vn mt-10 border-t border-border pt-8">
      {content.map((block, i) => {
        if (typeof block === "string") {
          return <p key={i}>{renderInline(block)}</p>;
        }
        if (block.type === "p") {
          return <p key={i}>{renderInline(block.text)}</p>;
        }
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              className="mt-10 mb-4 font-display text-2xl font-bold text-foreground first:mt-0"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "image") {
          return (
            <figure
              key={i}
              className="my-8 overflow-hidden rounded-2xl border border-border bg-primary-light/30"
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={block.src}
                  alt={block.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 800px"
                />
              </div>
              {block.alt ? (
                <figcaption className="px-4 py-2 text-center text-xs text-muted">
                  {block.alt}
                </figcaption>
              ) : null}
            </figure>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={i} className="mb-5 list-disc space-y-2 pl-5 text-muted">
              {block.items.map((item, j) => (
                <li key={j} className="leading-relaxed">
                  {renderInline(item)}
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "table") {
          return (
            <div key={i} className="my-6 overflow-x-auto rounded-xl border border-border">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-primary-light/60">
                    {block.headers.map((h, j) => (
                      <th
                        key={j}
                        className="border-b border-border px-3 py-2 text-left font-semibold text-foreground"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, ri) => (
                    <tr key={ri} className="odd:bg-card even:bg-primary-light/20">
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className="border-b border-border/70 px-3 py-2 align-top text-muted"
                        >
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
