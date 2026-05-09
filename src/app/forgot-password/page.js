'use client'

import Link from 'next/link'
import { forgotPassword } from '../login/actions'
import { Mail, ArrowRight } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';

const ERROR_MESSAGES = {
  'User not found': 'هذا البريد الإلكتروني غير مسجل لدينا',
  'Rate limit exceeded': 'محاولات كثيرة، يرجى الانتظار قليلاً',
};

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(forgotPassword, null)
  const [message, setMessage] = useState({ text: '', type: '' })

  useEffect(() => {
    if (state?.message) {
      const text = state.success ? state.message : (ERROR_MESSAGES[state.message] || 'حدث خطأ ما، يرجى المحاولة لاحقاً')
      setMessage({
        text: text,
        type: state.success ? 'success' : 'error'
      })
      const timer = setTimeout(() => { setMessage({ text: '', type: '' }) }, 6000)
      return () => clearTimeout(timer)
    }
  }, [state])

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 border border-slate-700 p-4 lg:p-8 rounded-3xl shadow-2xl">
          <header className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/10 rounded-2xl mb-4 border border-blue-500/20">
              <Mail size={30} color="#3b82f6" />
            </div>
            <h1 className="text-3xl font-extrabold text-white">استعادة كلمة المرور</h1>
            <p className="text-slate-400 mt-2">أدخل بريدك الإلكتروني لتلقي رابط الاستعادة</p>
          </header>

          <form action={formAction} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-400">البريد الإلكتروني</label>
              <input name="email" type="email" placeholder="البريد الإلكتروني" required
                className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-white placeholder:text-slate-600 focus:border-blue-500 outline-none transition-all" />
            </div>

            {message.text && (
              <p className={`text-center p-3 rounded-xl text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {message.text}
              </p>
            )}

            <div className="flex flex-col gap-3 mt-4">
              <button type='submit' disabled={isPending}
                className={`w-full ${isPending ? "bg-slate-600" : "bg-blue-600 hover:bg-blue-500"} text-white  font-bold py-3 rounded-xl shadow-lg shadow-blue-900/20 transition-all`}>
                {isPending ? 'جاري الإرسال...' : 'إرسال رابط الاستعادة'}
              </button>

              <Link href="/login" className="flex items-center justify-center gap-2 text-slate-400 hover:text-white transition-all text-sm mt-2">
                <ArrowRight size={16} />
                العودة لتسجيل الدخول
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
