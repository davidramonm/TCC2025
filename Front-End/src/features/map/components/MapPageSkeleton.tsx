// src/features/map/components/MapPageSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Search } from "lucide-react";

/**
 * @component MapPageSkeleton
 * @description Componente de estado de carregamento (Loading State).
 * Exibe uma versão "esqueleto" da interface principal enquanto os dados do mapa são carregados pela API.
 * Melhora a percepção de performance (Perceived Performance).
 * @returns {JSX.Element} O esqueleto da página.
 */
export default function MapPageSkeleton() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Skeleton do Header */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="h-6 w-40" />
        </div>
        <div className="flex-1 max-w-2xl mx-8 relative">
          <Skeleton className="h-10 w-full rounded-full" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </header>

      {/* Skeleton do Conteúdo Principal */}
      <div className="flex-1 relative">
        <div className="w-full h-full bg-gray-200 animate-pulse" />
        <div className="absolute bottom-6 right-6 z-40">
          <Skeleton className="w-16 h-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}