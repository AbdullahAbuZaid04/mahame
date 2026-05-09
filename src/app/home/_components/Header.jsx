import { getUser, signOut } from "../actions";

export default async function Header() {
  const user = await getUser();
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
      <div className="flex flex-col min-w-0">
        <div className='flex items-center gap-1 min-w-0'>
          <h1 className="font-bold text-lg truncate">
            مرحبًا بك: <span className="text-blue-400">{user?.user_metadata?.display_name || "مستخدم"}</span> 👋
          </h1>
        </div>
        <p className="text-slate-500 text-xs my-1 truncate">البريد المسجل حاليًا: {user?.email}</p>
      </div>
      <form action={signOut} className="shrink-0 w-full sm:w-auto">
        <button type="submit" className="w-full sm:w-auto bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-xl transition-all duration-200 border border-red-500/20 active:scale-95 text-sm font-medium">
          تسجيل الخروج
        </button>
      </form>
    </header>

  )
}