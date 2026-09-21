import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/lib/content";

const styles: Record<ProjectStatus, string> = {
  "dang-mo-ban": "bg-emerald-100 text-emerald-800",
  "sap-mo-ban": "bg-amber-100 text-amber-900",
  "da-ban-giao": "bg-slate-100 text-slate-700",
  "dang-xay-dung": "bg-sky-100 text-sky-800",
};

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: ProjectStatus;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        styles[status],
        className,
      )}
    >
      {label}
    </span>
  );
}
