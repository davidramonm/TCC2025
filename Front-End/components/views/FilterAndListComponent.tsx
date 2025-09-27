// Front-End/components/views/FilterAndListComponent.tsx
"use client";

import FilterContent from "./FilterContent.tsx";
import { LocationList } from "./LocationList";

// Definindo uma interface de props para este componente unificado
interface FilterAndListComponentProps {
  // Props para o FilterContent
  onFilterChange: (selectedFilters: string[]) => void;
  // Props para a LocationList
  locations: any[];
  totalLocations: number;
  onLocationClick: (location: any) => void;
  selectedLocationId?: number | null;
}

export default function FilterAndListComponent({
  onFilterChange,
  locations,
  totalLocations,
  onLocationClick,
  selectedLocationId,
}: FilterAndListComponentProps) {
  return (
    <div className="space-y-6">
      {/* Seção de Filtros */}
      <div>
        <FilterContent onFilterChange={onFilterChange} />
      </div>

      {/* Divisor Visual */}
      <div className="border-t border-gray-200" />

      {/* Seção da Lista de Locais */}
      <div>
        <LocationList
          locations={locations}
          totalLocations={totalLocations}
          onLocationClick={onLocationClick}
          selectedLocationId={selectedLocationId}
        />
      </div>
    </div>
  );
}