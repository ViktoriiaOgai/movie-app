// src/types/movie.ts
export type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  rating?: number; 
  genre_ids: number[];
  vote_average: number;
};
export type Genre = {
  id: number;
  name: string;
};
