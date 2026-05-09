'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signup(prevState, formData) {
  const supabase = await createClient()

  const reqData = {
    email: formData.get('email'),
    password: formData.get('password'),
    options: {
      data: {
        display_name: formData.get('username') || "مستخدم جديد",
      },
    },
  }

  const { data, error } = await supabase.auth.signUp(reqData)

  if (error) {
    return { success: false, message: error.message }
  }

  if (!error && data?.user?.identities?.length === 0) {
    return { success: false, message: 'يوجد حساب مسجل بهذا البريد الإلكتروني مسبقاً' }
  }

  return { success: true, message: 'تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني لتفعيل الحساب.' }
}