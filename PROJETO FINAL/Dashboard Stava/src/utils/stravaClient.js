// isto guarda o token do strava no localStorage, para puder usá-lo em outros lugares da aplicação
export const getToken = () => localStorage.getItem("strava_token");
export const setToken = (token) => localStorage.setItem("strava_token", token);
export const removeToken = () => localStorage.removeItem("strava_token");
