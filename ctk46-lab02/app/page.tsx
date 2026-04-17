import Counter from "../components/counter";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="homeGrid">
      <section className="card stack">
        <p className="eyebrow">Xin chào, mình là</p>
        <h2 className="heroTitle">Nguyễn Đức Nguyên</h2>
        <p className="muted">MSSV 2212429 · Đại học Đà Lạt · Sinh viên CNTT</p>
        <p>
          Mình tập trung phát triển web hiện đại với Next.js, TypeScript và tư duy
          sản phẩm. Mục tiêu là xây dựng trải nghiệm người dùng trực quan, mượt và
          có chiều sâu.
        </p>
        <div className="badgeRow">
          <span className="badge">Next.js App Router</span>
          <span className="badge">TypeScript</span>
          <span className="badge">Responsive UI</span>
        </div>
        <div className="actions">
          <Link className="btn" href="/projects">
            Xem dự án
          </Link>
          <Link className="btn btnGhost" href="/contact">
            Liên hệ
          </Link>
        </div>
        <div className="kpiGrid">
          <div className="kpi">
            <strong>03+</strong>
            <span className="muted">Dự án học tập</span>
          </div>
          <div className="kpi">
            <strong>05</strong>
            <span className="muted">Trang chức năng</span>
          </div>
          <div className="kpi">
            <strong>100%</strong>
            <span className="muted">Responsive</span>
          </div>
        </div>
      </section>
      <Counter />
    </div>
  );
}

