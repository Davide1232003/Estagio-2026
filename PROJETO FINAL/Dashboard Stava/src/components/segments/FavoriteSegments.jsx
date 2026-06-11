import { Footprints, Bike, Trophy } from "lucide-react";
import { formatTime } from "../../utils/conversions";

function TrophyIcon({ rank }) {
  if (!rank) return null;

  return (
    <div className="flex items-center gap-1 text-slate-400">
      <Trophy size={14} />
      <span className="text-xs font-black">#{rank}</span>
    </div>
  );
}

function FavoriteSegments({ segments }) {
  if (segments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-slate-500 italic text-center">
          Nenhum segmento encontrado nas últimas 10 atividades.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      {/* Cabeçalho */}
      <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5">
        <p className="col-span-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
          Tipo
        </p>
        <p className="col-span-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
          Nome
        </p>
        <p className="col-span-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
          Distância
        </p>
        <p className="col-span-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
          Elevação
        </p>
        <p className="col-span-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
          Tempo
        </p>
        <p className="col-span-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
          PR
        </p>
      </div>

      {/* Linhas */}
      {segments.map((seg, index) => (
        <div
          key={`${seg.id}-${index}`}
          className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center"
        >
          <div className="col-span-1 text-slate-400">
            {seg.activity_type === "Run" ? (
              <Footprints size={16} />
            ) : (
              <Bike size={16} />
            )}
          </div>
          <p className="col-span-4 text-sm font-medium text-orange-400 truncate">
            {seg.name}
          </p>
          <p className="col-span-2 text-sm text-white">
            {seg.distance ? `${(seg.distance / 1000).toFixed(2)} km` : "--"}
          </p>
          <p className="col-span-2 text-sm text-white">
            {seg.total_elevation_gain != null
              ? `${Math.round(Math.abs(seg.total_elevation_gain))} m`
              : "--"}
          </p>
          <p className="col-span-2 text-sm font-bold text-white italic">
            {formatTime(seg.elapsed_time)}
          </p>
          <div className="col-span-1">
            <TrophyIcon rank={seg.pr_rank} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default FavoriteSegments;
