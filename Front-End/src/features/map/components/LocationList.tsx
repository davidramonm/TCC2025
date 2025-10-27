// src/features/map/components/LocationList.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { tiposAcessibilidade, getLocationTypeName } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Location } from "@/types";

interface LocationListProps {
  locations: Location[];
  totalLocations: number;
  onLocationClick: (location: any) => void;
  selectedLocationId?: string | null;
  hasActiveFilters: boolean;
}

export function LocationList({
  locations,
  totalLocations,
  onLocationClick,
  selectedLocationId,
  hasActiveFilters
}: LocationListProps) {

  const [page, setPage] = useState(1);
  const itemsPerPage = 5; 
  const totalPages = Math.max(1,Math.ceil(locations.length / itemsPerPage));


  // slice visible locations for current page
  const startIndex = (page - 1) * itemsPerPage;
  const visibleLocations = locations.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));


  return (
    <div className="locations-list">
      <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-600" />
          Locais Encontrados
        </h3>
        <span className="text-sm font-medium text-gray-500">
          {locations.length} de {totalLocations}
        </span>
      </div>
      <div className="space-y-3">
        {visibleLocations.length > 0 ? (
          visibleLocations.map((location) => {

            const hasTypes = Array.isArray(location.topNecessities) && location.topNecessities.length > 0;

            console.log(location.topNecessities[0]);

            const tipoPrincipal = hasTypes
              ? tiposAcessibilidade.find(t => t.value === location.topNecessities[0])
              : undefined;

            const Icon = tipoPrincipal ? tipoPrincipal.icon : MapPin;



            const isSelected = String(location.establishmentId) === String(selectedLocationId);

            return (
              <div
                key={location.establishmentId}
                className={`p-4 border rounded-lg shadow-sm cursor-pointer transition-all duration-200 ${isSelected ? 'bg-gray-100 border-gray-400 scale-[1.02]' : 'hover:bg-gray-50 hover:shadow-md'
                  }`}
                onClick={() => onLocationClick(location)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{ backgroundColor: tipoPrincipal ? `${tipoPrincipal.color}20` : '#e5e7eb' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: tipoPrincipal ? tipoPrincipal.color : '#4b5563' }} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-base">{location.name}</h4>
                    <p className="text-sm text-gray-500">{location.address}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {hasTypes && location.topNecessities.map((typeValue: string) => (
                        <Badge key={typeValue} variant="secondary" className="bg-gray-200 text-gray-700 font-normal">
                          {getLocationTypeName(typeValue)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center text-gray-500 py-8">
            <h4 className="font-semibold text-gray-700">Nenhum local encontrado</h4>
            {hasActiveFilters ? (
              <p className="text-sm mt-1">Tente remover alguns filtros para ver mais resultados.</p>
            ) : (
              <p className="text-sm mt-1">Ainda não há locais cadastrados que correspondam à sua busca.</p>
            )}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={page === 1}
          >
            ← Anterior
          </Button>

          <span className="text-sm text-gray-600">
            Página {page} de {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={page === totalPages}
          >
            Próxima →
          </Button>
        </div>
      )}
    </div>
  );
}