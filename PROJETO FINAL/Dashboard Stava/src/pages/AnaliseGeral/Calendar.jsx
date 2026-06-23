import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Calendar as CalendarIcon,
  Activity,
  Timer,
  Mountain,
  List,
  TrendingUp,
  Award,
  PieChart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Loading from "../../components/Loading";
import StatCard from "../../components/cards/StatCard";
import Menu from "../../components/Menu";
import Dropdown from "../../components/Dropdown";
import { useStravaActivities } from "../../hooks/useStravaActivities";
import { sportOptions } from "../../config/menuOptions";
import { isRunActivity, isRideActivity } from "../../utils/activityType";
import {
  formatDistance,
  formatHours,
  formatElevation,
} from "../../utils/formatting";
import "../../styles/calendarCustom.css";

const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
const ANOS = [2028, 2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019];

function Calendar() {
  const [events, setEvents] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [advancedStats, setAdvancedStats] = useState(null);

  // Estados para controlar o mês e ano ativos no calendário
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());

  // Estado para o filtro de desporto ativo
  const [sportFilter, setSportFilter] = useState("Run");

  // Estados para controlar se as dropboxes estão abertas ou fechadas
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const calendarRef = useRef(null);
  const navigate = useNavigate();
  const { activities, loading } = useStravaActivities();

  // Transformar atividades em eventos com filtro aplicado
  useEffect(() => {
    if (activities.length === 0) return;

    const formattedEvents = activities
      .filter(
        (act) => act.type === sportFilter || act.sport_type === sportFilter,
      )
      .map((act) => ({
        id: act.id,
        title: `${(act.distance / 1000).toFixed(1)} km`,
        start: act.start_date_local.split("T")[0],
        backgroundColor: isRunActivity(act)
          ? "rgba(249, 115, 22, 0.2)"
          : "rgba(59, 130, 246, 0.2)",
        borderColor: isRunActivity(act) ? "#f97316" : "#3b82f6",
        textColor: "#fff",
        extendedProps: { type: act.type },
      }));

    setEvents(formattedEvents);
  }, [activities, sportFilter]);

  // Forçar a atualização dos StatCards quando se clica no Menu de Desportos
  useEffect(() => {
    if (activities.length > 0 && calendarRef.current) {
      handleDatesSet(null);
    }
  }, [sportFilter, activities]);

  // Controlar a navegação quando se escolhe um item na dropbox mês
  const handleMonthSelect = (monthIdx) => {
    setActiveMonth(monthIdx);
    setIsMonthOpen(false);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(
      `${activeYear}-${String(monthIdx + 1).padStart(2, "0")}-02`,
    );
  };

  // Controlar a navegação quando se escolhe um item na dropbox ano
  const handleYearSelect = (yearVal) => {
    setActiveYear(yearVal);
    setIsYearOpen(false);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(
      `${yearVal}-${String(activeMonth + 1).padStart(2, "0")}-02`,
    );
  };

  // Navegar para o mês anterior
  const handlePrevMonth = () => {
    let newMonth = activeMonth - 1;
    let newYear = activeYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    setActiveMonth(newMonth);
    setActiveYear(newYear);
    calendarRef.current
      .getApi()
      .gotoDate(`${newYear}-${String(newMonth + 1).padStart(2, "0")}-02`);
  };

  // Navegar para o mês seguinte
  const handleNextMonth = () => {
    let newMonth = activeMonth + 1;
    let newYear = activeYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setActiveMonth(newMonth);
    setActiveYear(newYear);
    calendarRef.current
      .getApi()
      .gotoDate(`${newYear}-${String(newMonth + 1).padStart(2, "0")}-02`);
  };

  // Processamento de estatísticas do mês
  const handleDatesSet = (dateInfo) => {
    if (activities.length === 0) return;

    const view = dateInfo?.view || calendarRef.current?.getApi()?.view;
    if (!view) return;

    const currentViewDate = view.currentStart;
    const currentMonth = currentViewDate.getMonth();
    const currentYear = currentViewDate.getFullYear();

    setActiveMonth(currentMonth);
    setActiveYear(currentYear);

    // Filtrar dados do mês atual considerando também o desporto ativo
    const filtered = activities.filter((act) => {
      const actDate = new Date(act.start_date_local);
      return (
        actDate.getMonth() === currentMonth &&
        actDate.getFullYear() === currentYear &&
        (act.type === sportFilter || act.sport_type === sportFilter)
      );
    });

    // Cálculo das estatísticas principais do mês
    const totalDist = filtered.reduce((acc, curr) => acc + curr.distance, 0);
    const totalTime = filtered.reduce((acc, curr) => acc + curr.moving_time, 0);
    const totalElev = filtered.reduce(
      (acc, curr) => acc + curr.total_elevation_gain,
      0,
    );

    // isto é o que preenche os 4 StatCards principais do mês
    setMonthlyStats([
      {
        title: `Treinos`,
        value: filtered.length,
        icon: <List size={18} />,
        color: "text-slate-400",
      },
      {
        title: `KM`,
        value: `${formatDistance(totalDist)} km`,
        icon: <Activity size={18} />,
        color: "text-slate-400",
      },
      {
        title: `Tempo`,
        value: `${formatHours(totalTime)}`,
        icon: <Timer size={18} />,
        color: "text-slate-400",
      },
      {
        title: `Elevação`,
        value: `${formatElevation(totalElev)} m`,
        icon: <Mountain size={18} />,
        color: "text-slate-400",
      },
    ]);

    // Métricas Gerais do mês
    const allMonthActivities = activities.filter((act) => {
      const actDate = new Date(act.start_date_local);
      return (
        actDate.getMonth() === currentMonth &&
        actDate.getFullYear() === currentYear
      );
    });

    const runs = allMonthActivities.filter(isRunActivity);
    const rides = allMonthActivities.filter(isRideActivity);

    // Cálculo da percentagem de corridas e bike no mês
    const runPercent = allMonthActivities.length
      ? Math.round((runs.length / allMonthActivities.length) * 100)
      : 0;
    const ridePercent = allMonthActivities.length
      ? Math.round((rides.length / allMonthActivities.length) * 100)
      : 0;

    // Cálculo do ritmo médio para atividades de corrida
    let avgPaceStr = "—";
    if (sportFilter === "Run" && runs.length > 0) {
      const totalRunDistKM =
        runs.reduce((acc, curr) => acc + curr.distance, 0) / 1000;
      const totalRunTimeSec = runs.reduce(
        (acc, curr) => acc + curr.moving_time,
        0,
      );
      if (totalRunDistKM > 0) {
        const paceMinTotal = totalRunTimeSec / 60 / totalRunDistKM;
        const mins = Math.floor(paceMinTotal);
        const secs = Math.round((paceMinTotal - mins) * 60);
        avgPaceStr = `${mins}:${secs.toString().padStart(2, "0")} /km`;
      }
    }

    // Cálculo da velocidade média para atividades de bike
    let avgRideSpeedStr = "—";
    if (sportFilter === "Ride" && rides.length > 0) {
      const totalRideDistKM =
        rides.reduce((acc, curr) => acc + curr.distance, 0) / 1000;
      const totalRideTimeH =
        rides.reduce((acc, curr) => acc + curr.moving_time, 0) / 3600;
      if (totalRideTimeH > 0) {
        avgRideSpeedStr = `${(totalRideDistKM / totalRideTimeH).toFixed(1)} km/h`;
      }
    }

    // Cálculo da maior distância do mês considerando o filtro de desporto
    const longestActivity =
      filtered.length > 0
        ? [...filtered].sort((a, b) => b.distance - a.distance)[0]
        : null;
    const longestStr = longestActivity
      ? `${(longestActivity.distance / 1000).toFixed(1)} km`
      : "—";

    // Atualizar o estado com as estatísticas avançadas do mês
    setAdvancedStats({
      runPercent,
      ridePercent,
      avgPace: avgPaceStr,
      avgSpeed: avgRideSpeedStr,
      longest: longestStr,
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-white/1 backdrop-blur-[15px] border border-white/20 rounded-xl p-8 min-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar space-y-8 shadow-2xl animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/5 pb-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter flex items-center gap-2">
            {" "}
            Calendário de Treinos
          </h1>
        </div>

        {/* Menu com Filtros */}
        <div className="flex items-center gap-4 relative z-50">
          <Menu
            options={sportOptions}
            activeValue={sportFilter}
            onChange={setSportFilter}
            layoutId="cal_sport_tabs"
            activeColorClass={
              sportFilter === "Run" ? "bg-orange-500/20" : "bg-blue-500/20"
            }
          />

          <div className="w-px h-6 bg-white/10"></div>

          {/* Navegação mês/ano > */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-bold text-slate-200 tracking-wide min-w-30 text-center">
              {MESES[activeMonth]} {activeYear}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Estatísticas Mensais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {monthlyStats.map((stat, idx) => (
          <StatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            showEmptyTrend={false}
          />
        ))}
      </div>

      {/* Análise */}
      {advancedStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/2 border border-white/5 rounded-2xl p-6">
          <div className="space-y-3 md:border-r border-white/5 pr-4">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1.5">
              Ritmo Médio e Velocidade Média
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 ">
                <span className="text-[9px] text-slate-500 block uppercase font-bold">
                  Média Corrida
                </span>
                <span className="text-sm font-black text-white italic">
                  {advancedStats.avgPace}
                </span>
              </div>
              <div className="p-3 ">
                <span className="text-[9px] text-slate-500 block uppercase font-bold">
                  Média Bike
                </span>
                <span className="text-sm font-black text-white italic">
                  {advancedStats.avgSpeed}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 md:border-r border-white/5 md:px-4">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1.5">
              Maior Distância
            </p>
            <div className=" flex items-center justify-between h-16">
              <div>
                <span className="text-base font-black text-white italic tracking-tight">
                  {advancedStats.longest}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 md:pl-4">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1.5">
              Distribuição do Desporto
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[10px] text-white font-bold italic uppercase">
                <span>Corrida ({advancedStats.runPercent}%)</span>
                <span>Bike ({advancedStats.ridePercent}%)</span>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-orange-500/20 transition-all duration-500"
                  style={{ width: `${advancedStats.runPercent}%` }}
                ></div>
                <div
                  className="h-full bg-blue-500/20 transition-all duration-500"
                  style={{ width: `${advancedStats.ridePercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendário */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl h-150">
        <div className="h-full calendar-container">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            locale="pt"
            headerToolbar={{ left: "title", center: "", right: "" }}
            height="100%"
            datesSet={handleDatesSet}
            eventClick={(info) => navigate(`/atividades?id=${info.event.id}`)}
            eventClassNames="cursor-pointer mb-2 hover:opacity-80 transition-opacity hover:scale-110 trasition-transform"
          />
        </div>
      </div>
    </div>
  );
}

export default Calendar;
