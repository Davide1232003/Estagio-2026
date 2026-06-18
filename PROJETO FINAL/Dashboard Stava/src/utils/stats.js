// Extrai o top 3 de distância, tempo, elevação e calorias
export const getTop3Records = (activities, sportType) => {
  const baseStructure = { distance: [], time: [], elevation: [], calories: [] };

  if (!activities || activities.length === 0) return baseStructure;

  const sportActivities = activities.filter(
    (act) => act.type === sportType || act.sport_type === sportType,
  );
  if (sportActivities.length === 0) return baseStructure;

  const getTop3ForField = (field, stravaKey) => {
    return [...sportActivities]
      .filter((act) => act[stravaKey] !== undefined && act[stravaKey] !== null)
      .sort((a, b) => b[stravaKey] - a[stravaKey])
      .slice(0, 3)
      .map((act) => ({
        name: act.name || "Atividade sem nome",
        value: act[stravaKey],
      }));
  };

  return {
    distance: getTop3ForField("distance", "distance"),
    time: getTop3ForField("time", "moving_time"),
    elevation: getTop3ForField("elevation", "total_elevation_gain"),
    calories: getTop3ForField("calories", "kilojoules"),
  };
};
