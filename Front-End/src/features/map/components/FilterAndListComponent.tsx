// src/features/map/components/FilterAndListComponent.tsx
"use client";

import { Button } from "@/components/ui/button";
import { tiposAcessibilidade } from "@/lib/constants";
import { Filter, X } from "lucide-react";
import { LocationList } from "./LocationList";

interface FilterAndListComponentProps {
  onFilterChange: (filters: string[]) => void;
  activeFilters: string[];
  locations: any[];
  totalLocations: number;
  onLocationClick: (location: any) => void;
  selectedLocationId?: number | null;
}

export default function FilterAndListComponent({
  onFilterChange,
  activeFilters,
  locations,
  totalLocations,
  onLocationClick,
  selectedLocationId,
}: FilterAndListComponentProps) {
  
  const toggleFilter = (typeValue: string) => {
    const newFilters = activeFilters.includes(typeValue)
      ? activeFilters.filter((f) => f !== typeValue)
      : [...activeFilters, typeValue];
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    onFilterChange([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b">
          <h3 className="text-lg font-semibold">Tipos de Acessibilidade</h3>
          {activeFilters.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-sm">
              <X className="w-4 h-4 mr-1" />
              Limpar filtros
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {tiposAcessibilidade.map((tipo) => {
            const isSelected = activeFilters.includes(tipo.value);
            return (
              <button key={tipo.value} onClick={() => toggleFilter(tipo.value)} className={`flex items-center gap-3 p-2 border-2 rounded-lg cursor-pointer transition-all duration-200 text-sm w-full text-left ${isSelected ? "border-gray-600 bg-gray-100 shadow-sm" : "border-gray-200 hover:border-gray-400 hover:bg-gray-50"}`}>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${isSelected ? "border-gray-600 bg-gray-600" : "border-gray-300"}`}>{isSelected && <Filter className="w-3 h-3 text-white" />}</div>
                <tipo.icon className="w-4 h-4" style={{ color: tipo.color }} />
                <span>{tipo.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="border-t border-gray-200" />
      <div>
        <LocationList
          locations={locations}
          totalLocations={totalLocations}
          onLocationClick={onLocationClick}
          selectedLocationId={selectedLocationId}
          hasActiveFilters={activeFilters.length > 0}
        />
      </div>
    </div>
  );
}