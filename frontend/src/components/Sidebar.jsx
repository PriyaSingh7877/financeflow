export default function Sidebar() {
  return (
    <aside className="w-56 h-screen sticky top-0 shrink-0 bg-slate-900 text-white flex flex-col justify-between p-4">
      <div>
        <h1 className="text-xl font-bold text-emerald-400 mb-8">FinanceFlow</h1>
        <nav className="space-y-2">
          <a className="block px-3 py-2 rounded-lg bg-emerald-700/40 cursor-pointer">Dashboard</a>
          <a className="block px-3 py-2 rounded-lg hover:bg-slate-800 cursor-pointer">Transactions</a>
        </nav>
      </div>
      <div className="space-y-2 text-sm text-slate-300">
        <a className="block px-3 py-2 hover:bg-slate-800 rounded-lg cursor-pointer">Settings</a>
        <a className="block px-3 py-2 hover:bg-slate-800 rounded-lg cursor-pointer">Logout</a>
      </div>
    </aside>
  );
}