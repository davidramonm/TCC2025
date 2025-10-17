// src/types/index.ts

/**
 * @description Define a estrutura de dados para um local no mapa.
 */
export interface Location {
  id: number;
  name: string;
  address: string;
  typeValues: string[];
  description?: string;
  rating: number;
  lat: number;
  lng: number;
}

export interface Establishment {
  establishmentId: number;
  name: string;
  address: string;
  reviewList : Review[];

}

export interface Review {
  reviewId: string;
  
  comment: string;
  rating: number;
  necessityReviewList : NecessityReview[];
}

export interface NecessityReview {
  necessityId: string;
  attends: boolean;
}

export interface Necessity {
  necessityId: string;
  name: string;
  description: string;
  ngroup: string;
};
