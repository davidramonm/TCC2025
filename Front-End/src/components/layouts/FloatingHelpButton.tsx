// Front-End/src/components/layouts/FloatingHelpButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

interface FloatingHelpButtonProps {
  /** Função callback executada ao clicar no botão de ajuda */
  onClick: () => void;
}

/**
 * @component FloatingHelpButton
 * @description Botão de ação flutuante (FAB) posicionado no canto inferior esquerdo.
 * Oferece acesso rápido e constante à ajuda ou onboarding, independente da navegação no mapa.
 * Utiliza z-index alto para garantir visibilidade sobre o mapa.
 * @param {FloatingHelpButtonProps} props - Propriedades do componente.
 */
export default function FloatingHelpButton({ onClick }: FloatingHelpButtonProps) {
  return (
    <div className="absolute bottom-6 left-6 z-40">
      <Button
        onClick={onClick}
        size="icon"
        className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 text-white shadow-xl hover:scale-105 transition-transform"
        aria-label="Abrir ajuda e boas-vindas"
      >
        <HelpCircle className="w-8 h-8" />
      </Button>
    </div>
  );
}