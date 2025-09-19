// Front-End/components/views/LocationList.tsx
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
  onLocationClick: (location: any) => void;
}

export function LocationList({ locations, onLocationClick }: LocationListProps) {
  return (
    <div className="locations-list">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b">
        <MapPin className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold">Locais Encontrados</h3>
      </div>
      <div className="space-y-3">
        {locations.length > 0 ? (
          locations.map((location) => {
            const tipo = tiposAcessibilidade.find(t => t.value === location.typeValues[0]);
            const Icon = tipo ? tipo.icon : MapPin;
            return (
            <div
              key={location.id}
              className="p-4 border rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => onLocationClick(location)}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: tipo ? `${tipo.color}20` : '#e5e7eb' }}
                >
                  <Icon className="w-5 h-5" style={{ color: tipo ? tipo.color : '#4b5563' }}/>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-base">{location.name}</h4>
                  <p className="text-sm text-gray-500">{location.address}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {location.typeValues.map((typeValue: string) => (
                       <Badge key={typeValue} variant="secondary" className="bg-gray-100 text-gray-600">
                         {getLocationTypeName(typeValue)}
                       </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-yellow-400">{renderStars(location.rating)}</div>
              </div>
            </div>
          )})
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>Nenhum local encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}