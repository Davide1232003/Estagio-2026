import { Footprints, Bike, Trophy, MapPin } from "lucide-react";
import { formatTime } from "../../utils/formatting";
import SegmentCard from "../cards/SegmentCard";
import { isRunActivity } from "../../utils/activityType";

function FavoriteSegments({ segment }) {
  if (!segment) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-slate-500 italic text-center">
          Segmento não encontrado.
        </p>
      </div>
    );
  }

  const isRun = segment.activity_type === "Run"; // segmento usa activity_type diretamente
  const location = [segment.city, segment.state, segment.country]
    .filter(Boolean)
    .join(", ");
  const prTime = segment.athlete_segment_stats?.pr_elapsed_time;
  const myEfforts = segment.athlete_segment_stats?.effort_count;
  const kom = segment.xoms?.kom;
  const qom = segment.xoms?.qom;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-5 hover:bg-white/[0.07] transition-colors">
      {/* Cabeçalho */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2 text-slate-400">
            {isRun ? <Footprints size={14} /> : <Bike size={14} />}
            <span className="text-[10px] font-black uppercase tracking-widest">
              {isRun ? "Corrida" : "Ciclismo"}
            </span>
          </div>
          <p className="text-sm font-bold text-orange-400 leading-tight">
            {segment.name}
          </p>
          {location && (
            <div className="flex items-center gap-1 text-slate-500">
              <MapPin size={10} />
              <span className="text-[10px]">{location}</span>
            </div>
          )}
        </div>
        {segment.pr_rank && (
          <div className="flex items-center gap-1 text-yellow-500 shrink-0">
            <Trophy size={14} />
            <span className="text-xs font-black">#{segment.pr_rank}</span>
          </div>
        )}
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/5">
        <SegmentCard
          label="Distância"
          value={segment.distance ? `${(segment.distance / 1000).toFixed(2)} km` : null}
        />
        <SegmentCard
          label="Elevação"
          value={segment.total_elevation_gain != null ? `${Math.round(segment.total_elevation_gain)} m` : null}
        />
        <SegmentCard
          label="Declive Méd."
          value={segment.average_grade != null ? `${segment.average_grade}%` : null}
        />
        <SegmentCard
          label="Declive Máx."
          value={segment.maximum_grade != null ? `${segment.maximum_grade}%` : null}
        />
        <SegmentCard
          label="Alt. Máxima"
          value={segment.elevation_high != null ? `${Math.round(segment.elevation_high)} m` : null}
        />
        <SegmentCard
          label="Alt. Mínima"
          value={segment.elevation_low != null ? `${Math.round(segment.elevation_low)} m` : null}
        />
      </div>

      {/* O meu desempenho */}
      <div className="pt-3 border-t border-white/5 space-y-2">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          O Meu Desempenho
        </p>
        <div className="grid grid-cols-2 gap-3">
          <SegmentCard label="PR" value={prTime ? formatTime(prTime) : null} />
          <SegmentCard label="Tentativas" value={myEfforts ?? null} />
        </div>
      </div>

      {/* Recordes */}
      {(kom || qom) && (
        <div className="pt-3 border-t border-white/5 space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Recordes
          </p>
          <div className="grid grid-cols-2 gap-3">
            {kom && <SegmentCard label="KOM" value={kom} />}
            {qom && <SegmentCard label="QOM" value={qom} />}
          </div>
        </div>
      )}

      {/* Comunidade */}
      <div className="pt-3 border-t border-white/5 space-y-2">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Comunidade
        </p>
        <div className="grid grid-cols-3 gap-3">
          <SegmentCard label="Atletas" value={segment.athlete_count?.toLocaleString("pt-PT") ?? null} />
          <SegmentCard label="Esforços" value={segment.effort_count?.toLocaleString("pt-PT") ?? null} />
          <SegmentCard label="Favoritos" value={segment.star_count?.toLocaleString("pt-PT") ?? null} />
        </div>
      </div>
    </div>
  );
}

export default FavoriteSegments;
