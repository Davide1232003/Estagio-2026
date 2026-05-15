// Converte metros para quilómetros (2 casas decimais)
export const formatDistance = (meters) => {
  if (!meters) return "0.00";
  return (meters / 1000).toFixed(2);
};

// Converte segundos para horas decimais (1 casa decimal)
export const formatHours = (seconds) => {
  if (!seconds) return "0.0";
  return (seconds / 3600).toFixed(1);
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

// Converte segundos para formato HH:MM:SS
export const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};

// Converte velocidade média (m/s) para ritmo (min/km)
export const formatPace = (speedMs) => {
  if (!speedMs || speedMs === 0) return "0:00";
  const paceInSeconds = 1000 / speedMs;
  const minutes = Math.floor(paceInSeconds / 60);
  const seconds = Math.round(paceInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
