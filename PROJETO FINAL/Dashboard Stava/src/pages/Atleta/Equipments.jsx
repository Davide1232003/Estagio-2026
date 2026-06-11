import { useEffect, useState } from "react";
import axios from "axios";
import { Ruler, Mountain, TrendingUp, Clock } from "lucide-react";
/* 🚀 ADICIONADO: formatHours importado aqui das tuas conversions */
import { formatDate, formatHours } from "../../utils/conversions";
import ShoeCard from "../../components/cards/ShoeCard";
import Loading from "../../components/Loading";

function Gear() {
  const [shoes, setShoes] = useState([]);
  const [bikes, setBikes] = useState([]);
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
            params: { per_page: 200 },
          }),
        ]);

        const shoeList = athleteRes.data.shoes || [];
        const bikeList = athleteRes.data.bikes || [];
        const allActivities = activitiesRes.data;

        // ------------------------------------------------------------
        // PROCESSAMENTO DAS SAPATILHAS
        // ------------------------------------------------------------
        const detailedShoes = shoeList.map((s) => {
          const gearActivities = allActivities.filter(
            (act) => act.gear_id === s.id,
          );

          const uses = gearActivities.length;
          const totalSeconds = gearActivities.reduce(
            (acc, curr) => acc + curr.moving_time,
            0,
          );

          /* 🚀 CORRIGIDO: Agora usa a tua função nativa com os segundos puros */
          const totalHours = formatHours(totalSeconds);

          const totalKm = (s.distance / 1000).toFixed(1);
          const totalElev = Math.round(
            gearActivities.reduce(
              (acc, curr) => acc + curr.total_elevation_gain,
              0,
            ),
          );

          const lastUse =
            gearActivities.length > 0 ? gearActivities[0].start_date : null;
          const firstUse =
            gearActivities.length > 0
              ? gearActivities[gearActivities.length - 1].start_date
              : null;

          const gearStats = [
            {
              title: "Vezes Usadas",
              value: `${uses}x`,
              icon: <TrendingUp size={18} />,
              color: "text-slate-400",
            },
            {
              title: "Volume Total",
              value: `${totalKm} km`,
              icon: <Ruler size={18} />,
              color: "text-slate-400",
            },
            {
              title: "Horas de Uso",
              value: totalHours, // 🚀 Atualizado para receber o texto formatado (ex: 0h 42m)
              icon: <Clock size={18} />,
              color: "text-slate-400",
            },
            {
              title: "Elevação Total",
              value: `${totalElev} m`,
              icon: <Mountain size={18} />,
              color: "text-slate-400",
            },
          ];

          return {
            id: s.id,
            name: s.name,
            primary: s.primary,
            firstUse: firstUse ? formatDate(firstUse) : "n/a",
            lastUse: lastUse ? formatDate(lastUse) : "n/a",
            gearStats,
          };
        });

        // ------------------------------------------------------------
        // PROCESSAMENTO REPLICADO PARA AS BICICLETAS
        // ------------------------------------------------------------
        const detailedBikes = bikeList.map((b) => {
          const gearActivities = allActivities.filter(
            (act) => act.gear_id === b.id,
          );

          const uses = gearActivities.length;
          const totalSeconds = gearActivities.reduce(
            (acc, curr) => acc + curr.moving_time,
            0,
          );

          const totalHours = formatHours(totalSeconds);
          const totalKm = (b.distance / 1000).toFixed(1);
          const totalElev = Math.round(
            gearActivities.reduce(
              (acc, curr) => acc + curr.total_elevation_gain,
              0,
            ),
          );

          const lastUse =
            gearActivities.length > 0 ? gearActivities[0].start_date : null;
          const firstUse =
            gearActivities.length > 0
              ? gearActivities[gearActivities.length - 1].start_date
              : null;

          const gearStats = [
            {
              title: "Vezes Usadas",
              value: `${uses}x`,
              icon: <TrendingUp size={18} />,
              color: "text-slate-400",
            },
            {
              title: "Volume Total",
              value: `${totalKm} km`,
              icon: <Ruler size={18} />,
              color: "text-slate-400",
            },
            {
              title: "Horas de Uso",
              value: totalHours,
              icon: <Clock size={18} />,
              color: "text-slate-400",
            },
            {
              title: "Elevação Total",
              value: `${totalElev} m`,
              icon: <Mountain size={18} />,
              color: "text-slate-400",
            },
          ];

          return {
            id: b.id,
            name: b.name,
            primary: b.primary,
            firstUse: firstUse ? formatDate(firstUse) : "n/a",
            lastUse: lastUse ? formatDate(lastUse) : "n/a",
            gearStats,
          };
        });

        setShoes(detailedShoes);
        setBikes(detailedBikes);
      } catch (error) {
        console.error("Erro nas métricas de equipamento:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGearAnalytics();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className=" backdrop-blur-[20px] min-h-[calc(100vh-140px)] shadow-2xl animate-in fade-in duration-500">
      <div className="space-y-6">
        {/* Sapatilhas */}
        <p className="text-lg font-black text-slate-400 italic uppercase tracking-[0.15em] flex items-center gap-2 border-b border-white/5 pb-2">
          Sapatilhas
        </p>
        {shoes.length > 0 ? (
          shoes.map((shoe) => <ShoeCard key={shoe.id} shoe={shoe} />)
        ) : (
          <p className="text-slate-500 italic text-center py-10">
            Nenhuma sapatilha registada no Strava.
          </p>
        )}

        {/* Bicicletas */}
        <p className="text-lg font-black text-slate-400 italic uppercase tracking-[0.15em] flex items-center gap-2 border-b border-white/5 pb-2">
          Bicicletas
        </p>
        {bikes.length > 0 &&
          bikes.map((bike) => (
            <ShoeCard key={bike.id} shoe={bike} isBike={true} />
          ))}
      </div>
    </div>
  );
}

export default Gear;
