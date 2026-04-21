import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nguyễn Đức Nguyên | Portfolio",
  description: "Portfolio sinh viên Nguyễn Đức Nguyên - Đại học Đà Lạt"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <div className="container shell">
          <header className="topbar card">
            <div>
              <p className="eyebrow">Portfolio sinh viên</p>
              <h1>Nguyễn Đức Nguyên</h1>
              <p className="muted">MSSV: 2212429 · Trường Đại học Đà Lạt</p>
            </div>
            <nav className="menu">
              <Link href="/">Trang chủ</Link>
              <Link href="/about">Giới thiệu</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/projects">Dự án</Link>
              <Link href="/guestbook">Lưu bút</Link>
              <Link href="/contact">Liên hệ</Link>
            </nav>
          </header>
          <main className="page">{children}</main>
          <footer className="footer muted">
            © {new Date().getFullYear()} Nguyễn Đức Nguyên · Built with Next.js
          </footer>
        </div>
      </body>
    </html>
  );
}

