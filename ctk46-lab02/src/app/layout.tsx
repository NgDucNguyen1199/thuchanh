import './globals.css'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/actions/auth'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <html lang="vi">
      <body className="bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <Link href="/" className="font-semibold">
                Simple Blog
              </Link>
              <Link href="/">Bài viết</Link>
              <Link href="/admin">Admin</Link>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <form action={logout}>
                  <button type="submit" className="rounded bg-gray-900 px-3 py-1.5 text-white">
                    Đăng xuất
                  </button>
                </form>
              ) : (
                <>
                  <Link href="/login" className="rounded border px-3 py-1.5">
                    Đăng nhập
                  </Link>
                  <Link href="/register" className="rounded bg-gray-900 px-3 py-1.5 text-white">
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  )
}
