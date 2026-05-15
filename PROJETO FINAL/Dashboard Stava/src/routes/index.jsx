import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/index";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Logout from "../pages/Logout";
import Profile from "../pages/Profile";
import History from "../pages/History";
import Equipments from "../pages/Equipments";
import { Equal } from "lucide-react";

const router = createBrowserRouter([
  // o createBrowserRouter garante que a aplicação se comporte como uma SPA
  {
    path: "/",
    element: <Login />,
  },
  {
    // O Layout envolve todas as rotas filhas (children)
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/atividades",
        element: <History />,
      },
      { path: "/equipamentos", element: <Equipments /> },
      {
        path: "/analise",
        element: <div>Análise Mensal (Em breve)</div>,
      },
      {
        path: "/perfil",
        element: <Profile />,
      },
      {
        path: "/definicoes",
        element: <div>Definições (Em breve)</div>,
      },
    ],
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

export default router;
