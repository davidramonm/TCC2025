// src/features/map/hooks/useLocations.ts
import { useMemo } from 'react';
import { Location } from '@/types';
// Remova a importação do 'tiposAcessibilidade', não é necessária aqui.
// import { tiposAcessibilidade } from '@/lib/constants'; 

<<<<<<< Updated upstream
/**
 * @description Hook puro para aplicar filtros a uma lista de locais.
 * @param {Location[]} allLocations - A lista completa de locais.
 * @param {string[]} activeFilters - Um array com os filtros ativos.
 */
export function useLocations(allLocations: Location[], activeFilters: string[]) {
=======
export function useLocations(
  allLocations: Location[],
  activeFilters: string[] // Estes são os NOMES (ex: "rampa")
) {
>>>>>>> Stashed changes
  const filteredLocations = useMemo(() => {
    if (activeFilters.length === 0) {
      return allLocations;
    }

    // --- CORREÇÃO: Lógica de tradução REMOVIDA ---
    // Os 'activeFilters' já são os nomes que precisamos.
    
    return allLocations.filter(location => 
<<<<<<< Updated upstream
      activeFilters.some(filter => location.typeValues.includes(filter))
=======
      // Comparamos os nomes dos filtros diretamente com os nomes dos locais
      activeFilters.some(filterName => 
        Array.isArray(location.topNecessities) && 
        location.topNecessities.includes(filterName)
      )
>>>>>>> Stashed changes
    );
  }, [allLocations, activeFilters]);

  return {
    allLocations, // Retorna a lista original para contagem e buscas
    filteredLocations, // Retorna a lista filtrada para exibição
  };
}