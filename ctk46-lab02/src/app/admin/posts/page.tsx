import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { deletePost } from '@/app/actions/posts'

type PostRow = {
  id: string
  title: string
  slug: string
  status: 'draft' | 'published'
  created_at: string
}

export default async function AdminPostsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('posts')
    .select('id,title,slug,status,created_at')
    .order('created_at', { ascending: false })

  const posts = (data ?? []) as PostRow[]

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Quản lý bài viết</h2>
        <Link href="/admin/posts/new" className="rounded bg-gray-900 px-3 py-1.5 text-white">
          + Tạo bài viết
        </Link>
      </div>

      <div className="space-y-2">
        {posts.map((post) => (
          <article key={post.id} className="flex items-center justify-between rounded border bg-white p-3">
            <div>
              <p className="font-medium">{post.title}</p>
              <p className="text-xs text-gray-500">
                /posts/{post.slug} • {post.status}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/admin/posts/${post.id}/edit`} className="rounded border px-2 py-1 text-sm">
                Sửa
              </Link>
              <form action={deletePost.bind(null, post.id)}>
                <button type="submit" className="rounded border px-2 py-1 text-sm">
                  Xóa
                </button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
