import { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  MapPin,
  Calendar,
  Users,
  Trophy,
  Activity,
  Mountain,
} from "lucide-react";

function Profile() {
  const [athlete, setAthlete] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFullProfile = async () => {
      const token = localStorage.getItem("strava_token");
      if (!token) return;

      try {
        // 1. Buscar dados detalhados do atleta
        const athleteRes = await axios.get(
          "https://www.strava.com/api/v3/athlete",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setAthlete(athleteRes.data);

        // 2. Buscar estatísticas totais (km totais, elevação acumulada, etc.)
        // Nota: O ID do atleta vem da primeira resposta
        const statsRes = await axios.get(
          `https://www.strava.com/api/v3/athletes/${athleteRes.data.id}/stats`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setStats(statsRes.data);
      } catch (error) {
        console.error("Erro ao carregar perfil completo", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFullProfile();
  }, []);

  if (loading)
    return <div className="text-white p-10">A carregar perfil...</div>;
  if (!athlete)
    return (
      <div className="text-white p-10">Não foi possível carregar os dados.</div>
    );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* HEADER DO PERFIL */}
      <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-[30px] p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <img
            src={athlete.profile}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-orange-500/30 object-cover shadow-2xl"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-white mb-2">
            {athlete.firstname} {athlete.lastname}
          </h1>
          <p className="text-slate-400 max-w-xl mb-4 italic">
            {athlete.bio || "Sem biografia disponível."}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-300">
            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <MapPin size={14} className="text-orange-500" />
              {athlete.city}, {athlete.country}
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <Users size={14} className="text-blue-400" />
              {athlete.follower_count} Seguidores • {athlete.friend_count}{" "}
              Seguindo
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <Calendar size={14} className="text-green-400" />
              No Strava desde {new Date(athlete.created_at).getFullYear()}
            </span>
          </div>
        </div>
      </div>

      {/* ESTATÍSTICAS TOTAIS (CARREIRA) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4 text-orange-500">
            <Activity size={20} />
            <h3 className="font-semibold">Totais Corrida</h3>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-white">
              {(stats?.all_run_totals?.distance / 1000).toFixed(0)} km
            </p>
            <p className="text-xs text-slate-300 uppercase tracking-widest">
              Distância Total
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4 text-blue-400">
            <Mountain size={20} />
            <h3 className="font-semibold">Elevação Total</h3>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-white">
              {stats?.all_run_totals?.elevation_gain.toLocaleString()} m
            </p>
            <p className="text-xs text-slate-300 uppercase tracking-widest">
              Desnível Acumulado
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4 text-green-400">
            <Trophy size={20} />
            <h3 className="font-semibold">Atividades</h3>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-white">
              {stats?.all_run_totals?.count +
                (stats?.all_ride_totals?.count || 0)}
            </p>
            <p className="text-xs text-slate-300 uppercase tracking-widest">
              Total de Treinos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
