import Link from "next/link";
import { notFound } from "next/navigation";
import { Post, User } from "../../../types/post";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) notFound();
  return res.json();
}

async function getUser(userId: number): Promise<User> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!res.ok) throw new Error("Không thể tải thông tin tác giả");
  return res.json();
}

async function getComments(postId: string): Promise<Comment[]> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  if (!res.ok) throw new Error("Không thể tải bình luận");
  return res.json();
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  
  // Chạy các request song song (Promise.all)
  const post = await getPost(id);
  const [author, comments] = await Promise.all([
    getUser(post.userId),
    getComments(id),
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/blog"
        className="text-blue-600 hover:underline text-sm mb-6 inline-block"
      >
        ← Quay lại danh sách
      </Link>

      <article className="mb-12">
        <h1 className="text-4xl font-bold mb-4 capitalize">{post.title}</h1>

        <div className="flex items-center gap-3 mb-8 text-sm text-gray-500">
          <Badge variant="outline" className="text-gray-700">
            {author.name}
          </Badge>
          <span>•</span>
          <span>{author.email}</span>
        </div>

        <div className="prose max-w-none text-gray-700 whitespace-pre-line mb-10 leading-relaxed text-lg">
          {post.body}
        </div>

        <Card className="bg-gray-50 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Về tác giả</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{author.name} (@{author.username})</p>
            <p className="text-sm text-gray-600">{author.company.name} — {author.company.catchPhrase}</p>
            <p className="text-sm text-gray-500 mt-1">Website: {author.website}</p>
          </CardContent>
        </Card>
      </article>

      <Separator className="my-10" />

      <section>
        <h2 className="text-2xl font-bold mb-6">Bình luận ({comments.length})</h2>
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-6 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800 capitalize">{comment.name}</span>
                <span className="text-xs text-gray-400">{comment.email}</span>
              </div>
              <p className="text-gray-600 text-sm">{comment.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
