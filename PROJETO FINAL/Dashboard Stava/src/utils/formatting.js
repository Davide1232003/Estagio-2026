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

// Velocidade média em km/h
export const formatSpeed = (metersPerSecond) => {
  return (metersPerSecond * 3.6).toFixed(1);
};

// Elevação por KM
export const formatElevPorKm = (elev, meters) => {
  if (!meters) return "0";
  return (elev / (meters / 1000)).toFixed(1);
};
