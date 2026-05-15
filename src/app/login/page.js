'use client'

import Link from 'next/link'
import { login } from './actions'
import { Lock } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useState, Suspense } from 'react';

const ERROR_MESSAGES = {
  'Invalid login credentials': 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
  'Email not confirmed': 'يرجى تأكيد البريد الإلكتروني أولاً من خلال الرابط المرسل إليك',
  'email rate limit exceeded': 'محاولات كثيرة ، يرجى الانتظار قليلاً قبل المحاولة مرة أخرى',
  'User not found': 'هذا الحساب غير موجود في النظام',
  'Email link is invalid or has expired': 'رابط التحقق غير صالح أو قد انتهت صلاحيته',
};

function LoginContent() {
  const [state, formAction, isPending] = useActionState(login, null)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const message = searchParams.get('message')
    if (message) {
      setSuccessMsg(message)
      const timer = setTimeout(() => { setSuccessMsg('') }, 6000)
      return () => clearTimeout(timer)
    }

    if (state?.message) {
      setErrorMsg(ERROR_MESSAGES[state.message] || state.message)
      const timer = setTimeout(() => { setErrorMsg('') }, 5000)
      return () => clearTimeout(timer)
    }
  }, [state, searchParams])

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 border border-slate-700 p-4 lg:p-8 rounded-3xl shadow-2xl">
          <header className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/10 rounded-2xl mb-4 border border-blue-500/20">
              <Lock size={30} color="#3b82f6" />
            </div>
            <h1 className="text-3xl font-extrabold text-white">مرحباً بك</h1>
            <p className="text-slate-400 mt-2">قم بتسجيل الدخول لإدارة مهامك</p>
          </header>
          <form action={formAction} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-400">البريد الإلكتروني</label>
              <input name="email" type="email" placeholder="البريد الإلكتروني" required
                className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-white placeholder:text-slate-600 focus:border-blue-500 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-sm text-slate-400">كلمة المرور</label>
                <Link href="/forgot-password" size="sm" className="text-xs text-blue-500 hover:underline">نسيت كلمة المرور؟</Link>
              </div>
              <input name="password" type="password" placeholder="كلمة المرور" required
                className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-white placeholder:text-slate-600 focus:border-blue-500 outline-none transition-all" />
            </div>
            {successMsg && <p className="text-center text-green-500 bg-green-500/10 p-3 rounded-xl text-sm mb-4">{successMsg}</p>}
            {errorMsg && <p className="text-center text-red-500 bg-red-500/10 p-3 rounded-xl text-sm mb-4">{errorMsg}</p>}
            <div className="flex flex-col gap-3 mt-4">
              <button type='submit' disabled={isPending}
                className={`w-full ${isPending ? "bg-slate-600" : "bg-blue-600 hover:bg-blue-500"} text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-900/20 transition-all`}>
                {isPending ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </button>
              <p className="text-white text-center">
                ليس لديك حساب؟
                <Link href="/signup" className="text-blue-500 font-bold cursor-pointer hover:underline transition-all mr-2">أنشئ حساب</Link>
              </p>
            </div>
          </form>
        </div>
        <p className="text-center text-slate-500 mt-8 text-sm">جميع الحقوق محفوظة  © مهامي  {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">جاري التحميل...</div>}>
      <LoginContent />
    </Suspense>
  )
}
