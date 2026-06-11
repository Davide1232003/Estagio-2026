import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Target, ArrowRight } from "lucide-react";

function GoalsWidget({ activities = [] }) {
  const [targetKm, setTargetKm] = useState("");
  const [confirmedGoal, setConfirmedGoal] = useState(null); // Começa a null (linhas zeradas)
  const [period, setPeriod] = useState("month");

  // 1. Processamento dos dados para o Gráfico
  const chartData = useMemo(() => {
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    const mesAtual = agora.getMonth();
    const metaAtiva = confirmedGoal || 0;

    if (period === "month") {
      const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
      const dados = [];
      let totalAcumulado = 0;

      for (let dia = 1; dia <= diasNoMes; dia++) {
        const metaIdealDoDia =
          metaAtiva > 0 ? (metaAtiva / diasNoMes) * dia : 0;

        // Filtrar treinos deste dia específico (ignora as horas para não haver falhas de fuso horário)
        const treinosDoDia = activities.filter((act) => {
          if (act.type !== "Run") return false;
          const dataAct = new Date(act.start_date_local || act.start_date);
          return (
            dataAct.getFullYear() === anoAtual &&
            dataAct.getMonth() === mesAtual &&
            dataAct.getDate() === dia
          );
        });

        // 💡 CONVERSÃO: O Strava envia em metros. Dividimos por 1000 para somar em KM
        const kmDoDia = treinosDoDia.reduce(
          (acc, curr) => acc + curr.distance / 1000,
          0,
        );
        totalAcumulado += kmDoDia;

        dados.push({
          label: `${dia}`,
          "Progresso Real": parseFloat(totalAcumulado.toFixed(1)),
          Meta: parseFloat(metaIdealDoDia.toFixed(1)),
        });
      }
      return dados;
    } else {
      const meses = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ];
      const dados = [];
      let totalAcumulado = 0;

      meses.forEach((nomeMes, index) => {
        const metaIdealDoMes =
          metaAtiva > 0 ? (metaAtiva / 12) * (index + 1) : 0;

        const treinosDoMes = activities.filter((act) => {
          if (act.type !== "Run") return false;
          const dataAct = new Date(act.start_date_local || act.start_date);
          return (
            dataAct.getFullYear() === anoAtual && dataAct.getMonth() === index
          );
        });

        const kmDoMes = treinosDoMes.reduce(
          (acc, curr) => acc + curr.distance / 1000,
          0,
        );
        totalAcumulado += kmDoMes;

        dados.push({
          label: nomeMes,
          "Progresso Real": parseFloat(totalAcumulado.toFixed(1)),
          Meta: parseFloat(metaIdealDoMes.toFixed(1)),
        });
      });
      return dados;
    }
  }, [activities, confirmedGoal, period]);

  const handleSetGoal = (e) => {
    e.preventDefault();
    const val = parseFloat(targetKm);
    if (val > 0) setConfirmedGoal(val);
  };

  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-white">
      {/* Topo do Widget: Título à esquerda, Input/Controlos à direita */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-6">
        {/* Título Alinhado com o teu estilo */}
        <p className="flex items-center gap-2 text-lg font-black text-white italic leading-none uppercase truncate">
          Meta
        </p>

        {/* Zona Dinâmica no Canto Superior Direito */}
        <div className="flex items-center gap-3">
          {!confirmedGoal ? (
            /* Formulário Minimalista no Canto Superior Direito */
            <form onSubmit={handleSetGoal} className="flex items-center gap-2">
              <input
                type="number"
                placeholder="... km"
                value={targetKm}
                onChange={(e) => setTargetKm(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none w-20 placeholder:text-slate-500 font-medium"
                min="1"
                required
              />
              <button
                type="submit"
                className="bg-slate-400/15 hover:bg-slate-300/20 text-slate-300 border border-slate-500/30 font-black italic uppercase text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              >
                Definir
              </button>
            </form>
          ) : (
            /* Controlos do Gráfico e Botão de Reset quando a meta está ativa */
            <div className="flex items-center gap-3">
              <div className="flex gap-1 bg-white/5 p-1 rounded-lg border border-white/5">
                <button
                  onClick={() => setPeriod("month")}
                  className={`px-3 py-1 text-[10px] font-black italic uppercase rounded-md transition-all cursor-pointer ${
                    period === "month"
                      ? "bg-slate-300/20 text-slate-300 border border-slate-500/30"
                      : "text-slate-400"
                  }`}
                >
                  Mês
                </button>
                <button
                  onClick={() => setPeriod("year")}
                  className={`px-3 py-1 text-[10px] font-black italic uppercase rounded-md transition-all cursor-pointer ${
                    period === "year"
                      ? "bg-slate-300/20 text-slate-300 border border-slate-500/30"
                      : "text-slate-400"
                  }`}
                >
                  Ano
                </button>
              </div>
              <button
                onClick={() => {
                  setConfirmedGoal(null);
                  setTargetKm("");
                }}
                className="text-[10px] text-slate-500 hover:text-slate-300 underline font-black italic uppercase transition-colors cursor-pointer"
              >
                Alterar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Subtítulo informativo de estado */}
      <div className="mb-4">
        <p className="text-xs text-slate-400">
          {confirmedGoal ? (
            <>
              Objetivo:{" "}
              <span className="text-white font-black italic">
                {confirmedGoal} km
              </span>{" "}
              estipulados para este período.
            </>
          ) : (
            "Nenhuma meta definida de momento. Insere um valor no topo direito para ativar a monitorização."
          )}
        </p>
      </div>

      {/* Área do Gráfico (Sempre Visível) */}
      <div className="h-55 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {/* 🚀 ALTERADO: Adicionado 'accessibilityLayer' para o gráfico detetar o rato continuamente */}
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
            accessibilityLayer
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.03)"
            />
            <XAxis
              dataKey="label"
              stroke="#475569"
              fontSize={10}
              tickLine={false}
            />
            <YAxis stroke="#475569" fontSize={10} tickLine={false} unit="km" />

            {/* 🚀 ALTERADO: Configuração do Tooltip para seguir o movimento do cursor */}
            <Tooltip
              trigger="hover" /* Faz o tooltip atualizar a cada pixel movido */
              cursor={{
                stroke:
                  "rgba(255, 255, 255, 0.08)" /* Desenha a linha vertical guia que acompanha o rato */,
                strokeDasharray: "3 3",
              }}
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
              formatter={(value, name) => [`${value} km`, name]}
            />

            {/* Linha Alvo */}
            <Line
              type="monotone"
              dataKey="Meta"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth={1.5}
              strokeDasharray="6 6"
              dot={false}
              activeDot={false}
            />

            {/* Linha Real */}
            <Line
              type="monotone"
              dataKey="Progresso Real"
              stroke="#f97316"
              strokeWidth={confirmedGoal ? 3 : 0}
              dot={false}
              /* 🚀 ADICIONADO: 'activeDot' faz com que o ponto laranja nasça e deslize dinamicamente apenas onde o rato está por cima */
              activeDot={{
                r: 5,
                stroke: "#f97316",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default GoalsWidget;
