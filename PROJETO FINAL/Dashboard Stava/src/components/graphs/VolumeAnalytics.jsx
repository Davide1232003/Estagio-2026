import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { formatPaceLabel } from "../../utils/conversions";

function VolumeAnalytics({ activities = [] }) {
  // Filtra as atividades para os gráficos
  const processedData = activities
    .map((act) => ({
      name: new Date(act.start_date_local || act.start_date).toLocaleDateString(
        "pt-PT",
        { day: "2-digit", month: "2-digit" },
      ),
      Distância: parseFloat((act.distance / 1000).toFixed(2)),
      Pace: parseFloat(
        (act.moving_time / 60 / (act.distance / 1000)).toFixed(2),
      ),
      Tempo: Math.round(act.moving_time / 60),
    }))
    .reverse();

  // Cálculos para o resumo/descrição do volume
  const totalKm = processedData
    .reduce((acc, c) => acc + c.Distância, 0)
    .toFixed(1);
  const avgPace = processedData.length
    ? (
        processedData.reduce((acc, c) => acc + c.Pace, 0) / processedData.length
      ).toFixed(2)
    : "0.00";

  const totalRun = activities.filter((a) => a.type === "Run").length;
  const totalRide = activities.filter((a) => a.type === "Ride").length;

  const pieData = [
    { name: "Corrida", value: totalRun },
    { name: "Ciclismo", value: totalRide },
  ].filter((item) => item.value > 0);

  const finalPieData = pieData.length
    ? pieData
    : [{ name: "Sem Treinos", value: 1 }];
  const COLORS = ["#f97316", "#3b82f6", "#334155"];

  const avgPaceDecimal = processedData.length
    ? processedData.reduce((acc, c) => acc + c.Pace, 0) / processedData.length
    : 0;

  return (
    <div className="grid grid-cols-1 mt-15 gap-20 pb-12">
      {/* GRÁFICO 1: CARGA DE TREINO (BARRAS) */}
      <div className=" space-y-8">
        <div>
          <h3 className="text-sm font-black text-white italic uppercase tracking-wider">
            Histórico de Carga (KM)
          </h3>
          <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wide">
            Compara o volume bruto acumulado em cada treino individual
          </p>
        </div>
        <div className="h-64 pt-2">
          <ResponsiveContainer width="100%" height="100%" debounce={50}>
            <BarChart
              data={
                processedData.length
                  ? processedData
                  : [{ name: "Sem dados", Distância: 0 }]
              }
            >
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
                unit=" km"
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
                  color: "#ffffff", // Data do treino sempre a branco
                  fontWeight: "bold",
                  marginBottom: "6px",
                }}
                itemStyle={{
                  fontWeight: "600",
                  color: "#94a3b8", // Texto em text-slate-400
                }}
                formatter={(val) => [`${val} km`, "Volume Total"]}
              />
              <Bar
                dataKey="Distância"
                fill="#f97316"
                fillOpacity={0.5}
                radius={[4, 4, 0, 0]}
                name="Volume (km)"
                maxBarSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Descrição dos dados */}
        <div className=" text-xs text-slate-400 leading-relaxed">
          <span className="font-black text-white uppercase italic tracking-wider block mb-1">
            Análise de Impacto de Carga
          </span>
          A visualização em barras isola o impacto de cada treino no teu plano.
          Permite detetar picos isolados de esforço. Manter uma altura homogénea
          nas barras sugere consistência no desenvolvimento da base aeróbica,
          evitando sobrecargas musculares repentinas.
        </div>
      </div>

      {/* GRÁFICO 2: EVOLUÇÃO DE VOLUME */}
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-black text-white italic uppercase tracking-wider">
            Evolução do Volume por Treino
          </h3>
          <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wide">
            Eixo X: Data do Treino | Eixo Y: Distância total da sessão
          </p>
        </div>
        <div className="h-64 pt-2">
          <ResponsiveContainer width="100%" height="100%" debounce={50}>
            <AreaChart
              data={
                processedData.length
                  ? processedData
                  : [{ name: "Sem dados", Distância: 0 }]
              }
            >
              <defs>
                <linearGradient id="volGradient" x1="0" y1="0" x2="0" y2="1">
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
                unit=" km"
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
                  color: "#94a3b8", // Texto em text-slate-400
                }}
                formatter={(val, name) => {
                  if (name === "Ritmo" || name === "Pace") {
                    // Caso a tua função coloque o "/km" extra, limpamos aqui também
                    const paceLimpo = formatPaceLabel(val)
                      .replace("/km", "")
                      .trim();
                    return [`${paceLimpo}/km`, "Ritmo"];
                  }
                  return [`${val} km`, "Distância"];
                }}
              />
              <Area
                type="monotone"
                dataKey="Distância"
                stroke="#f97316"
                strokeWidth={2}
                fill="url(#volGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* Descrição dos dados */}
        <div className="text-xs text-slate-400 leading-relaxed">
          <span className="font-black text-white uppercase italic tracking-wider block mb-1">
            Análise de Tendência Temporal
          </span>
          Este gráfico mapeia a distribuição cronológica do teu volume.
          Atualmente, tens um acumulado total de{" "}
          <strong className="text-sm">{totalKm} km</strong> nas sessões
          listadas. Oscilações acentuadas na curva indicam variações planeadas
          entre treinos longos de endurance e sessões de recuperação mais
          curtas.
        </div>
      </div>

      {/* GRÁFICO 3: DISPERSÃO */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
        <div>
          <h3 className="text-sm font-black text-white italic uppercase tracking-wider">
            Análise de Ritmo (Distância vs Pace)
          </h3>
          <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wide">
            Eixo X: KMs | Eixo Y: Pace
          </p>
        </div>
        <div className="h-64 pt-2">
          <ResponsiveContainer width="100%" height="100%" debounce={50}>
            <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="3 3"
              />
              <XAxis
                type="number"
                dataKey="Distância"
                name="Distância"
                unit=" km"
                stroke="#64748b"
                fontSize={10}
              />
              <YAxis
                type="number"
                dataKey="Pace"
                name="Ritmo"
                unit=" min/km"
                stroke="#64748b"
                tickFormatter={formatPaceLabel}
                fontSize={10}
                reversed
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
                itemStyle={{ fontWeight: "600", color: "#94a3b8" }}
                formatter={(val, name) => {
                  if (name === "Ritmo") {
                    return [`${formatPaceLabel(val)}`, "Ritmo"];
                  }
                  return [`${val}`, "Distância"];
                }}
              />
              <Scatter name="Sessões" data={processedData} fill="#f97316" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        {/* Descrição dos dados */}
        <div className="text-xs text-slate-400 leading-relaxed">
          <span className="font-black text-white uppercase italic tracking-wider block mb-1">
            Correlação Eficiência vs Resiliência
          </span>
          O teu ritmo médio geral situa-se nos{" "}
          <strong className="text-sm">
            {formatPaceLabel(avgPaceDecimal)} min/km
          </strong>
          . Pontos dispersos no canto superior esquerdo validam treinos curtos e
          velozes (sprints/intervalados). Pontos agrupados no centro-direito
          demonstram a tua estabilidade de ritmo em distâncias longas.
        </div>
      </div>
    </div>
  );
}

export default VolumeAnalytics;
