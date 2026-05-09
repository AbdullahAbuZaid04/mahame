'use client'

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Tabs() {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get('filter') || 'all';

  return (
    <div role="tablist" aria-label="تصنيف المهام" className="flex justify-center items-center gap-3 bg-slate-800 p-1 rounded-xl border border-slate-700 shadow-md w-full sm:w-auto">
      <Link href="?filter=all"
        role="tab"
        aria-selected={currentFilter === 'all'}
        className={`flex-1 sm:flex-none text-center px-2 py-3 md:px-6 rounded-lg transition-all text-sm font-medium ${currentFilter === 'all' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-300 hover:text-slate-100 hover:bg-slate-700'}`}>
        الكل
      </Link>
      <Link href="?filter=completed"
        role="tab"
        aria-selected={currentFilter === 'completed'}
        className={`flex-1 sm:flex-none text-center px-2 py-3 md:px-6 rounded-lg transition-all text-sm font-medium ${currentFilter === 'completed' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-300 hover:text-slate-100 hover:bg-slate-700'}`}>
        المكتملة
      </Link>
      <Link href="?filter=uncompleted"
        role="tab"
        aria-selected={currentFilter === 'uncompleted'}
        className={`flex-1 sm:flex-none text-center px-2 py-3 md:px-6 rounded-lg transition-all text-sm font-medium ${currentFilter === 'uncompleted' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-300 hover:text-slate-100 hover:bg-slate-700'}`}>
        غير المكتملة
      </Link>
    </div>
  );
}
