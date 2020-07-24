import { MovieResponse } from './movieResponse';

export interface SearchResponse {
  Search: MovieResponse [];
  totalResults: number;
  Response: string;
  Error: string;
  lastSearch?: string;
}
