import React from "react";

function StatCard({ title, value, icon, color, trend, showEmptyTrend = true }) {
  // Ver se a tendência é positiva ou negativa para definir a cor da borda esquerda
  const isPositive = trend?.text.includes("▲");
  const borderLeftColor = trend
    ? isPositive
      ? "border-l-emerald-500"
      : "border-l-rose-500"
    : "border-l-slate-600";

  return (
    <div
      className={`border-l-4 ${borderLeftColor} p-5 rounded-xl backdrop-blur-md flex flex-col justify-between min-h-37.5 w-full transition-all duration-300 hover:bg-[#111622]/60`}
    >
      {/*  Ícone e Valor */}
      <div className="flex items-center gap-3 w-full">
        <div className="p-2.5 bg-white/3 border border-white/5 rounded-xl text-slate-400 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <h3 className="text-lg font-black text-white tracking-tight truncate">
          {value}
        </h3>
      </div>

      {/* Título */}
      <div className="my-1 text-left">
        <span className="text-[10px] font-black italic uppercase tracking-wider text-slate-500 block">
          {title}
        </span>
      </div>

      {/*Percentagem */}
      {(trend || showEmptyTrend) && (
        <div className="min-h-6 flex items-center justify-center text-center w-full bg-white/1 border border-white/2 rounded-lg py-1 mt-1">
          {trend ? (
            <span className={`text-sm font-black tracking-wide ${trend.color}`}>
              {trend.text}
            </span>
          ) : (
            <span className="text-xs font-black text-slate-600 tracking-widest">
              ---
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default StatCard;
