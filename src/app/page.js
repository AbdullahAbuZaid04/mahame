"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CheckCircle2,
  Flag,
  Zap,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import Card from "./_components/Card";

const features = [
  {
    id: 1,
    icon: CheckCircle2,
    title: "إدارة المهام بسهولة",
    desc: "أنشئ مهامك اليومية، وأنجزها واحدة تلو الأخرى. كل شيء في مكان واحد دون تشتت.",
  },
  {
    id: 2,
    icon: Flag,
    title: "تصنيف المهام حسب الإكتمال",
    desc: "تابع مهامك المكتملة وغير المكتملة بنظرة واحدة. اعرف بالضبط أين أنت وما الذي تبقى لإنجازه.",
  },
  {
    id: 3,
    icon: Zap,
    title: "واجهة سهلة الاستخدام",
    desc: "صُممت المنصة لتبدأ فورًا دون أي تعلّم أو إعداد. افتح، أضف مهمتك، وأنجزها بهذه البساطة.",
  },
];

const steps = [
  {
    id: 1,
    num: "1",
    title: "إنشاء حساب",
    desc: "سجّل مجانًا خلال ثوانٍ باستخدام بريدك الإلكتروني.",
  },
  {
    id: 2,
    num: "2",
    title: "أضف مهامك",
    desc: "أنشئ مهامك وابدأ بتنظيم يومك بسهولة.",
  },
  {
    id: 3,
    num: "3",
    title: "أنجزها وتابع تقدمك",
    desc: "راقب نسبة الإنجاز وتابع تقدمك خطوة بخطوة.",
  },
];

export default function LandingPage() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-blue-500/30 selection:text-blue-100"
    >
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1 text-xl font-bold tracking-tight"
          >
            <span className="text-white text-2xl md:text-3xl">مهامي</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-5 py-2.5 text-base font-semibold text-slate-200 transition-all duration-300"
            >
              تسجيل الدخول
            </Link>

            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 active:scale-95"
            >
              ابدأ مجانًا
            </Link>
          </div>

          <button
            onClick={() => setNavOpen(!navOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
            aria-label="فتح القائمة"
            aria-expanded={navOpen}
            aria-controls="mobile-menu"
          >
            {navOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {navOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-5 space-y-3">
              <Link
                href="/login"
                onClick={() => setNavOpen(false)}
                className="block text-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base font-semibold text-slate-200"
              >
                تسجيل الدخول
              </Link>

              <Link
                href="/signup"
                onClick={() => setNavOpen(false)}
                className="block text-center rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white"
              >
                ابدأ مجانًا
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main id="main-content">
        {/* Hero Section */}
        <section className="min-h-[90vh] flex items-center pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-center text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-relaxed text-white mb-6">
              نظّم <span className="text-blue-500">مهامك</span> <br /> وأنجز أكثر
            </h1>

            <p className="text-center text-lg sm:text-xl leading-8 text-slate-400 max-w-2xl mx-auto mb-10">
              منصة متكاملة تساعدك على تنظيم مهامك ومتابعة إنجازاتك بسهولة.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-8 py-4 text-base font-semibold text-white transition-all duration-300 active:scale-95"
              >
                ابدأ مجانًا
                <ArrowLeft
                  size={18}
                  className="transition-transform group-hover:-translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-8 py-4 text-base font-semibold text-slate-200 transition-all duration-300"
              >
                شاهد المميزات
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 mb-4">
                المميزات
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                كل ما تحتاجه لإدارة مهامك
              </h2>

              <p className="text-slate-400 text-lg leading-8">
                من خلال «مهامي» يمكنك تنظيم مهامك اليومية وإدارة أعمالك بكفاءة.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={feature.id}
                    icon={<Icon className="w-6 h-6 text-blue-400" aria-hidden="true" />}
                    title={feature.title}
                    desc={feature.desc}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 mb-4">
                كيف يعمل
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                ابدأ في ثلاث خطوات بسيطة
              </h2>

              <p className="text-slate-400 text-lg leading-8">
                من التسجيل إلى الإنجاز خلال دقائق، دون أي تعقيد.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((step) => (
                <Card
                  key={step.id}
                  icon={step.num}
                  title={step.title}
                  desc={step.desc}
                  centered={true}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm p-8 sm:p-12 text-center">
              <span className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 mb-4">
                ابدأ الآن
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                جاهز لتنظيم مهامك
              </h2>

              <p className="text-lg leading-8 text-slate-400 max-w-2xl mx-auto mb-8">
                انضم اليوم مجانًا وابدأ بتنظيم مهامك وزيادة إنتاجيتك بطريقة بسيطة.
              </p>

              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 px-8 py-4 text-base font-semibold text-white transition-all duration-300 active:scale-95"
              >
                ابدأ مجانًا
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-sm text-slate-500">
        <div className="max-w-7xl mx-auto">
          <p>جميع الحقوق محفوظة © مهامي {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
