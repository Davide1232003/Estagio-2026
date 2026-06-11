import React from "react";

function MetricsCard({ title, items = [] }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
      {title && (
        <div>
          <h3 className="text-sm font-black text-white italic uppercase tracking-wider">
            {title}
          </h3>
        </div>
      )}
      <div className="space-y-4 flex flex-col justify-center h-full py-4 max-w-xl mx-auto w-full">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-white/5 pb-2"
          >
            <span className="text-xs font-bold text-slate-400 uppercase">
              {item.label}
            </span>
            <span className="text-sm font-black text-white italic">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MetricsCard;
