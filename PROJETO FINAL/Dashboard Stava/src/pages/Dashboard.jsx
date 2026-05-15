import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Activity,
  Zap,
  Timer,
  Mountain,
  Loader2,
  Heart,
  List,
  Bike,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  formatDistance,
  formatHours,
  formatElevation,
  formatDate,
} from "../utils/conversions";
import { VolumeChart, ElevationChart } from "../components/graphs/Performance";
import { useChartData } from "../hooks/useChartData";

function Dashboard() {
  const [searchParams] = useSearchParams();
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("30");
  const [sportFilter, setSportFilter] = useState("Run"); // Estado inicial: Corrida
  const [stats, setStats] = useState([]);

  const navigate = useNavigate();

  const timeOptions = [
    { label: "7 Dias", val: "7" },
    { label: "15 Dias", val: "15" },
    { label: "1 Mês", val: "30" },
    { label: "3 Meses", val: "90" },
    { label: "6 Meses", val: "180" },
    { label: "1 Ano", val: "365" },
  ];

  const sportOptions = [
    { label: "Corrida", val: "Run", icon: <Activity size={14} /> },
    { label: "Ciclismo", val: "Ride", icon: <Bike size={14} /> },
  ];

  // Usamos o hook para processar os dados filtrados
  const chartData = useChartData(filteredActivities);

  useEffect(() => {
    const fetchStravaData = async () => {
      const tokenUrl = searchParams.get("token");
      if (tokenUrl) {
        localStorage.setItem("strava_token", tokenUrl);
        window.history.replaceState({}, document.title, "/dashboard");
      }

      const token = localStorage.getItem("strava_token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://www.strava.com/api/v3/athlete/activities",
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { per_page: 200 },
          },
        );
        setActivities(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do Strava", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStravaData();
  }, [searchParams]);

  useEffect(() => {
    if (activities.length === 0) return;

    const now = new Date();
    const cutoffDate = new Date();
    cutoffDate.setDate(now.getDate() - parseInt(filter));

    // FILTRO DUPLO: Tempo e Tipo de Desporto
    const filtered = activities.filter((act) => {
      const isWithinTime = new Date(act.start_date) >= cutoffDate;
      const isCorrectSport = act.type === sportFilter;
      return isWithinTime && isCorrectSport;
    });

    setFilteredActivities(filtered);

    const numActivities = filtered.length;
    const totalDistRaw = filtered.reduce((acc, curr) => acc + curr.distance, 0);
    const totalTimeRaw = filtered.reduce(
      (acc, curr) => acc + curr.moving_time,
      0,
    );
    const totalElevRaw = filtered.reduce(
      (acc, curr) => acc + curr.total_elevation_gain,
      0,
    );

    const hrActivities = filtered.filter((a) => a.has_heartrate);
    const avgHR =
      hrActivities.length > 0
        ? Math.round(
            hrActivities.reduce(
              (acc, curr) => acc + curr.average_heartrate,
              0,
            ) / hrActivities.length,
          )
        : "N/A";

    setStats([
      {
        title: "Atividades",
        value: numActivities,
        icon: <List size={20} />,
        color: "text-slate-400",
      },
      {
        title: "Volume KM",
        value: `${formatDistance(totalDistRaw)} km`,
        icon: <Activity size={20} />,
        color: "text-slate-400",
      },
      {
        title: "Total Horas",
        value: `${formatHours(totalTimeRaw)}h`,
        icon: <Timer size={20} />,
        color: "text-slate-400",
      },
      {
        title: "Elevação",
        value: `${formatElevation(totalElevRaw)} m`,
        icon: <Mountain size={20} />,
        color: "text-slate-400",
      },
      {
        title: "FC Média",
        value: avgHR !== "N/A" ? `${avgHR} bpm` : "N/A",
        icon: <Heart size={20} />,
        color: "text-slate-400",
      },
    ]);
  }, [filter, sportFilter, activities]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] gap-4">
        <Loader2 className="text-orange-500 animate-spin" size={48} />
        <p className="text-slate-400 animate-pulse">A carregar...</p>
      </div>
    );
  }

  return (
    <div className="bg-white/[0.01] backdrop-blur-[15px] border border-white/20 rounded-[30px] p-8 min-h-[calc(100vh-140px)] shadow-2xl animate-in fade-in duration-500">
      <div className="space-y-8">
        {/* HEADER COM SUB-MENU DUPLO */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Menu de Desporto (Run/Ride) */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 w-fit">
            {sportOptions.map((sport) => {
              const isActive = sportFilter === sport.val;
              return (
                <button
                  key={sport.val}
                  onClick={() => setSportFilter(sport.val)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer relative z-10 ${
                    isActive
                      ? "text-orange-500"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSportTab"
                      className="absolute inset-0 text-slate-400 rounded-lg shadow-[0_0_15px_rgba(234,88,12,0.4)]"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.5,
                      }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {sport.icon}
                  {sport.label}
                </button>
              );
            })}
          </div>

          {/* Menu de Tempo */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 relative w-fit">
            {timeOptions.map((opt) => {
              const isActive = filter === opt.val;
              return (
                <button
                  key={opt.val}
                  onClick={() => setFilter(opt.val)}
                  className={`relative px-3 py-1.5 text-[11px] font-bold rounded-lg transition-colors duration-300 cursor-pointer z-10 ${
                    isActive
                      ? "text-blue-500"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabDashboard"
                      className="absolute inset-0 text-slate-400 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                      transition={{
                        type: "spring",
                        bounce: 0.3,
                        duration: 0.6,
                      }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grelha de Mini-Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-4  flex flex-col gap-3 hover:border-white/10 transition-all duration-300 group min-w-0"
            >
              <div className="flex items-center gap-2.5 w-full">
                <div
                  className={`p-1.5 rounded-lg bg-white/5 ${stat.color} shrink-0`}
                >
                  {stat.icon}
                </div>
                <h3 className="text-lg font-semibold text-white tracking-tight truncate leading-none italic text-sm">
                  {stat.value}
                </h3>
              </div>
              <div className="w-full">
                <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.15em] leading-none truncate">
                  {stat.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Card */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 p-6 rounded-[24px]">
            {/* Seção Volume */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Volume de KM
                </h3>
              </div>
              <VolumeChart data={chartData} />
            </div>

            {/* Seção Elevação */}
            <div className="flex flex-col gap-4 border-t border-white/5 pt-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Elevação Acumulada
                </h3>
              </div>
              <ElevationChart data={chartData} />
            </div>
          </div>

          {/* Últimas Atividades */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-[24px]">
            <h3 className="text-lg font-semibold text-white mb-6">
              Ultimas Atividades
            </h3>
            <div className="space-y-4">
              {activities.slice(0, 5).map((activity) => (
                <div
                  key={activity.id}
                  onClick={() => navigate(`/atividades?id=${activity.id}`)}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 group hover:border-orange-500/30 transition-all hover:scale-101"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">
                      {activity.type === "Run" ? (
                        <Activity size={18} />
                      ) : (
                        <Bike size={18} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white truncate w-24">
                        {activity.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {formatDistance(activity.distance)} km •{" "}
                        {formatDate(activity.start_date)}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-115 transition-transform cursor-pointer">
                    ver +
                  </span>
                </div>
              ))}
              <button
                onClick={() => navigate("/atividades")}
                className="mx-auto mt-2 flex items-center justify-center cursor-pointer "
              >
                <ChevronDown
                  size={20}
                  className="text-slate-400 animate-bounce hover:animate-none hover:text-orange-400 transition-colors"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
