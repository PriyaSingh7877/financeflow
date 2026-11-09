
export default function Header() {
  return (

    <header className="flex items-center justify-end gap-4 px-6 py-4 bg-white  border-b">
      <span className="text-xl cursor-pointer">🔔</span>
      <div className="flex items-center gap-2">
        <div className=" w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-semibold">
          P
        </div>
        <span className=" text-sm font-medium"> Priya Singh</span>
      </div>


    </header>
  );
}

