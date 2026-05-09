export default function TaskProgress({ tasks, filter }) {
  const shouldShow = !filter || filter === 'all';

  if (!shouldShow || tasks.length === 0) return null;

  const completedCount = tasks.filter(t => t.is_completed).length;
  const percentage = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className='w-full mb-5'>
      <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
        <div className="flex justify-between mb-2 text-xs font-medium">
          <span className="text-blue-400">نسبة الإنجاز</span>
          <span className="text-slate-400">{percentage}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
