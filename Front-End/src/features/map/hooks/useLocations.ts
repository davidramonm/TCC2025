// src/features/map/hooks/useLocations.ts
import { useMemo } from 'react';
import { Location } from '@/types';

/**
 * @description Hook customizado para filtrar uma lista de locais (Locations)
 * com base nos filtros de acessibilidade ativos.
 * Utiliza `useMemo` para otimizar a performance, recalculando a lista
 * apenas quando os locais ou os filtros mudarem.
 * @param {Location[]} allLocations A lista completa de locais.
 * @param {string[]} activeFilters Um array de strings contendo os filtros ativos (necessidades).
 * @returns {{ filteredLocations: Location[] }} Um objeto contendo a lista de locais filtrados.
 */
export function useLocations(
  allLocations: Location[],
  activeFilters: string[]
) {
  const filteredLocations = useMemo(() => {
    
    if (activeFilters.length === 0) {
      return allLocations;
    }
    
    return allLocations.filter(location => 
      activeFilters.some(filter => Array.isArray(location.topNecessities) && location.topNecessities.includes(filter))
    );
  }, [allLocations, activeFilters]);

  return { filteredLocations };
}