'use client'

import { useRef } from "react";
import { addTask } from "../actions";
import { toast } from "sonner";

export default function AddTaskForm({ addOptimistic }) {

  const formRef = useRef(null);



  async function handleSubmit(formData) {
    const title = formData.get('title')
    if (!title.trim()) return;

    formRef.current?.reset();

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
    
    try {
      const result = await addTask(null, formData)
      if (result?.success) {
        toast.success(result.message);
      } else {
        toast.error(result?.message || "حدث خطأ أثناء الإضافة");
      }
    } catch (e) {
      toast.error("فشل الاتصال بالسيرفر");
    }
  }

  return (
    <section className="mb-10">
      <form ref={formRef} action={handleSubmit} className="flex flex-col sm:flex-row gap-3 bg-slate-800 p-3 rounded-2xl border border-slate-700 shadow-lg focus-within:border-blue-500 transition-colors">
        <label htmlFor="task-title" className="sr-only">عنوان المهمة الجديدة</label>
        <input
          id="task-title"
          name="title" type="text" required
          placeholder="ما الذي تنوي إنجازه اليوم؟"
          aria-label="عنوان المهمة الجديدة"
          className="bg-transparent border-none outline-none flex-1 px-3 py-2 sm:py-0 text-slate-100 placeholder:text-slate-300"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 sm:py-2 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-900/20">
          إضافة
        </button>
      </form>
    </section>
  )
}
