import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  List,
  Activity,
  Timer,
  Mountain,
  Heart,
  Gauge,
} from "lucide-react";

import Menu from "../../components/Menu";
import StatCard from "../../components/cards/StatCard";
import ActivityItem from "../../components/activity/ActivityItem";
import Loading from "../../components/Loading";
import GoalsWidget from "../../components/graphs/GoalsWidget";
import WidgetCard from "../../components/cards/WidgetCard";

import { timeOptions, sportOptions } from "../../config/menuOptions";
import { useStravaActivities } from "../../hooks/useStravaActivities";
import { useDashboardStats } from "../../hooks/useDashboardStats";

import { setToken } from "../../utils/stravaClient";
import {
  formatDistance,
  formatHours,
  formatElevation,
  formatSpeed,
} from "../../utils/formatting";
import { calculatePeriodPace, calculatePaceTrend } from "../../utils/pace";
import { getTop3Records } from "../../utils/stats";

function Dashboard() {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState("30");
  const [sportFilter, setSportFilter] = useState("Run");

  const navigate = useNavigate();

  // Guarda o token imediatamente antes de qualquer fetch
  const tokenUrl = searchParams.get("token");
  if (tokenUrl) {
    setToken(tokenUrl);
    window.history.replaceState({}, document.title, "/dashboard");
  }

  // Chama o hook de atividades para obter os dados e o estado de loading
  const { activities, loading } = useStravaActivities();

  // Chama o hook
  const {
    currentFiltered = [],
    totalDistRaw = 0,
    totalTimeRaw = 0,
    totalElevRaw = 0,
    avgHR = "N/A",
    prevDistRaw = 0,
    prevTimeRaw = 0,
    prevElevRaw = 0,
    previousFilteredLength = 0,
  } = useDashboardStats(activities, filter, sportFilter);

  // Função de Percentagens
  const calculateTrend = (current, previous) => {
    if (!previous || previous === 0)
      return { text: "—", color: "text-slate-500" };

    const percent = ((current - previous) / previous) * 100;
    const formatted = Math.abs(percent).toFixed(1);

    if (percent > 0) {
      return {
        text: `▲ +${formatted}%`,
        color: "text-emerald-500 font-bold !text-[14px]",
      };
    } else if (percent < 0) {
      return {
        text: `▼ -${formatted}%`,
        color: "text-rose-500 font-bold !text-[14px]",
      };
    }
    return { text: "= 0%", color: "text-slate-500" };
  };

  // Cálculo do Pace Médio ou Velocidade Média
  const avgMetersPerSecond = totalTimeRaw > 0 ? totalDistRaw / totalTimeRaw : 0;

  const stats = [
    {
      title: "Atividades",
      value: currentFiltered.length,
      icon: <List size={20} />,
      color: "text-slate-400",
      trend: calculateTrend(currentFiltered.length, previousFilteredLength),
    },
    {
      title: "Volume KM",
      value: `${formatDistance(totalDistRaw)} km`,
      icon: <Activity size={20} />,
      color: "text-slate-400",
      trend: calculateTrend(totalDistRaw, prevDistRaw),
    },
    {
      title: "Total Horas",
      value: `${formatHours(totalTimeRaw)}`,
      icon: <Timer size={20} />,
      color: "text-slate-400",
      trend: calculateTrend(totalTimeRaw, prevTimeRaw),
    },
    {
      title: "Elevação",
      value: `${formatElevation(totalElevRaw)} m`,
      icon: <Mountain size={20} />,
      color: "text-slate-400",
      trend: calculateTrend(totalElevRaw, prevElevRaw),
    },
    {
      title: "FC Média",
      value: avgHR === "N/A" ? "---" : avgHR,
      icon: <Heart size={20} />,
      color: "text-slate-400",
      trend: null,
    },
    {
      title: sportFilter === "Ride" ? "Velocidade Média" : "Pace Médio",
      value:
        sportFilter === "Ride"
          ? `${formatSpeed(avgMetersPerSecond)} km/h`
          : `${calculatePeriodPace(totalTimeRaw, totalDistRaw)} min/km`,
      icon: <Gauge size={20} />,
      color: "text-slate-400",
      trend: calculatePaceTrend(
        totalDistRaw,
        totalTimeRaw,
        prevDistRaw,
        prevTimeRaw,
      ),
    },
  ];

  // Calcula os recordes reais de sempre filtrados pelo desporto atual
  const realRecordsData = getTop3Records(activities, sportFilter);

  // carrega o componete de loading enquanto o hook vai buscar os dados
  if (loading) return <Loading />;

  return (
    <div className="bg-white/1 backdrop-blur-[15px] border border-white/20 rounded-xl p-8 min-h-[calc(100vh-140px)] shadow-2xl animate-in fade-in duration-500 overflow-x-hidden">
      <div className="space-y-12">
        {/* Menus com filtros */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Menu
            options={sportOptions}
            activeValue={sportFilter}
            onChange={setSportFilter}
            layoutId="sport_menu"
            activeColorClass={
              sportFilter === "Run" ? "bg-orange-500/20" : "bg-blue-500/20"
            }
          />
          <Menu
            options={timeOptions}
            activeValue={filter}
            onChange={setFilter}
            layoutId="time_menu"
            activeColorClass="bg-slate-300/20"
          />
        </div>

        {/* StatCards com Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Recordes (top 3) */}
        <div className="w-full">
          <WidgetCard recordsData={realRecordsData} />
        </div>

        {/* Gráfico de Metas */}
        <GoalsWidget activities={activities} />

        {/* Últimas Atividades */}
        <div className="w-full">
          <h3 className="text-lg font-black text-white italic leading-none uppercase truncate mb-6">
            Últimas Atividades
          </h3>

          {/* Lista de Atividades */}
          <div className="space-y-3 pb-2">
            {currentFiltered.slice(0, 5).map((activity) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                onClick={() => navigate(`/atividades?id=${activity.id}`)}
              />
            ))}
          </div>

          {/* Botão Ver + */}
          <button
            onClick={() => navigate("/atividades")}
            className="mx-auto mt-4 flex items-center justify-center cursor-pointer w-full group"
          >
            <ChevronDown
              size={20}
              className="text-slate-500 group-hover:text-slate-300 transition-colors animate-bounce"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
