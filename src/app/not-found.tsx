import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent-dark">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold">
        Không tìm thấy trang
      </h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        Đường dẫn có thể đã thay đổi hoặc không tồn tại. Quay về trang chủ để
        tiếp tục khám phá dự án.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
      >
        Về trang chủ
      </Link>
    </Container>
  );
}
