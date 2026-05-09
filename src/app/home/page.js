import { Suspense } from 'react'
import { getAllTasks } from './actions'
import Header from './_components/Header';
import TaskManager from './_components/TaskManager';

export default async function Home({ searchParams }) {
  const allTasks = await getAllTasks();
  const params = await searchParams;
  const filter = params.filter || 'all';

  const tasks = (allTasks || []).filter(task => {
    if (filter === 'completed') return task.is_completed === true;
    if (filter === 'uncompleted') return task.is_completed === false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <Header />
        <Suspense fallback={<div className="text-center text-slate-500 py-20">جاري تحميل المهام...</div>}>
          <TaskManager tasks={tasks} filter={filter} />
        </Suspense>
      </div>
    </div>
  );
}
