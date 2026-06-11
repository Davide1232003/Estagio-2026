import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { sportOptions } from "../../config/menuOptions";

import Menu from "../../components/Menu";
import ActivityItem from "../../components/activity/ActivityItem";
import ActivityDetail from "../../components/activity/ActivityDetail";
import Loading from "../../components/Loading";
import { useStravaActivities } from "../../hooks/useStravaActivities";

function Activities() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [sportFilter, setSportFilter] = useState("Run");

  const { activities, loading } = useStravaActivities();

  // filtragem prévia baseada no desporto selecionado
  const filteredActivities = activities.filter((a) => a.type === sportFilter);

  useEffect(() => {
    if (loading || activities.length === 0) return;

    const queryId = searchParams.get("id");

    if (queryId) {
      const found = activities.find((a) => a.id.toString() === queryId);
      if (found) {
        if (selectedActivity?.id !== found.id) {
          setSelectedActivity(found);
        }
        if (found.type !== sportFilter) {
          setSportFilter(found.type);
        }
        return;
      }
    }

    // Se mudaste de desporto ou não há ID válido no URL, força a seleção da primeira do filtro ativo
    if (filteredActivities.length > 0) {
      const isStillValid = filteredActivities.some(
        (a) => a.id === selectedActivity?.id,
      );

      if (!isStillValid) {
        setSelectedActivity(filteredActivities[0]);
        setSearchParams({ id: filteredActivities[0].id }, { replace: true });
      }
    } else {
      if (selectedActivity !== null) {
        setSelectedActivity(null);
      }
    }
  }, [activities, searchParams, sportFilter, loading]);

  // Handlers orientados à execução
  const handleSportChange = (newSport) => {
    if (newSport === sportFilter) return;

    setSportFilter(newSport);
    const nextFiltered = activities.filter((a) => a.type === newSport);

    if (nextFiltered.length > 0) {
      setSelectedActivity(nextFiltered[0]);
      setSearchParams({ id: nextFiltered[0].id });
    } else {
      setSelectedActivity(null);
      setSearchParams({});
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-white/1 backdrop-blur-[15px] border border-white/20 rounded-xl p-6 h-[calc(100vh-140px)] overflow-hidden animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        {/* COLUNA ESQUERDA: Lista */}
        <div className="lg:col-span-4 flex flex-col h-full border-r border-white/5 pr-4 overflow-hidden">
          <div className="flex justify-center mb-6 shrink-0">
            <Menu
              options={sportOptions}
              activeValue={sportFilter}
              onChange={handleSportChange}
              layoutId="sport_tab_atividades"
              activeColorClass={
                sportFilter === "Run" ? "bg-orange-500/20" : "bg-blue-500/20"
              }
            />
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((act) => (
                <ActivityItem
                  key={act.id}
                  activity={act}
                  compact={true}
                  isActive={selectedActivity?.id === act.id}
                  onClick={() => {
                    setSelectedActivity(act);
                    setSearchParams({ id: act.id });
                  }}
                />
              ))
            ) : (
              <p className="text-slate-500 italic text-center py-10">
                Nenhuma atividade de{" "}
                {sportFilter === "Run" ? "Corrida" : "Ciclismo"}.
              </p>
            )}
          </div>
        </div>

        {/* COLUNA DIREITA: Detalhes */}
        <div className="lg:col-span-8 h-full overflow-y-auto pr-2 custom-scrollbar">
          <ActivityDetail activity={selectedActivity} />
        </div>
      </div>
    </div>
  );
}

export default Activities;
