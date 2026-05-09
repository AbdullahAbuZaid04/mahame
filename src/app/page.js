import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-12 w-full max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-500 text-center">أهلاً بك في منصة مهامي</h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">

          <div className="flex flex-col items-center gap-4">
            <p className="text-lg md:text-xl text-slate-300">لديك حساب بالفعل؟</p>
            <Link href="/login" className="text-xl md:text-2xl w-64 py-3 text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-all active:scale-95">
              تسجيل الدخول
            </Link>
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="text-lg md:text-xl text-slate-300">ليس لديك حساب؟</p>
            <Link href="/signup" className="text-xl md:text-2xl w-64 py-3 text-center text-white bg-transparent border-2 border-blue-500 rounded-lg hover:bg-blue-500 transition-all active:scale-95">
              إنشاء حساب
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
