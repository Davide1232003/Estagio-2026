// Verifica se é atividade de corrida
export const isRunActivity = (act) =>
  act.type === "Run" || act.sport_type === "Run";

// Verifica se é atividade de ciclismo
export const isRideActivity = (act) =>
  act.type === "Ride" || act.sport_type === "Ride";
