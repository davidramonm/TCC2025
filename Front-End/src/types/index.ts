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
