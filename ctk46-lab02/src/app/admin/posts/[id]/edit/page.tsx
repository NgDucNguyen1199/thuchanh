import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { updatePost } from '@/app/actions/posts'

type Category = { id: string; name: string }

export default async function AdminEditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: post }, { data: categories }] = await Promise.all([
    supabase
      .from('posts')
      .select('id,title,slug,excerpt,content,status,category_id')
      .eq('id', id)
      .single(),
    supabase.from('categories').select('id,name').order('name', { ascending: true }),
  ])

  if (!post) {
    notFound()
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Chỉnh sửa bài viết</h2>
      <form action={updatePost.bind(null, id)} className="space-y-3 rounded border bg-white p-4">
        <label className="block text-sm">
          Tiêu đề
          <input name="title" required defaultValue={post.title} className="mt-1 w-full rounded border p-2" />
        </label>
        <label className="block text-sm">
          Slug
          <input name="slug" required defaultValue={post.slug} className="mt-1 w-full rounded border p-2" />
        </label>
        <label className="block text-sm">
          Tóm tắt
          <textarea name="excerpt" rows={3} defaultValue={post.excerpt ?? ''} className="mt-1 w-full rounded border p-2" />
        </label>
        <label className="block text-sm">
          Danh mục
          <select
            name="category_id"
            defaultValue={post.category_id ?? ''}
            className="mt-1 w-full rounded border p-2"
          >
            <option value="">-- Chưa phân loại --</option>
            {(categories as Category[] | null)?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Trạng thái
          <select name="status" defaultValue={post.status} className="mt-1 w-full rounded border p-2">
            <option value="draft">Bản nháp</option>
            <option value="published">Xuất bản</option>
          </select>
        </label>
        <label className="block text-sm">
          Nội dung (Markdown)
          <textarea
            name="content"
            required
            rows={12}
            defaultValue={post.content ?? ''}
            className="mt-1 w-full rounded border p-2"
          />
        </label>
        <button type="submit" className="rounded bg-gray-900 px-3 py-1.5 text-white">
          Cập nhật
        </button>
      </form>
    </section>
  )
}
