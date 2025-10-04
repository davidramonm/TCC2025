// src/types/index.ts

/**
 * @description Define a estrutura de dados para um local no mapa.
 */
export interface Location {
  id: number;
  name: string;
  address: string;
  typeValues: string[];
  description?: string; // O '?' indica que a propriedade é opcional
  rating: number;
  lat: number;
  lng: number;
}
