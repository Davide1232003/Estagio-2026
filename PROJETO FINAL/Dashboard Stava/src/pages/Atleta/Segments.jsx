import { useState } from "react";
import { useStarredSegments } from "../../hooks/useStarredSegments";

import Loading from "../../components/Loading";
import Menu from "../../components/Menu";
import ListSegments from "../../components/segments/ListSegments";
import FavoriteSegments from "../../components/segments/FavoriteSegments";

import { Star } from "lucide-react";

const sectionOptions = [
  { label: "Realizados", val: "performed" },
  { label: "Favoritos", val: "starred" },
];

function Segments() {
  const { starred, performed, loading } = useStarredSegments();
  const [activeSection, setActiveSection] = useState("performed");

  if (loading) return <Loading message="A carregar..." />;

  return (
    <div className="bg-white/1 backdrop-blur-[15px] border border-white/20 rounded-xl p-8 min-h-[calc(100vh-140px)] animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
              Segmentos
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {activeSection === "starred"
                ? `${starred.length} favorito${starred.length !== 1 ? "s" : ""}`
                : `${performed.length} segmento${performed.length !== 1 ? "s" : ""} realizados`}
            </p>
          </div>

          <Menu
            options={sectionOptions}
            activeValue={activeSection}
            onChange={setActiveSection}
            layoutId="segment_menu"
            activeColorClass="bg-slate-400/20"
          />
        </div>

        {/* Conteúdo */}
        {activeSection === "starred" ? (
          starred.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Star size={48} className="text-slate-700" />
              <p className="text-slate-500 italic text-center">
                Não tens segmentos favoritos na Strava.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {starred.map((seg) => (
                <ListSegments key={seg.id} segment={seg} />
              ))}
            </div>
          )
        ) : (
          <FavoriteSegments segments={performed} />
        )}
      </div>
    </div>
  );
}

export default Segments;
