// Front-End/components/views/FilterPanel.tsx
"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { tiposAcessibilidade } from "@/lib/constants";
import { Filter, X } from "lucide-react";

interface FilterPanelProps {
  onFilterChange: (selectedFilters: string[]) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (typeValue: string) => {
    const newFilters = selectedFilters.includes(typeValue)
      ? selectedFilters.filter((f) => f !== typeValue)
      : [...selectedFilters, typeValue];
    
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    onFilterChange([]);
  };

  return (
    <div className="filter-panel">
      <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b">
        <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold">Filtrar Locais</h3>
        </div>
        {selectedFilters.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-sm">
                <X className="w-4 h-4 mr-1" />
                Limpar
            </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {tiposAcessibilidade.map((tipo) => {
          const isSelected = selectedFilters.includes(tipo.value);
          return (
            <button
              key={tipo.value}
              onClick={() => toggleFilter(tipo.value)}
              className={`flex items-center gap-2 p-2 border-2 rounded-lg cursor-pointer transition-all duration-200 text-sm w-full text-left ${
                isSelected
                  ? "border-gray-600 bg-gray-100 shadow-sm"
                  : "border-gray-200 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  isSelected ? "border-gray-600 bg-gray-600" : "border-gray-300"
                }`}
              >
                {isSelected && <Filter className="w-3 h-3 text-white" />}
              </div>
              <tipo.icon className="w-4 h-4" style={{ color: tipo.color }} />
              <span>{tipo.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}