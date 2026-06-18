import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

function StatisticsAnalytics({ activities = [] }) {
  // Distribuição de distâncias (km)
  const distBuckets = [
    { label: "< 5 km", min: 0, max: 5 },
    { label: "5-10 km", min: 5, max: 10 },
    { label: "10-15 km", min: 10, max: 15 },
    { label: "15-20 km", min: 15, max: 20 },
    { label: "20-25 km", min: 20, max: 25 },
    { label: "25-30 km", min: 25, max: 30 },
    { label: "30-40 km", min: 30, max: 40 },
    { label: "> 40 km", min: 40, max: Infinity },
  ];

  // criar um array de objetos com a contagem de atividades para cada intervalo de distância
  const distData = distBuckets.map((bucket) => ({
    label: bucket.label,
    count: activities.filter((act) => {
      const km = act.distance / 1000;
      return km >= bucket.min && km < bucket.max;
    }).length,
  }));

  // Distribuição de paces (min/km)
  const paceBuckets = [
    { label: "< 3:30 min/km", min: 0, max: 3.5 },
    { label: "3:30 - 4:00 min/km", min: 3.5, max: 4 },
    { label: "4:00 - 4:30 min/km", min: 4, max: 4.5 },
    { label: "4:30 - 5:00 min/km", min: 4.5, max: 5 },
    { label: "5:00 - 5:30 min/km", min: 5, max: 5.5 },
    { label: "5:30 - 6:00 min/km", min: 5.5, max: 6 },
    { label: "6:00 - 7:00 min/km", min: 6, max: 7 },
    { label: "> 7:00 min/km", min: 7, max: Infinity },
  ];

  // criar um array de objetos com a contagem de atividades para cada intervalo de pace
  const paceData = paceBuckets.map((bucket) => ({
    label: bucket.label,
    count: activities.filter((act) => {
      if (!act.distance || !act.moving_time) return false;
      const pace = act.moving_time / 60 / (act.distance / 1000);
      return pace >= bucket.min && pace < bucket.max;
    }).length,
  }));

  // Distribuição por hora do dia
  const hourBuckets = [
    { label: "Matinal\n(06h-09h)", min: 0, max: 7 },
    { label: "Manhã\n(09h-12h)", min: 7, max: 12 },
    { label: "Meio-dia\n(12h-14h)", min: 12, max: 14 },
    { label: "Meio da Tarde\n(14h-18h)", min: 14, max: 18 },
    { label: "Fim do dia\n(18h-21h)", min: 18, max: 21 },
    { label: "Noite\n(21h-06h)", min: 21, max: 6 },
  ];

  // criar um array de objetos com a contagem de atividades para cada intervalo de hora
  const hourData = hourBuckets.map((bucket) => ({
    label: bucket.label,
    count: activities.filter((act) => {
      const hour = new Date(act.start_date_local || act.start_date).getHours();
      if (bucket.min > bucket.max) {
        // bucket atravessa meia-noite (ex: 21h-06h)
        return hour >= bucket.min || hour < bucket.max;
      }
      return hour >= bucket.min && hour < bucket.max;
    }).length,
  }));

  // Atividades do Mês - criar um mapa para contar atividades por mês/ano
  const monthMap = {};
  activities.forEach((act) => {
    const date = new Date(act.start_date_local || act.start_date);
    const key = date.toLocaleDateString("pt-PT", {
      month: "short",
      year: "2-digit",
    });
    monthMap[key] = (monthMap[key] || 0) + 1;
  });

  // converter o objeto monthMap em um array ordenado por data
  const monthData = Object.entries(monthMap)
    .map(([label, count]) => ({ label, count }))
    .reverse();

  // isto faz com que o gráfico mostre os meses na ordem correta (do mais antigo para o mais recente)
  const mostActiveHour = hourData.reduce(
    (prev, curr) => (curr.count > prev.count ? curr : prev),
    hourData[0],
  );
  const mostCommonDist = distData.reduce(
    (prev, curr) => (curr.count > prev.count ? curr : prev),
    distData[0],
  );
  const mostCommonPace = paceData.reduce(
    (prev, curr) => (curr.count > prev.count ? curr : prev),
    paceData[0],
  );

  return (
    <div className="grid grid-cols-1 gap-8 pb-12">
      {/* Distribuição de Distâncias */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
        <div>
          <h3 className="text-sm font-black text-white italic uppercase tracking-wider">
            Distribuição de Distâncias
          </h3>
          <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wide">
            Quantas atividades por intervalo de distância
          </p>
        </div>
        <div className="h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%" debounce={50}>
            <BarChart data={distData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                stroke="#64748b"
                fontSize={10}
                tickLine={false}
              />
              <YAxis
                stroke="#64748b"
                fontSize={10}
                tickLine={false}
                allowDecimals={false}
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
                formatter={(val) => [`${val} atividades`, "Total"]}
              />
              <Bar
                dataKey="count"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
                name="Atividades"
              >
                {distData.map((_, index) => (
                  <Cell
                    key={index}
                    fill="#f97316"
                    fillOpacity={0.5 + index * 0.07}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-slate-400 leading-relaxed">
          <span className="font-black text-white uppercase italic tracking-wider block mb-1">
            Padrão de Distância Preferida
          </span>
          A maioria das tuas atividades situa-se no intervalo de{" "}
          <strong className="text-sm">{mostCommonDist?.label}</strong>. Este
          padrão revela o teu perfil predominante de treino (base aeróbica,
          treino de velocidade ou endurance).
        </div>
      </div>

      {/* Distribuição de paces */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
        <div>
          <h3 className="text-sm font-black text-white italic uppercase tracking-wider">
            Distribuição de Paces
          </h3>
          <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wide">
            Quantas atividades por intervalo de ritmo (min/km)
          </p>
        </div>
        <div className="h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%" debounce={50}>
            <BarChart data={paceData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                stroke="#64748b"
                fontSize={10}
                tickLine={false}
              />
              <YAxis
                stroke="#64748b"
                fontSize={10}
                tickLine={false}
                allowDecimals={false}
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
                formatter={(val) => [`${val} atividades`, "Total"]}
              />
              <Bar
                dataKey="count"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
                name="Atividades"
              >
                {paceData.map((_, index) => (
                  <Cell
                    key={index}
                    fill="#f97316"
                    fillOpacity={0.4 + index * 0.08}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-slate-400 leading-relaxed">
          <span className="font-black text-white uppercase italic tracking-wider block mb-1">
            Zona de Conforto de Ritmo
          </span>
          O teu pace mais frequente está entre{" "}
          <strong className="text-sm">{mostCommonPace?.label}</strong>. Treinos
          fora desta zona são essenciais aumentar a tua performance geral.
          <br /> Ritmos mais rápidos desenvolvem a velocidade enquanto ritmos
          mais lentos fortalecem a base aeróbica.
        </div>
      </div>

      {/* Distribuição por hora do dia */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
        <div>
          <h3 className="text-sm font-black text-white italic uppercase tracking-wider">
            Distribuição por Hora do Dia
          </h3>
          <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wide">
            Em que período do dia treinas mais
          </p>
        </div>
        <div className="h-80  pt-2">
          <ResponsiveContainer width="100%" height="100%" debounce={50}>
            <BarChart data={hourData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                stroke="#64748b"
                fontSize={10}
                tickLine={false}
              />
              <YAxis
                stroke="#64748b"
                fontSize={10}
                tickLine={false}
                allowDecimals={false}
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
                formatter={(val) => [`${val} atividades`, "Total"]}
              />
              <Bar
                dataKey="count"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
                name="Atividades"
              >
                {hourData.map((_, index) => (
                  <Cell key={index} fill="#f97316" fillOpacity={0.6} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-slate-400 leading-relaxed">
          <span className="font-black text-white uppercase italic tracking-wider block mb-1">
            Perfil Cronobiológico de Treino
          </span>
          Treinas predominantemente no período da{" "}
          <strong className="text-sm">
            {mostActiveHour?.label?.split("\n")[0]}
          </strong>
          . A hora do dia influencia diretamente a performance, treinos matinais
          tendem a ter FC mais baixa enquanto treinos ao fim do dia beneficiam
          de maior temperatura corporal.
        </div>
      </div>

      {/* Atividades por mês */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
        <div>
          <h3 className="text-sm font-black text-white italic uppercase tracking-wider">
            Atividades por Mês
          </h3>
          <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wide">
            Número de atividades registadas por mês
          </p>
        </div>
        <div className="h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%" debounce={50}>
            <BarChart data={monthData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                stroke="#64748b"
                fontSize={10}
                tickLine={false}
              />
              <YAxis
                stroke="#64748b"
                fontSize={10}
                tickLine={false}
                allowDecimals={false}
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
                formatter={(val) => [`${val} atividades`, "Total"]}
              />
              <Bar
                dataKey="count"
                fill="#f97316"
                fillOpacity={0.5}
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
                name="Atividades"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-slate-400 leading-relaxed">
          <span className="font-black text-white uppercase italic tracking-wider block mb-1">
            Consistência Mensal de Treino
          </span>
          A regularidade mensal é o indicador mais fiável de evolução a longo
          prazo. Meses com picos elevados indicam blocos de treino intenso
          enquanto meses mais baixos podem refletir períodos de recuperação ou
          descanso ativo.
        </div>
      </div>
    </div>
  );
}

export default StatisticsAnalytics;
