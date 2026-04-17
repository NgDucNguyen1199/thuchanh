export default function ContactPage() {
  return (
    <div className="twoCol">
      <section className="card stack">
        <h2 className="title">Liên hệ</h2>
        <p>Bạn có thể kết nối với mình qua các kênh sau:</p>
        <div className="list">
          <div className="listItem">
            <strong>Email</strong>
            <p className="muted">nguyenducnguyen2212429@gmail.com</p>
          </div>
          <div className="listItem">
            <strong>GitHub</strong>
            <p className="muted">github.com/nguyenducnguyen2212429</p>
          </div>
        </div>
      </section>
      <section className="card stack">
        <h3 className="title">Mục tiêu hợp tác</h3>
        <p className="muted">
          Tìm kiếm cơ hội thực tập Frontend và tham gia các dự án web giúp cải thiện
          trải nghiệm người dùng.
        </p>
        <div className="badgeRow">
          <span className="badge">Internship</span>
          <span className="badge">Frontend</span>
          <span className="badge">Product UI</span>
        </div>
      </section>
    </div>
  );
}

