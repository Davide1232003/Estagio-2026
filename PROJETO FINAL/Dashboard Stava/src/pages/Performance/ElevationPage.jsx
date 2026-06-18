import { useState, useEffect } from "react";
import { useStravaActivities } from "../../hooks/useStravaActivities";
import { useFilteredActivities } from "../../hooks/useFilteredActivities";
import FilterBar from "../../components/FilterBar";
import ElevationAnalytics from "../../components/graphs/ElevationAnalytics";
import Loading from "../../components/Loading";

function ElevationPage() {
  const [filter, setFilter] = useState("30");
  const [sportFilter, setSportFilter] = useState("Run");

  const { activities, loading } = useStravaActivities();
  const filteredActivities = useFilteredActivities(
    activities,
    filter,
    sportFilter,
  );

  if (loading) return <Loading message="A carregar..." />;

  return (
    <div className="bg-white/1 backdrop-blur-[15px] border border-white/20 rounded-xl p-8 min-h-[calc(100vh-140px)] space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
            Análise de ganho vertical
          </p>
        </div>
        <FilterBar
          sport={sportFilter}
          setSport={setSportFilter}
          time={filter}
          setTime={setFilter}
        />
      </div>
      <ElevationAnalytics activities={filteredActivities} />
    </div>
  );
}

export default ElevationPage;
