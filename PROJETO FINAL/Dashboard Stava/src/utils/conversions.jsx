// Converte metros para quilómetros (2 casas decimais)
export const formatDistance = (meters) => {
  if (!meters) return "0.00";
  return (meters / 1000).toFixed(2);
};

// Converte segundos para formato de horas e minutos reais (ex: "5h 36m")
export const formatHours = (seconds) => {
  if (!seconds || isNaN(seconds)) return "0h 00m";
  const totalMinutes = Math.round(seconds / 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h ${String(m).padStart(2, "0")}m`;
};

// Converte data ISO para formato local (PT-PT)
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("pt-PT");
};

// Converte ganho de elevação (0 casas decimais)
export const formatElevation = (meters) => {
  if (!meters && meters !== 0) return "0";
  return meters.toFixed(0);
};

// Converte segundos para formato mm:ss ou h:mm:ss
export const formatTime = (seconds) => {
  if (!seconds) return "--";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
};

// Converte velocidade média (m/s) para ritmo (min/km) de uma atividade individual
export const formatPace = (movingTime, distance) => {
  if (!movingTime || !distance || distance === 0) return "0:00";
  const paceInSeconds = movingTime / (distance / 1000);
  const minutes = Math.floor(paceInSeconds / 60);
  const seconds = Math.round(paceInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Velocidade média em km/h
export const formatSpeed = (metersPerSecond) => {
  return (metersPerSecond * 3.6).toFixed(1);
};

// Elevação por KM
export const formatElevPorKm = (elev, meters) => {
  if (!meters) return "0";
  return (elev / (meters / 1000)).toFixed(1);
};

// Converte um valor decimal de ritmo (ex: 5.50 ou 5.80) numa string de relógio real (ex: "5:30" ou "5:48").
export const formatPaceLabel = (val) => {
  if (!val || val === 0 || isNaN(val)) return "--:--";
  const m = Math.floor(val);
  const s = Math.round((val - m) * 60);
  const finalM = s === 60 ? m + 1 : m;
  const finalS = s === 60 ? 0 : s;
  return `${finalM}:${String(finalS).padStart(2, "0")}`;
};

// Calcula o Pace Médio Acumulado do Período (min/km)
export const calculatePeriodPace = (totalSeconds, totalMeters) => {
  if (!totalMeters || !totalSeconds) return "0:00";

  const totalKm = totalMeters / 1000;
  const paceDecimal = totalSeconds / 60 / totalKm;
  const minutes = Math.floor(paceDecimal);
  const seconds = Math.round((paceDecimal - minutes) * 60);

  let finalMinutes = minutes;
  let finalSeconds = seconds;
  if (finalSeconds === 60) {
    finalMinutes += 1;
    finalSeconds = 0;
  }
  return `${finalMinutes}:${String(finalSeconds).padStart(2, "0")}`;
};

// Calcula a tendência do Pace Médio (Lógica Inversa: ritmo mais baixo = melhoria)
export const calculatePaceTrend = (
  currentDist,
  currentTime,
  prevDist,
  prevTime,
) => {
  if (
    !currentDist || // Se a distância atual não existir (for 0, null ou undefined)
    !currentTime || // OU se o tempo atual não existir
    !prevDist || // OU se a distância do período passado não existir
    !prevTime || // OU se o tempo do período passado não existir
    prevDist === 0 // OU se a distância passada for exatamente igual a zero
  ) {
    return { text: "—", color: "text-slate-500" };
  }

  const currentPaceRaw = currentTime / currentDist;
  const prevPaceRaw = prevTime / prevDist;
  const percent = ((currentPaceRaw - prevPaceRaw) / prevPaceRaw) * 100;
  const formatted = Math.abs(percent).toFixed(1);

  if (percent < 0) {
    return {
      text: `▲ -${formatted}%`,
      color: "text-emerald-500 font-bold !text-[14px]",
    };
  } else if (percent > 0) {
    return {
      text: `▼ +${formatted}%`,
      color: "text-rose-500 font-bold !text-[14px]",
    };
  }
  return { text: "= 0%", color: "text-slate-500" };
};

// função para extrair o top 3 de distancia, tempo e elevação
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
      .sort((a, b) => b[stravaKey] - a[stravaKey]) // Ordena do maior para o menor
      .slice(0, 3) // Agarra os 3 primeiros
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
