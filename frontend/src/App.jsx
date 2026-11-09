
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function App(){
  return(

<div className="flex  min-h-screen bg-slate-50 " >
  <Sidebar />
  

<div className="flex-1 ">
  <Header />
   <Dashboard />
   
</div>
</div>

  )
}

