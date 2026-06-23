import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import {
  getToken,
  setToken,
  setTokenExpiry,
  isTokenExpired,
} from "../utils/stravaClient";

function ProtectedRoute() {
  const [searchParams] = useSearchParams();

  // Chegou a token no URL? (vindo do callback do Strava)
  const tokenFromUrl = searchParams.get("token");
  const expiresAtFromUrl = searchParams.get("expires_at");
  if (tokenFromUrl) {
    setToken(tokenFromUrl);
    if (expiresAtFromUrl) setTokenExpiry(expiresAtFromUrl);
  }

  // Tem token? não está expirado?
  const token = getToken();
  if (!token || isTokenExpired()) return <Navigate to="/" replace />;

  // ok, renderiza a página pedida
  return <Outlet />;
}

export default ProtectedRoute;
