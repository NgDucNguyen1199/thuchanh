import Link from "next/link";
import { posts } from "../../data/posts";

export default function BlogPage() {
  return (
    <section className="card stack">
      <h2 className="title">Blog</h2>
      <p className="muted">Chia sẻ kiến thức và hành trình học tập công nghệ web.</p>
      <ul className="list">
        {posts.map((post) => (
          <li className="listItem" key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            <p>{post.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

