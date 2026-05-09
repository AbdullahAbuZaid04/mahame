'use client'

import { updateTask } from "../actions";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup } from "@/components/ui/field";
import { PenLine } from "lucide-react";

export default function EditTaskDialog({ task, addOptimistic }) {




  async function handleSubmit(formData) {
    addOptimistic({
      type: 'update',
      task: {
        id: task.id,
        title: formData.get('title')
      }
    })
    
    try {
      const result = await updateTask(null, formData)
      if (result?.success) {
        toast.success(result.message);
      } else {
        toast.error(result?.message || "حدث خطأ أثناء التعديل");
      }
    } catch (e) {
      toast.error("فشل الاتصال بالسيرفر");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button title="تعديل المهمة" aria-label="تعديل المهمة" className="p-3 rounded-lg transition-all active:scale-90 hover:bg-blue-500/10">
          <PenLine size={20} className='text-blue-500' />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm bg-slate-900 border-slate-700 text-slate-100">
        <form action={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-right text-slate-100">تعديل المهمة</DialogTitle>
            <DialogDescription className="text-right text-slate-300">قم بتعديل المهمة هنا. انقر على حفظ عند الانتهاء.</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">المهمة</Label>
              <Input id="name-1" name="title" defaultValue={task.title} />
              <input type="hidden" name="id" value={task.id} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">حفظ التعديلات</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="outline" className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-100">إلغاء</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
