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
  ChevronDown,
} from "lucide-react";

import Loading from "../../components/Loading";
import StatCard from "../../components/cards/StatCard";
import Menu from "../../components/Menu";
import { useStravaActivities } from "../../hooks/useStravaActivities";
import { sportOptions } from "../../config/menuOptions";
import {
  formatDistance,
  formatHours,
  formatElevation,
} from "../../utils/conversions";
import "../../styles/calendarCustom.css";

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

  const meses = [
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
  const anos = [2026, 2025, 2024, 2023, 2022, 2021, 2020];

  // Transformar atividades em eventos com filtro aplicado
  useEffect(() => {
    if (activities.length === 0) return;

    const formattedEvents = activities
      .filter((act) => act.type === sportFilter)
      .map((act) => ({
        id: act.id,
        title: `${(act.distance / 1000).toFixed(1)} km`,
        start: act.start_date_local.split("T")[0],
        backgroundColor:
          act.type === "Run"
            ? "rgba(249, 115, 22, 0.2)"
            : "rgba(59, 130, 246, 0.2)",
        borderColor: act.type === "Run" ? "#f97316" : "#3b82f6",
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

  // 2. Controlar a navegação quando se escolhe um item na dropbox
  const handleMonthSelect = (monthIdx) => {
    setActiveMonth(monthIdx);
    setIsMonthOpen(false);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(
      `${activeYear}-${String(monthIdx + 1).padStart(2, "0")}-02`,
    );
  };

  const handleYearSelect = (yearVal) => {
    setActiveYear(yearVal);
    setIsYearOpen(false);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(
      `${yearVal}-${String(activeMonth + 1).padStart(2, "0")}-02`,
    );
  };

  // 3. Processamento de Estatísticas do Mês
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
        act.type === sportFilter
      );
    });

    const totalDist = filtered.reduce((acc, curr) => acc + curr.distance, 0);
    const totalTime = filtered.reduce((acc, curr) => acc + curr.moving_time, 0);
    const totalElev = filtered.reduce(
      (acc, curr) => acc + curr.total_elevation_gain,
      0,
    );

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

    // Métricas Gerais do Mês (Para a Secção de Baixo)
    const allMonthActivities = activities.filter((act) => {
      const actDate = new Date(act.start_date_local);
      return (
        actDate.getMonth() === currentMonth &&
        actDate.getFullYear() === currentYear
      );
    });

    const runs = allMonthActivities.filter((a) => a.type === "Run");
    const rides = allMonthActivities.filter((a) => a.type === "Ride");

    const runPercent = allMonthActivities.length
      ? Math.round((runs.length / allMonthActivities.length) * 100)
      : 0;
    const ridePercent = allMonthActivities.length
      ? Math.round((rides.length / allMonthActivities.length) * 100)
      : 0;

    let avgPaceStr = "—";
    if (runs.length > 0) {
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

    let avgRideSpeedStr = "—";
    if (rides.length > 0) {
      const totalRideDistKM =
        rides.reduce((acc, curr) => acc + curr.distance, 0) / 1000;
      const totalRideTimeH =
        rides.reduce((acc, curr) => acc + curr.moving_time, 0) / 3600;
      if (totalRideTimeH > 0) {
        avgRideSpeedStr = `${(totalRideDistKM / totalRideTimeH).toFixed(1)} km/h`;
      }
    }

    const longestActivity =
      filtered.length > 0
        ? [...filtered].sort((a, b) => b.distance - a.distance)[0]
        : null;
    const longestStr = longestActivity
      ? `${(longestActivity.distance / 1000).toFixed(1)} km`
      : "—";

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
      {/* 1. CABEÇALHO DO PAINEL */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/5 pb-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter flex items-center gap-2">
            {" "}
            Calendário de Treinos
          </h1>
        </div>

        {/* CONTROLO DE FILTROS INTEGRADOS */}
        <div className="flex flex-wrap items-center gap-3 relative z-50">
          <div className="scale-90 origin-right">
            <Menu
              options={sportOptions}
              activeValue={sportFilter}
              onChange={setSportFilter}
              layoutId="cal_sport_tabs"
              activeColorClass={
                sportFilter === "Run" ? "bg-orange-500/20" : "bg-blue-500/20"
              }
            />
          </div>

          <div className="w-px h-6 bg-white/10 hidden sm:block"></div>

          {/* Dropbox de Mês */}
          <div className="relative">
            <button
              onClick={() => {
                setIsMonthOpen(!isMonthOpen);
                setIsYearOpen(false);
              }}
              className="bg-white/2 backdrop-blur-[20px] border border-white/10 text-white text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-white/5 transition-colors shadow-lg min-w-32.5 justify-between cursor-pointer"
            >
              {meses[activeMonth]}
              <ChevronDown
                size={14}
                className={`text-slate-400 transition-transform ${isMonthOpen ? "transform rotate-180" : ""}`}
              />
            </button>

            {isMonthOpen && (
              <div className="absolute top-full mt-2 left-0 bg-slate-950/95 backdrop-blur-[20px] border border-white/10 rounded-xl w-40 max-h-60 overflow-y-auto p-1.5 shadow-2xl space-y-0.5 custom-scrollbar animate-in fade-in zoom-in-95 duration-100 ">
                {meses.map((m, idx) => (
                  <button
                    key={m}
                    onClick={() => handleMonthSelect(idx)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold uppercase transition-colors ${idx === activeMonth ? "bg-orange-500/20 text-white" : "text-slate-300 hover:bg-white/5"}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dropbox de Ano */}
          <div className="relative">
            <button
              onClick={() => {
                setIsYearOpen(!isYearOpen);
                setIsMonthOpen(false);
              }}
              className="bg-white/2 backdrop-blur-[20px] border border-white/10 text-white text-xs font-semibold  uppercase tracking-wider px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-white/5 transition-colors shadow-lg min-w-22.5 justify-between cursor-pointer"
            >
              {activeYear}
              <ChevronDown
                size={14}
                className={`text-slate-400 transition-transform ${isYearOpen ? "transform rotate-180" : ""}`}
              />
            </button>

            {isYearOpen && (
              <div className="absolute top-full mt-2 right-0 bg-slate-950/95 backdrop-blur-[20px] border border-white/10 rounded-xl w-28 p-1.5 shadow-2xl space-y-0.5 animate-in fade-in zoom-in-95 duration-100 ">
                {anos.map((a) => (
                  <button
                    key={a}
                    onClick={() => handleYearSelect(a)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold uppercase transition-colors ${a === activeYear ? "bg-blue-500/20 text-white" : "text-slate-300 hover:bg-white/5"}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. CORE STATS */}
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

      {/* SEÇÃO DE ANÁLISE DE PERFORMANCE AVANÇADA */}
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
              Distuibuição do Desporto
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

      {/* O CALENDÁRIO COMPACTO */}
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
