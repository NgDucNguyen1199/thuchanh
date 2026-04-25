import { createClient } from '@/lib/supabase/server'

export default async function AdminPage() {
  const supabase = await createClient()

  const [postsRes, commentsRes, usersRes, categoriesRes] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('comments').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
  ])

  const cards = [
    { label: 'Bài viết', value: postsRes.count ?? 0 },
    { label: 'Bình luận', value: commentsRes.count ?? 0 },
    { label: 'Người dùng', value: usersRes.count ?? 0 },
    { label: 'Danh mục', value: categoriesRes.count ?? 0 },
  ]

  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <article key={card.label} className="rounded border bg-white p-4">
          <p className="text-sm text-gray-500">{card.label}</p>
          <p className="mt-2 text-2xl font-bold">{card.value}</p>
        </article>
      ))}
    </section>
  )
}
