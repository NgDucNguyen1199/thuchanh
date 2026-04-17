import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="card stack">
      <h2 className="title">404 - Không tìm thấy trang</h2>
      <p className="muted">Đường dẫn bạn truy cập không tồn tại hoặc đã được thay đổi.</p>
      <div>
        <Link className="btn" href="/">
          Quay về trang chủ
        </Link>
      </div>
    </section>
  );
}

