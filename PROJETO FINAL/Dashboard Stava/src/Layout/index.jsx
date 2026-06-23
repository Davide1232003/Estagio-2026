import { useState } from "react";
import { Outlet } from "react-router-dom";
import Slidebar from "../components/Slidebar";
import fundo from "../assets/fundo.jpg";
import { Menu } from "lucide-react";

function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden ">
      <div className="absolute inset-0 z-0">
        <img
          src={fundo}
          alt="Background"
          className="h-full w-full object-cover"
        />
        {/* Overlay escuro para dar contraste */}
        <div className="absolute inset-0 bg-black/65"></div>
      </div>

      {/* Div principal "Glass" que envolve tudo */}
      <div className="relative z-10 flex w-full m-4 p-4 lg:p-6">
        <div className="flex w-full  bg-slate-900/60 backdrop-blur-4xl rounded-[20px] border border-white/20 overflow-hidden shadow-2xl">
          <Slidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          <div className="flex flex-col flex-1">
            <main className="flex-1 overflow-y-auto p-8 text-white">
              {/* Botão menu dentro do container, só em mobile */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden mb-4 p-2 rounded-xl bg-white/5 border border-white/10 text-white"
              >
                <Menu size={20} />
              </button>
              <Outlet />
              {/* Aqui é onde as páginas filhas vão ser renderizadas, carraga o layout e depois o conteúdo da rota que for escolhida */}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
