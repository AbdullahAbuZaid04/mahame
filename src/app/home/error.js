'use client'

import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="bg-red-500/10 p-4 rounded-2xl border border-red-500/20">
              <AlertCircle size={48} className="text-red-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">حدث خطأ غير متوقع</h2>
          <p className="text-slate-400 mb-6 leading-relaxed">
            {error?.message || "نأسف، حدث خطأ أثناء تحميل الصفحة. يرجى المحاولة مرة أخرى."}
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95"
          >
            <RefreshCw size={18} />
            إعادة المحاولة
          </button>
        </div>
      </div>
    </div>
  );
}
