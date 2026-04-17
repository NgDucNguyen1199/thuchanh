export default function AboutPage() {
  return (
    <div className="twoCol">
      <section className="card stack">
        <h2 className="title">Giới thiệu</h2>
        <p>
          Mình là <strong>Nguyễn Đức Nguyên</strong> (MSSV: <strong>2212429</strong>),
          sinh viên tại <strong>Trường Đại học Đà Lạt</strong>.
        </p>
        <p>
          Định hướng của mình là Frontend Engineer, ưu tiên trải nghiệm người dùng,
          kiến trúc code sạch và hiệu năng giao diện.
        </p>
      </section>
      <section className="card stack">
        <h3 className="title">Thông tin nhanh</h3>
        <div className="badgeRow">
          <span className="badge">React</span>
          <span className="badge">Next.js</span>
          <span className="badge">TypeScript</span>
          <span className="badge">UI/UX</span>
        </div>
        <p className="muted">
          Sẵn sàng tham gia các dự án web thực tế để nâng cao kỹ năng phát triển sản
          phẩm.
        </p>
      </section>
    </div>
  );
}

