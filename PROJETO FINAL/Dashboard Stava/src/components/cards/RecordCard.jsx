import { Calendar, Activity } from "lucide-react";
import { formatDate, formatTime } from "../../utils/formatting";

function RecordCard({ label, meters, record }) {
  return (
    <div
      className={`bg-white/5 border rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02] ${
        record
          ? "border-white/10 hover:border-white/20"
          : "border-white/5 opacity-50"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            Recorde Pessoal
          </p>
          <h3 className="text-1xl font-black text-white italic uppercase">
            {label}
          </h3>
        </div>
      </div>

      {/* Tempo */}
      <div className="flex items-end gap-2">
        <p
          className={`text-3xl font-black italic leading-none ${record ? "text-white" : "text-slate-600"}`}
        >
          {record ? formatTime(record.time) : "--:--"}
        </p>
      </div>

      {/* Info da atividade */}
      {record ? (
        <div className="space-y-1 border-t border-white/5 pt-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Activity size={12} className="text-slate-500 shrink-0" />
            <span className="truncate">{record.activityName}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Calendar size={12} className="text-slate-500 shrink-0" />
            <span>{formatDate(record.date)}</span>
          </div>
        </div>
      ) : (
        <p className="text-xs text-slate-600 italic border-t border-white/5 pt-4">
          Sem registo ainda
        </p>
      )}
    </div>
  );
}

export default RecordCard;
