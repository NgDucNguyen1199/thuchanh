import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

type Category = { id: string; name: string; slug: string }
type Post = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published_at: string | null
  category_id: string | null
}

export default async function HomePage() {
  console.log('Rendering HomePage')
  const supabase = await createClient()
  
  const { data: dataCategories, error: catError } = await supabase.from('categories').select('id,name,slug').order('name', { ascending: true })
  const { data: dataPosts, error: postError } = await supabase
      .from('posts')
      .select('id,title,slug,excerpt,published_at,category_id')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

  const categories = dataCategories ?? []
  const posts = dataPosts ?? []

  if (catError) {
    console.warn('Could not fetch categories, showing posts as uncategorized.', catError.message || '')
  }
  if (postError) {
    console.error('Could not fetch posts:', postError.message || '')
  }

  const categoryMap = new Map<string, Category>()
  ;(categories ?? []).forEach((category) => categoryMap.set(category.id, category as Category))

  const grouped = new Map<string, { category: Category | null; posts: Post[] }>()
  ;(posts ?? []).forEach((post) => {
    const typedPost = post as Post
    const key = typedPost.category_id ?? 'uncategorized'
    if (!grouped.has(key)) {
      grouped.set(key, {
        category: typedPost.category_id ? (categoryMap.get(typedPost.category_id) ?? null) : null,
        posts: [],
      })
    }
    grouped.get(key)!.posts.push(typedPost)
  })

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold">Simple Blog</h1>
        <p className="mt-2 text-gray-600">Danh sách bài viết mới theo danh mục.</p>
      </section>

      {[...grouped.values()].map((group, index) => (
        <section key={group.category?.id ?? `uncategorized-${index}`} className="space-y-3">
          <h2 className="text-xl font-semibold">
            {group.category ? `Danh mục: ${group.category.name}` : 'Chưa phân loại'}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {group.posts.map((post) => (
              <article key={post.id} className="rounded border bg-white p-4">
                <h3 className="text-lg font-semibold">
                  <Link href={`/posts/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-gray-600">{post.excerpt ?? 'Chưa có tóm tắt.'}</p>
                <p className="mt-2 text-xs text-gray-500">
                  {post.published_at
                    ? new Date(post.published_at).toLocaleString('vi-VN')
                    : 'Chưa xuất bản'}
                </p>
              </article>
            ))}
          </div>
        </section>
      ))}

      {(!posts || posts.length === 0) && (
        <p className="rounded border border-dashed bg-white p-4 text-gray-600">
          Chưa có bài viết đã xuất bản.
        </p>
      )}
    </div>
  )
}
