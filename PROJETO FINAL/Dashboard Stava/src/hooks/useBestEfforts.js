import { useMemo } from "react";

const DISTANCES = [
  { label: "1 KM", meters: 1000 },
  { label: "5 KM", meters: 5000 },
  { label: "10 KM", meters: 10000 },
  { label: "15 KM", meters: 15000 },
  { label: "Meia Maratona", meters: 21097 },
  { label: "Maratona", meters: 42195 },
];

export const useBestEfforts = (activities) => {
  const records = useMemo(() => {
    if (!activities || activities.length === 0) return [];

    const runs = activities.filter(
      (a) => a.type === "Run" || a.sport_type === "Run",
    );

    return DISTANCES.map((dist) => {
      // Apenas atividades que cobrem a distância alvo (até 20% acima evita
      // usar o pace de uma maratona para estimar um 1km)
      const upperBound = dist.meters * 1.2;
      const candidates = runs.filter(
        (a) => a.distance >= dist.meters && a.distance <= upperBound,
      );

      // Se não houver candidatos próximos, aceita qualquer atividade suficientemente longa
      const pool =
        candidates.length > 0
          ? candidates
          : runs.filter((a) => a.distance >= dist.meters);

      if (pool.length === 0) {
        return { label: dist.label, meters: dist.meters, record: null };
      }

      // Atividade com melhor pace médio (menor tempo por metro)
      const best = pool.reduce((prev, curr) => {
        const pacePrev = prev.moving_time / prev.distance;
        const paceCurr = curr.moving_time / curr.distance;
        return paceCurr < pacePrev ? curr : prev;
      });

      const pace = best.moving_time / best.distance;
      const estimatedTime = Math.round(pace * dist.meters);

      return {
        label: dist.label,
        meters: dist.meters,
        record: {
          time: estimatedTime,
          activityName: best.name,
          date: best.start_date,
        },
      };
    });
  }, [activities]);

  return { records, loading: false, progress: 100 };
};
