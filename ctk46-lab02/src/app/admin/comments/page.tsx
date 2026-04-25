import { createClient } from '@/lib/supabase/server'
import { adminDeleteComment } from '@/app/actions/comments'

type CommentRow = {
  id: string
  content: string
  created_at: string
  posts: { title: string } | { title: string }[] | null
}

export default async function AdminCommentsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('comments')
    .select('id,content,created_at,posts(title)')
    .order('created_at', { ascending: false })

  const comments = (data ?? []) as any[]

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Quản lý bình luận</h2>
      <div className="space-y-2">
        {comments.map((comment: CommentRow) => {
          const postTitle = Array.isArray(comment.posts) 
            ? comment.posts[0]?.title 
            : comment.posts?.title;

          return (
            <article key={comment.id} className="rounded border bg-white p-3">
              <p className="text-sm text-gray-800">{comment.content}</p>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>
                  {postTitle ?? 'Bài viết'} •{' '}
                  {new Date(comment.created_at).toLocaleString('vi-VN')}
                </span>
                <form action={adminDeleteComment.bind(null, comment.id)}>
                  <button type="submit" className="rounded border px-2 py-1">
                    Xóa
                  </button>
                </form>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
