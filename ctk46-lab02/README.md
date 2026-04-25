# Lab04 - Simple Blog CMS (`ctk46-lab02`)

Triển khai theo yêu cầu `bai-thuc-hanh-04.pdf` với Next.js App Router + Supabase.

## Chạy dự án

1. Cài dependencies:

```bash
npm install
```

2. Tạo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. Khởi chạy:

```bash
npm run dev
```

## SQL cần chạy trên Supabase

1. `supabase/schema.sql`
2. `supabase/admin_schema_update.sql`

## Phạm vi chức năng đã có

- Xác thực: đăng ký, đăng nhập email/GitHub, callback OAuth.
- Middleware + phân quyền: chặn `/admin` nếu chưa đăng nhập hoặc không phải admin.
- Admin dashboard:
  - Tổng quan thống kê.
  - CRUD danh mục.
  - CRUD bài viết (draft/published, markdown content).
  - Quản lý/xóa bình luận.
  - Quản lý vai trò người dùng (`user`/`admin`).
- Public:
  - Trang chủ hiển thị bài viết đã xuất bản theo danh mục.
  - Trang chi tiết bài viết `/posts/[slug]`.
  - Bình luận và cập nhật realtime qua Supabase Realtime subscription.

