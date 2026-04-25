'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addComment(postId: string, formData: FormData) {
  const content = String(formData.get('content') ?? '').trim()
  if (!content) {
    throw new Error('Nội dung bình luận không được để trống')
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('comments')
    .insert({ post_id: postId, author_id: user.id, content })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/')
}

export async function deleteComment(commentId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { error } = await supabase.from('comments').delete().eq('id', commentId)
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/')
}

export async function adminDeleteComment(commentId: string) {
  await deleteComment(commentId)
}
