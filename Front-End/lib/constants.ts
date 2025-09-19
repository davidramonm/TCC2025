// Front-End/lib/constants.ts
import {
  Armchair as Wheelchair,
  Eye,
  EyeOff,
  EarOff,
  Volume2,
  Church as Crutches,
  Brain,
  Users,
  Navigation,
  Scale,
  Baby,
  Clock,
  Bath,
  ChevronsUp,
  Footprints,
  Grip,
  ParkingSquare,
  BookOpenText,
  MoveHorizontal,
  Accessibility,
  MapPin,
} from "lucide-react";

export const necessidades = [
  { value: "cadeirante", label: "Cadeirante", icon: Wheelchair },
  { value: "baixa-visao", label: "Baixa visão", icon: Eye },
  { value: "cegueira", label: "Cegueira", icon: EyeOff },
  { value: "surdez", label: "Surdez", icon: EarOff },
  { value: "deficiencia-auditiva", label: "Deficiência auditiva", icon: Volume2 },
  { value: "deficiencia-motora", label: "Deficiência motora", icon: Crutches },
  { value: "deficiencia-intelectual", label: "Deficiência intelectual", icon: Brain },
  { value: "autismo", label: "Autismo", icon: Users },
  { value: "mobilidade-reduzida", label: "Mobilidade reduzida", icon: Navigation },
  { value: "obesidade", label: "Obesidade", icon: Scale },
  { value: "gestante", label: "Gestante", icon: Baby },
  { value: "idoso", label: "Idoso", icon: Clock },
];

export const getPasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 25;
  if (/[^A-Za-z0-9]/.test(password)) strength += 25;
  return strength;
};

// Dados de Acessibilidade centralizados
export const tiposAcessibilidade = [
  { value: "rampa", label: "Rampa de acesso", icon: Accessibility, color: "#4b5563" },
  { value: "banheiro", label: "Banheiro adaptado", icon: Bath, color: "#6b7280" },
  { value: "elevador", label: "Elevador acessível", icon: ChevronsUp, color: "#374151" },
  { value: "piso", label: "Piso tátil", icon: Footprints, color: "#9ca3af" },
  { value: "sinalizacao", label: "Sinalização tátil", icon: Eye, color: "#6b7280" },
  { value: "corrimao", label: "Corrimão", icon: Grip, color: "#4b5563" },
  { value: "vagas", label: "Vagas especiais", icon: ParkingSquare, color: "#374151" },
  { value: "audio", label: "Sinalização sonora", icon: Volume2, color: "#6b7280" },
  { value: "braille", label: "Sinalização em Braille", icon: BookOpenText, color: "#4b5563" },
  { value: "circulacao", label: "Espaço para circulação", icon: MoveHorizontal, color: "#9ca3af" },
];

export const getLocationIcon = (type: string) => {
  const item = tiposAcessibilidade.find((t) => t.value === type);
  return item ? item.icon : MapPin;
};

export const getLocationTypeName = (type: string) => {
  const item = tiposAcessibilidade.find((t) => t.value === type);
  return item ? item.label : type;
};