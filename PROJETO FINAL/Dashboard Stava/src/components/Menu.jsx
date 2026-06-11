import { motion } from "framer-motion";

function Menu({ options, activeValue, onChange, layoutId, activeColorClass }) {
  return (
    <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 relative w-fit">
      {options.map((opt) => {
        const isActive = activeValue === opt.val;
        return (
          <button
            key={opt.val}
            onClick={() => onChange(opt.val)}
            className={`relative flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer z-10 ${
              isActive ? "text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className={`absolute inset-0 rounded-lg ${activeColorClass}`}
                transition={{
                  type: "spring",
                  bounce: 0.5,
                  duration: 0.6,
                }}
                style={{ zIndex: -1 }}
              />
            )}
            {opt.icon && opt.icon}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default Menu;
