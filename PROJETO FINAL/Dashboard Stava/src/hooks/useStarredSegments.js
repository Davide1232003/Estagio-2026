import { useEffect, useState } from "react";
import axios from "axios";

import { getToken } from "../utils/stravaClient";

// Atividades externas evitam pedido duplicado
export const useStarredSegments = (activities = []) => {
  const [starred, setStarred] = useState([]);
  const [performed, setPerformed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const token = getToken();
      if (!token) return;

      try {
        // Segmentos favoritos + detalhes
        const starredRes = await axios.get(
          "https://www.strava.com/api/v3/segments/starred",
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { per_page: 50 },
          },
        );

        const detailedStarred = await Promise.all(
          starredRes.data.map(async (seg) => {
            try {
              const res = await axios.get(
                `https://www.strava.com/api/v3/segments/${seg.id}`,
                { headers: { Authorization: `Bearer ${token}` } },
              );
              return res.data;
            } catch {
              return seg;
            }
          }),
        );

        setStarred(detailedStarred.filter(Boolean));

        // Usa todas as atividades já carregadas
        const detailedActivities = await Promise.all(
          activities.map(async (act) => {
            try {
              const res = await axios.get(
                `https://www.strava.com/api/v3/activities/${act.id}`,
                { headers: { Authorization: `Bearer ${token}` } },
              );
              return res.data;
            } catch {
              return null;
            }
          }),
        );

        // Extrair segmentos únicos realizados
        const segmentMap = {};
        detailedActivities.forEach((act) => {
          if (!act || !act.segment_efforts) return;
          act.segment_efforts.forEach((effort) => {
            const seg = effort.segment;
            if (!segmentMap[seg.id]) {
              segmentMap[seg.id] = {
                id: seg.id,
                name: seg.name,
                distance: seg.distance,
                average_grade: seg.average_grade,
                total_elevation_gain:
                  effort.segment.elevation_high - effort.segment.elevation_low,
                activity_type: seg.activity_type,
                pr_rank: effort.pr_rank,
                kom_rank: effort.kom_rank,
                elapsed_time: effort.elapsed_time,
                start_date: effort.start_date,
                achievements: effort.achievements,
              };
            }
          });
        });

        setPerformed(Object.values(segmentMap));
      } catch (e) {
        console.error("Erro ao buscar segmentos:", e);
      } finally {
        setLoading(false);
      }
    };

    // Aguarda atividades antes de executar
    if (activities.length > 0) fetchAll();
  }, [activities]); // Re-executa quando atividades chegam

  return { starred, performed, loading };
};
