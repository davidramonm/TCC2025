// src/features/map/hooks/useLocations.ts
import { useMemo } from 'react';
import { Location } from '@/types';

/**
 * @description Hook puro para aplicar filtros a uma lista de locais.
 * @param {Location[]} allLocations - A lista completa de locais.
 * @param {string[]} activeFilters - Um array com os filtros ativos.
 */
export function useLocations(allLocations: Location[], activeFilters: string[]) {
  const filteredLocations = useMemo(() => {
    if (activeFilters.length === 0) {
      return allLocations;
    }
    return allLocations.filter(location => 
      activeFilters.some(filter => location.typeValues.includes(filter))
    );
  }, [allLocations, activeFilters]);

  return {
    allLocations, // Retorna a lista original para contagem e buscas
    filteredLocations, // Retorna a lista filtrada para exibição
  };
}