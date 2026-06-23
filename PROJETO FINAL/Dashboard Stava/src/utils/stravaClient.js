export const getToken = () => localStorage.getItem("strava_token");
export const setToken = (token) => localStorage.setItem("strava_token", token);
export const removeToken = () => {
  localStorage.removeItem("strava_token");
  localStorage.removeItem("strava_token_expires_at");
};

// Guarda a data de expiração (vem do Strava)
export const setTokenExpiry = (expiresAt) =>
  localStorage.setItem("strava_token_expires_at", expiresAt);

// Verifica se o token já expirou
export const isTokenExpired = () => {
  const expiresAt = localStorage.getItem("strava_token_expires_at");
  if (!expiresAt) return false; // sem info de expiração, assume válido
  return Date.now() / 1000 > Number(expiresAt); // compara segundos atuais com o limite
};
