'use client'

import Link from 'next/link'
import { useActionState, useEffect, useState } from 'react'
import { signup } from './actions'
import { Lock } from 'lucide-react';

const ERROR_MESSAGES = {
  'User already registered': 'يوجد حساب مسجل بهذا البريد الإلكتروني مسبقاً',
  'Password should be at least 6 characters.': 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
  'Signup requires a valid password': 'يرجى إدخال كلمة مرور قوية وصالحة',
  'email rate limit exceeded': 'محاولات كثيرة ، يرجى الانتظار قليلاً قبل المحاولة مرة أخرى',
};

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signup, null)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        setSuccessMsg(state.message)
        setErrorMsg('')
      } else {
        setErrorMsg(ERROR_MESSAGES[state.message] || state.message)
        setSuccessMsg('')
      }
      const timer = setTimeout(() => {
        setErrorMsg('')
        setSuccessMsg('')
      }, 8000)
      return () => clearTimeout(timer)
    }
  }, [state])

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 border border-slate-700 p-4 lg:p-8 rounded-3xl shadow-2xl">
          <header className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/10 rounded-2xl mb-4 border border-blue-500/20">
              <Lock size={30} color="#3b82f6" />
            </div>
            <h1 className="text-3xl font-extrabold text-white">أنشئ حساب</h1>
            <p className="text-slate-400 mt-2">قم بإنشاء حساب لإدارة مهامك</p>
          </header>
          <form action={formAction} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-400">اسم المستخدم</label>
              <input name="username" type="text" placeholder="اسم المستخدم" required
                className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-white placeholder:text-slate-600 focus:border-blue-500 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-400">البريد الإلكتروني</label>
              <input name="email" type="email" placeholder="البريد الإلكتروني" required
                className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-white placeholder:text-slate-600 focus:border-blue-500 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-400">كلمة المرور</label>
              <input name="password" type="password" placeholder="كلمة المرور" required
                className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-white placeholder:text-slate-600 focus:border-blue-500 outline-none transition-all" />
            </div>
            {successMsg && <p className="text-green-500 text-sm bg-green-500/10 p-3 rounded-xl text-center">{successMsg}</p>}
            {errorMsg && <p className="text-red-500 text-sm bg-red-500/10 p-3 rounded-xl text-center">{errorMsg}</p>}
            <div className="flex flex-col gap-3 mt-4">
              <button type='submit' disabled={isPending}
                className={`w-full ${isPending ? "bg-slate-600" : "bg-blue-600 hover:bg-blue-500"} text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-900/20 transition-all`}>
                {isPending ? 'جاري التسجيل...' : 'إنشاء حساب'}
              </button>
              <p className="text-white text-center mt-3">
                لديك حساب بالفعل؟
                <Link href="/login" className="text-blue-500 font-bold cursor-pointer hover:underline transition-all mr-2">تسجيل الدخول</Link>
              </p>
            </div>
          </form>
        </div>
        <p className="text-center text-slate-500 mt-8 text-sm">جميع الحقوق محفوظة  © مهامي  {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}
