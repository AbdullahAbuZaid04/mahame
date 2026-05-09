'use client'

import { resetPassword } from './actions'
import { KeyRound } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';

import { createClient } from '@/utils/supabase/client';

const ERROR_MESSAGES = {
  'New password should be different from the old one': 'يجب أن تكون كلمة المرور الجديدة مختلفة عن القديمة',
  'Password should be at least 6 characters.': 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
  'Auth session missing!': 'انتهت صلاحية الجلسة، يرجى طلب رابط استعادة جديد',
};

export default function ResetPasswordPage() {
  const [state, formAction, isPending] = useActionState(resetPassword, null)
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        setTimeout(async () => {
          const { data: { session: retrySession } } = await supabase.auth.getSession()
          if (!retrySession) {
            setErrorMsg('انتهت صلاحية الرابط أو غير صالح. يرجى طلب رابط جديد.')
          }
          setLoading(false)
        }, 1000)
      } else {
        setLoading(false)
      }
    }

    checkSession()

    if (state?.message) {
      setErrorMsg(ERROR_MESSAGES[state.message] || state.message)
      const timer = setTimeout(() => { setErrorMsg('') }, 5000)
      return () => clearTimeout(timer)
    }
  }, [state]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <p className="text-white animate-pulse">جاري التحقق من الجلسة...</p>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 border border-slate-700 p-4 lg:p-8 rounded-3xl shadow-2xl">
          <header className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/10 rounded-2xl mb-4 border border-blue-500/20">
              <KeyRound size={30} color="#3b82f6" />
            </div>
            <h1 className="text-3xl font-extrabold text-white">تعيين كلمة مرور جديدة</h1>
            <p className="text-slate-400 mt-2">يرجى إدخال كلمة المرور الجديدة الخاصة بك</p>
          </header>

          <form action={formAction} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-400">كلمة المرور الجديدة</label>
              <input name="password" type="password" placeholder="كلمة المرور الجديدة" required
                className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-white placeholder:text-slate-600 focus:border-blue-500 outline-none transition-all" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-400">تأكيد كلمة المرور</label>
              <input name="confirmPassword" type="password" placeholder="تأكيد كلمة المرور" required
                className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-white placeholder:text-slate-600 focus:border-blue-500 outline-none transition-all" />
            </div>

            {errorMsg && <p className="text-center text-red-500 bg-red-500/10 p-2 rounded text-sm">{errorMsg}</p>}

            <div className="flex flex-col gap-3 mt-4">
              <button type='submit' disabled={isPending}
                className={`w-full ${isPending ? "bg-slate-600" : "bg-blue-600 hover:bg-blue-500"} text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-900/20 transition-all`}>
                {isPending ? 'جاري الحفظ...' : 'حفظ كلمة المرور الجديدة'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
