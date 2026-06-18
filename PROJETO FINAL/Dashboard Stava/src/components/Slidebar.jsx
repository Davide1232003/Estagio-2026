import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  History,
  Calendar,
  Mountain,
  Footprints,
  Map,
  Trophy,
  User,
  LogOut,
  BarChart3,
  Heart,
  PieChart,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuGroups = [
    {
      title: "ANÁLISE GERAL",
      items: [
        {
          name: "Painel Principal",
          icon: <LayoutDashboard size={18} />,
          path: "/dashboard",
        },
        {
          name: "Atividades",
          icon: <History size={18} />,
          path: "/atividades",
        },
        {
          name: "Calendário",
          icon: <Calendar size={18} />,
          path: "/calendario",
        },
      ],
    },
    {
      title: "PERFORMANCE",
      items: [
        {
          name: "Volume",
          icon: <BarChart3 size={20} />,
          path: "/volume",
        },
        {
          name: "Altimetria",
          icon: <Mountain size={20} />,
          path: "/elevacao",
        },
        {
          name: "Zonas de Ritmo",
          icon: <Heart size={20} />,
          path: "/zonas-de-ritmo",
        },
        {
          name: "Estatísticas",
          icon: <PieChart size={20} />,
          path: "/estatisticas",
        },
      ],
    },
    {
      title: "ATLETA",
      items: [
        {
          name: "Equipamentos",
          icon: <Footprints size={18} />,
          path: "/equipamentos",
        },
        {
          name: "Segmentos",
          icon: <Map size={18} />,
          path: "/segmentos",
        },
        {
          name: "Recordes",
          icon: <Trophy size={18} />,
          path: "/recordes",
        },
        {
          name: "Perfil",
          icon: <User size={18} />,
          path: "/perfil",
        },
      ],
    },
  ];

  return (
    <aside className="w-66 bg-transparent border-r border-white/10 flex flex-col h-full py-6">
      <div className="px-8 mb-13">
        <h2 className="text-white text-3xl font-bold tracking-tight">
          STRAVA <span className="text-orange-500 font-light">DASH</span>
        </h2>
      </div>

      {/* Menu Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto space-y-8 custom-scrollbar">
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-2">
            <h3 className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              {group.title}
            </h3>

            {/* Itens do Grupo */}
            <div className="space-y-1">
              {group.items.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={index}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center justify-between w-full p-3 rounded-xl cursor-pointer group
                      transition-all duration-300 ease-out
                      ${
                        isActive
                          ? "bg-slate-400/20 text-white border border-slate-500/30 shadow-[inset_0_0_15px_rgba(251,145,60,0.1)]"
                          : "text-slate-400 border border-transparent hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`transition-colors duration-200 ease-out ${
                          isActive
                            ? "text-slate-200"
                            : "text-slate-500 group-hover:text-white"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="font-medium text-xs tracking-wide">
                        {item.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout Botão */}
      <div className="px-4 mt-auto">
        <button
          onClick={() => navigate("/logout")}
          className="flex items-center justify-center gap-3 w-full p-4 mt-8 text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all duration-200 ease-out cursor-pointer"
        >
          <LogOut size={18} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
