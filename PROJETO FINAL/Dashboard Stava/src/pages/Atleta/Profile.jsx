import { useEffect, useState } from "react";
import axios from "axios";

import { MapPin, Users, Bike, Calendar } from "lucide-react";
import Loading from "../../components/Loading";
import TableCard from "../../components/cards/TableCard";
import {
  formatDistance,
  formatHours,
  formatElevation,
} from "../../utils/conversions";

function Profile() {
  const [athlete, setAthlete] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("strava_token");
      try {
        // vai buscar os dados do atleta (Nome, Foto, id, ...)
        const athleteRes = await axios.get(
          "https://www.strava.com/api/v3/athlete",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setAthlete(athleteRes.data);

        // vai buscar as estatísticas do atleta (distância total, tempo total, ...)
        const statsRes = await axios.get(
          `https://www.strava.com/api/v3/athletes/${athleteRes.data.id}/stats`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setStats(statsRes.data);
      } catch (e) {
        console.error("Erro ao carregar perfil", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  if (loading) return <Loading />;

  // Descobrir o ano atual
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white/1 backdrop-blur-[15px] border border-white/20 rounded-xl p-8 min-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Bloco 1: Perfil */}
        <div className="relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 group">
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div className="relative">
              <div className="absolute"></div>
              <img
                src={athlete?.profile}
                alt="Foto de Perfil"
                className="relative w-28 h-28 rounded-full border-2 border-white/20 object-cover"
              />
            </div>

            <div className="text-center md:text-left space-y-2">
              <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                {athlete?.firstname} {athlete?.lastname}
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-slate-400 text-xs font-medium pt-2">
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-slate-500" />{" "}
                  {athlete?.city || "Portugal"}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} className="text-slate-500" />{" "}
                  {athlete?.follower_count} Seguidores | {athlete?.friend_count}{" "}
                  A seguir
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} className="text-slate-500" /> Membro desde{" "}
                  {athlete?.created_at
                    ? new Date(athlete.created_at).getFullYear()
                    : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bloco 2: Estatísticas Anuais */}
        <div className="space-y-4">
          <h2 className="text-base font-black text-slate-400 italic uppercase tracking-[0.15em] flex items-center gap-2">
            Estatísticas de {currentYear}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center justify-center text-center ">
              <div>
                <p className="flex items-center gap-2 text-slate-500 font-black italic uppercase text-sm">
                  Corrida acumulada
                </p>
                <p className="text-xl font-black text-white italic mt-1">
                  {formatDistance(stats?.ytd_run_totals?.distance)}{" "}
                  <span className="text-xs font-normal text-slate-400">KM</span>
                </p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center justify-center text-center">
              <div>
                <p className="flex items-center gap-2 text-slate-500 font-black italic uppercase text-sm">
                  Ciclismo acumulado
                </p>
                <p className="text-xl font-black text-white italic mt-1">
                  {formatDistance(stats?.ytd_ride_totals?.distance)}{" "}
                  <span className="text-xs font-normal text-slate-400">KM</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bloco 3 Histórico Geral*/}
        <TableCard
          columns={["Corrida", "Ciclismo"]}
          sections={[
            {
              title: "Últimas 4 Semanas",
              rows: [
                {
                  label: "Volume",
                  values: [
                    <>
                      <span className="font-black text-white italic">
                        {formatDistance(stats?.recent_run_totals?.distance)}
                      </span>{" "}
                      <span className="text-xs font-normal text-slate-400">
                        km
                      </span>
                    </>,
                    <>
                      <span className="font-black text-white italic">
                        {formatDistance(stats?.recent_ride_totals?.distance)}
                      </span>{" "}
                      <span className="text-xs font-normal text-slate-400">
                        km
                      </span>
                    </>,
                  ],
                },
                {
                  label: "Treinos",
                  values: [
                    <span className="font-black text-white italic">
                      {stats?.recent_run_totals?.count ?? "—"}
                      <span className="text-xs font-normal text-slate-400">
                        x
                      </span>
                    </span>,
                    <span className="font-black text-white italic">
                      {stats?.recent_ride_totals?.count ?? "—"}
                      <span className="text-xs font-normal text-slate-400">
                        x
                      </span>
                    </span>,
                  ],
                },
              ],
            },
            {
              title: "Histórico Geral",
              rows: [
                {
                  label: "Total KM",
                  values: [
                    <>
                      <span className="font-black text-white italic">
                        {formatDistance(stats?.all_run_totals?.distance)}
                      </span>{" "}
                      <span className="text-xs font-normal text-slate-400">
                        km
                      </span>
                    </>,
                    <>
                      <span className="font-black text-white italic">
                        {formatDistance(stats?.all_ride_totals?.distance)}
                      </span>{" "}
                      <span className="text-xs font-normal text-slate-400">
                        km
                      </span>
                    </>,
                  ],
                },
                {
                  label: "Atividades",
                  values: [
                    <span className="font-black text-white italic">
                      {stats?.all_run_totals?.count ?? "—"}
                      <span className="text-xs font-normal text-slate-400">
                        x
                      </span>
                    </span>,
                    <span className="font-black text-white italic">
                      {stats?.all_ride_totals?.count ?? "—"}
                      <span className="text-xs font-normal text-slate-400">
                        x
                      </span>
                    </span>,
                  ],
                },
                {
                  label: "Elevação",
                  values: [
                    <>
                      <span className="font-black text-white italic">
                        {formatElevation(stats?.all_run_totals?.elevation_gain)}
                      </span>{" "}
                      <span className="text-xs font-normal text-slate-400">
                        m
                      </span>
                    </>,
                    <>
                      <span className="font-black text-white italic">
                        {formatElevation(
                          stats?.all_ride_totals?.elevation_gain,
                        )}
                      </span>{" "}
                      <span className="text-xs font-normal text-slate-400">
                        m
                      </span>
                    </>,
                  ],
                },
                {
                  label: "Horas",
                  values: [
                    <>
                      <span className="font-black text-white italic">
                        {formatHours(stats?.all_run_totals?.moving_time)}
                      </span>{" "}
                      <span className="text-xs font-normal text-slate-400">
                        h
                      </span>
                    </>,
                    <>
                      <span className="font-black text-white italic">
                        {formatHours(stats?.all_ride_totals?.moving_time)}
                      </span>{" "}
                      <span className="text-xs font-normal text-slate-400">
                        h
                      </span>
                    </>,
                  ],
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Profile;
