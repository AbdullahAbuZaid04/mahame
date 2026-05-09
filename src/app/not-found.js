import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full">
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
          <div className="relative bg-slate-800 border border-slate-700 p-6 rounded-3xl shadow-2xl">
            <AlertCircle size={64} className="text-red-500" />
          </div>
        </div>

        <h1 className="text-6xl font-black text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-200 mb-4">أوبس! لقد ضللت الطريق</h2>
        <p className="text-slate-500 mb-10 leading-relaxed">
          هذه الصفحة ليست مدرجة في قائمة مهامك اليوم.. ربما تم حذفها أو أنها لم تكن موجودة من الأساس.
        </p>

        <Link
          href="/home"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-900/30"
        >
          <Home size={20} />
          العودة للمهام الرئيسية
        </Link>
      </div>
    </div>
  );
}
