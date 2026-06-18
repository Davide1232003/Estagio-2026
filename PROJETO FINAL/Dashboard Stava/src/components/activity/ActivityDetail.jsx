import {
  Timer,
  Heart,
  Mountain,
  Gauge,
  Flame,
  TrendingUp,
  Zap,
  Wind,
  Trophy,
  ThumbsUp,
  Star,
  Dumbbell,
} from "lucide-react";

import StatCard from "../cards/StatCard";
import { isRunActivity } from "../../utils/activityType";

import {
  formatDistance,
  formatDate,
  formatHours,
  formatElevation,
  formatSpeed,
  formatElevPorKm,
} from "../../utils/formatting";
import { formatPace } from "../../utils/pace";

function ActivityDetail({ activity }) {
  if (!activity) {
    return (
      <div className="h-full flex items-center justify-center text-slate-500 italic">
        Seleciona uma atividade para ver os detalhes
      </div>
    );
  }

  const mapboxKey = import.meta.env.VITE_MAPBOX_KEY || "";

  const isRun = isRunActivity(activity);
  const paceValue =
    formatPace(activity.moving_time, activity.distance) + " min/km";
  const speedValue = formatSpeed(activity.average_speed) + " km/h";

  const getEnergyValue = () => {
    if (activity.calories) return `${Math.round(activity.calories)} kcal`;
    if (activity.kilojoules) return `${Math.round(activity.kilojoules)} kJ`;
    return "N/A";
  };

  const getHRValue = () => {
    const avg = activity.average_heartrate
      ? `${Math.round(activity.average_heartrate)}`
      : null;
    const max = activity.max_heartrate
      ? `${Math.round(activity.max_heartrate)}`
      : null;
    if (avg && max) return `${avg} / ${max} bpm`;
    if (avg) return `${avg} bpm`;
    return "N/A";
  };

  // Potência (ciclismo)
  const wattsValue = () => {
    if (activity.weighted_average_watts)
      return `${Math.round(activity.weighted_average_watts)} W (norm.)`;
    if (activity.average_watts)
      return `${Math.round(activity.average_watts)} W`;
    return null;
  };

  // Lógica da Foto do Mapa (MAPBOX STATIC API)
  const polyline = activity.map?.summary_polyline || activity.map?.polyline;
  const startLng = activity.start_latlng?.[1];
  const startLat = activity.start_latlng?.[0];
  const endLng = activity.end_latlng?.[1];
  const endLat = activity.end_latlng?.[0];

  const startMarker =
    startLat && startLng
      ? `pin-s-circle+00ff00(${startLng},${startLat})`
      : null;
  const endMarker =
    endLat && endLng ? `pin-s-embassy+ff0000(${endLng},${endLat})` : null;
  const markers = [startMarker, endMarker].filter(Boolean).join(",");

  const mapUrl =
    polyline && mapboxKey
      ? `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/${markers ? markers + "," : ""}path-3.5+f97316-0.9(${encodeURIComponent(polyline)})/auto/800x500?padding=70&access_token=${mapboxKey}`
      : null;

  const watts = wattsValue();

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 h-full flex flex-col">
      <div className="flex justify-between items-end shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
              {formatDate(activity.start_date)}
            </span>
            {activity.trainer && (
              <span className="text-[9px] font-black uppercase tracking-widest bg-blue-500/20 text-slate-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Dumbbell size={9} /> Indoor
              </span>
            )}
          </div>
          <h1 className="text-lg font-black text-white italic leading-none uppercase truncate">
            {activity.name}
          </h1>
        </div>
        <div className="text-right">
          <p className="text-xl font-black text-white leading-none italic">
            {formatDistance(activity.distance)}{" "}
            <span className="text-sm">KM</span>
          </p>
        </div>
      </div>

      {/* Mapa + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">
        {/* Mapa */}
        <div className="lg:col-span-8 h-64 lg:h-full min-h-80 rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative group">
          {mapUrl ? (
            <img
              src={mapUrl}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              alt="Mapa do Percurso"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-500 italic text-sm">
              {mapboxKey
                ? "Percurso indoor (sem GPS disponível)"
                : "Configura a tua Mapbox Token no .env"}
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
        </div>

        {/* StatCards */}
        <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-2 pr-1 overflow-y-auto custom-scrollbar text-xs">
          <div className="scale-95 origin-top-left space-y-2 flex flex-col h-full lg:h-auto lg:block *:py-1.5 *:px-3 *:min-h-0">
            <StatCard
              title="Tempo"
              value={formatHours(activity.moving_time)}
              icon={<Timer size={14} />}
              color="text-slate-400"
              showEmptyTrend={false}
            />
            <StatCard
              title="FC Méd / Máx"
              value={getHRValue()}
              icon={<Heart size={14} />}
              color="text-slate-400"
              showEmptyTrend={false}
            />
            <StatCard
              title={isRun ? "Pace" : "Velocidade"}
              value={isRun ? paceValue : speedValue}
              icon={<Gauge size={14} />}
              color="text-slate-400"
              showEmptyTrend={false}
            />
            <StatCard
              title="Ganho d+"
              value={`${formatElevation(activity.total_elevation_gain)} m`}
              icon={<Mountain size={14} />}
              color="text-slate-400"
              showEmptyTrend={false}
            />
            <StatCard
              title="Metros/KM"
              value={`${formatElevPorKm(activity.total_elevation_gain, activity.distance)} m/km`}
              icon={<TrendingUp size={14} />}
              color="text-slate-400"
              showEmptyTrend={false}
            />
            <StatCard
              title="Calorias"
              value={getEnergyValue()}
              icon={<Flame size={14} />}
              color="text-slate-400"
              showEmptyTrend={false}
            />
            {activity.average_cadence && (
              <StatCard
                title="Cadência"
                value={`${Math.round(activity.average_cadence)} rpm`}
                icon={<Wind size={14} />}
                color="text-slate-400"
                showEmptyTrend={false}
              />
            )}
            {watts && (
              <StatCard
                title="Potência"
                value={watts}
                icon={<Zap size={14} />}
                color="text-slate-400"
                showEmptyTrend={false}
              />
            )}
          </div>
        </div>
      </div>

      {/* Barra de contexto social */}
      <div className="shrink-0 flex flex-wrap items-center gap-4 px-1 text-xs text-slate-400">
        {activity.suffer_score != null && (
          <span className="flex items-center gap-1.5">
            Intensidade
            <span className="font-bold text-white">
              {activity.suffer_score}%
            </span>{" "}
          </span>
        )}
        {activity.kudos_count != null && (
          <span className="flex items-center gap-1.5">
            <ThumbsUp size={12} className="text-slate-500" />
            <span className="font-bold text-white">
              {activity.kudos_count}
            </span>{" "}
            Kudos
          </span>
        )}
        {activity.achievement_count != null &&
          activity.achievement_count > 0 && (
            <span className="flex items-center gap-1.5">
              <Trophy size={12} className="text-slate-500" />
              <span className="font-bold text-white">
                {activity.achievement_count}
              </span>{" "}
              Conquistas
            </span>
          )}
      </div>
    </div>
  );
}

export default ActivityDetail;
