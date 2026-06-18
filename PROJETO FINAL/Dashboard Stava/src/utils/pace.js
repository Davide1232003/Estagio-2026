// Converte velocidade média (m/s) para ritmo (min/km) de uma atividade individual
export const formatPace = (movingTime, distance) => {
  if (!movingTime || !distance || distance === 0) return "0:00";
  const paceInSeconds = movingTime / (distance / 1000);
  const minutes = Math.floor(paceInSeconds / 60);
  const seconds = Math.round(paceInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Converte um valor decimal de ritmo (ex: 5.50) numa string de relógio (ex: "5:30")
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

// Calcula a tendência do Pace Médio (lógica inversa: ritmo mais baixo = melhoria)
export const calculatePaceTrend = (
  currentDist,
  currentTime,
  prevDist,
  prevTime,
) => {
  if (
    !currentDist ||
    !currentTime ||
    !prevDist ||
    !prevTime ||
    prevDist === 0
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
