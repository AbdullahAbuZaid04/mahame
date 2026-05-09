'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function getUser() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    return null
  }

  return data.user
}

export async function getAllTasks() {
  const supabase = await createClient()

  const user = await getUser()
  const userId = user?.id

  if (!userId) {
    console.error('Error getting user')
    return []
  }

  const { data, error } = await supabase
    .from('tasks').select('*').eq('user_id', userId)
    .order('is_completed', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching tasks:', error.message)
    return []
  }

  return data;
}

async function getCurrentUser() {
  const user = await getUser()
  if (!user) throw new Error('يجب تسجيل الدخول أولاً')
  return user
}

export async function addTask(previousState, formData) {
  try {
    const supabase = await createClient()
    const user = await getCurrentUser()

    const title = formData.get('title')

    const { error } = await supabase.from('tasks').insert({
      title: title,
      user_id: user.id
    })

    if (error) throw new Error(error.message)

    revalidatePath('/')
    return { success: true, message: 'تم إضافة المهمة بنجاح' }
  } catch (e) {
    return { success: false, message: e.message || 'حدث خطأ أثناء إضافة المهمة' }
  }
}

export async function deleteTask(previousState, formData) {
  try {
    const supabase = await createClient()
    const user = await getCurrentUser()
    const taskId = formData.get('id')

    const { error } = await supabase
      .from('tasks').delete()
      .eq('id', taskId)
      .eq('user_id', user.id)

    if (error) throw new Error(error.message)

    revalidatePath('/')
    return { success: true, message: 'تم حذف المهمة بنجاح' }
  } catch (e) {
    return { success: false, message: e.message || 'حدث خطأ أثناء حذف المهمة' }
  }
}

export async function toggleTaskStatus(previousState, formData) {
  try {
    const supabase = await createClient()
    const user = await getCurrentUser()
    const taskId = formData.get('id')
    const currentStatus = formData.get('currentStatus') === 'true'

    const { error } = await supabase
      .from('tasks')
      .update({
        is_completed: !currentStatus,
        completed_at: !currentStatus ? new Date().toISOString() : null
      })
      .eq('id', taskId)
      .eq('user_id', user.id)

    if (error) throw new Error(error.message)

    revalidatePath('/')
    return { success: true, message: !currentStatus ? 'تم إكمال المهمة بنجاح' : 'تم إلغاء إكمال المهمة بنجاح' }
  } catch (e) {
    return { success: false, message: e.message || 'حدث خطأ ما' }
  }
}

export async function updateTask(previousState, formData) {
  try {
    const supabase = await createClient()
    const user = await getCurrentUser()
    const taskId = formData.get('id')
    const title = formData.get('title')

    const { error } = await supabase
      .from('tasks').update({ title })
      .eq('id', taskId)
      .eq('user_id', user.id)

    if (error) throw new Error(error.message)

    revalidatePath('/')
    return { success: true, message: 'تم تعديل المهمة بنجاح' }
  } catch (e) {
    return { success: false, message: e.message || 'حدث خطأ أثناء تعديل المهمة' }
  }
}
