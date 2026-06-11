import {
  Footprints,
  Calendar,
  Ruler,
  Mountain,
  TrendingUp,
  Clock,
} from "lucide-react";

const MAX_KM = 700;

// a propriedade isBike com valor padrão false para não partir as sapatilhas
function ShoeCard({ shoe, isBike = false }) {
  const kmUsed = parseFloat(
    shoe.gearStats.find((s) => s.title === "Volume Total")?.value || 0,
  );
  const percentage = Math.min((kmUsed / MAX_KM) * 100, 100);

  const barColor =
    percentage < 50
      ? "bg-emerald-500" // verde — bom estado
      : percentage < 75
        ? "bg-yellow-500" // amarelo — desgaste moderado
        : "bg-rose-500"; // vermelho — substituição recomendada

  const statusText =
    percentage < 50
      ? "Bom estado"
      : percentage < 75
        ? "Desgaste moderado"
        : "Substituição recomendada";

  const statusColor =
    percentage < 50
      ? "text-emerald-500"
      : percentage < 75
        ? "text-yellow-500"
        : "text-rose-500";

  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-md font-black text-white italic uppercase tracking-tight">
              {shoe.name}
            </h3>
            {shoe.primary && (
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">
                Principal
              </span>
            )}
          </div>
        </div>

        {!isBike && (
          <span
            className={`text-xs font-black uppercase tracking-wider ${statusColor}`}
          >
            {statusText}
          </span>
        )}
      </div>

      {/* Barra de Progresso */}
      {!isBike && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Desgaste
            </span>
            <span className="text-[10px] font-black text-slate-400">
              {kmUsed} km / {MAX_KM} km
            </span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full ${barColor} rounded-full transition-all duration-700`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-300 text-right">
            {Math.round(MAX_KM - kmUsed > 0 ? MAX_KM - kmUsed : 0)} km restantes
          </p>
        </div>
      )}

      {/* Grid de Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {shoe.gearStats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 p-3 bg-white/5 border border-white/5 rounded-xl"
          >
            <div className="flex items-center gap-1.5 text-slate-500">
              {stat.icon}
              <span className="text-[10px] font-black uppercase tracking-wider">
                {stat.title}
              </span>
            </div>
            <p className="text-sm font-black text-white italic">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Datas */}
      <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
        <div className="flex items-center gap-2.5 text-xs">
          <Calendar size={14} className="text-slate-500" />
          <span className="text-slate-400">Primeiro uso:</span>
          <span className="text-white font-medium italic">{shoe.firstUse}</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs justify-end">
          <Calendar size={14} className="text-slate-500" />
          <span className="text-slate-400">Último uso:</span>
          <span className="text-white font-medium italic">{shoe.lastUse}</span>
        </div>
      </div>
    </div>
  );
}

export default ShoeCard;
