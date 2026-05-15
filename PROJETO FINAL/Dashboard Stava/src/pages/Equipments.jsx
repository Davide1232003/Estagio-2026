import { useEffect, useState } from "react";
import axios from "axios";
import {
  Loader2,
  Footprints,
  Calendar,
  Ruler,
  Mountain,
  TrendingUp,
  Clock,
  Zap,
} from "lucide-react";
import { formatDate } from "../utils/conversions";

function Gear() {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGearAnalytics = async () => {
      setLoading(true);
      const token = localStorage.getItem("strava_token");
      if (!token) return;

      try {
        const [athleteRes, activitiesRes] = await Promise.all([
          axios.get("https://www.strava.com/api/v3/athlete", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://www.strava.com/api/v3/athlete/activities", {
            headers: { Authorization: `Bearer ${token}` },
            params: { per_page: 1000 },
          }),
        ]);

        const shoeList = athleteRes.data.shoes || [];
        const allActivities = activitiesRes.data;

        const detailedShoes = await Promise.all(
          shoeList.map(async (s) => {
            const gearRes = await axios.get(
              `https://www.strava.com/api/v3/gear/${s.id}`,
              { headers: { Authorization: `Bearer ${token}` } },
            );

            const gearData = gearRes.data;
            const gearActivities = allActivities.filter(
              (act) => act.gear_id === s.id,
            );

            // CÁLCULOS ESPECÍFICOS
            const uses = gearActivities.length;

            // Somar tempo total em segundos e converter para horas
            const totalSeconds = gearActivities.reduce(
              (acc, curr) => acc + curr.moving_time,
              0,
            );
            const totalHours = (totalSeconds / 3600).toFixed(1);

            // Distância Total (já vem do gearData, mas garantimos em Km)
            const totalKm = (gearData.distance / 1000).toFixed(1);

            // Elevação Total Acumulada
            const totalElev = Math.round(
              gearActivities.reduce(
                (acc, curr) => acc + curr.total_elevation_gain,
                0,
              ),
            );

            // Datas de Uso
            const lastUse =
              gearActivities.length > 0 ? gearActivities[0].start_date : null;
            const firstUse =
              gearActivities.length > 0
                ? gearActivities[gearActivities.length - 1].start_date
                : null;

            return {
              ...gearData,
              metrics: {
                uses,
                totalHours,
                totalKm,
                totalElev,
                firstUse: firstUse ? formatDate(firstUse) : "n/a",
                lastUse: lastUse ? formatDate(lastUse) : "n/a",
              },
            };
          }),
        );

        setShoes(detailedShoes);
      } catch (error) {
        console.error("Erro ao processar métricas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGearAnalytics();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] gap-4">
        <Loader2 className="text-orange-500 animate-spin" size={48} />
        <p className="text-slate-400 font-medium">
          A analisar histórico de equipamento...
        </p>
      </div>
    );

  return (
    <div className="bg-white/[0.01] backdrop-blur-[15px] border border-white/20 rounded-[30px] p-8 min-h-[calc(100vh-140px)] animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Os Meus Equipamentos
          </h1>
          <p className="text-slate-400">
            Análise detalhada do calçado utilizado até hoje.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {shoes.map((shoe) => (
            <ShoeCard key={shoe.id} shoe={shoe} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ShoeCard({ shoe }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden flex flex-col hover:border-orange-500/40 transition-all duration-500 group">
      <div className="p-10 space-y-8">
        {/* ---------------------------
        Header com Ícone e Título 
      --------------------------- */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-xl group-hover:scale-110 transition-transform">
            <Footprints size={40} />
          </div>
          <div>
            <h3 className="font-bold text-white text-2xl tracking-tight leading-tight">
              {shoe.name}
            </h3>
            <p className="text-sm text-orange-500 font-black uppercase tracking-[0.2em] mt-1 opacity-80">
              {shoe.brand_name || "Running"} {shoe.model_name || "Shoe"}
            </p>
          </div>
        </div>
        {/* -------------------
          Grelha de Métricas 
        --------------------*/}
        <div className="grid grid-cols-2 gap-5">
          <MiniMetric
            icon={<TrendingUp size={18} />}
            label="Vezes Usadas"
            value={`${shoe.metrics.uses}x`}
          />
          <MiniMetric
            icon={<Clock size={18} />}
            label="Horas de Uso"
            value={`${shoe.metrics.totalHours}h`}
          />
          <MiniMetric
            icon={<Ruler size={18} />}
            label="KM Feitos"
            value={`${shoe.metrics.totalKm} km`}
          />
          <MiniMetric
            icon={<Mountain size={18} />}
            label="Elevação"
            value={`${shoe.metrics.totalElev} m`}
          />
          <MiniMetric
            icon={<Calendar size={18} />}
            label="Primeiro Uso"
            value={shoe.metrics.firstUse}
          />
          <MiniMetric
            icon={<Calendar size={18} />}
            label="Último Uso"
            value={shoe.metrics.lastUse}
          />
        </div>
      </div>
    </div>
  );
}

function MiniMetric({ icon, label, value }) {
  return (
    <div className="bg-white/5 p-5 rounded-[22px] border border-white/5 flex items-center gap-4 hover:bg-white/[0.08] transition-colors border-l-2 hover:border-l-orange-500">
      <div className="text-orange-500 shrink-0 bg-orange-500/5 p-2 rounded-lg">
        {icon}
      </div>
      <div className="overflow-hidden">
        <p className="text-base font-bold text-white truncate">{value}</p>
        <p className="text-[10px] text-slate-500 uppercase font-black tracking-tight">
          {label}
        </p>
      </div>
    </div>
  );
}

export default Gear;
