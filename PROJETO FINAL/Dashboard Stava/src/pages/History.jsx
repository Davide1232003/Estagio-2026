import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  formatElevation,
  formatTime,
  formatDate,
  formatDistance,
  formatPace,
} from "../utils/conversions";
import {
  Activity,
  Calendar,
  ChevronRight,
  Timer,
  Zap,
  Heart,
  Gauge,
  Wind,
  Map as MapIcon,
  Loader2,
} from "lucide-react";

function History() {
  const [searchParams] = useSearchParams();
  const activityIdFromUrl = searchParams.get("id"); // Captura o ID da atividade para ir direto atividade selecionada

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("7");
  const [selectedActivity, setSelectedActivity] = useState(null);

  const fetchActivities = async (days) => {
    setLoading(true);
    const token = localStorage.getItem("strava_token");
    if (!token) return;

    const effectiveDays = activityIdFromUrl ? 60 : days; // Se temos um ID na URL, buscamos mais atividades para garantir que ele esteja na lista
    const after = Math.floor(Date.now() / 1000) - effectiveDays * 24 * 60 * 60; // Timestamp para o filtro de atividades recentes

    try {
      const response = await axios.get(
        "https://www.strava.com/api/v3/athlete/activities",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { after: after, per_page: 100 },
        },
      );

      const sorted = response.data.sort(
        (a, b) => new Date(b.start_date) - new Date(a.start_date),
      );
      setActivities(sorted);

      if (activityIdFromUrl) {
        // Comparação robusta de ID
        const activityFromUrl = sorted.find(
          (a) => String(a.id) === String(activityIdFromUrl),
        );

        if (activityFromUrl) {
          setSelectedActivity(activityFromUrl);
          // Se o filtro era 7 mas a atividade é mais antiga, atualizamos o botão visualmente
          if (activityIdFromUrl && days === "7") {
            // Opcional: setFilter("60");
          }
        } else if (sorted.length > 0) {
          setSelectedActivity(sorted[0]);
        }
      } else if (sorted.length > 0 && !selectedActivity) {
        setSelectedActivity(sorted[0]);
      }
    } catch (error) {
      console.error("Erro ao buscar atividades", error);
    } finally {
      setLoading(false);
    }
  };

  // Dispara a busca sempre que o filtro de dias ou o ID no URL mudarem
  useEffect(() => {
    fetchActivities(filter);
  }, [filter, activityIdFromUrl]);

  return (
    <div className="bg-white/[0.01] backdrop-blur-[15px] border border-white/20 rounded-[30px] p-8 min-h-[calc(100vh-140px)] shadow-2xl animate-in fade-in duration-500">
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* HEADER E FILTROS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Minhas Atividades</h1>
            <p className="text-slate-400 text-sm">
              Histórico de treinos e performance.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 relative">
            {[
              { label: "7 Dias", val: "7" },
              { label: "1 Mês", val: "30" },
              { label: "2 Meses", val: "60" },
            ].map((btn) => {
              const isActive = filter === btn.val;
              return (
                <button
                  key={btn.val}
                  onClick={() => setFilter(btn.val)}
                  className={`relative px-3 py-1.5 text-[11px] font-bold rounded-lg transition-colors duration-300 cursor-pointer z-10 ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0  rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                      transition={{
                        type: "spring",
                        bounce: 0.4,
                        duration: 0.7,
                      }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LISTA DE ATIVIDADES */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {loading ? (
              <div className="flex flex-col items-center justify-center p-20 text-slate-500 gap-4">
                <Loader2 className="animate-spin text-orange-500" size={32} />
                <p>A carregar...</p>
              </div>
            ) : activities.length > 0 ? (
              activities.map((act) => (
                <div
                  key={act.id}
                  onClick={() => setSelectedActivity(act)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    selectedActivity?.id === act.id
                      ? "bg-orange-500/10 border-orange-500/50"
                      : "bg-white/5 border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-600/20 flex items-center justify-center text-orange-500">
                      <Activity size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">
                        {act.name}
                      </h4>
                      <p className="text-xs text-slate-300 flex items-center gap-2">
                        <Calendar size={12} />{" "}
                        {new Date(act.start_date).toLocaleDateString()}
                        <MapIcon size={12} /> {(act.distance / 1000).toFixed(2)}{" "}
                        km
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className={`transition-colors ${
                      selectedActivity?.id === act.id
                        ? "text-orange-500"
                        : "text-slate-600 group-hover:text-white"
                    }`}
                  />
                </div>
              ))
            ) : (
              <div className="text-slate-500 text-center p-10">
                Nenhuma atividade encontrada.
              </div>
            )}
          </div>

          {/* Atividade Detalhada */}
          <div className="sticky top-0">
            {selectedActivity ? (
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[30px] overflow-hidden animate-in slide-in-from-right-4 duration-500">
                <div className="h-48 bg-slate-800 relative flex items-center justify-center">
                  <div className="text-center">
                    <MapIcon
                      size={40}
                      className="text-slate-600 mx-auto mb-2"
                    />
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                      Trajeto GPS
                    </p>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {selectedActivity.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Realizada em{" "}
                      {new Date(selectedActivity.start_date).toLocaleString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <MetricItem
                      icon={<Timer size={14} />}
                      label="Tempo"
                      value={formatTime(selectedActivity.moving_time)}
                      color="text-slate-400"
                    />
                    <MetricItem
                      icon={<Heart size={14} />}
                      label="Batimentos"
                      value={
                        selectedActivity.has_heartrate
                          ? `${Math.round(selectedActivity.average_heartrate)} bpm`
                          : "---"
                      }
                      color="text-slate-400"
                    />
                    <MetricItem
                      icon={<Activity size={14} />}
                      label="Pace"
                      value={`${formatPace(selectedActivity.average_speed)} min/km`}
                      color="text-slate-400"
                    />
                    <MetricItem
                      icon={<Gauge size={14} />}
                      label="Vel. Máxima"
                      value={`${(selectedActivity.max_speed * 3.6).toFixed(1)} km/h`}
                      color="text-slate-400"
                    />
                    <MetricItem
                      icon={<Wind size={14} />}
                      label="Elevação"
                      value={`${formatElevation(selectedActivity.total_elevation_gain)} m`}
                      color="text-slate-400"
                    />
                    <MetricItem
                      icon={<Zap size={14} />}
                      label="Potência"
                      value={
                        selectedActivity.average_watts
                          ? `${selectedActivity.average_watts.toFixed(0)} W`
                          : "---"
                      }
                      color="text-slate-400"
                    />
                  </div>

                  {selectedActivity.description && (
                    <div className="bg-white/5 p-4 rounded-2xl border border-dashed border-white/10 text-sm text-slate-300 italic">
                      "{selectedActivity.description}"
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[400px] border-2 border-dashed border-white/5 rounded-[30px] flex items-center justify-center text-slate-600 text-sm italic">
                Seleciona uma atividade para ver os detalhes
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricItem({ icon, label, value, color }) {
  return (
    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
      <div className={`flex items-center gap-2 mb-1 ${color}`}>
        {icon} <span className="text-[10px] font-bold uppercase">{label}</span>
      </div>
      <p className="text-lg font-bold text-white">{value}</p>
    </div>
  );
}

export default History;
