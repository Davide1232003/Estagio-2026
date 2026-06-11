import Menu from "./Menu";
import { timeOptions, sportOptions } from "../config/menuOptions";

function FilterBar({ sport, setSport, time, setTime }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 ">
      <Menu
        options={sportOptions}
        activeValue={sport}
        onChange={setSport}
        layoutId="common_sport_menu"
        activeColorClass={
          sport === "Run" || sport === "Corrida"
            ? "bg-orange-500/20"
            : "bg-blue-500/20"
        }
      />
      <div className="w-px h-6 bg-white/10 hidden sm:block"></div>
      <Menu
        options={timeOptions}
        activeValue={time}
        onChange={setTime}
        layoutId="common_time_menu"
        activeColorClass="bg-slate-300/20"
      />
    </div>
  );
}

export default FilterBar;
