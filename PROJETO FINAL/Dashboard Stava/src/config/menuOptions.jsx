import { Bike, Footprints } from "lucide-react";

export const timeOptions = [
  { label: "7 Dias", val: "7" },
  { label: "15 Dias", val: "15" },
  { label: "1 Mês", val: "30" },
  { label: "3 Meses", val: "90" },
  { label: "6 Meses", val: "180" },
  { label: "1 Ano", val: "365" },
];

export const sportOptions = [
  { label: "Corrida", val: "Run", icon: <Footprints size={14} /> },
  { label: "Ciclismo", val: "Ride", icon: <Bike size={14} /> },
];
