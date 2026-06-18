import { ChevronDown } from "lucide-react";

function Dropdown({ label, options, activeValue, onSelect, isOpen, onToggle, alignRight = false }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="group bg-white/2 backdrop-blur-[20px] border border-white/10 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-white/5 transition-colors shadow-lg min-w-24 justify-between cursor-pointer"
      >
        <span className="text-slate-200 group-hover:text-white transition-colors">{label}</span>
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full mt-2 ${alignRight ? "right-0" : "left-0"} bg-slate-950/95 backdrop-blur-[20px] border border-white/10 rounded-xl min-w-28 max-h-60 overflow-y-auto p-1.5 shadow-2xl space-y-0.5 custom-scrollbar animate-in fade-in zoom-in-95 duration-100`}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold uppercase transition-colors ${
                opt.value === activeValue
                  ? "bg-orange-500/20 text-white"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
