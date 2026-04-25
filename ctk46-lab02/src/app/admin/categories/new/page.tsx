import { createCategory } from '@/app/actions/categories'

export default function AdminNewCategoryPage() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Tạo danh mục mới</h2>
      <form action={createCategory} className="space-y-3 rounded border bg-white p-4">
        <label className="block text-sm">
          Tên danh mục
          <input name="name" required className="mt-1 w-full rounded border p-2" />
        </label>
        <label className="block text-sm">
          Slug (tùy chọn, tự sinh nếu để trống)
          <input name="slug" className="mt-1 w-full rounded border p-2" />
        </label>
        <button type="submit" className="rounded bg-gray-900 px-3 py-1.5 text-white">
          Lưu
        </button>
      </form>
    </section>
  )
}
