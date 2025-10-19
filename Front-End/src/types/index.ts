// src/types/index.ts

export interface User {
  id: number;
  name: string;
}

export interface Review {
  id: number;
  user: User;
  rating: number;
  description: string;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  typeValues: string[];
  description: string | null;
  rating: number; // Média das avaliações
  lat: number;
  lng: number;
  reviews?: Review[]; // Array de avaliações
}