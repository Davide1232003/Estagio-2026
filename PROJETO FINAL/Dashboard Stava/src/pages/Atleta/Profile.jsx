import { useAthlete } from "../../hooks/useAthlete";

import {
  MapPin,
  Users,
  Calendar,
  Weight,
  Trophy,
  Bike,
  Footprints,
} from "lucide-react";
import Loading from "../../components/Loading";
import TableCard from "../../components/cards/TableCard";

import {
  formatDistance,
  formatHours,
  formatElevation,
} from "../../utils/formatting";

function Profile() {
  const { athlete, stats, loading } = useAthlete();

  if (loading) return <Loading />;

  const currentYear = new Date().getFullYear();
  const location = [athlete?.city, athlete?.country].filter(Boolean).join(", ");

  return (
    <div className="bg-white/1 backdrop-blur-[15px] border border-white/20 rounded-xl p-8 min-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Perfil */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={athlete?.profile}
              alt="Foto de Perfil"
              className="w-28 h-28 rounded-full border-2 border-white/20 object-cover"
            />
            <div className="text-center md:text-left space-y-2">
              <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                {athlete?.firstname} {athlete?.lastname}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-slate-400 text-xs font-medium pt-2">
                {location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-slate-500" /> {location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Users size={12} className="text-slate-500" />
                  {athlete?.follower_count} Seguidores | {athlete?.friend_count}{" "}
                  A seguir
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} className="text-slate-500" /> Membro desde{" "}
                  {athlete?.created_at
                    ? new Date(athlete.created_at).getFullYear()
                    : "—"}
                </span>
                {athlete?.weight > 0 && (
                  <span className="flex items-center gap-1">
                    <Weight size={12} className="text-slate-500" />{" "}
                    {athlete.weight} kg
                  </span>
                )}
                {athlete?.sex && (
                  <span className="flex items-center gap-1">
                    {athlete.sex === "M" ? "Masculino" : "Feminino"}
                  </span>
                )}
                {(athlete?.premium || athlete?.summit) && (
                  <span className="flex items-center gap-1 text-[#D4AF37] font-black">
                    ASSINANTE PREMIUM
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas Anuais */}
        <div className="space-y-4">
          <h2 className="text-base font-black text-slate-400 italic uppercase tracking-[0.15em]">
            Estatísticas de {currentYear}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
              <p className="text-slate-500 font-black italic uppercase text-xs mb-1">
                Corrida KM
              </p>
              <p className="text-xl font-black text-white italic">
                {formatDistance(stats?.ytd_run_totals?.distance)}{" "}
                <span className="text-xs font-normal text-slate-400">km</span>
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
              <p className="text-slate-500 font-black italic uppercase text-xs mb-1">
                Corrida Horas
              </p>
              <p className="text-xl font-black text-white italic">
                {formatHours(stats?.ytd_run_totals?.moving_time)}
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
              <p className="text-slate-500 font-black italic uppercase text-xs mb-1">
                Ciclismo KM
              </p>
              <p className="text-xl font-black text-white italic">
                {formatDistance(stats?.ytd_ride_totals?.distance)}{" "}
                <span className="text-xs font-normal text-slate-400">km</span>
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
              <p className="text-slate-500 font-black italic uppercase text-xs mb-1">
                Ciclismo Horas
              </p>
              <p className="text-xl font-black text-white italic">
                {formatHours(stats?.ytd_ride_totals?.moving_time)}
              </p>
            </div>
          </div>
        </div>

        {/* Histórico Geral */}
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
                {
                  label: "Horas",
                  values: [
                    <span className="font-black text-white italic">
                      {formatHours(stats?.recent_run_totals?.moving_time)}
                    </span>,
                    <span className="font-black text-white italic">
                      {formatHours(stats?.recent_ride_totals?.moving_time)}
                    </span>,
                  ],
                },
                {
                  label: "Elevação",
                  values: [
                    <>
                      <span className="font-black text-white italic">
                        {formatElevation(
                          stats?.recent_run_totals?.elevation_gain,
                        )}
                      </span>{" "}
                      <span className="text-xs font-normal text-slate-400">
                        m
                      </span>
                    </>,
                    <>
                      <span className="font-black text-white italic">
                        {formatElevation(
                          stats?.recent_ride_totals?.elevation_gain,
                        )}
                      </span>{" "}
                      <span className="text-xs font-normal text-slate-400">
                        m
                      </span>
                    </>,
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
                    <span className="font-black text-white italic">
                      {formatHours(stats?.all_run_totals?.moving_time)}
                    </span>,
                    <span className="font-black text-white italic">
                      {formatHours(stats?.all_ride_totals?.moving_time)}
                    </span>,
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
