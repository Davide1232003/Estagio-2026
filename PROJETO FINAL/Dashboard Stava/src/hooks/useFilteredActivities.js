import { useState, useEffect } from "react";

export const useFilteredActivities = (activities, filter, sportFilter) => {
  const [filteredActivities, setFilteredActivities] = useState([]);

  useEffect(() => {
    if (activities.length === 0) return;

    const now = new Date();
    const cutoffDate = new Date();
    cutoffDate.setDate(now.getDate() - parseInt(filter));

    const filtered = activities.filter((act) => {
      const isWithinTime =
        new Date(act.start_date_local || act.start_date) >= cutoffDate;
      const isCorrectSport = act.type === sportFilter;
      return isWithinTime && isCorrectSport;
    });

    setFilteredActivities(filtered);
  }, [activities, filter, sportFilter]);

  return filteredActivities;
};
