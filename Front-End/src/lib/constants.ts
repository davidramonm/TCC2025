// Front-End/lib/constants.ts
import {
  Armchair as Wheelchair,
  Eye,
  Bath,
  ChevronsUp,
  Footprints,
  ParkingSquare,
  BookOpenText,
  MoveHorizontal,
  Accessibility,
  MapPin,
  ArrowDownUp,
  HandHelping,
  Dog,
  TriangleRight,
  AccessibilityIcon,
  Toilet,
} from "lucide-react";

export const getPasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 25;
  if (/[^A-Za-z0-9]/.test(password)) strength += 25;
  return strength;
};

export const tiposAcessibilidade = [
  { value: "rampa", label: "Rampa de acesso", icon: TriangleRight, color: "#9ca3af" },
  { value: "acesso-cadeira-rodas", label: "Acesso para Cadeira de Rodas", icon: Accessibility, color: "#9ca3af" },
  { value: "banheiro", label: "Banheiro adaptado", icon: Toilet, color: "#9ca3af" },
  { value: "elevador", label: "Elevador acessível", icon: ChevronsUp, color: "#9ca3af" },
  { value: "escada-rolante", label: "Escada rolante", icon: ArrowDownUp, color: "#9ca3af" },
  { value: "piso", label: "Piso tátil", icon: Footprints, color: "#9ca3af" },
  { value: "vagas", label: "Vagas especiais", icon: ParkingSquare, color: "#9ca3af" },
  { value: "circulacao", label: "Espaço para circulação", icon: MoveHorizontal, color: "#9ca3af" },
  { value: "ajudantes", label: "Ajudantes no local", icon: HandHelping, color: "#9ca3af" },
  { value: "info-braille", label: "Informações em Braile", icon: BookOpenText, color: "#9ca3af" },
  { value: "animais-suporte", label: "Permite animais de suporte", icon: Dog, color: "#9ca3af" },
];

export const getLocationIcon = (type: string) => {
  const item = tiposAcessibilidade.find((t) => t.value === type);
  return item ? item.icon : MapPin;
};

export const getLocationTypeName = (type: string) => {
  const item = tiposAcessibilidade.find((t) => t.value === type);
  return item ? item.label : type;
};