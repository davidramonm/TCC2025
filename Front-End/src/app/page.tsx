// src/app/page.tsx
"use client"


import MapPage from "@/features/map/components/MapPage";

/**
 * @description Ponto de entrada principal da aplicação.
 * Renderiza a MapPage, que gerencia toda a lógica de UI.
 * O estado da sessão é provido globalmente pelo AuthProvider em layout.tsx.
 */
export default function MapaAcessivel() {
  return <MapPage />;
}