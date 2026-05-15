import { useMemo } from "react";
import { formatDate } from "../utils/conversions";

export const useChartData = (activities) => {
  return useMemo(() => {
    if (!activities || activities.length === 0) return [];

    const dataMap = {};

    // Ordenar do mais antigo para o mais recente
    const sorted = [...activities].sort(
      (a, b) => new Date(a.start_date) - new Date(b.start_date),
    );

    sorted.forEach((act) => {
      const date = formatDate(act.start_date);
      const kms = parseFloat((act.distance / 1000).toFixed(2));
      const elev = Math.round(act.total_elevation_gain);

      if (dataMap[date]) {
        dataMap[date].kms += kms;
        dataMap[date].elev += elev;
      } else {
        dataMap[date] = { date, kms, elev };
      }
    });

    return Object.values(dataMap);
  }, [activities]);
};
