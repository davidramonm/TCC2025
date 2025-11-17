// src/app/page.tsx
"use client"

import MapPage from "@/features/map/components/MapPage";

/**
 * @description Ponto de entrada principal da aplicação (página inicial).
 * Renderiza o componente MapPage, que gerencia toda a lógica de UI do mapa.
 * O estado da sessão (autenticação) é provido globalmente pelo AuthProvider,
 * que é carregado no layout.tsx através do providers.tsx.
 * @returns {JSX.Element} O componente principal da página do mapa.
 */
export default function MapaAcessivel() {
  return <MapPage />;
}