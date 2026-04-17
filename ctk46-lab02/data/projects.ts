import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: 1,
    name: "Portfolio Sinh Viên Chuyên Nghiệp",
    description: "Xây dựng portfolio cá nhân với giao diện sinh động và responsive.",
    tech: ["Next.js", "TypeScript", "Responsive UI"]
  },
  {
    id: 2,
    name: "Ứng dụng Quản lý Học tập",
    description: "Theo dõi môn học, deadline và tiến độ cá nhân bằng dashboard trực quan.",
    tech: ["React", "Node.js", "MongoDB"]
  },
  {
    id: 3,
    name: "Blog Công nghệ Cá nhân",
    description: "Nền tảng chia sẻ bài viết học tập với dynamic route theo slug.",
    tech: ["Next.js", "App Router", "TypeScript"]
  }
];

export function getProjectById(id: number): Project | undefined {
  return projects.find((project) => project.id === id);
}

