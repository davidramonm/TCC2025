// src/types/index.ts

/**
 * @description Define a estrutura de dados para um local no mapa.
 */
export interface Location {
  establishmentId: number;
  name: string;
  xCoords: number;
  yCoords: number;
}

export interface Establishment {
  establishmentId: number;
  name: string;
  address: string;
  reviewList : Review[];
  xCoords: number;
  yCoords: number;

}

export interface Review {
  reviewId: string;
  username: string;
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
