import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/stravaClient";

export const useAthlete = () => {
  // Dados do atleta autenticado
  const [athlete, setAthlete] = useState(null);
  // Estatísticas totais do atleta
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  //
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchAll = async () => {
      try {
        // Perfil do atleta
        const athleteRes = await axios.get(
          "https://www.strava.com/api/v3/athlete",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const athleteData = athleteRes.data;
        setAthlete(athleteData);

        // Stats dependem do id do atleta
        const statsRes = await axios.get(
          `https://www.strava.com/api/v3/athletes/${athleteData.id}/stats`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setStats(statsRes.data);
      } catch (e) {
        console.error("Erro ao carregar atleta:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return { athlete, stats, loading };
};
