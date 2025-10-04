// src/features/map/components/LocationList.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import { tiposAcessibilidade, getLocationTypeName } from "@/lib/constants";

const renderStars = (rating: number) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${
          star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        } transition-colors`}
      />
    ))}
  </div>
);

interface LocationListProps {
  locations: any[];
  totalLocations: number;
  onLocationClick: (location: any) => void;
  selectedLocationId?: number | null;
  hasActiveFilters: boolean;
}

export function LocationList({ 
  locations, 
  totalLocations, 
  onLocationClick, 
  selectedLocationId, 
  hasActiveFilters 
}: LocationListProps) {
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
        {locations.length > 0 ? (
          locations.map((location) => {
            const tipoPrincipal = tiposAcessibilidade.find(t => t.value === location.typeValues[0]);
            const Icon = tipoPrincipal ? tipoPrincipal.icon : MapPin;
            const isSelected = location.id === selectedLocationId;

            return (
            <div
              key={location.id}
              className={`p-4 border rounded-lg shadow-sm cursor-pointer transition-all duration-200 ${
                isSelected ? 'bg-gray-100 border-gray-400 scale-[1.02]' : 'hover:bg-gray-50 hover:shadow-md'
              }`}
              onClick={() => onLocationClick(location)}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ backgroundColor: tipoPrincipal ? `${tipoPrincipal.color}20` : '#e5e7eb' }}
                >
                  <Icon className="w-5 h-5" style={{ color: tipoPrincipal ? tipoPrincipal.color : '#4b5563' }}/>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-base">{location.name}</h4>
                  <p className="text-sm text-gray-500">{location.address}</p>
                  {location.rating > 0 && <div className="mt-2">{renderStars(location.rating)}</div>}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {location.typeValues.map((typeValue: string) => (
                       <Badge key={typeValue} variant="secondary" className="bg-gray-200 text-gray-700 font-normal">
                         {getLocationTypeName(typeValue)}
                       </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )})
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
    </div>
  );
}