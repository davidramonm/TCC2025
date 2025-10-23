// src/features/map/hooks/useLocations.ts
import { useMemo } from 'react';
import { Location } from '@/types';

export function useLocations(
  allLocations: Location[],
  activeFilters: string[]
) {
  const filteredLocations = useMemo(() => {
    if (activeFilters.length === 0) {
      return allLocations;
    }
    return allLocations.filter(location => 
      // --- CORREÇÃO ---
      // Adicionamos a verificação "Array.isArray(location.typeValues)"
      // para garantir que só chamamos ".includes" se typeValues existir e for um array.
      activeFilters.some(filter => Array.isArray(location.typeValues) && location.typeValues.includes(filter))
      // --- FIM DA CORREÇÃO ---
    );
  }, [allLocations, activeFilters]);

  return { filteredLocations };
}