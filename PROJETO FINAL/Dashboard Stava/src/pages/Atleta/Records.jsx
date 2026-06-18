import { useStravaActivities } from "../../hooks/useStravaActivities";
import { useBestEfforts } from "../../hooks/useBestEfforts";
import RecordCard from "../../components/cards/RecordCard";
import Loading from "../../components/Loading";
import { Trophy } from "lucide-react";

function Records() {
  const { activities, loading } = useStravaActivities();
  const { records } = useBestEfforts(activities);

  if (loading) return <Loading />;

  return (
    <div className="bg-white/1 backdrop-blur-[15px] border border-white/20 rounded-xl p-8 min-h-[calc(100vh-140px)] animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex items-center gap-3 border-b border-white/5">
          <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
            Recordes Pessoais
          </h1>
        </div>

        {/* Grid de recordes */}
        <div className="w-full">
          {Array.isArray(records) && records.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {records.map((r) => (
                <RecordCard
                  key={r.meters}
                  label={r.label}
                  meters={r.meters}
                  record={r.record}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <p className="text-slate-500 italic text-center">
                Nenhum recorde pessoal encontrado.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Records;
