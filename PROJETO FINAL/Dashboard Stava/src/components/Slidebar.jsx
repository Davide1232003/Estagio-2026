import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  BarChart3,
  UserCircle,
  Settings,
  LogOut,
  ChevronRight,
  Footprints,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/dashboard",
    },
    { name: "Atividades", icon: <Activity size={18} />, path: "/atividades" },
    {
      name: "Equipamentos",
      icon: <Footprints size={18} />,
      path: "/equipamentos",
    },
    { name: "Análise", icon: <BarChart3 size={18} />, path: "/analise" },
    { name: "Perfil", icon: <UserCircle size={18} />, path: "/perfil" },
    { name: "Definições", icon: <Settings size={18} />, path: "/definicoes" },
  ];

  return (
    <aside className="w-64 bg-transparent border-r border-white/10 flex flex-col h-full py-6">
      {/* Logo Area */}
      <div className="px-8 mb-13">
        <h2 className="text-white text-3xl font-bold tracking-tight">
          STRAVA <span className="text-orange-500 font-light">DASH</span>
        </h2>
      </div>

      {/* Menu Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center justify-between w-full p-3.5 rounded-xl transition-all cursor-pointer group
                ${
                  isActive
                    ? "bg-blue-600/30 text-white shadow-[inset_0_0_10px_#3b82f650] border border-blue-500/50"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`${isActive ? "text-blue-400" : "text-slate-500 group-hover:text-white"}`}
                >
                  {item.icon}
                </span>
                <span className="font-medium text-sm">{item.name}</span>
              </div>
              {isActive && <ChevronRight size={16} className="text-blue-400" />}
            </button>
          );
        })}
      </nav>

      {/* Logout Botão */}
      <div className="px-4 mt-auto">
        <button
          onClick={() => navigate("/logout")}
          className="flex items-center justify-center gap-3 w-full p-3.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-colors cursor-pointer"
        >
          <LogOut size={18} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
