import { useMemo } from "react";
import { Ruler, Mountain, TrendingUp, Clock } from "lucide-react";
import { formatDate, formatHours } from "../../utils/formatting";

import ShoeCard from "../../components/cards/ShoeCard";
import Loading from "../../components/Loading";

import { useStravaActivities } from "../../hooks/useStravaActivities";
import { useAthlete } from "../../hooks/useAthlete";

function Gear() {
  const { athlete, loading: athleteLoading } = useAthlete();
  const { activities, loading: activitiesLoading } = useStravaActivities();

  // Processa sapatilhas e bicicletas só quando os dados estiverem prontos
  const { shoes, bikes } = useMemo(() => {
    if (!athlete || activities.length === 0) return { shoes: [], bikes: [] };

    const buildGearItem = (gear) => {
      const gearActivities = activities.filter(
        (act) => act.gear_id === gear.id,
      );

      const uses = gearActivities.length;
      const totalSeconds = gearActivities.reduce(
        (acc, curr) => acc + curr.moving_time,
        0,
      );
      const totalElev = Math.round(
        gearActivities.reduce(
          (acc, curr) => acc + curr.total_elevation_gain,
          0,
        ),
      );

      // Os km totais vêm do Strava
      const totalKm = (gear.distance / 1000).toFixed(1);

      const lastUse =
        gearActivities.length > 0 ? gearActivities[0].start_date : null;
      const firstUse =
        gearActivities.length > 0
          ? gearActivities[gearActivities.length - 1].start_date
          : null;

      return {
        id: gear.id,
        name: gear.name,
        primary: gear.primary,
        firstUse: firstUse ? formatDate(firstUse) : "n/a",
        lastUse: lastUse ? formatDate(lastUse) : "n/a",
        gearStats: [
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
            value: formatHours(totalSeconds),
            icon: <Clock size={18} />,
            color: "text-slate-400",
          },
          {
            title: "Elevação Total",
            value: `${totalElev} m`,
            icon: <Mountain size={18} />,
            color: "text-slate-400",
          },
        ],
      };
    };

    return {
      shoes: (athlete.shoes || []).map(buildGearItem),
      bikes: (athlete.bikes || []).map(buildGearItem),
    };
  }, [athlete, activities]);

  if (athleteLoading || activitiesLoading) return <Loading />;

  return (
    <div className="backdrop-blur-[20px] min-h-[calc(100vh-140px)] shadow-2xl animate-in fade-in duration-500">
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
        {bikes.length > 0 ? (
          bikes.map((bike) => (
            <ShoeCard key={bike.id} shoe={bike} isBike={true} />
          ))
        ) : (
          <p className="text-slate-500 italic text-center py-10">
            Nenhuma bicicleta registada no Strava.
          </p>
        )}
      </div>
    </div>
  );
}

export default Gear;
