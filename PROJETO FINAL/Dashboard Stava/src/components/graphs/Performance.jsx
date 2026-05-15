import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

// Componente para o Gráfico de Volume (Linha/Área)
export const VolumeChart = ({ data, color = "#3b82f6" }) => (
  <div className="h-64 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorKms" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#ffffff05"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          stroke="#64748b"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          stroke="#64748b"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}km`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#169e48",
            border: "none",
            borderRadius: "12px",
            fontSize: "12px",
          }}
          itemStyle={{ color: "#fff" }}
        />
        <Area
          type="monotone"
          dataKey="kms"
          stroke={color}
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorKms)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

// Componente para o Gráfico de Elevação (Barras)
export const ElevationChart = ({ data, color = "#f97316" }) => (
  <div className="h-64 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#ffffff05"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          stroke="#64748b"
          fontSize={10}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#169e48"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}m`}
        />
        <Tooltip
          cursor={{ fill: "transparent" }}
          contentStyle={{
            backgroundColor: "#169e48",
            border: "none",
            borderRadius: "12px",
            fontSize: "12px",
          }}
        />
        <Bar dataKey="elev" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.elev > 100 ? color : "#fb923c"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);
