import { createClient } from '@/lib/supabase/server'
import { updateUserRole } from '@/app/actions/auth'

type Profile = {
  id: string
  display_name: string | null
  role: 'admin' | 'user' | null
  created_at: string
}

export default async function AdminUsersPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('profiles')
    .select('id,display_name,role,created_at')
    .order('created_at', { ascending: false })

  const users = (data ?? []) as Profile[]

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Quản lý người dùng</h2>
      <div className="space-y-2">
        {users.map((user) => (
          <article key={user.id} className="flex items-center justify-between rounded border bg-white p-3">
            <div>
              <p className="font-medium">{user.display_name ?? 'Người dùng'}</p>
              <p className="text-xs text-gray-500">{user.id}</p>
            </div>
            <form action={updateUserRole} className="flex items-center gap-2">
              <input type="hidden" name="user_id" value={user.id} />
              <select
                name="role"
                defaultValue={user.role ?? 'user'}
                className="rounded border px-2 py-1 text-sm"
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
              <button type="submit" className="rounded border px-2 py-1 text-sm">
                Cập nhật
              </button>
            </form>
          </article>
        ))}
      </div>
    </section>
  )
}
