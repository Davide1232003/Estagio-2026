import { useMemo } from "react";

export const useFilteredActivities = (activities, filter, sportFilter) => {
  // Memoiza o resultado para evitar recalcular em cada renderização
  return useMemo(() => {
    if (activities.length === 0) return [];

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(filter));

    return activities.filter((act) => {
      const isWithinTime =
        new Date(act.start_date_local || act.start_date) >= cutoffDate;
      const isCorrectSport = act.type === sportFilter;
      return isWithinTime && isCorrectSport;
    });
  }, [activities, filter, sportFilter]);
};
