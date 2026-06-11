import { Trophy, Clock, Mountain } from "lucide-react";

const formatRecordValue = (type, value) => {
  if (type === "distance") return `${(value / 1000).toFixed(2)} km`;
  if (type === "elevation") return `${value.toFixed(0)} m`;
  if (type === "time") {
    const h = Math.floor(value / 3600);
    const m = Math.floor((value % 3600) / 60);
    return `${h}h ${m}m`;
  }
  return value;
};

function WidgetCard({ recordsData }) {
  const categories = [
    {
      id: "distance",
      title: "Maior Distância",
      icon: <Trophy size={16} className="text-orange-500" />,
      items: recordsData?.distance || [],
    },
    {
      id: "time",
      title: "Maior Tempo",
      icon: <Clock size={16} className="text-orange-500" />,
      items: recordsData?.time || [],
    },
    {
      id: "elevation",
      title: "Maior Elevação",
      icon: <Mountain size={16} className="text-orange-500" />,
      items: recordsData?.elevation || [],
    },
  ];

  const medalColors = [
    "text-amber-400 font-black",
    "text-slate-300 font-bold",
    "text-amber-600 font-medium",
  ];

  return (
    <div className="w-full">
      <h3 className="text-lg font-black text-white italic leading-none uppercase truncate mb-6">
        Recordes Gerais (Top 3)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="space-y-4 bg-white/5 border border-white/10 p-5 rounded-xl shadow-lg"
          >
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {category.title}
              </span>
            </div>

            <div className="space-y-2.5">
              {category.items.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs"
                >
                  <div className="flex items-center gap-2 truncate max-w-[70%]">
                    <span className={medalColors[index]}>{index + 1}º</span>
                    <span
                      className="text-slate-300 truncate hover:text-white transition-colors"
                      title={item.name}
                    >
                      {item.name}
                    </span>
                  </div>
                  <span className="font-semibold text-white bg-white/5 px-2 py-0.5 rounded shrink-0">
                    {formatRecordValue(category.id, item.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WidgetCard;
