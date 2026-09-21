# Vinhomes Space (`vinhomes.space`)

Website nội dung/marketing tiếng Việt về các dự án Vinhomes — **độc lập**, không đại diện chính thức cho Vinhomes/VinGroup. Xem tuyên bố miễn trừ ở chân trang khi chạy site.

## Công nghệ

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS**
- Nội dung dạng module TypeScript trong thư mục `content/` (dễ thêm dự án, bài viết, cập nhật)
- **Static export** (`output: "export"`) — phù hợp **Cloudflare Pages**
- SEO: metadata, Open Graph, `sitemap.xml`, `robots.txt`

## Chạy local

Yêu cầu: Node.js 20+ và npm.

```bash
cd /workspace/vinhomes-space   # hoặc thư mục clone của bạn
npm install
npm run dev
```

Mở trình duyệt: **http://localhost:3000** (cổng mặc định của Next.js).

Các lệnh khác:

```bash
npm run build   # build production → thư mục out/
npm run start   # không dùng cho static export; dùng npx serve out nếu cần xem bản build
npm run lint    # ESLint
```

Xem bản build tĩnh local (sau `npm run build`):

```bash
npx serve out
```

## Thêm nội dung

| Loại | File |
|------|------|
| Cấu hình site | `content/site.ts` |
| Dự án | `content/projects.ts` |
| Bài viết | `content/articles.ts` |
| Tin / cập nhật | `content/updates.ts` |

Sau khi thêm `slug` mới, build lại — Next sẽ generate static params cho `/du-an/[slug]` và `/bai-viet/[slug]`.

## Deploy lên Cloudflare Pages

Site được cấu hình **static export**: lệnh build tạo thư mục `out/` (HTML/CSS/JS tĩnh). Cloudflare Pages phục vụ trực tiếp thư mục này — không cần Node runtime trên edge cho luồng này.

### Cách 1 — Kết nối Git (khuyến nghị)

1. Đẩy code lên GitHub/GitLab.
2. Vào [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Chọn repo, cấu hình build:

   | Trường | Giá trị |
   |--------|---------|
   | Framework preset | Next.js (Static HTML Export) hoặc None |
   | Build command | `npm run build` |
   | Build output directory | `out` |
   | Node version | `20` (Environment variable `NODE_VERSION=20` nếu cần) |

4. **Save and Deploy**. Sau vài phút bạn có URL dạng `https://vinhomes-space.pages.dev`.

File `wrangler.toml` trong repo ghi nhận `pages_build_output_dir = "out"` để đồng bộ với CLI.

### Cách 2 — Deploy bằng Wrangler CLI

```bash
npm install -g wrangler
# Đăng nhập Cloudflare (một lần)
wrangler login

npm run build
npx wrangler pages deploy out --project-name=vinhomes-space
```

Hoặc gắn project có sẵn:

```bash
npx wrangler pages project list
npx wrangler pages deploy out --project-name=vinhomes-space
```

### Trỏ DNS domain `vinhomes.space` (đã dùng Cloudflare)

Vì domain **đã nằm trên Cloudflare**, chỉ cần gắn custom domain cho Pages project — DNS sẽ được Cloudflare quản lý tự động (thường tạo CNAME/`pages.dev`).

1. Cloudflare Dashboard → **Workers & Pages** → chọn project **vinhomes-space**.
2. Tab **Custom domains** → **Set up a custom domain**.
3. Nhập `vinhomes.space` và (tuỳ chọn) `www.vinhomes.space`.
4. Xác nhận. Cloudflare sẽ:
   - Thêm bản ghi DNS phù hợp (thường là CNAME về `vinhomes-space.pages.dev`, hoặc cấu hình apex theo proxy cam),
   - Cấp chứng chỉ SSL (HTTPS) tự động.
5. Đợi status **Active** (thường vài phút; DNS/SSL có thể lâu hơn một chút).

**Lưu ý DNS thủ công** (nếu bạn tự chỉnh trong **DNS** của zone `vinhomes.space`):

| Loại | Tên | Nội dung | Proxy |
|------|-----|----------|-------|
| CNAME | `www` | `vinhomes-space.pages.dev` | Proxied (cam) |
| CNAME / AAAA | `@` (root) | Theo hướng dẫn custom domain của Pages (Cloudflare hỗ trợ CNAME flattening cho apex) | Proxied |

Không trỏ nameserver đi nơi khác nếu bạn muốn giữ SSL và proxy của Cloudflare. Không cần Vercel.

### Biến môi trường (tuỳ chọn)

Với static export hiện tại không bắt buộc env. Nếu sau này thêm form API / analytics, khai báo trong **Settings → Environment variables** của Pages.

### Headers bảo mật

File `public/_headers` được copy vào `out/` khi build — Cloudflare Pages áp dụng sẵn các header cơ bản.

## Cấu trúc route

| Route | Mô tả |
|-------|--------|
| `/` | Trang chủ |
| `/du-an/` | Danh sách dự án |
| `/du-an/[slug]/` | Chi tiết dự án |
| `/bai-viet/` | Danh sách bài viết |
| `/bai-viet/[slug]/` | Chi tiết bài viết |
| `/tin-tuc/` | Tin tức & cập nhật |
| `/gioi-thieu/` | Giới thiệu |
| `/lien-he/` | Liên hệ |
| `/sitemap.xml` | Sitemap |
| `/robots.txt` | Robots |

## Kiểm tra production build

```bash
npm run build
```

Thành công khi exit code `0` và thư mục `out/` được tạo.

## Bản quyền & miễn trừ

Thương hiệu Vinhomes/VinGroup thuộc chủ sở hữu tương ứng. Website này chỉ cung cấp thông tin tham khảo độc lập trên domain `vinhomes.space`.
