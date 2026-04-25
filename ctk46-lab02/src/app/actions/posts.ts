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

function parseStatus(status: string) {
  return status === 'published' ? 'published' : 'draft'
}

export async function createPost(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Bạn cần đăng nhập')
  }

  const title = String(formData.get('title') ?? '').trim()
  const slugRaw = String(formData.get('slug') ?? '').trim()
  const content = String(formData.get('content') ?? '').trim()
  const excerpt = String(formData.get('excerpt') ?? '').trim()
  const status = parseStatus(String(formData.get('status') ?? 'draft'))
  const categoryId = String(formData.get('category_id') ?? '').trim()

  if (!title || !content) {
    throw new Error('Tiêu đề và nội dung là bắt buộc')
  }

  const slug = toSlug(slugRaw || title)
  const payload = {
    author_id: user.id,
    category_id: categoryId || null,
    title,
    slug,
    content,
    excerpt: excerpt || null,
    status,
    published_at: status === 'published' ? new Date().toISOString() : null,
  }

  const { error } = await supabase.from('posts').insert(payload)
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/')
  revalidatePath('/admin/posts')
  redirect('/admin/posts')
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = String(formData.get('title') ?? '').trim()
  const slugRaw = String(formData.get('slug') ?? '').trim()
  const content = String(formData.get('content') ?? '').trim()
  const excerpt = String(formData.get('excerpt') ?? '').trim()
  const status = parseStatus(String(formData.get('status') ?? 'draft'))
  const categoryId = String(formData.get('category_id') ?? '').trim()

  if (!title || !content) {
    throw new Error('Tiêu đề và nội dung là bắt buộc')
  }

  const slug = toSlug(slugRaw || title)
  const payload = {
    category_id: categoryId || null,
    title,
    slug,
    content,
    excerpt: excerpt || null,
    status,
    published_at: status === 'published' ? new Date().toISOString() : null,
  }

  const { error } = await supabase.from('posts').update(payload).eq('id', id)
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/')
  revalidatePath('/admin/posts')
  redirect('/admin/posts')
}

export async function deletePost(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/posts')
  revalidatePath('/')
}
