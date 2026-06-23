import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/stravaClient";
import { isRideActivity } from "../utils/activityType";

// cache evita repetir pedidos
const cache = new Map();

export const useActivityDetail = (activity) => {
  const [activityDetail, setActivityDetail] = useState(null);

  useEffect(() => {
    if (!activity) return;

    // Corrida não precisa de detalhe extra
    if (!isRideActivity(activity)) {
      setActivityDetail(activity);
      return;
    }

    // Já foi pedido antes, reutiliza sem novo pedido
    if (cache.has(activity.id)) {
      setActivityDetail(cache.get(activity.id));
      return;
    }

    // Ciclismo procura cadência e potência
    const token = getToken();
    axios
      .get(`https://www.strava.com/api/v3/activities/${activity.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const detail = { ...activity, ...res.data };
        cache.set(activity.id, detail); // guarda na cache
        setActivityDetail(detail);
      })
      .catch(() => setActivityDetail(activity));
  }, [activity]);

  return { activityDetail };
};
