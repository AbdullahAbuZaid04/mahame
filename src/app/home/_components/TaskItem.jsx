'use client';

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useActionState, useEffect, startTransition } from "react";
import { deleteTask, toggleTaskStatus, updateTask } from "../actions";
import { RotateCcw, ClipboardCheck, Trash } from "lucide-react";
import { toast } from "sonner";
import EditTaskDialog from "./EditTaskDialog";

export default function TaskItem({ task, addOptimistic }) {
  const [stateToggle, formActionToggle] = useActionState(toggleTaskStatus, null)

  useEffect(() => {
    if (stateToggle?.success) toast.success(stateToggle.message, { id: `toggle-${task.id}` });
    else if (stateToggle?.success === false) toast.error(stateToggle.message, { id: `toggle-${task.id}` });
  }, [stateToggle, task.id]);

  async function handleToggle(formData) {
    addOptimistic({
      type: 'toggle',
      task: {
        id: task.id,
        is_completed: !task.is_completed,
        completed_at: !task.is_completed ? new Date().toISOString() : null
      }
    })
    formActionToggle(formData)
  }

  async function handleDelete() {
    const toastId = `delete-${task.id}`;
    toast.loading("جاري حذف المهمة...", { id: toastId });

    startTransition(async () => {
      addOptimistic({ type: 'delete', task: { id: task.id } })

      try {
        const formData = new FormData()
        formData.append('id', task.id)

        const result = await deleteTask(null, formData)

        if (result?.success) {
          toast.success(result.message, { id: toastId });
        } else {
          toast.error(result?.message || "حدث خطأ أثناء الحذف", { id: toastId });
        }
      } catch (error) {
        toast.error("فشل الاتصال بالسيرفر", { id: toastId });
      }
    })
  }

  return (
    <li className={`bg-slate-800 border border-slate-700 hover:border-slate-500 p-4 rounded-2xl transition-all duration-200 ${task.is_completed ? 'opacity-60' : ''}`}>
      <div className="flex justify-between items-center gap-3">
        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-2 h-2 rounded-full shrink-0 ${task.is_completed ? 'bg-slate-600' : 'bg-blue-500 animate-pulse'}`}></div>
            <span className={`text-slate-100 wrap-break-words overflow-hidden leading-relaxed ${task.is_completed ? 'line-through text-slate-500' : ''}`}>
              {task.title}
            </span>
          </div>
          <p className='text-[10px] text-slate-400 font-mono truncate flex flex-col'>
            حالة المهمة: {task.is_completed ? "مكتملة" : "غير مكتملة"}
            {task.is_completed && <span>تاريخ الإنجاز : {task.completed_at?.split('T')[0]}</span>}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <EditTaskDialog task={task} addOptimistic={addOptimistic} />
          <form action={handleToggle}>
            <input type="hidden" name="id" value={task.id} />
            <input type="hidden" name="currentStatus" value={task.is_completed.toString()} />
            <button type="submit"
              className={`p-2 rounded-lg transition-all active:scale-90 ${task.is_completed ? 'hover:bg-blue-500/10' : 'hover:bg-green-500/10'}`}
              title={task.is_completed ? "إعادة تعيين المهمة" : "إتمام المهمة"}
              aria-label={task.is_completed ? "إعادة تعيين المهمة" : "إتمام المهمة"}
            >
              {task.is_completed ? <RotateCcw size={20} className='text-blue-500' aria-hidden="true" /> : <ClipboardCheck size={20} className='text-green-500' aria-hidden="true" />}
            </button>
          </form>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="p-2 hover:bg-red-500/10 rounded-lg transition-all text-red-500" title="حذف المهمة" aria-label="حذف المهمة">
                <Trash size={20} aria-hidden="true" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-slate-900 border-slate-700 text-slate-100">
              <AlertDialogHeader>
                <AlertDialogTitle>هل أنت متأكد تماماً؟</AlertDialogTitle>
                <AlertDialogDescription className="text-slate-400">
                  هذا الإجراء لا يمكن التراجع عنه. سيتم حذف المهمة <span className="text-red-500">&quot;{task.title}&quot;</span> بشكل نهائي  .
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">تأكيد الحذف</AlertDialogAction>
                <AlertDialogCancel className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-100">إلغاء</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </li>
  );
}
