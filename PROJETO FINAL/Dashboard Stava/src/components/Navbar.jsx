import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, User, Sun, Moon } from "lucide-react";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    photo: null,
    bio: "Welcome to your Workspace.",
  });

  // --- NOVOS ESTADOS PARA O SCROLL ---
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("strava_token");
      if (!token) return;

      try {
        const response = await axios.get(
          "https://www.strava.com/api/v3/athlete",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const { firstname, lastname, profile, bio } = response.data;

        setUserData({
          firstname: firstname || "",
          lastname: lastname || "",
          photo:
            profile && profile !== "avatar/athlete/large.png" ? profile : null,
          bio: bio || "Atleta Strava",
        });
      } catch (error) {
        console.error("Erro ao carregar perfil na Navbar", error);
      }
    };

    fetchProfile();
  }, []);

  // --- LÓGICA DE DETEÇÃO DE SCROLL ---
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // Se dermos scroll para baixo e passarmos de 80px, esconde
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      }
      // Se dermos scroll para cima, mostra
      else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`h-20 fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-8 text-white transition-all duration-500 ease-in-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      } ${lastScrollY > 20 ? "bg-black/40 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}
    >
      {/* Esquerda: Boas-vindas */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-2xl text-white">
            Hi, {userData.firstname} {userData.lastname}
          </h2>
        </div>
        <p className="hidden md:block text-xs text-slate-400 mt-0.5 font-medium">
          Bem-vindo a tua workspace personalizada!
        </p>
      </div>

      {/* Direita: Zona de Ações e Perfil */}
      <div className="flex items-center gap-3">
        {/* Bloco de Ações */}
        <div className="flex items-center h-11 gap-1 border-white/10 px-2 rounded-xl">
          <div className="flex items-center bg-black/20 rounded-full p-1 border border-white/5 ml-1">
            <button className="p-1 text-slate-500 hover:text-yellow-400 transition-colors cursor-pointer">
              <Sun size={14} />
            </button>
            <button className="p-1 bg-blue-600 rounded-full text-white shadow-[0_0_8px_#3b82f6] cursor-pointer">
              <Moon size={14} />
            </button>
          </div>
          <div className="w-[1px] h-7 bg-white/10 ml-3"></div>
        </div>

        {/* Retângulo do Perfil */}
        <div className="flex items-center mr-3 h-12 min-w-[160px] gap-4 bg-white/5 backdrop-blur-md border border-white/10 px-6 rounded-xl hover:bg-white/10 transition-all group">
          <div className="flex flex-col text-left justify-center flex-1 min-w-0">
            <p className="text-xs font-bold text-white tracking-wide leading-none mb-1 truncate">
              {userData.firstname} {userData.lastname}
            </p>
          </div>

          <div className="w-9 h-9 rounded-full border border-blue-500/50 flex items-center justify-center bg-blue-600/20 text-blue-400 shadow-[0_0_10px_#3b82f640] group-hover:shadow-[0_0_15px_#3b82f660] transition-all overflow-hidden shrink-0 hover:scale-115 transition-transform">
            {userData.photo ? (
              <img
                src={userData.photo}
                alt="Profile"
                className="w-full h-full object-cover cursor-pointer "
              />
            ) : (
              <User size={18} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
