'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function toSlug(input: string) {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export async function createCategory(formData: FormData) {
  const supabase = await createClient()
  const name = String(formData.get('name') ?? '').trim()
  const slugRaw = String(formData.get('slug') ?? '').trim()
  const slug = toSlug(slugRaw || name)

  if (!name || !slug) {
    throw new Error('Tên và slug danh mục là bắt buộc')
  }

  const { error } = await supabase.from('categories').insert({ name, slug })
  if (error) throw new Error(error.message)

  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createClient()
  const name = String(formData.get('name') ?? '').trim()
  const slugRaw = String(formData.get('slug') ?? '').trim()
  const slug = toSlug(slugRaw || name)

  if (!name || !slug) {
    throw new Error('Tên và slug danh mục là bắt buộc')
  }

  const { error } = await supabase.from('categories').update({ name, slug }).eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/admin/categories')
}
