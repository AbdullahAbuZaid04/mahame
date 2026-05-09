'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function resetPassword(prevState, formData) {
  const supabase = await createClient()
  const password = formData.get('password')
  const confirmPassword = formData.get('confirmPassword')

  if (password !== confirmPassword) {
    return { success: false, message: 'كلمتا المرور غير متطابقتين' }
  }

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return { success: false, message: error.message }
  }

  const message = encodeURIComponent('تم تغيير كلمة المرور بنجاح')
  redirect(`/login?message=${message}`)
}
