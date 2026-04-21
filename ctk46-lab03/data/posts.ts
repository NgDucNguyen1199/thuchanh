import type { Post } from "../types";

export const posts: Post[] = [
  {
    slug: "hanh-trinh-hoc-nextjs",
    title: "Hành trình học Next.js App Router",
    summary: "Những bước quan trọng để xây dựng web hiện đại bằng Next.js.",
    content:
      "Mình bắt đầu từ routing cơ bản, sau đó mở rộng sang dynamic route, loading, error boundary và tối ưu cấu trúc app để phát triển lâu dài."
  },
  {
    slug: "toi-uu-giao-dien-sinh-vien",
    title: "Tối ưu giao diện portfolio cho sinh viên",
    summary: "Kết hợp màu sắc, bố cục và responsive để giao diện chuyên nghiệp hơn.",
    content:
      "Một portfolio tốt cần rõ ràng, dễ đọc và có điểm nhấn thị giác. Mình ưu tiên cấu trúc thẻ, khoảng cách và typography để tăng trải nghiệm."
  },
  {
    slug: "typescript-thuc-chien",
    title: "TypeScript thực chiến trong dự án học tập",
    summary: "Cách dùng type để giảm lỗi và tăng tốc độ phát triển tính năng.",
    content:
      "TypeScript giúp code an toàn hơn và tự tin hơn khi refactor. Mình thường định nghĩa type cho dữ liệu bài viết, dự án và props ngay từ đầu."
  }
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

