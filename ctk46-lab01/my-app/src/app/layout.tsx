import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ctk46-lab01",
  description: "Bai thuc hanh 01 - Next.js + TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
