import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { updateCategory } from '@/app/actions/categories'

export default async function AdminEditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: category } = await supabase.from('categories').select('id,name,slug').eq('id', id).single()
  if (!category) {
    notFound()
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Chỉnh sửa danh mục</h2>
      <form action={updateCategory.bind(null, id)} className="space-y-3 rounded border bg-white p-4">
        <label className="block text-sm">
          Tên danh mục
          <input name="name" required defaultValue={category.name} className="mt-1 w-full rounded border p-2" />
        </label>
        <label className="block text-sm">
          Slug
          <input name="slug" required defaultValue={category.slug} className="mt-1 w-full rounded border p-2" />
        </label>
        <button type="submit" className="rounded bg-gray-900 px-3 py-1.5 text-white">
          Cập nhật
        </button>
      </form>
    </section>
  )
}
