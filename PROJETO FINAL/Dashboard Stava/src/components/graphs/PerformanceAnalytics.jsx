import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ScatterChart,
  Scatter,
} from "recharts";
import { formatPace, formatPaceLabel } from "../../utils/conversions";
import MetricsCard from "../cards/MetricsCard";

function PerformanceAnalytics({ activities = [] }) {
  // Filtra as atividades para os gráficos
  const processedData = activities
    .filter((act) => act.distance > 0 && act.moving_time > 0)
    .map((act) => {
      const paceSeconds = act.moving_time / (act.distance / 1000);
      const paceMin = parseFloat((paceSeconds / 60).toFixed(2));
      return {
        name: new Date(
          act.start_date_local || act.start_date,
        ).toLocaleDateString("pt-PT", {
          day: "2-digit",
          month: "2-digit",
        }),
        Pace: paceMin,
        FC: act.has_heartrate ? Math.round(act.average_heartrate) : null,
        Distância: parseFloat((act.distance / 1000).toFixed(1)),
      };
    })
    .reverse();

  // Filtra apenas as atividades que têm FC
  const scatterData = processedData.filter((d) => d.FC !== null);

  // Cálculos de métricas para o card resumo
  const bestPace = processedData.length
    ? Math.min(...processedData.map((d) => d.Pace))
    : 0;
  const avgFC = scatterData.length
    ? Math.round(
        scatterData.reduce((acc, d) => acc + d.FC, 0) / scatterData.length,
      )
    : 0;
  const avgPace = processedData.length
    ? processedData.reduce((acc, d) => acc + d.Pace, 0) / processedData.length
    : 0;

  return (
    <div className="grid grid-cols-1 gap-8 pb-12">
      {/* Gráfico 1: Evolução do Pace */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
        <div>
          <h3 className="text-sm font-black text-white italic uppercase tracking-wider">
            Evolução do Pace
          </h3>
          <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wide">
            Eixo X: Data | Eixo Y: Ritmo médio (min/km)
          </p>
        </div>
        <div className="h-64 pt-2">
          <ResponsiveContainer width="100%" height="100%" debounce={50}>
            <AreaChart
              data={
                processedData.length
                  ? processedData
                  : [{ name: "Sem dados", Pace: 0 }]
              }
            >
              <defs>
                <linearGradient id="paceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="#64748b"
                fontSize={10}
                tickLine={false}
              />
              <YAxis
                stroke="#64748b"
                fontSize={10}
                tickLine={false}
                reversed
                tickFormatter={formatPaceLabel}
                width={70}
              />
              <Tooltip
                cursor={false}
                contentStyle={{
                  backgroundColor: "#020617",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "12px",
                }}
                labelStyle={{
                  color: "#ffffff",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
                itemStyle={{
                  fontWeight: "600",
                  color: "#94a3b8",
                }}
                formatter={(val) => [formatPaceLabel(val), "Ritmo"]}
              />
              <Area
                type="monotone"
                dataKey="Pace"
                stroke="#f97316"
                strokeWidth={2}
                fill="url(#paceGradient)"
                name="Pace"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-slate-400 leading-relaxed">
          <span className="font-black text-white uppercase italic tracking-wider block mb-1">
            Análise de Evolução de Ritmo
          </span>
          O teu pace médio do período é de{" "}
          <strong className="text-sm">{formatPaceLabel(avgPace)}</strong>. Uma
          tendência descendente na curva indica melhoria de performance, estás a
          correr mais rápido com o mesmo esforço.
          <br />O teu melhor pace registadofoi de{" "}
          <strong className="text-sm">{formatPaceLabel(bestPace)}</strong>.
        </div>
      </div>

      {/* Gráfico 2: Evolução da FC média */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
        <div>
          <h3 className="text-sm font-black text-white italic uppercase tracking-wider">
            Evolução da Frequência Cardíaca
          </h3>
          <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wide">
            Eixo X: Data | Eixo Y: FC média por sessão
          </p>
        </div>
        <div className="h-64 pt-2">
          {scatterData.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-slate-500 italic text-sm">
                Sem dados de frequência cardíaca.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%" debounce={50}>
              <AreaChart data={scatterData}>
                <defs>
                  <linearGradient id="fcGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  unit=" bpm"
                />
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    backgroundColor: "#020617",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: "12px",
                  }}
                  labelStyle={{
                    color: "#ffffff",
                    fontWeight: "bold",
                    marginBottom: "4px",
                  }}
                  itemStyle={{
                    fontWeight: "600",
                    color: "#94a3b8",
                  }}
                  formatter={(val) => [`${val} bpm`, "FC Média"]}
                />
                <Area
                  type="monotone"
                  dataKey="FC"
                  stroke="#f97316"
                  strokeWidth={2}
                  fill="url(#fcGradient)"
                  name="FC Média"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="text-xs text-slate-400 leading-relaxed">
          <span className="font-black text-white uppercase italic tracking-wider block mb-1">
            Análise de Carga Cardiovascular
          </span>
          A tua Frequência Cardíaca média neste período de tempo é de{" "}
          <strong className="text-sm">{avgFC} bpm</strong>. Uma tendência
          descendente ao longo do tempo indica melhoria da eficiência
          cardiovascular, ou seja, o coração trabalha menos para o mesmo
          esforço.
        </div>
      </div>

      {/* Grafico 3: Distruição de Pace vs FC */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
        <div>
          <h3 className="text-sm font-black text-white italic uppercase tracking-wider">
            Eficiência — Pace vs Frequência Cardíaca
          </h3>
          <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wide">
            Eixo X: Pace (min/km) | Eixo Y: FC média (bpm)
          </p>
        </div>
        <div className="h-64 pt-2">
          {scatterData.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-slate-400 italic text-sm">
                Sem dados de frequência cardíaca.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%" debounce={50}>
              <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                <CartesianGrid
                  stroke="rgba(255,255,255,0.05)"
                  strokeDasharray="3 3"
                />
                <XAxis
                  type="number"
                  dataKey="Pace"
                  name="Pace"
                  stroke="#64748b"
                  fontSize={10}
                  reversed
                  tickFormatter={formatPaceLabel}
                  width={70}
                />
                <YAxis
                  type="number"
                  dataKey="FC"
                  name="FC"
                  unit=" bpm"
                  stroke="#64748b"
                  fontSize={10}
                />
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    backgroundColor: "#020617",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: "12px",
                  }}
                  labelStyle={{
                    color: "#ffffff",
                    fontWeight: "bold",
                    marginBottom: "6px",
                  }}
                  itemStyle={{
                    fontWeight: "600",
                    color: "#94a3b8",
                  }}
                  formatter={(val, name) => {
                    if (name === "Pace") {
                      const paceLimpo = formatPaceLabel(val)
                        .replace("/km", "")
                        .trim();
                      return [`${paceLimpo}/km`, "Ritmo"];
                    } else {
                      return [`${val} bpm`, "Frequência Cardíaca"];
                    }
                  }}
                />
                <Scatter
                  name="Sessões"
                  data={scatterData}
                  fill="#f97316"
                  fillOpacity={0.7}
                />
              </ScatterChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="text-xs text-slate-400 leading-relaxed">
          <span className="font-black text-white uppercase italic tracking-wider block mb-1">
            Co-Relação Eficiência Cardiovascular
          </span>
          Pontos no canto inferior esquerdo (pace rápido + FC baixa) indicam
          alta eficiência aeróbica. À medida que o teu condicionamento melhora,
          os pontos tendem a deslocar-se nessa direção.
        </div>
      </div>

      {/* Card 4: Resumo de Performance */}
      <MetricsCard
        title="Resumo de Performance"
        items={[
          {
            label: "Melhor Pace",
            value: `${formatPaceLabel(bestPace)} min/km`,
          },
          {
            label: "Pace Médio do Período",
            value: `${formatPaceLabel(avgPace)} min/km`,
          },
          {
            label: "FC Média do Período",
            value: avgFC > 0 ? `${avgFC} bpm` : "N/A",
          },
        ]}
      />
    </div>
  );
}

export default PerformanceAnalytics;
