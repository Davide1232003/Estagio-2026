import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Usuarios from "./components/Usuarios/Usuarios";
import AdicionarUsuario from "./components/AdicionarUsuario/AdicionarUsuario";
import Home from "./components/Home/Home";
import DetalhesUsuario from "./components/DetalhesUsuario/DetalhesUsuario";

function PaginaNaoEncontrada() {
  return (
    <>
      <h1>404</h1>
      <p>Página Não Encontrada</p>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/" exact>
                  Ínicio
                </NavLink>
              </li>
              <li>
                <NavLink to="/usuarios">Utilizadores Registados</NavLink>
              </li>
              <li>
                <NavLink to="/adicionar">Adicionar Utilizador</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usuarios/:id" element={<DetalhesUsuario />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/adicionar" element={<AdicionarUsuario />} />
            <Route path="*" element={<PaginaNaoEncontrada />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
