import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

function ElevationAnalytics({ activities = [] }) {
  // Filtra as atividades para os gráficos
  const processedData = activities
    .map((act) => ({
      name: new Date(act.start_date_local || act.start_date).toLocaleDateString(
        "pt-PT",
        { day: "2-digit", month: "2-digit" },
      ),
      Elevação: Math.round(act.total_elevation_gain || 0),
      Distância: parseFloat((act.distance / 1000).toFixed(1)),
      Grade: act.average_grade ? parseFloat(act.average_grade.toFixed(1)) : 0,
    }))
    .reverse();

  // Cálculos reais de suporte altimétrico
  const maxElev = processedData.length
    ? Math.max(...processedData.map((o) => o.Elevação))
    : 0;
  const totalElevAcum = processedData.reduce((acc, c) => acc + c.Elevação, 0);
  const avgElev = processedData.length
    ? Math.round(totalElevAcum / processedData.length)
    : 0;

  // Dados para o gráfico de radar
  const radarData = [
    {
      subject: "Plano",
      A:
        activities.filter(
          (a) => a.total_elevation_gain / (a.distance / 1000 || 1) < 5,
        ).length * 20,
    },
    {
      subject: "Ondulado",
      A:
        activities.filter(
          (a) =>
            a.total_elevation_gain / (a.distance / 1000 || 1) >= 5 &&
            a.total_elevation_gain / (a.distance / 1000 || 1) < 15,
        ).length * 20,
    },
    {
      subject: "Montanha",
      A:
        activities.filter(
          (a) => a.total_elevation_gain / (a.distance / 1000 || 1) >= 15,
        ).length * 20,
    },
    {
      subject: "Subida Longa",
      A: activities.filter((a) => a.total_elevation_gain > 200).length * 25,
    },
    {
      subject: "Explosivo",
      A: activities.filter((a) => a.average_grade > 4).length * 25,
    },
  ].map((item) => ({ ...item, A: Math.min(item.A, 100) || 10 }));

  return (
    <div className="grid grid-cols-1 gap-8 pb-12">
      {/* Ganho de Altimetria por atividade */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
        <div>
          <h3 className="text-sm font-black text-white italic uppercase tracking-wider">
            Ganho de Altimetria por Sessão
          </h3>
          <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wide">
            Eixo X: Data | Eixo Y: Metros de Subida Acumulados (D+)
          </p>
        </div>
        <div className="h-70 pt-2">
          <ResponsiveContainer width="100%" height="100%" debounce={50}>
            <BarChart
              data={
                processedData.length
                  ? processedData
                  : [{ name: "Sem dados", Elevação: 0 }]
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
                unit=" m"
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
                formatter={(val) => [`${val} m (D+)`, "Ganho Vertical"]}
              />
              <Bar
                dataKey="Elevação"
                fill="#f97316"
                fillOpacity={0.5}
                radius={[4, 4, 0, 0]}
                maxBarSize={24}
                name="Ganho Vertical"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Descrição dos dados */}
        <div className="text-xs text-slate-400 leading-relaxed">
          <span className="font-black text-white uppercase italic tracking-wider block mb-1">
            Mapeamento de Carga Altimétrica:
          </span>
          Cada barra isola o total de metros escalados em treinos específicos.
          Com um desnível médio de{" "}
          <strong className="text-sm">{avgElev} metros </strong>por sessão, este
          gráfico evidencia que treinos focados em subidas geram um estímulo de
          força muscular muito superior comparado a treinos em circuitos
          totalmente planos.
        </div>
      </div>

      {/* Perfil Contínuo de Desnível */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
        <div>
          <h3 className="text-sm font-black text-white italic uppercase tracking-wider">
            Perfil Contínuo de Desnível
          </h3>
          <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wide">
            Gráfico de área a ilustrar as oscilações verticais do período
          </p>
        </div>
        <div className="h-70 pt-2">
          <ResponsiveContainer width="100%" height="100%" debounce={50}>
            <AreaChart
              data={
                processedData.length
                  ? processedData
                  : [{ name: "Sem dados", Elevação: 0 }]
              }
            >
              <defs>
                <linearGradient id="elevGradient" x1="0" y1="0" x2="0" y2="1">
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
                unit=" m"
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
                formatter={(val) => [`${val} m (D+)`, "Ganho Vertical"]}
              />
              <Area
                type="monotone"
                dataKey="Elevação"
                stroke="#f97316"
                strokeWidth={2}
                fill="url(#elevGradient)"
                name="Metros Altimetria"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* Descrição dos dados */}
        <div className="text-xs text-slate-400 leading-relaxed">
          <span className="font-black text-white uppercase italic tracking-wider block mb-1">
            Tendência de Ganho Vertical Acumulado:
          </span>
          A análise contínua mostra o fluxo e a regularidade do teu ganho de
          altimetria. No total acumulado do período selecionado, venceste uma
          parede de <strong className="text-sm">{totalElevAcum} m </strong>
          de desnível positivo, consolidando a tua adaptação a relevos
          acentuados.
        </div>
      </div>

      {/* Perfil de terreno do atleta */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-black text-white italic uppercase tracking-wider">
            Perfil de Terreno do Atleta
          </h3>
          <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wide">
            Classificação de relevo com base nas altimetrias acumuladas
          </p>
        </div>
        <div className="h-70 w-full flex justify-center items-center">
          <ResponsiveContainer width="100%" height="100%" debounce={50}>
            <RadarChart cx="50%" cy="50%" radius="70%" data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis
                dataKey="subject"
                stroke="#94a3b8"
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
                formatter={(val) => [`${val}%`, "Prevalência no Perfil"]}
              />
              <Radar
                name="Atleta"
                dataKey="A"
                stroke="#f97316"
                fill="#f97316 "
                fillOpacity={0.15}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        {/* Descrição dos dados */}
        <div className="text-xs text-slate-400 leading-relaxed">
          <span className="font-black text-white uppercase italic tracking-wider block mb-1">
            Especialidade Biomecânica de Relevo:
          </span>
          Este gráfico poligonal desenha a tua "impressão digital" como atleta.
          Expansões nos eixos "Montanha" e "Subida Longa" traduzem a aptidão
          física para subidas de potência. Um perfil puxado para o
          "Plano/Sprint" reflete treinos mais focados em cadência pura e
          velocidade terminal.
        </div>
      </div>

      {/* Estatísticas */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-15 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-black text-white italic uppercase tracking-wider">
            Resumo de Carga Vertical
          </h3>
        </div>
        <div className="space-y-4 flex flex-col justify-center h-full py-4 max-w-xl mx-auto w-full">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">
              Maior Subida Individual
            </span>
            <span className="text-sm font-black text-white italic">
              {maxElev} m (D+)
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">
              Média Vertical do Período
            </span>
            <span className="text-sm font-black text-white italic">
              {avgElev} m / treino
            </span>
          </div>
        </div>
        {/* Descrição dos dados */}
        <div className="text-xs text-slate-400 leading-relaxed">
          <span className="font-black text-white uppercase italic tracking-wider block mb-1">
            Conclusão Metrológica de Força:
          </span>
          O pico máximo de <strong className="text-sm">{maxElev} metros</strong>{" "}
          numa única atividade marca o teu treino mais exigente ao nível de
          altimetria. Avaliar a relação entre a média vertical e este pico ajuda
          a dosear o esforço semanal e a planear melhor os picos de forma
          desportiva.
        </div>
      </div>
    </div>
  );
}

export default ElevationAnalytics;
