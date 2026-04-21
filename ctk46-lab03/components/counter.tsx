"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="card stack">
      <h3 className="title">Mức độ tương tác</h3>
      <p className="muted">Client Component dùng useState.</p>
      <p>
        Điểm tương tác: <strong>{count}</strong>
      </p>
      <div className="counterActions">
        <button className="btn" onClick={() => setCount((value) => value + 1)}>
          Like +1
        </button>
        <button className="btn btnGhost" onClick={() => setCount((value) => value - 1)}>
          -1
        </button>
        <button className="btn btnGhost" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}

