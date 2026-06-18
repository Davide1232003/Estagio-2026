import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/index";

import Dashboard from "../pages/AnaliseGeral/Dashboard";
import Activities from "../pages/AnaliseGeral/Activities";
import Calendar from "../pages/AnaliseGeral/Calendar";

import VolumePage from "../pages/Performance/VolumePage";
import ElevationPage from "../pages/Performance/ElevationPage";
import PerformancePage from "../pages/Performance/PerformancePage";
import StatisticsPage from "../pages/Performance/StatisticsPage";

import Profile from "../pages/Atleta/Profile";
import Equipments from "../pages/Atleta/Equipments";
import Records from "../pages/Atleta/Records";
import Segments from "../pages/Atleta/Segments";

import Login from "../pages/Login";
import Logout from "../pages/Logout";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/atividades", element: <Activities /> },
          { path: "/calendario", element: <Calendar /> },
          { path: "/equipamentos", element: <Equipments /> },
          { path: "/perfil", element: <Profile /> },
          { path: "/recordes", element: <Records /> },
          { path: "/segmentos", element: <Segments /> },
          { path: "/volume", element: <VolumePage /> },
          { path: "/elevacao", element: <ElevationPage /> },
          { path: "/zonas-de-ritmo", element: <PerformancePage /> },
          { path: "/estatisticas", element: <StatisticsPage /> },
        ],
      },
    ],
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

export default router;
