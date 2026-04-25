'use client'

import { useEffect, useMemo, useState } from 'react'
import { addComment, deleteComment } from '@/app/actions/comments'
import { createClient } from '@/lib/supabase/client'

type CommentItem = {
  id: string
  post_id: string
  author_id: string
  content: string
  created_at: string
}

type CommentsProps = {
  postId: string
  initialComments: CommentItem[]
  currentUserId: string | null
  isAdmin: boolean
  canComment: boolean
}

export default function Comments({
  postId,
  initialComments,
  currentUserId,
  isAdmin,
  canComment,
}: CommentsProps) {
  const [comments, setComments] = useState<CommentItem[]>(initialComments)

  useEffect(() => {
    const supabase = createClient()
    const channel = supabase
      .channel(`comments-${postId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comments', filter: `post_id=eq.${postId}` },
        (payload) => {
          const newComment = payload.new as CommentItem
          setComments((prev) => {
            if (prev.some((comment) => comment.id === newComment.id)) return prev
            return [newComment, ...prev]
          })
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'comments', filter: `post_id=eq.${postId}` },
        (payload) => {
          const deleted = payload.old as { id: string }
          setComments((prev) => prev.filter((comment) => comment.id !== deleted.id))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [postId])

  const addCommentAction = useMemo(() => addComment.bind(null, postId), [postId])

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Bình luận</h2>

      {canComment ? (
        <form action={addCommentAction} className="space-y-2 rounded border bg-white p-4">
          <textarea
            name="content"
            required
            minLength={2}
            maxLength={2000}
            className="w-full rounded border p-2"
            placeholder="Nhập bình luận của bạn..."
          />
          <button type="submit" className="rounded bg-gray-900 px-3 py-1.5 text-white">
            Gửi bình luận
          </button>
        </form>
      ) : (
        <p className="rounded border border-dashed bg-white p-3 text-sm text-gray-600">
          Bạn cần đăng nhập để bình luận.
        </p>
      )}

      <div className="space-y-3">
        {comments.map((comment) => (
          <article key={comment.id} className="rounded border bg-white p-4">
            <p className="text-sm text-gray-700">{comment.content}</p>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <span>{new Date(comment.created_at).toLocaleString('vi-VN')}</span>
              {(isAdmin || comment.author_id === currentUserId) && (
                <form action={deleteComment.bind(null, comment.id)}>
                  <button type="submit" className="rounded border px-2 py-1">
                    Xóa
                  </button>
                </form>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
