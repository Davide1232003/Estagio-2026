import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getToken } from "../utils/stravaClient";

import fundo from "../assets/fundo.jpg";

function Login() {
  const navigate = useNavigate();

  // disparar o fluxo do Backend
  const handleLogin = (e) => {
    e.preventDefault();
    // Redireciona para o teu servidor Express que faz a ponte com o Strava
    window.location.href = "http://localhost:3000/login";
  };

  // caso já exista o token, redireciona para o dashboard
  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0 z-0">
        <img
          src={fundo}
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/2 backdrop-blur-[20px] border border-white/10 rounded-[30px] p-10 shadow-2xl">
          <div className="text-center mb-8  ">
            <h2 className="text-white text-3xl font-bold tracking-tight">
              STRAVA <span className="text-orange-500 font-light">DASH</span>
            </h2>
            <p className="text-slate-400 text-sm mt-8">
              Conecte a tua conta Strava para visualizar o teu progresso e
              descobrir novas informações.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <button
              type="submit"
              className="w-full flex justify-center items-center bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg gap-2 cursor-pointer"
            >
              Entrar com o Strava
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-xs">
              Ao entrar, concedes acesso aos teus dados e atividades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
