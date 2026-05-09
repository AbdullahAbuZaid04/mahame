# منصة مهامي - Mahame Platform

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)

**منصة مهامي** هي تطبيق ويب عصري لإدارة المهام الشخصية، مصمم ليوفر تجربة مستخدم سلسة، سريعة، وجميلة. يهدف التطبيق إلى مساعدتك في تنظيم جدولك اليومي وزيادة إنتاجيتك من خلال واجهة مستخدم بسيطة وقوية في آن واحد.

## المميزات الرئيسية

- **إدارة المهام كاملة (CRUD)**: إضافة، تعديل، حذف، وتغيير حالة المهام بسهولة.
- **نظام توثيق متكامل (Authentication)**: نظام آمن بالكامل لتسجيل الدخول وإنشاء الحسابات واستعادة كلمة المرور باستخدام **Supabase Auth**.
- **تعريب شامل (Full Arabic Support)**: واجهة مستخدم عربية بالكامل مع رسائل أخطاء مخصصة وواضحة.
- **خصوصية البيانات (Security)**: جميع المهام محمية بواسطة **Row Level Security (RLS)**، حيث لا يمكن لأي مستخدم الوصول إلا لمهامه الخاصة فقط.
- **تحديثات فورية (Optimistic UI)**: تجربة مستخدم فائقة السرعة حيث تظهر التعديلات والإشعارات فوراً.
- **نظام فلترة ذكي**: عرض المهام (الكل، المكتملة، غير المكتملة) بضغطة زر.
- **مؤشر إنجاز تفاعلي**: شريط تقدم يوضح نسبة إنجازك لمهامك اليومية.
- **تصميم عصري (Premium Dark UI)**: واجهة مستخدم مريحة للعين تعتمد على أحدث صيحات التصميم.

## التقنيات المستخدمة

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Notifications**: [Sonner](https://sonner.stevenly.me/)

## التشغيل المحلي

1. **نسخ المستودع**:
   ```bash
   git clone https://github.com/AbdullahAbuZaid04/mahame.git
   ```

2. **تثبيت المكتبات**:
   ```bash
   npm install
   ```

3. **إعداد متغيرات البيئة**:
   قم بإنشاء ملف `.env.local` وأضف البيانات التالية:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   NEXT_PUBLIC_SITE_URL=your_site_url
   ```

4. **تشغيل المشروع**:
   ```bash
   npm run dev
   ```

## ملاحظات هامة
- تأكد من تفعيل **Email Confirmation** في إعدادات Supabase ليعمل نظام التسجيل بشكل صحيح.
- عند النشر (Deployment)، قم بتغيير `NEXT_PUBLIC_SITE_URL` إلى رابط موقعك الحقيقي لتصل روابط استعادة كلمة المرور بشكل صحيح.