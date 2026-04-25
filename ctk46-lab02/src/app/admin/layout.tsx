import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile || profile.role !== 'admin') {
    redirect('/')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <nav className="flex flex-wrap gap-2">
        <Link href="/admin" className="rounded border bg-white px-3 py-1.5">
          Tổng quan
        </Link>
        <Link href="/admin/categories" className="rounded border bg-white px-3 py-1.5">
          Danh mục
        </Link>
        <Link href="/admin/posts" className="rounded border bg-white px-3 py-1.5">
          Bài viết
        </Link>
        <Link href="/admin/comments" className="rounded border bg-white px-3 py-1.5">
          Bình luận
        </Link>
        <Link href="/admin/users" className="rounded border bg-white px-3 py-1.5">
          Người dùng
        </Link>
      </nav>
      {children}
    </div>
  )
}
