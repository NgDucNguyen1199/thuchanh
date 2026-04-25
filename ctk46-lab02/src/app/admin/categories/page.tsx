import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { deleteCategory } from '@/app/actions/categories'

type Category = {
  id: string
  name: string
  slug: string
  created_at: string
}

export default async function AdminCategoriesPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('categories')
    .select('id,name,slug,created_at')
    .order('created_at', { ascending: false })

  const categories = (data ?? []) as Category[]

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Quản lý danh mục</h2>
        <Link href="/admin/categories/new" className="rounded bg-gray-900 px-3 py-1.5 text-white">
          + Tạo danh mục
        </Link>
      </div>

      <div className="space-y-2">
        {categories.map((category) => (
          <article key={category.id} className="flex items-center justify-between rounded border bg-white p-3">
            <div>
              <p className="font-medium">{category.name}</p>
              <p className="text-xs text-gray-500">/{category.slug}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/admin/categories/${category.id}/edit`} className="rounded border px-2 py-1 text-sm">
                Sửa
              </Link>
              <form action={deleteCategory.bind(null, category.id)}>
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
