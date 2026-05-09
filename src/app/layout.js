import { Cairo } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});

export const metadata = {
  title: "منصة مهامي - مدير المهام الذكي",
  description: "نظم حياتك وأنجز مهامك اليومية بسهولة مع منصة مهامي. تطبيق بسيط، سريع، وفعال لإدارة المهام الشخصية والعملية.",
  keywords: ["مدير مهام", "تنظيم الوقت", "مهامي", "تطبيق انتاجية", "Next.js", "Supabase"],
  authors: [{ name: "تطوير منصة مهامي" }],
  themeColor: "#1e293b",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html dir="rtl" lang="ar" data-scroll-behavior="smooth" className={`${cairo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Toaster position="top-left" richColors />
        {children}
      </body>
    </html>
  );
}
