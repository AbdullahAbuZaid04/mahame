import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl mb-10 animate-pulse">
          <div className="h-5 w-48 bg-slate-700 rounded mb-2"></div>
          <div className="h-3 w-64 bg-slate-700 rounded"></div>
        </div>
        <div className="flex gap-3 bg-slate-800 p-3 rounded-2xl border border-slate-700 mb-10 animate-pulse">
          <div className="flex-1 h-10 bg-slate-700 rounded-xl"></div>
          <div className="w-20 h-10 bg-slate-700 rounded-xl"></div>
        </div>
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="text-blue-500 animate-spin" />
        </div>
      </div>
    </div>
  );
}
