import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/stravaClient";
import { isRideActivity } from "../utils/activityType";

export const useActivityDetail = (activity) => {
  // Detalhes completos da atividade selecionada
  const [activityDetail, setActivityDetail] = useState(null);

  useEffect(() => {
    if (!activity) return;

    // Corrida não precisa de detalhe extra
    const isRide = isRideActivity(activity);
    if (!isRide) {
      setActivityDetail(activity);
      return;
    }

    // Ciclismo: busca cadência e potência
    const token = getToken();
    axios
      .get(`https://www.strava.com/api/v3/activities/${activity.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setActivityDetail({ ...activity, ...res.data }))
      .catch(() => setActivityDetail(activity));
  }, [activity]);

  return { activityDetail };
};
