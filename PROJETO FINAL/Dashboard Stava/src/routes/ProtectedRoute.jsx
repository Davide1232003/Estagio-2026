import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import { getToken, setToken } from "../utils/stravaClient";

function ProtectedRoute() {
  const [searchParams] = useSearchParams();

  // Token vindo do callback do Strava
  const tokenFromUrl = searchParams.get("token");
  if (tokenFromUrl) {
    setToken(tokenFromUrl); // Guarda no localStorage
  }

  // Sem token redireciona para login
  const token = getToken();
  if (!token) return <Navigate to="/" replace />;

  // Com token renderiza a página
  return <Outlet />;
}

export default ProtectedRoute;
