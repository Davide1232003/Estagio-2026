import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Loader2 } from "lucide-react";
import fundo from "../assets/fundo.jpg";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Limpa o token imediatamente ao entrar na página
    localStorage.removeItem("strava_token");

    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Imagem de Fundo */}
      <div className="absolute inset-0 z-0">
        <img
          src={fundo}
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* 2. Container com o teu Design de Perfil */}
      <div className="relative z-10 w-full max-w-sm px-6">
        <div className="bg-white/[0.01] backdrop-blur-[15px] border border-white/20 rounded-[30px] p-10 shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-500 mb-6 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <LogOut size={32} />
          </div>

          <h2 className="text-white text-2xl font-bold tracking-tight mb-2">
            A sair...
          </h2>
          <p className="text-slate-400 text-sm mb-8">
            Estamos a encerrar a tua sessão em segurança.
          </p>

          {/* Spinner de Loading */}
          <Loader2 size={24} className="text-orange-500 animate-spin" />

          <p className="text-[10px] text-slate-600 mt-10 uppercase tracking-widest font-bold">
            Strava Dash
          </p>
        </div>
      </div>
    </div>
  );
}

export default Logout;
