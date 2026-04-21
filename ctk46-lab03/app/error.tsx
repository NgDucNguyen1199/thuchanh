"use client";

type Props = {
  error: Error;
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  return (
    <section className="card stack">
      <h2 className="title">Đã xảy ra lỗi</h2>
      <p className="muted">{error.message}</p>
      <div>
        <button className="btn" onClick={reset}>
          Thử lại
        </button>
      </div>
    </section>
  );
}

