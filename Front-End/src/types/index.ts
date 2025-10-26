// src/types/index.ts

export interface User {
  userId: string;
  name: string;
}

export interface Location {
  establishmentId: string;
  name: string;
  address: string;
  xCoords: number;
  yCoords: number;
<<<<<<< Updated upstream
=======
  rating?: number;
  topNecessities?: string[];
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}

export interface Establishment {
  establishmentId: string | null; 
  name: string;
  address: string;
  reviewList : Review[];
  xCoords: number;
  yCoords: number;

}

export interface Review {
  reviewId: string;
  userId: string;
  username: string;
  comment: string;
  rating: number;
  necessities: Necessity[];
}

export interface Necessity {
  necessityId: string;
  name: string;
  description: string;
  ngroup: string;
};
