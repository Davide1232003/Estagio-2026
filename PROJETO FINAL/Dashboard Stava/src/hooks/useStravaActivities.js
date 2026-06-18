import { useEffect, useState } from "react";
import axios from "axios";

import { getToken } from "../utils/stravaClient";

export const useStravaActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllActivities = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        let allActivities = [];
        let currentPage = 1;
        let keepFetching = true;
        const perPage = 200; // Limite máximo que o Strava permite por página

        // O ciclo "while" vai rodar consecutivamente até a API trazer uma página vazia
        while (keepFetching) {
          const res = await axios.get(
            "https://www.strava.com/api/v3/athlete/activities",
            {
              headers: { Authorization: `Bearer ${token}` },
              params: {
                per_page: perPage,
                page: currentPage,
              },
            },
          );

          // Se a página atual trouxer dados, juntamos ao nosso balde acumulador
          if (res.data && res.data.length > 0) {
            allActivities = [...allActivities, ...res.data];

            // Se vierem menos atividades do que o limite por página (ex: 45 atividades),
            // significa que chegámos ao fim do histórico e podemos parar.
            if (res.data.length < perPage) {
              keepFetching = false;
            } else {
              currentPage++; // Caso contrário, avança para a página seguinte do livro
            }
          } else {
            // Se a página vier totalmente vazia, paramos o loop imediatamente
            keepFetching = false;
          }
        }

        // Guardamos o balde completo com todas as atividades no estado do React
        setActivities(allActivities);
      } catch (e) {
        console.error("Erro ao carregar histórico completo do Strava:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAllActivities();
  }, []);

  return { activities, loading, error };
};
