import { createClient } from '@/lib/supabase/server'
import { createPost } from '@/app/actions/posts'

type Category = { id: string; name: string }

export default async function AdminNewPostPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('categories').select('id,name').order('name', { ascending: true })
  const categories = (data ?? []) as Category[]

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Tạo bài viết mới</h2>
      <form action={createPost} className="space-y-3 rounded border bg-white p-4">
        <label className="block text-sm">
          Tiêu đề
          <input name="title" required className="mt-1 w-full rounded border p-2" />
        </label>
        <label className="block text-sm">
          Slug (tùy chọn)
          <input name="slug" className="mt-1 w-full rounded border p-2" />
        </label>
        <label className="block text-sm">
          Tóm tắt
          <textarea name="excerpt" rows={3} className="mt-1 w-full rounded border p-2" />
        </label>
        <label className="block text-sm">
          Danh mục
          <select name="category_id" className="mt-1 w-full rounded border p-2">
            <option value="">-- Chưa phân loại --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Trạng thái
          <select name="status" className="mt-1 w-full rounded border p-2" defaultValue="draft">
            <option value="draft">Bản nháp</option>
            <option value="published">Xuất bản</option>
          </select>
        </label>
        <label className="block text-sm">
          Nội dung (Markdown)
          <textarea name="content" required rows={12} className="mt-1 w-full rounded border p-2" />
        </label>
        <button type="submit" className="rounded bg-gray-900 px-3 py-1.5 text-white">
          Lưu bài viết
        </button>
      </form>
    </section>
  )
}
