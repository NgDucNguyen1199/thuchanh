import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug } from "../../../data/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="card stack">
      <p className="muted">
        <Link href="/blog">← Quay lại Blog</Link>
      </p>
      <h2 className="title">{post.title}</h2>
      <p>{post.content}</p>
    </article>
  );
}

