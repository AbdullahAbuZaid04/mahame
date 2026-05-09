'use client'

import { useActionState, useEffect } from "react";
import { addTask } from "../actions";
import { toast } from "sonner";

export default function AddTaskForm({ addOptimistic }) {
  const [state, formAction] = useActionState(addTask, null)

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message, { id: "add-task" });
    } else if (state) {
      toast.error(state.message, { id: "add-task" });
    }
  }, [state]);

  async function handleSubmit(formData) {
    const title = formData.get('title')
    addOptimistic({
      type: 'add',
      task: {
        id: Date.now(),
        title,
        is_completed: false,
        completed_at: null,
        created_at: new Date().toISOString(),
        user_id: 'optimistic'
      }
    })
    formAction(formData)
  }

  return (
    <section className="mb-10">
      <form action={handleSubmit} className="flex flex-col sm:flex-row gap-3 bg-slate-800 p-3 rounded-2xl border border-slate-700 shadow-lg focus-within:border-blue-500 transition-colors">
        <input
          name="title" type="text" required
          placeholder="ما الذي تنوي إنجازه اليوم؟"
          aria-label="عنوان المهمة الجديدة"
          className="bg-transparent border-none outline-none flex-1 px-3 py-2 sm:py-0 text-slate-100 placeholder:text-slate-500"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 sm:py-2 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-900/20">
          إضافة
        </button>
      </form>
    </section>
  )
}
