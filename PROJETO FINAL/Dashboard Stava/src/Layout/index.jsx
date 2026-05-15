import { Outlet } from "react-router-dom";
import Slidebar from "../components/Slidebar";
import Navbar from "../components/Navbar";
import fundo from "../assets/fundo.jpg";

function MainLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden ">
      {/* Imagem de Fundo Total */}
      <div className="absolute inset-0 z-0">
        <img
          src={fundo}
          alt="Background"
          className="h-full w-full object-cover"
        />
        {/* Overlay escuro para dar contraste */}
        <div className="absolute inset-0 bg-black/65"></div>
      </div>

      {/* Contentor Principal "Glass" que envolve tudo */}
      <div className="relative z-10 flex w-full m-4 p-4 lg:p-6">
        <div className="flex w-full  bg-slate-900/60 backdrop-blur-4xl rounded-[20px] border border-white/20 overflow-hidden shadow-2xl">
          <Slidebar />

          <div className="flex flex-col flex-1">
            {/* <Navbar /> */}

            {/* Conteúdo Dinâmico */}
            <main className="flex-1 overflow-y-auto p-8 text-white">
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
