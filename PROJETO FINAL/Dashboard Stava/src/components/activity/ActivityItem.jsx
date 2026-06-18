import { Bike, Footprints } from "lucide-react";
import { isRunActivity } from "../../utils/activityType";
import {
  formatDistance,
  formatDate,
  formatHours,
  formatElevation,
} from "../../utils/formatting";

function ActivityItem({ activity, onClick, compact = false }) {
  const isRun = isRunActivity(activity);

  const hoverBgClass = isRun
    ? "group-hover:bg-orange-500/10"
    : "group-hover:bg-blue-500/10";
  const hoverTextClass = isRun
    ? "group-hover:text-orange-400"
    : "group-hover:text-blue-400";

  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 group transition-all  cursor-pointer`}
    >
      {/* Lado Esquerdo */}
      <div
        className={`flex items-center gap-3 truncate ${compact ? "w-full" : "w-[40%]"}`}
      >
        <div
          className={`w-10 h-10 rounded-lg bg-slate-500/20 flex items-center justify-center text-slate-400 shrink-0 transition-colors ${hoverBgClass} ${hoverTextClass}`}
        >
          {isRun ? <Footprints size={18} /> : <Bike size={18} />}
        </div>

        <div className="truncate flex-1 min-w-0">
          <h4
            className={`text-sm font-semibold text-white truncate transition-colors ${hoverTextClass}`}
          >
            {activity.name}
          </h4>

          {compact ? (
            <p className="text-[10px] text-slate-400 uppercase tracking-tight mt-0.5">
              {formatDistance(activity.distance)} km •{" "}
              {formatDate(activity.start_date)}
            </p>
          ) : (
            <p className="text-xs text-slate-400 mt-0.5">
              {formatDate(activity.start_date)}
            </p>
          )}
        </div>
      </div>

      {/* Lado Direito*/}
      {!compact && (
        <div className="flex items-center justify-end gap-12 w-[60%] text-right">
          <div>
            <p className="text-xs text-slate-400 uppercase font-medium tracking-wider">
              Distância
            </p>
            <p className="text-sm font-bold text-white mt-0.5">
              {formatDistance(activity.distance)} km
            </p>
          </div>
          <div className="w-20">
            <p className="text-xs text-slate-400 uppercase font-medium tracking-wider">
              Tempo
            </p>
            <p className="text-sm font-bold text-white mt-0.5">
              {formatHours(activity.moving_time)}
            </p>
          </div>
          <div className="w-20">
            <p className="text-xs text-slate-400 uppercase font-medium tracking-wider">
              Elevação
            </p>
            <p className="text-sm font-bold text-white mt-0.5">
              +{formatElevation(activity.total_elevation_gain)} m
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivityItem;
