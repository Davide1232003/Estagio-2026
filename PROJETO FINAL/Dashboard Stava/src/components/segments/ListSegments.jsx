import { Mountain, Ruler, TrendingUp, Calendar } from "lucide-react";
import { formatDate, formatTime } from "../../utils/conversions";

function SegmentsList({ segment }) {
  const pr = segment.athlete_pr_effort;
  const stats = segment.athlete_segment_stats;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.01] transition-all duration-300 group">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-l font-black text-white italic uppercase tracking-tight truncate">
              {segment.name}
            </h3>
            {segment.city && (
              <p className="text-xs text-slate-500 mt-1">
                {segment.city}
                {segment.state ? `, ${segment.state}` : ""}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Características */}
      <div className="p-6 grid grid-cols-3 gap-4 border-b border-white/5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Ruler size={12} />
            <span className="text-[10px] font-black uppercase tracking-wider">
              Dist
            </span>
          </div>
          <p className="text-sm font-bold text-white">
            {segment.distance
              ? `${(segment.distance / 1000).toFixed(2)} km`
              : "--"}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-slate-500">
            <TrendingUp size={12} />
            <span className="text-[10px] font-black uppercase tracking-wider">
              Incl
            </span>
          </div>
          <p className="text-sm font-bold text-white">
            {segment.average_grade != null
              ? `${segment.average_grade.toFixed(1)}%`
              : "--"}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Mountain size={12} />
            <span className="text-[10px] font-black uppercase tracking-wider">
              Elev
            </span>
          </div>
          <p className="text-sm font-bold text-white">
            {segment.total_elevation_gain != null
              ? `${Math.round(segment.total_elevation_gain)} m`
              : "--"}
          </p>
        </div>
      </div>

      {/* Stats pessoais */}
      <div className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Melhor Tempo
          </span>
          <p className="text-lg text-white italic">
            {pr ? formatTime(pr.elapsed_time) : "--"}
          </p>
        </div>

        {pr?.start_date && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar size={14} className="text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wide">
                Data do PR
              </span>
            </div>
            <p className="text-xs text-white font-medium">
              {formatDate(pr.start_date)}
            </p>
          </div>
        )}

        {stats?.effort_count != null && (
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Tentativas
            </span>
            <p className="text-xs text-white font-medium">
              {stats.effort_count}x
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SegmentsList;
