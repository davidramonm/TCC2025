// src/lib/constants.ts
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

/**
 * @description Calcula a "força" de uma senha com base em critérios simples.
 * @param {string} password A senha a ser avaliada.
 * @returns {number} Um valor de 0 a 100 representando a força da senha.
 */
export const getPasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength += 25; // Comprimento
  if (/[A-Z]/.test(password)) strength += 25; // Letra maiúscula
  if (/[0-9]/.test(password)) strength += 25; // Número
  if (/[^A-Za-z0-9]/.test(password)) strength += 25; // Caractere especial
  return strength;
};

/**
 * @description Array constante que mapeia os tipos de acessibilidade.
 * Contém IDs do banco de dados, valores (slugs), labels (nomes) e ícones.
 */
export const tiposAcessibilidade = [
  { necessityId: "44ed4004-4d96-4bfe-8a87-bc4e21f3a0e4", value: "animais-suporte", label: "Permite animais de suporte", icon: Dog, color: "#9ca3af" },
  { necessityId: "67dfc995-5edc-4515-8106-7500b162603e", value: "info-braille", label: "Informações em Braile", icon: BookOpenText, color: "#9ca3af" },
  { necessityId: "729c429b-41ed-46eb-8eb5-46be1e442700", value: "rampa", label: "Rampa de acesso", icon: TriangleRight, color: "#9ca3af" },
  { necessityId: "7902aa2b-7203-4f19-b4a2-19d70c383918", value: "escada-rolante", label: "Escada rolante", icon: ArrowDownUp, color: "#9ca3af" },
  { necessityId: "8783ab67-d11b-46aa-a9a3-fab9d8855936", value: "banheiro", label: "Banheiro adaptado", icon: Toilet, color: "#9ca3af" },
  { necessityId: "abc38e78-130f-4647-bcf5-af4de49ab6c2", value: "circulacao", label: "Espaço para circulação", icon: MoveHorizontal, color: "#9ca3af" },
  { necessityId: "c295ba47-f1fb-4116-8d11-9d342c30843b", value: "acesso-cadeira-rodas", label: "Acesso para Cadeira de Rodas", icon: Accessibility, color: "#9ca3af" },
  { necessityId: "d91d9e90-e01c-4866-b8c3-21c8dfad688b", value: "vagas", label: "Vagas especiais", icon: ParkingSquare, color: "#9ca3af" },
  { necessityId: "eaa13db2-95e1-47a0-8b59-f4608d0ed142", value: "piso", label: "Piso tátil", icon: Footprints, color: "#9ca3af" },
  { necessityId: "f67997ad-c0b6-4f5e-9e65-2d162751e0b0", value: "elevador", label: "Elevador acessível", icon: ChevronsUp, color: "#9ca3af" },
  { necessityId: "f68441e2-1817-4a6f-8e91-b60b44b6e489", value: "ajudantes", label: "Ajudantes no local", icon: HandHelping, color: "#9ca3af" },
];

/**
 * @description Retorna o componente de ícone (Lucide) para um tipo de acessibilidade.
 * @param {string} type O valor (slug) do tipo de acessibilidade (ex: "rampa").
 * @returns {React.ElementType} O componente de ícone correspondente
 * ou um ícone padrão (MapPin) se não for encontrado.
 */
export const getLocationIcon = (type: string) => {
  const item = tiposAcessibilidade.find((t) => t.value === type);
  return item ? item.icon : MapPin;
};

/**
 * @description Retorna o nome legível (label) para um tipo de acessibilidade.
 * @param {string} type O valor (slug) do tipo de acessibilidade (ex: "rampa").
 * @returns {string} A label correspondente (ex: "Rampa de acesso")
 * ou o próprio 'type' se não for encontrado.
 */
export const getLocationTypeName = (type: string) => {
  const item = tiposAcessibilidade.find((t) => t.value === type);
  return item ? item.label : type;
};