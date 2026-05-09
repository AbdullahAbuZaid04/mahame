'use client'

import { Suspense } from "react";
import Tabs from "./Tabs";
import TaskItem from "./TaskItem";
import TaskProgress from "./TaskProgress";

export default function TaskList({ tasks, filter, addOptimistic }) {
  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white">قائمة المهام</h2>
          <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
        <div className="w-full md:w-auto">
          <Suspense fallback={<div className="h-10 w-64 bg-slate-800 rounded-xl animate-pulse"></div>}>
            <Tabs />
          </Suspense>
        </div>
      </div>

      <TaskProgress tasks={tasks} filter={filter} />

      <ul className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem task={task} key={task.id} addOptimistic={addOptimistic} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-700">
            <p className="text-slate-500 text-lg">لا توجد مهام حالياً</p>
          </div>
        )}
      </ul>
    </section>
  )
}
