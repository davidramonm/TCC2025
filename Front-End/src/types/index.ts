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
  rating?: number;
  topNecessities: string[];
}

export interface Establishment {
  establishmentId: string;
  name: string;
  address: string;
  rating: number;
  xCoords: number;
  yCoords: number;
  topNecessities: string[];
  reviewList : Review[];

}

export interface Review {
  reviewId: string;
  userId: string;
  username: string;
  profileImage?: string;
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