import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Comments from '@/components/comments'

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const [{ data: post }, userResult] = await Promise.all([
    supabase.from('posts').select('*').eq('slug', slug).eq('status', 'published').single(),
    supabase.auth.getUser(),
  ])

  if (!post) notFound()

  const { data: profile } = userResult.data.user
    ? await supabase.from('profiles').select('role').eq('id', userResult.data.user.id).single()
    : { data: null }

  const { data: comments } = await supabase
    .from('comments')
    .select('id,post_id,author_id,content,created_at')
    .eq('post_id', post.id)
    .order('created_at', { ascending: false })

  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-500">
          {post.published_at
            ? `Xuất bản lúc ${new Date(post.published_at).toLocaleString('vi-VN')}`
            : 'Bản nháp'}
        </p>
      </header>

      <div className="prose max-w-none rounded border bg-white p-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content ?? ''}</ReactMarkdown>
      </div>

      <Comments
        postId={post.id}
        currentUserId={userResult.data.user?.id ?? null}
        isAdmin={profile?.role === 'admin'}
        canComment={Boolean(userResult.data.user)}
        initialComments={comments ?? []}
      />
    </article>
  )
}
