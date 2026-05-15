export default function Card({ icon, title, desc, centered = false }) {
  return (
    <div className={`group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-blue-500/20 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1 ${centered ? "text-center" : "text-right"}`}>
      <div
        className={`w-16 h-16 mb-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl font-extrabold text-blue-400 ${centered ? "mx-auto" : ""}`}
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-7 text-sm">{desc}</p>
    </div>
  )
}