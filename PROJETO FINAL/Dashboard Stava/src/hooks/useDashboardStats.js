import { useMemo } from "react";

export function useDashboardStats(activities, filter, sportFilter) {
  return useMemo(() => {
    const defaultReturn = {
      currentFiltered: [],
      totalDistRaw: 0,
      totalTimeRaw: 0,
      totalElevRaw: 0,
      avgHR: "N/A",
      prevDistRaw: 0,
      prevTimeRaw: 0,
      prevElevRaw: 0,
      previousFilteredLength: 0,
    };

    if (!activities || activities.length === 0) {
      return defaultReturn;
    }

    const days = parseInt(filter);
    const now = new Date();

    // Definição das datas de corte (Período Atual vs Período Anterior)
    const currentCutoff = new Date();
    currentCutoff.setDate(now.getDate() - days);

    const previousCutoff = new Date();
    previousCutoff.setDate(now.getDate() - days * 2);

    // Filtrar atividades para o Período Atual e Anterior
    const currentFiltered = [];
    const previousFiltered = [];

    activities.forEach((act) => {
      if (act.type !== sportFilter) return;

      const actDate = new Date(act.start_date_local || act.start_date);
      if (actDate >= currentCutoff) {
        currentFiltered.push(act);
      } else if (actDate >= previousCutoff && actDate < currentCutoff) {
        previousFiltered.push(act);
      }
    });

    // Reduções de dados do Período Atual
    const totalDistRaw = currentFiltered.reduce(
      (acc, curr) => acc + curr.distance,
      0,
    );
    const totalTimeRaw = currentFiltered.reduce(
      (acc, curr) => acc + curr.moving_time,
      0,
    );
    const totalElevRaw = currentFiltered.reduce(
      (acc, curr) => acc + curr.total_elevation_gain,
      0,
    );

    const hrActivities = currentFiltered.filter((a) => a.has_heartrate);
    const avgHR =
      hrActivities.length > 0
        ? Math.round(
            hrActivities.reduce(
              (acc, curr) => acc + curr.average_heartrate,
              0,
            ) / hrActivities.length,
          )
        : "N/A";

    // Reduções de dados do Período Anterior
    const prevDistRaw = previousFiltered.reduce(
      (acc, curr) => acc + curr.distance,
      0,
    );
    const prevTimeRaw = previousFiltered.reduce(
      (acc, curr) => acc + curr.moving_time,
      0,
    );
    const prevElevRaw = previousFiltered.reduce(
      (acc, curr) => acc + curr.total_elevation_gain,
      0,
    );

    // Exporta todos os dados calculados para o componente ler fora do hook
    return {
      currentFiltered,
      totalDistRaw,
      totalTimeRaw,
      totalElevRaw,
      avgHR: avgHR !== "N/A" ? `${avgHR} bpm` : "N/A",
      prevDistRaw,
      prevTimeRaw,
      prevElevRaw,
      previousFilteredLength: previousFiltered.length,
    };
  }, [activities, filter, sportFilter]);
}
